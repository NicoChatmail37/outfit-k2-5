'use client';

import { OutfitRecommendation } from '../../core/domain/outfit/types';
import { MannequinView } from '../../ui/components/MannequinView';
import { OutfitList } from '../../ui/components/OutfitList';
import { Button } from '../../ui/components/Button';

interface OutfitResultProps {
    recommendation: OutfitRecommendation;
    onReset: () => void;
}

export function OutfitResult({ recommendation, onReset }: OutfitResultProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                    Votre recommandation
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center">
                        <MannequinView
                            gender={recommendation.mannequin.gender}
                            layers={recommendation.mannequin.layers}
                        />
                    </div>

                    <OutfitList
                        items={recommendation.items}
                        summary={recommendation.summary}
                        confidence={recommendation.confidence}
                    />
                </div>
            </div>

            <Button onClick={onReset} variant="outline" className="w-full">
                🔄 Nouvelle recommandation
            </Button>
        </div>
    );
}
