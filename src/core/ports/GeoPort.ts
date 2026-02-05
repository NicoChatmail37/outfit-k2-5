export interface GeoLocation {
    lat: number;
    lon: number;
    name: string;
    country: string;
}

export interface GeoPort {
    geocode(query: string): Promise<GeoLocation>;
}
