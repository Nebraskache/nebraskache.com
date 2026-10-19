export function getGeoProfileURL(username: string): string {
    return `https://www.geocaching.com/p/?u=${encodeURIComponent(username).replace(/%20/g, '+')}`;
}

export default {
    getGeoProfileURL
}