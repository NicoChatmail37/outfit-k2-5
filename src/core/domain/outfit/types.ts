export type Gender = 'male' | 'female';
export enum OutfitLayer {
    HEAD = 'head',
    TOP = 'top',
    MID = 'mid',
    BOTTOM = 'bottom',
    FEET = 'feet',
    ACCESSORY = 'accessory',
}

export type ActivityLevel = 'low' | 'medium' | 'high';

export interface ActivityProfile {
    type: string; // e.g., 'casual', 'sport'
    intensity?: ActivityLevel;
}
export type Confidence = 'low' | 'medium' | 'high';

export interface OutfitInput {
    coldTolerance: number; // 0-100
    gender: Gender;
    weather: import('../weather/types').WeatherSnapshot;
}

export interface ClothingItem {
    category: OutfitLayer;
    name: string;
    reason: string;
}

export interface MannequinData {
    gender: Gender;
    layers: string[]; // SVG layer IDs
}

export interface OutfitRecommendation {
    mannequin: MannequinData;
    items: ClothingItem[];
    summary: string;
    confidence: Confidence;
}
