import { describe, it, expect } from 'vitest';
import { recommendOutfit } from '@/core/domain/outfit/recommendOutfit';
import { WeatherSnapshot } from '@/core/domain/weather/types';
import { fr } from '@/resources/texts/fr';

const mockWeather: WeatherSnapshot = {
    avgTempC: 15,
    minTempC: 10,
    maxTempC: 20,
    windKph: 10,
    precipitationChance: 0.1,
    condition: 'clear',
};

describe('recommendOutfit', () => {
    it('returns a complete recommendation', () => {
        const result = recommendOutfit({
            coldTolerance: 50,
            gender: 'male',
            weather: mockWeather,
        });

        expect(result.mannequin).toBeDefined();
        expect(result.items).toBeInstanceOf(Array);
        expect(result.items.length).toBeGreaterThan(0);
        expect(result.summary).toBeTruthy();
        expect(result.confidence).toMatch(/^(low|medium|high)$/);
    });

    it('adjusts for cold sensitivity', () => {
        const sensitive = recommendOutfit({
            coldTolerance: 90,
            gender: 'female',
            weather: mockWeather,
        });

        const resistant = recommendOutfit({
            coldTolerance: 10,
            gender: 'female',
            weather: mockWeather,
        });

        // Sensitive person should have more/warmer layers
        expect(sensitive.items.length).toBeGreaterThanOrEqual(resistant.items.length);
    });

    it('handles rain conditions', () => {
        const rainyWeather: WeatherSnapshot = {
            ...mockWeather,
            precipitationChance: 0.8,
            condition: 'rain',
        };

        const result = recommendOutfit({
            coldTolerance: 50,
            gender: 'male',
            weather: rainyWeather,
        });

        expect(result.items.some(i => i.name === fr.outfit.items.umbrella)).toBe(true);
    });
});
