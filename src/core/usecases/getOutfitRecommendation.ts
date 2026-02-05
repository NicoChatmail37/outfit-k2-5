/**
 * Orchestrates domain logic with external services
 */
import { recommendOutfit } from '../domain/outfit/recommendOutfit';
import { OutfitRecommendation, OutfitInput as DomainOutfitInput } from '../domain/outfit/types';
import { WeatherPort } from '../ports/WeatherPort';
import { GeoPort } from '../ports/GeoPort';
import { ValidationError } from '../../shared/errors';

export interface GetOutfitRecommendationInput {
    coldTolerance: number;
    gender: 'male' | 'female';
    locationQuery: string;
    dateStart: string; // ISO
    dateEnd: string; // ISO
}

export class GetOutfitRecommendationUseCase {
    constructor(
        private weatherPort: WeatherPort,
        private geoPort: GeoPort
    ) { }

    async execute(input: GetOutfitRecommendationInput): Promise<OutfitRecommendation> {
        // Validation
        if (input.coldTolerance < 0 || input.coldTolerance > 100) {
            throw new ValidationError('Cold tolerance must be between 0 and 100');
        }

        const dateStart = new Date(input.dateStart);
        const dateEnd = new Date(input.dateEnd);

        if (isNaN(dateStart.getTime()) || isNaN(dateEnd.getTime())) {
            throw new ValidationError('Invalid dates provided');
        }

        // Geocode location
        const location = await this.geoPort.geocode(input.locationQuery);

        // Fetch weather
        const weather = await this.weatherPort.fetchForecast(
            location.lat,
            location.lon,
            dateStart,
            dateEnd
        );

        // Domain logic (pure)
        const domainInput: DomainOutfitInput = {
            coldTolerance: input.coldTolerance,
            gender: input.gender,
            weather,
        };

        return recommendOutfit(domainInput);
    }
}
