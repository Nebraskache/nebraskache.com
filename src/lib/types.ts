export interface GeoEvent {
	gcCode: string;
	name: string;
	date: string;
	startTime: string;
	endTime: string;
	lat: number;
	lon: number;
	type: string;
	placedBy: string;
	placedByAccount: string;
	url: string;
	state: string;
	city?: string;
	// True when the event isn't inside a town and `city` is the nearest one
	cityIsNearest?: boolean;
}
