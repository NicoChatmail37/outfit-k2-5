'use client';

import { useState, useCallback } from 'react';
import { OutfitRecommendation } from '../../core/domain/outfit/types';

interface UseOutfitRecommendationReturn {
    recommendation: OutfitRecommendation | null;
    isLoading: boolean;
    error: { message: string; code?: string } | null;
    fetchRecommendation: (input: {
        coldTolerance: number;
        gender: 'male' | 'female';
        locationQuery: string;
        dateStart: string;
        dateEnd: string;
    }) => Promise<void>;
    reset: () => void;
}

export function useOutfitRecommendation(): UseOutfitRecommendationReturn {
    const [recommendation, setRecommendation] = useState<OutfitRecommendation | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<{ message: string; code?: string } | null>(null);

    const fetchRecommendation = useCallback(async (input: {
        coldTolerance: number;
        gender: 'male' | 'female';
        locationQuery: string;
        dateStart: string;
        dateEnd: string;
    }) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/outfit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(input),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            setRecommendation(data);
        } catch (err) {
            setError({
                message: err instanceof Error ? err.message : 'Unknown error',
                code: (err as any)?.code,
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setRecommendation(null);
        setError(null);
    }, []);

    return {
        recommendation,
        isLoading,
        error,
        fetchRecommendation,
        reset,
    };
}
