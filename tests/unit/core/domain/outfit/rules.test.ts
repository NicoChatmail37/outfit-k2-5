import { describe, it, expect } from 'vitest';
import {
    calculateFeelsLike,
    applyColdTolerance,
    getTemperatureCategory,
    generateItems,
} from '@/core/domain/outfit/rules';
import { OutfitLayer } from '@/core/domain/outfit/types';
import { fr } from '@/resources/texts/fr';

describe('calculateFeelsLike', () => {
    it('calculates base temperature without wind or rain', () => {
        expect(calculateFeelsLike(20, 0, 0)).toBe(20);
    });

    it('applies wind chill factor', () => {
        expect(calculateFeelsLike(20, 10, 0)).toBe(19); // -1 per 10km/h
        expect(calculateFeelsLike(20, 30, 0)).toBe(17); // capped at 3
        expect(calculateFeelsLike(20, 50, 0)).toBe(17); // still capped at 3
    });

    it('applies rain factor when precipitation > 50%', () => {
        expect(calculateFeelsLike(20, 0, 0.6)).toBe(18); // -2 for rain
        expect(calculateFeelsLike(20, 0, 0.4)).toBe(20); // no rain factor
    });
});

describe('applyColdTolerance', () => {
    it('makes it feel colder for cold-sensitive people (high tolerance)', () => {
        const base = 20;
        expect(applyColdTolerance(base, 100)).toBeLessThan(base); // Very frileux
        expect(applyColdTolerance(base, 0)).toBeGreaterThan(base); // Never cold
    });

    it('has no adjustment at neutral (50)', () => {
        expect(applyColdTolerance(20, 50)).toBe(20);
    });
});

describe('getTemperatureCategory', () => {
    it('categorizes temperatures correctly', () => {
        expect(getTemperatureCategory(25)).toBe('hot');
        expect(getTemperatureCategory(20)).toBe('warm');
        expect(getTemperatureCategory(15)).toBe('mild');
        expect(getTemperatureCategory(9)).toBe('cool');
        expect(getTemperatureCategory(3)).toBe('cold');
        expect(getTemperatureCategory(-5)).toBe('freezing');
    });
});

describe('generateItems', () => {
    it('generates correct items for hot weather', () => {
        const items = generateItems('hot', false, false, false);
        // T-shirt check (matches 'tshirtShort' from resources)
        expect(items.some(i => i.name === fr.outfit.items.tshirtShort)).toBe(true);
        // Short check (matches 'shorts' from resources and Layer enum)
        expect(items.some(i => i.category === OutfitLayer.BOTTOM && i.name === fr.outfit.items.shorts)).toBe(true);
    });

    it('adds rain accessories when needed', () => {
        const dry = generateItems('warm', false, false, false);
        const rainy = generateItems('warm', true, false, false);

        expect(dry.some(i => i.category === OutfitLayer.ACCESSORY)).toBe(false);
        expect(rainy.some(i => i.name === fr.outfit.items.umbrella)).toBe(true);
    });

    it('adds warm layers for freezing weather', () => {
        const items = generateItems('freezing', false, true, true);
        expect(items.some(i => i.name === fr.outfit.items.beanie)).toBe(true);
        expect(items.some(i => i.name === fr.outfit.items.coat)).toBe(true);
        expect(items.some(i => i.name === fr.outfit.items.scarf)).toBe(true);
    });
});
