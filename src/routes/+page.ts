import type { GeoEvent } from '$lib/types';
import eventsData from '$lib/data/events.json';

export function load() {
	const events = (eventsData as GeoEvent[]).slice(0, 3);
	return { upcomingEvents: events };
}
