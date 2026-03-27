import minutesData from '$lib/data/meeting-minutes.json';

interface MinutesEntry {
	date: string;
	year: number;
	month: number;
	day: number;
	monthName: string;
	filename: string;
	url: string;
}

export function load() {
	const minutes = minutesData as MinutesEntry[];

	const byYear = new Map<number, MinutesEntry[]>();
	for (const entry of minutes) {
		const list = byYear.get(entry.year) ?? [];
		list.push(entry);
		byYear.set(entry.year, list);
	}

	const years = [...byYear.entries()]
		.sort(([a], [b]) => b - a)
		.map(([year, entries]) => ({ year, entries }));

	return { years, totalCount: minutes.length };
}
