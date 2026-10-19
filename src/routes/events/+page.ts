import type { GeoEvent } from '$lib/types';
import eventsData from '$lib/data/events.json';
import { isTodayOrFuture } from '$lib/util';

export function load() {
	const events = eventsData.events.filter((event) => isTodayOrFuture(event.endTime)) as GeoEvent[];
	return { events, updatedAt: eventsData.updatedAt };
}
