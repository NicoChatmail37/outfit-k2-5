'use client';

import { ClothingItem, OutfitLayer } from '../../core/domain/outfit/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { fr } from '../../resources/texts/fr';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface OutfitListProps {
    items: ClothingItem[];
    summary: string;
    confidence: 'low' | 'medium' | 'high';
    className?: string;
}

const categoryIcons: Record<OutfitLayer, string> = {
    [OutfitLayer.HEAD]: '🎩',
    [OutfitLayer.TOP]: '👕',
    [OutfitLayer.MID]: '🧥',
    [OutfitLayer.BOTTOM]: '👖',
    [OutfitLayer.FEET]: '👟',
    [OutfitLayer.ACCESSORY]: '🌂',
};

const confidenceColors = {
    low: 'text-yellow-600 bg-yellow-50',
    medium: 'text-blue-600 bg-blue-50',
    high: 'text-green-600 bg-green-50',
};

export function OutfitList({ items, summary, confidence, className }: OutfitListProps) {
    return (
        <div className={cn('space-y-4', className)}>
            <div className={cn('p-4 rounded-lg', confidenceColors[confidence])}>
                <p className="font-medium">{summary}</p>
                <p className="text-sm mt-1 opacity-75">
                    {fr.ui.confidence.label}: {fr.ui.confidence[confidence]}
                </p>
            </div>

            <div className="space-y-2">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg"
                    >
                        <span className="text-2xl" role="img" aria-label={item.category}>
                            {categoryIcons[item.category] || '👔'}
                        </span>
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-900 capitalize">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.reason}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
