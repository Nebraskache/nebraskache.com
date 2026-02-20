import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { XMLParser } from 'fast-xml-parser';
import type { GeoEvent } from '../src/lib/types.js';

const GPX_PATH = 'data/$nebraska_events.gpx';
const OUTPUT_PATH = 'src/lib/data/events.json';

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
		console.warn(`GPX file not found at ${GPX_PATH}, writing empty events.`);
		return [];
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

				const longDescRaw = (cache.long_description as string) ?? '';
				const longDesc =
					typeof longDescRaw === 'object'
						? stripHtml(String((longDescRaw as Record<string, unknown>)['#text'] ?? ''))
						: stripHtml(longDescRaw);

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
					shortDescription: shortDesc,
					longDescription: longDesc,
					url: String(wpt.url ?? ''),
					state: String(cache.state ?? 'Nebraska')
				};
			} catch {
				return null;
			}
		})
		.filter((e: GeoEvent | null): e is GeoEvent => e !== null)
		.filter((e: GeoEvent) => new Date(e.date) >= now)
		.sort((a: GeoEvent, b: GeoEvent) => new Date(a.date).getTime() - new Date(b.date).getTime());

	return events;
}

const outputDir = OUTPUT_PATH.substring(0, OUTPUT_PATH.lastIndexOf('/'));
if (!existsSync(outputDir)) {
	mkdirSync(outputDir, { recursive: true });
}

const events = parseGpx();
writeFileSync(OUTPUT_PATH, JSON.stringify(events, null, 2));
console.log(`Parsed ${events.length} upcoming events → ${OUTPUT_PATH}`);
