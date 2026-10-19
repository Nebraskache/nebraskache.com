export function getGeoProfileURL(username: string): string {
    return `https://www.geocaching.com/p/?u=${encodeURIComponent(username).replace(/%20/g, '+')}`;
}

// Event times are the event's local wall-clock time stored as if they were UTC,
// since the GPX doesn't say which time zone an event is in. Compare the event's
// calendar date against the viewer's local date instead of converting either one.
export function isTodayOrFuture(isoDate: string): boolean {
    const now = new Date();
    const today = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
        .map((n) => String(n).padStart(2, '0'))
        .join('-');
    return isoDate.slice(0, 10) >= today;
}

export default {
    getGeoProfileURL,
    isTodayOrFuture
}
