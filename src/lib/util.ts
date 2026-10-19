export function getGeoProfileURL(username: string): string {
    return `https://www.geocaching.com/p/?u=${encodeURIComponent(username).replace(/%20/g, '+')}`;
}

// Event times are the event's local wall-clock time stored as if they were UTC,
// since the GPX doesn't say which time zone an event is in. Compare the event's
// calendar date against the viewer's local date instead of converting either one.
function localToday(): string {
    const now = new Date();
    return [now.getFullYear(), now.getMonth() + 1, now.getDate()]
        .map((n) => String(n).padStart(2, '0'))
        .join('-');
}

export function isTodayOrFuture(isoDate: string): boolean {
    return isoDate.slice(0, 10) >= localToday();
}

export function isHappeningToday(startIso: string, endIso: string): boolean {
    const today = localToday();
    return startIso.slice(0, 10) <= today && today <= endIso.slice(0, 10);
}

export default {
    getGeoProfileURL,
    isTodayOrFuture,
    isHappeningToday
}
