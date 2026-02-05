/**
 * Business rules for outfit recommendations.
 * Pure functions - no side effects, no external dependencies.
 */
import { WeatherSnapshot } from '../weather/types';
import { OutfitInput, ClothingItem, MannequinData, OutfitRecommendation, Confidence, OutfitLayer } from './types';
import { fr } from '../../../resources/texts/fr';

// Temperature thresholds (°C) for layering decisions
const TEMP_THRESHOLDS = {
    hot: 24,
    warm: 18,
    mild: 12,
    cool: 6,
    cold: 0,
} as const;

/**
 * Calculate "feels-like" temperature adjusted for wind and precipitation
 */
export function calculateFeelsLike(
    avgTempC: number,
    windKph: number,
    precipitationChance: number
): number {
    // Wind chill factor: approx -1°C per 10km/h, capped at 30km/h (3°C reduction)
    const windFactor = Math.min(windKph / 10, 3);
    // Rain makes it feel colder and requires protection
    const rainFactor = precipitationChance > 0.5 ? 2 : 0;
    return avgTempC - windFactor - rainFactor;
}

/**
 * Adjust feels-like temperature based on user's cold tolerance
 * 0 = never cold (feels warmer), 100 = very cold-sensitive (feels colder)
 */
export function applyColdTolerance(feelsLike: number, tolerance: number): number {
    // Map 0-100 to -4°C (frileux) to +2°C (jamais froid)
    // Formula: at 50 (neutral), adjustment is 0
    const adjustment = ((tolerance - 50) / 50) * 3; // Range: -3 to +3
    return feelsLike - adjustment; // High tolerance (100) -> subtract more (feels colder)
}

/**
 * Determine base temperature category
 */
export function getTemperatureCategory(adjustedTemp: number): keyof typeof TEMP_THRESHOLDS | 'freezing' {
    if (adjustedTemp >= TEMP_THRESHOLDS.hot) return 'hot';
    if (adjustedTemp >= TEMP_THRESHOLDS.warm) return 'warm';
    if (adjustedTemp >= TEMP_THRESHOLDS.mild) return 'mild';
    if (adjustedTemp >= TEMP_THRESHOLDS.cool) return 'cool';
    if (adjustedTemp >= TEMP_THRESHOLDS.cold) return 'cold';
    return 'freezing';
}

/**
 * Generate clothing items based on category and conditions
 */
export function generateItems(
    category: ReturnType<typeof getTemperatureCategory>,
    hasRain: boolean,
    hasWind: boolean,
    isColdSensitive: boolean
): ClothingItem[] {
    const items: ClothingItem[] = [];

    // HEAD
    if (category === 'freezing' || category === 'cold' || (category === 'cool' && isColdSensitive)) {
        items.push({
            category: OutfitLayer.HEAD,
            name: fr.outfit.items.beanie,
            reason: fr.outfit.reasons.coldProtection,
        });
    } else if (category === 'hot') {
        items.push({
            category: OutfitLayer.HEAD,
            name: fr.outfit.items.cap,
            reason: fr.outfit.reasons.sunProtection,
        });
    } else {
        items.push({
            category: OutfitLayer.HEAD,
            name: fr.outfit.items.none,
            reason: fr.outfit.reasons.niceTemp,
        });
    }

    // TOP (base layer)
    if (category === 'hot') {
        items.push({
            category: OutfitLayer.TOP,
            name: fr.outfit.items.tshirtShort,
            reason: fr.outfit.reasons.summerHeat,
        });
    } else if (category === 'warm' || category === 'mild') {
        items.push({
            category: OutfitLayer.TOP,
            name: fr.outfit.items.tshirtLong,
            reason: fr.outfit.reasons.lightProtection,
        });
    } else {
        items.push({
            category: OutfitLayer.TOP,
            name: fr.outfit.items.sweater,
            reason: fr.outfit.reasons.isolation,
        });
    }

    // MID (additional layer)
    if (category === 'cool' || category === 'cold' || category === 'freezing') {
        items.push({
            category: OutfitLayer.MID,
            name: category === 'freezing' ? fr.outfit.items.coat : fr.outfit.items.jacket,
            reason: fr.outfit.reasons.outerLayer,
        });
    }

    // BOTTOM
    if (category === 'hot') {
        items.push({
            category: OutfitLayer.BOTTOM,
            name: fr.outfit.items.shorts,
            reason: fr.outfit.reasons.maxAir,
        });
    } else if (category === 'warm') {
        items.push({
            category: OutfitLayer.BOTTOM,
            name: fr.outfit.items.pantsLight,
            reason: fr.outfit.reasons.breathable,
        });
    } else {
        items.push({
            category: OutfitLayer.BOTTOM,
            name: fr.outfit.items.pants,
            reason: fr.outfit.reasons.coldProtection,
        });
    }

    // FEET
    if (category === 'hot') {
        items.push({
            category: OutfitLayer.FEET,
            name: fr.outfit.items.sandals,
            reason: fr.outfit.reasons.summerHeat,
        });
    } else if (category === 'warm' || category === 'mild') {
        items.push({
            category: OutfitLayer.FEET,
            name: fr.outfit.items.sneakers,
            reason: fr.outfit.reasons.dailyComfort,
        });
    } else {
        items.push({
            category: OutfitLayer.FEET,
            name: fr.outfit.items.shoes,
            reason: fr.outfit.reasons.thermalIsolation,
        });
    }

    // ACCESSORIES
    if (hasRain) {
        items.push({
            category: OutfitLayer.ACCESSORY,
            name: fr.outfit.items.umbrella,
            reason: fr.outfit.reasons.rain,
        });
    }

    if ((category === 'cold' || category === 'freezing') && hasWind) {
        items.push({
            category: OutfitLayer.ACCESSORY,
            name: fr.outfit.items.scarf,
            reason: fr.outfit.reasons.wind,
        });
    }

    return items;
}

/**
 * Generate mannequin layer IDs for SVG rendering
 */
export function generateMannequinLayers(
    category: ReturnType<typeof getTemperatureCategory>,
    gender: 'male' | 'female',
    hasRain: boolean
): string[] {
    const layers: string[] = ['body-base'];

    // Base clothing
    if (category === 'hot') {
        layers.push('top-tshirt', 'bottom-short');
    } else if (category === 'warm') {
        layers.push('top-tshirt', 'bottom-pant');
    } else if (category === 'mild') {
        layers.push('top-long', 'bottom-pant', 'layer-light');
    } else if (category === 'cool') {
        layers.push('top-long', 'bottom-pant', 'layer-jacket');
    } else {
        layers.push('top-long', 'bottom-pant', 'layer-coat');
    }

    // Accessories
    if (category === 'cold' || category === 'freezing') {
        layers.push('acc-hat');
    }

    if (hasRain) {
        layers.push('acc-umbrella');
    }

    return layers;
}

/**
 * Determine confidence level based on data quality
 */
export function calculateConfidence(weather: WeatherSnapshot): Confidence {
    if (weather.condition === 'unknown') return 'low';
    if (Math.abs(weather.maxTempC - weather.minTempC) > 15) return 'medium';
    return 'high';
}

/**
 * Generate human-readable summary
 */
export function generateSummary(
    category: ReturnType<typeof getTemperatureCategory>,
    adjustedTemp: number,
    hasRain: boolean
): string {
    const tempDesc = {
        hot: fr.weather.summary.hot,
        warm: fr.weather.summary.warm,
        mild: fr.weather.summary.mild,
        cool: fr.weather.summary.cool,
        cold: fr.weather.summary.cold,
        freezing: fr.weather.summary.freezing,
    }[category];

    let summary = fr.weather.summary.base.replace('{desc}', tempDesc).replace('{temp}', String(Math.round(adjustedTemp)));

    if (hasRain) {
        summary += ' ' + fr.weather.summary.rain;
    }

    if (category === 'freezing' || category === 'cold') {
        summary += ' ' + fr.weather.summary.coldLayer;
    } else if (category === 'hot') {
        summary += ' ' + fr.weather.summary.hotLayer;
    }

    return summary;
}
