import type { GeoEvent } from '$lib/types';
import eventsData from '$lib/data/events.json';

function isTodayOrFuture(isoDate: string): boolean {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const eventDate = new Date(isoDate);
	eventDate.setHours(0, 0, 0, 0);
	return eventDate.getTime() >= today.getTime();
}

export function load() {
	const events = eventsData.filter((event) => isTodayOrFuture(event.date)) as GeoEvent[];
	return { events };
}
