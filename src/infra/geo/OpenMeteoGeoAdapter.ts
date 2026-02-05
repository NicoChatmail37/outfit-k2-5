import { GeoPort, GeoLocation } from '../../core/ports/GeoPort';
import { GeoError } from '../../shared/errors';

interface OpenMeteoGeoResult {
    name: string;
    latitude: number;
    longitude: number;
    country_code: string;
    admin1?: string;
}

interface OpenMeteoGeoResponse {
    results?: OpenMeteoGeoResult[];
}

export class OpenMeteoGeoAdapter implements GeoPort {
    private readonly baseUrl = 'https://geocoding-api.open-meteo.com/v1/search';

    async geocode(query: string): Promise<GeoLocation> {
        try {
            // Clean query: OpenMeteo Geocoding works best with just city name
            // If query is "Paris, FR", take "Paris"
            const cityName = query.split(',')[0].trim();

            const url = `${this.baseUrl}?name=${encodeURIComponent(cityName)}&count=1&language=fr&format=json`;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data: OpenMeteoGeoResponse = await response.json();

            if (!data.results || data.results.length === 0) {
                throw new Error('Location not found');
            }

            const result = data.results[0];

            return {
                lat: result.latitude,
                lon: result.longitude,
                name: result.name,
                country: result.country_code ? result.country_code.toUpperCase() : 'Unknown',
            };
        } catch (error) {
            throw new GeoError(
                error instanceof Error ? error.message : 'Geocoding failed with Open-Meteo'
            );
        }
    }
}
