import { describe, it, expect } from 'vitest';
import { GetOutfitRecommendationUseCase } from '@/core/usecases/getOutfitRecommendation';
import { WeatherPort } from '@/core/ports/WeatherPort';
import { GeoPort } from '@/core/ports/GeoPort';
import { WeatherSnapshot } from '@/core/domain/weather/types';

// Fake adapters for testing
class FakeWeatherAdapter implements WeatherPort {
    async fetchForecast(): Promise<WeatherSnapshot> {
        return {
            avgTempC: 22,
            minTempC: 18,
            maxTempC: 26,
            windKph: 5,
            precipitationChance: 0,
            condition: 'clear',
        };
    }

    async healthCheck(): Promise<boolean> {
        return true;
    }
}

class FakeGeoAdapter implements GeoPort {
    async geocode() {
        return {
            lat: 36.7213,
            lon: -4.4213,
            name: 'Malaga',
            country: 'ES',
        };
    }
}

describe('Outfit API Integration', () => {
    it('end-to-end recommendation flow', async () => {
        const useCase = new GetOutfitRecommendationUseCase(
            new FakeWeatherAdapter(),
            new FakeGeoAdapter()
        );

        const result = await useCase.execute({
            coldTolerance: 30,
            gender: 'male',
            locationQuery: 'Malaga, ES',
            dateStart: new Date().toISOString(),
            dateEnd: new Date(Date.now() + 86400000).toISOString(),
        });

        expect(result.items).toBeInstanceOf(Array);
        expect(result.summary).toContain('chaud');
    });
});
