import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { XMLParser } from 'fast-xml-parser';
import type { GeoEvent } from '../src/lib/types.js';

const GPX_PATH = process.argv[2] ?? 'data/$nebraska_events.gpx';
const OUTPUT_PATH = 'src/lib/data/events.json';

// Nominatim usage policy: max 1 request/second and an identifying User-Agent.
// https://operations.osmfoundation.org/policies/nominatim/
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse';
const NOMINATIM_USER_AGENT = 'nebraskache.com event listing (https://nebraskache.com)';
const NOMINATIM_DELAY_MS = 1100;

// Used to find the nearest town when an event isn't inside one.
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const NEAREST_TOWN_RADIUS_M = 25000;

// Events this close to an already-looked-up event reuse its result. Kept small
// because adjacent cities (e.g. Omaha and La Vista) can be only a few km apart.
const LOCATION_REUSE_KM = 1;

interface Location {
	city: string;
	isNearest: boolean;
}

function stripHtml(html: string): string {
	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&nbsp;/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function parseStartAndEndTime(shortDesc: string): { startTime: string, endTime: string } {
	const [start, end] = shortDesc.split('-');
	const startTime = new Date(start + ' UTC');
	const endTime = new Date(start.replace(/\d\d:\d\d/, end) + ' UTC');

	return { startTime: startTime.toISOString(), endTime: endTime.toISOString() };
}

function parseGpx(): GeoEvent[] {
	if (!existsSync(GPX_PATH)) {
		throw new Error(`GPX file not found at ${GPX_PATH}`);
	}

	const xml = readFileSync(GPX_PATH, 'utf-8');

	const parser = new XMLParser({
		ignoreAttributes: false,
		attributeNamePrefix: '@_',
		removeNSPrefix: true
	});

	const parsed = parser.parse(xml);
	const waypoints = parsed?.gpx?.wpt;

	if (!waypoints) {
		console.warn('No waypoints found in GPX file.');
		return [];
	}

	const wptArray = Array.isArray(waypoints) ? waypoints : [waypoints];
	const now = new Date();

	const events: GeoEvent[] = wptArray
		.map((wpt: Record<string, unknown>): GeoEvent | null => {
			try {
				const cache = wpt.cache as Record<string, unknown> | undefined;
				if (!cache) return null;

				const eventDate = new Date((wpt.time + 'Z') as string);
				if (isNaN(eventDate.getTime())) return null;

				const shortDescRaw = (cache.short_description as string) ?? '';
				const shortDesc =
					typeof shortDescRaw === 'object'
						? stripHtml(String((shortDescRaw as Record<string, unknown>)['#text'] ?? ''))
						: stripHtml(shortDescRaw);

				const { startTime, endTime } = parseStartAndEndTime(shortDesc);

				return {
					gcCode: String(wpt.name ?? ''),
					name: String(cache.name ?? wpt.urlname ?? ''),
					date: eventDate.toISOString(),
					startTime: String(startTime ?? ''),
					endTime: String(endTime ?? ''),
					lat: Number(wpt['@_lat']),
					lon: Number(wpt['@_lon']),
					type: String(cache.type ?? 'Event'),
					placedBy: String(cache.placed_by ?? ''),
					url: String(wpt.url ?? ''),
					state: String(cache.state ?? 'Nebraska')
				};
			} catch {
				return null;
			}
		})
		.filter((e: GeoEvent | null): e is GeoEvent => e !== null)
		.filter((e: GeoEvent) => new Date(e.date) >= now)
		.sort(
			(a: GeoEvent, b: GeoEvent) =>
				new Date(a.date).getTime() - new Date(b.date).getTime() || a.gcCode.localeCompare(b.gcCode)
		);

	return events;
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
	const toRad = (deg: number) => (deg * Math.PI) / 180;
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
	return 6371 * 2 * Math.asin(Math.sqrt(a));
}

async function reverseGeocode(lat: number, lon: number): Promise<Record<string, string>> {
	const params = new URLSearchParams({
		format: 'jsonv2',
		lat: String(lat),
		lon: String(lon),
		zoom: '14',
		addressdetails: '1'
	});

	const res = await fetch(`${NOMINATIM_URL}?${params}`, {
		headers: { 'User-Agent': NOMINATIM_USER_AGENT, 'Accept-Language': 'en-US' }
	});
	if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`);

	const body = (await res.json()) as { address?: Record<string, string> };
	return body.address ?? {};
}

async function findNearestTown(lat: number, lon: number): Promise<string | undefined> {
	const query = `[out:json][timeout:25];node(around:${NEAREST_TOWN_RADIUS_M},${lat},${lon})[place~"^(city|town|village)$"];out;`;

	const res = await fetch(OVERPASS_URL, {
		method: 'POST',
		body: new URLSearchParams({ data: query }),
		headers: { 'User-Agent': NOMINATIM_USER_AGENT }
	});
	if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);

	const body = (await res.json()) as {
		elements: { lat: number; lon: number; tags?: Record<string, string> }[];
	};

	let nearest: { name: string; km: number } | undefined;
	for (const node of body.elements) {
		const name = node.tags?.name;
		if (!name) continue;
		const km = distanceKm(lat, lon, node.lat, node.lon);
		if (!nearest || km < nearest.km) nearest = { name, km };
	}
	return nearest?.name;
}

async function lookupLocation(lat: number, lon: number): Promise<Location | undefined> {
	const address = await reverseGeocode(lat, lon);
	const city = address.city ?? address.town ?? address.village ?? address.hamlet;
	if (city) return { city, isNearest: false };

	try {
		const nearest = await findNearestTown(lat, lon);
		if (nearest) return { city: nearest, isNearest: true };
	} catch (err) {
		console.warn(`Nearest town lookup failed at ${lat},${lon}: ${(err as Error).message}`);
	}

	return address.county ? { city: address.county, isNearest: false } : undefined;
}

// Cities from the previously committed events.json, so unchanged events don't
// need another lookup (and a flaky lookup can't drop a city and cause a diff).
function loadPreviousLocations(): Map<string, GeoEvent> {
	if (!existsSync(OUTPUT_PATH)) return new Map();
	try {
		const previous = JSON.parse(readFileSync(OUTPUT_PATH, 'utf-8')) as GeoEvent[];
		return new Map(previous.filter((e) => e.city).map((e) => [e.gcCode, e]));
	} catch {
		return new Map();
	}
}

async function addCities(events: GeoEvent[]): Promise<void> {
	const previous = loadPreviousLocations();
	const lookups: { lat: number; lon: number; location: Location | undefined }[] = [];
	let reused = 0;

	for (const event of events) {
		if (isNaN(event.lat) || isNaN(event.lon)) continue;

		const prev = previous.get(event.gcCode);
		if (prev && prev.lat === event.lat && prev.lon === event.lon) {
			event.city = prev.city;
			if (prev.cityIsNearest) event.cityIsNearest = true;
			reused++;
			continue;
		}

		let lookup = lookups.find(
			(l) => distanceKm(l.lat, l.lon, event.lat, event.lon) <= LOCATION_REUSE_KM
		);
		if (!lookup) {
			lookup = { lat: event.lat, lon: event.lon, location: undefined };
			try {
				lookup.location = await lookupLocation(event.lat, event.lon);
			} catch (err) {
				console.warn(`Reverse geocode failed for ${event.gcCode}: ${(err as Error).message}`);
			}
			lookups.push(lookup);
			await sleep(NOMINATIM_DELAY_MS);
		}

		if (lookup.location) {
			event.city = lookup.location.city;
			if (lookup.location.isNearest) event.cityIsNearest = true;
		}
	}

	console.log(
		`Looked up ${lookups.length} locations, reused ${reused} cities for ${events.length} events`
	);
}

const outputDir = OUTPUT_PATH.substring(0, OUTPUT_PATH.lastIndexOf('/'));
if (!existsSync(outputDir)) {
	mkdirSync(outputDir, { recursive: true });
}

const events = parseGpx();
await addCities(events);
writeFileSync(OUTPUT_PATH, JSON.stringify(events, null, 2) + '\n');
console.log(`Parsed ${events.length} upcoming events → ${OUTPUT_PATH}`);
