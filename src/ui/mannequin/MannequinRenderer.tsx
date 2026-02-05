import React from 'react';
import { BaseMannequin } from './BaseMannequin';
import { CoatLayer } from './layers/coat';
import { TshirtLongLayer } from './layers/tshirt';
import { TshirtShortLayer } from './layers/tshirt_short';
import { PantsLayer } from './layers/pants';
import { ShortLayer } from './layers/short';
import { SkirtLayer } from './layers/skirt';
import { ShoesLayer } from './layers/shoes';
import { BootsLayer } from './layers/boots';
import { UmbrellaLayer } from './layers/umbrella';
import { DressLayer } from './layers/dress';
import { CardiganLayer } from './layers/cardigan';

export type MannequinLayerType =
    | 'coat'
    | 'tshirt_long'
    | 'tshirt_short'
    | 'pants'
    | 'short'
    | 'skirt'
    | 'shoes'
    | 'boots'
    | 'umbrella'
    | 'dress'
    | 'cardigan';

interface MannequinRendererProps {
    layers: MannequinLayerType[];
    className?: string;
}

export function MannequinRenderer({ layers, className }: MannequinRendererProps) {
    const hasLayer = (name: MannequinLayerType) => layers.includes(name);

    // Helper for absolute positioning within the container
    // The container will enforce aspect ratio
    const absoluteClass = "absolute top-0 left-0 w-full h-full";

    return (
        <div className={`relative w-full aspect-[2/3] ${className || ''}`}>
            {/* 1. BaseMannequin */}
            <BaseMannequin className={absoluteClass} />

            {/* 2. Bottom Layers (Pants, Skirt, Short) */}
            {hasLayer('pants') && <PantsLayer className={`${absoluteClass} z-10`} />}
            {hasLayer('short') && <ShortLayer className={`${absoluteClass} z-10`} />}
            {hasLayer('skirt') && <SkirtLayer className={`${absoluteClass} z-10`} />}
            {hasLayer('dress') && <DressLayer className={`${absoluteClass} z-10`} />} {/* Dress covers both */}

            {/* 3. Feet (Shoes, Boots) */}
            {hasLayer('shoes') && <ShoesLayer className={`${absoluteClass} z-20`} />}
            {hasLayer('boots') && <BootsLayer className={`${absoluteClass} z-20`} />}

            {/* 4. Top Layers (Tshirts, Cardigan) */}
            {hasLayer('tshirt_long') && <TshirtLongLayer className={`${absoluteClass} z-30`} />}
            {hasLayer('tshirt_short') && <TshirtShortLayer className={`${absoluteClass} z-30`} />}
            {hasLayer('cardigan') && <CardiganLayer className={`${absoluteClass} z-35`} />}

            {/* 5. Outerwear (Coat) */}
            {hasLayer('coat') && <CoatLayer className={`${absoluteClass} z-40`} />}

            {/* 6. Accessories */}
            {hasLayer('umbrella') && <UmbrellaLayer className={`${absoluteClass} z-50`} />}
        </div>
    );
}
