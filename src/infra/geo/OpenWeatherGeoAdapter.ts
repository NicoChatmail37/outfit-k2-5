import { GeoPort, GeoLocation } from '../../core/ports/GeoPort';
import { GeoError } from '../../shared/errors';
import { env } from '../../shared/env';

interface OpenWeatherGeoResult {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export class OpenWeatherGeoAdapter implements GeoPort {
    private readonly apiKey: string;
    private readonly baseUrl = 'https://api.openweathermap.org/geo/1.0';

    constructor(apiKey: string = env.OPENWEATHER_API_KEY) {
        this.apiKey = apiKey;
    }

    async geocode(query: string): Promise<GeoLocation> {
        try {
            // Parse "City, CountryCode" format
            const [city, countryCode] = query.split(',').map(s => s.trim());

            const url = `${this.baseUrl}/direct?q=${encodeURIComponent(city)}${countryCode ? `,${countryCode}` : ''
                }&limit=1&appid=${this.apiKey}`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data: OpenWeatherGeoResult[] = await response.json();

            if (data.length === 0) {
                throw new Error('Location not found');
            }

            const result = data[0];

            return {
                lat: result.lat,
                lon: result.lon,
                name: result.name,
                country: result.country,
            };
        } catch (error) {
            throw new GeoError(
                error instanceof Error ? error.message : 'Geocoding failed'
            );
        }
    }
}
