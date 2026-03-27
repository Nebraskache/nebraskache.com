import { readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs';

const MINUTES_DIR = 'static/meeting-minutes';
const OUTPUT_PATH = 'src/lib/data/meeting-minutes.json';

const MONTH_NAMES = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

interface MinutesEntry {
	date: string;
	year: number;
	month: number;
	day: number;
	monthName: string;
	filename: string;
	url: string;
}

function scanMinutes(): MinutesEntry[] {
	if (!existsSync(MINUTES_DIR)) {
		console.warn(`Meeting minutes directory not found at ${MINUTES_DIR}, writing empty list.`);
		return [];
	}

	const files = readdirSync(MINUTES_DIR).filter((f) => /^\d{4}\.\d{2}\.\d{2}\.pdf$/.test(f));

	return files
		.map((filename): MinutesEntry | null => {
			const match = filename.match(/^(\d{4})\.(\d{2})\.(\d{2})\.pdf$/);
			if (!match) return null;

			const [, yearStr, monthStr, dayStr] = match;
			const year = parseInt(yearStr, 10);
			const month = parseInt(monthStr, 10);
			const day = parseInt(dayStr, 10);

			if (month < 1 || month > 12 || day < 1 || day > 31) return null;

			return {
				date: `${year}-${monthStr}-${dayStr}`,
				year,
				month,
				day,
				monthName: MONTH_NAMES[month - 1],
				filename,
				url: `/meeting-minutes/${filename}`
			};
		})
		.filter((e): e is MinutesEntry => e !== null)
		.sort((a, b) => b.date.localeCompare(a.date));
}

const outputDir = OUTPUT_PATH.substring(0, OUTPUT_PATH.lastIndexOf('/'));
if (!existsSync(outputDir)) {
	mkdirSync(outputDir, { recursive: true });
}

const minutes = scanMinutes();
writeFileSync(OUTPUT_PATH, JSON.stringify(minutes, null, 2));
console.log(`Found ${minutes.length} meeting minutes → ${OUTPUT_PATH}`);
