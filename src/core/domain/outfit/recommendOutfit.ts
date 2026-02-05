/**
 * Pure function: input -> recommendation
 * No side effects, deterministic, testable
 */
import { OutfitInput, OutfitRecommendation } from './types';
import {
    calculateFeelsLike,
    applyColdTolerance,
    getTemperatureCategory,
    generateItems,
    generateMannequinLayers,
    calculateConfidence,
    generateSummary,
} from './rules';

export function recommendOutfit(input: OutfitInput): OutfitRecommendation {
    const { coldTolerance, gender, weather } = input;

    // Step 1: Calculate feels-like temperature
    const feelsLike = calculateFeelsLike(
        weather.avgTempC,
        weather.windKph,
        weather.precipitationChance
    );

    // Step 2: Apply personal cold tolerance
    const adjustedTemp = applyColdTolerance(feelsLike, coldTolerance);

    // Step 3: Determine category
    const category = getTemperatureCategory(adjustedTemp);

    // Step 4: Determine conditions
    const hasRain = weather.precipitationChance > 0.5;
    const hasWind = weather.windKph > 20;
    const isColdSensitive = coldTolerance > 70;

    // Step 5: Generate recommendation components
    const items = generateItems(category, hasRain, hasWind, isColdSensitive);
    const layers = generateMannequinLayers(category, gender, hasRain);
    const confidence = calculateConfidence(weather);
    const summary = generateSummary(category, adjustedTemp, hasRain);

    return {
        mannequin: {
            gender,
            layers,
        },
        items,
        summary,
        confidence,
    };
}
