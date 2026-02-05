'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MannequinRenderer, MannequinLayerType } from '../mannequin/MannequinRenderer';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface MannequinViewProps {
    gender: 'male' | 'female';
    layers: string[];
    className?: string;
}

export function MannequinView({ gender, layers, className }: MannequinViewProps) {
    const isMale = gender === 'male';
    // Adapter logic: Transform domain (string) layers to UI (MannequinLayerType) layers
    // Note: gender is currently unused as BaseMannequin is neutral, but kept for interface compatibility
    const uiLayers: MannequinLayerType[] = [];

    // Mapping logic
    if (layers.includes('top-tshirt')) {
        // Default to short sleeve for t-shirt unless specified otherwise
        uiLayers.push('tshirt_short');
    }
    if (layers.includes('top-long')) {
        uiLayers.push('tshirt_long');
    }

    if (layers.includes('layer-coat') || layers.includes('layer-jacket')) {
        uiLayers.push('coat');
        // If we have a coat, maybe use cardigan as an intermediate if explicitly requested?
        // But for now, map jacket/coat to CoatLayer.
    }

    // Additional logic for mid-layer if present (e.g. cardigan if not coat?)
    if (layers.includes('layer-light')) {
        uiLayers.push('cardigan');
    }

    if (layers.includes('bottom-pant')) {
        if (!isMale) {
            // Mapping for female pant option -> Skirt or Dress? 
            // User said: "Si Femme est coché : l'algorithme propose la Robe ou la Jupe"
            // Since we can't change algorithm, we simulate this choice here for the visual.
            // Let's alternate or pick Skirt for variety if it's just 'bottom-pant'.
            uiLayers.push('skirt');
        } else {
            uiLayers.push('pants');
        }
    }

    if (layers.includes('bottom-short')) {
        uiLayers.push('short');
    }

    // Check for Dress case: if we have top (tshirt) AND bottom (skirt/pant) on female, maybe show dress?
    // But Dress is "All in one". 
    // If layers has NO top AND NO bottom but implies dress? Unlikely with current backend.

    if (layers.includes('acc-umbrella')) {
        uiLayers.push('umbrella');
    }

    // Auto-add shoes/boots
    if (layers.some(l => l.startsWith('bottom-'))) {
        if (!isMale && layers.includes('acc-umbrella')) {
            // Boots when raining
            uiLayers.push('boots');
        } else {
            uiLayers.push('shoes');
        }
    }

    return (
        <div className={cn('w-full max-w-xs mx-auto', className)}>
            <MannequinRenderer layers={uiLayers} />
        </div>
    );
}
