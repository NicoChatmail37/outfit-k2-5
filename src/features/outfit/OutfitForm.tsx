'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../ui/components/Button';
import { Slider } from '../../ui/components/Slider';
import { Toggle } from '../../ui/components/Toggle';
import { DateRangePicker } from '../../ui/components/DateRangePicker';
import { LocationInput } from '../../ui/components/LocationInput';
import { AdSlot } from '../../ui/components/AdSlot';

interface OutfitFormProps {
    onSubmit: (data: {
        coldTolerance: number;
        gender: 'male' | 'female';
        locationQuery: string;
        dateStart: string;
        dateEnd: string;
    }) => void;
    isLoading?: boolean;
    isLocked?: boolean;
    onUnlockRequest?: () => void;
}

export function OutfitForm({ onSubmit, isLoading, isLocked, onUnlockRequest }: OutfitFormProps) {
    const [coldTolerance, setColdTolerance] = useState(50);
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [location, setLocation] = useState('');
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    // Set default dates (today + 7 days)
    useEffect(() => {
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        setDateStart(today.toISOString().split('T')[0]);
        setDateEnd(nextWeek.toISOString().split('T')[0]);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isLocked && onUnlockRequest) {
            onUnlockRequest();
            return;
        }

        // Helper to ensure robust ISO format (YYYY-MM-DDT00:00:00.000Z)
        const toIsoStartOfDay = (dateStr: string) => {
            // dateStr is YYYY-MM-DD from the input
            const date = new Date(`${dateStr}T00:00:00`);
            return date.toISOString();
        };

        onSubmit({
            coldTolerance,
            gender,
            locationQuery: location,
            dateStart: toIsoStartOfDay(dateStart),
            dateEnd: toIsoStartOfDay(dateEnd),
        });
    };

    const toleranceLabel = (val: number) => {
        if (val < 30) return 'Jamais froid';
        if (val < 70) return 'Normal';
        return 'Très frileux';
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Vos préférences</h2>
                <p className="text-sm text-gray-500 mt-1">Personnalisez votre recommandation</p>
            </div>

            <Slider
                label="Frilosité"
                min={0}
                max={100}
                value={coldTolerance}
                onChange={setColdTolerance}
                valueFormatter={toleranceLabel}
            />

            <Toggle
                label="Sexe"
                value={gender}
                options={[
                    { value: 'male', label: 'Homme' },
                    { value: 'female', label: 'Femme' },
                ]}
                onChange={(v) => setGender(v as 'male' | 'female')}
            />

            <LocationInput
                value={location}
                onChange={setLocation}
            />

            <DateRangePicker
                startDate={dateStart}
                endDate={dateEnd}
                onStartDateChange={setDateStart}
                onEndDateChange={setDateEnd}
            />

            {isLocked ? (
                <div className="space-y-4">
                    <AdSlot position="inline" />
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-yellow-600 hover:bg-yellow-700"
                    >
                        🔓 Débloquer avec une pub (8s)
                    </Button>
                </div>
            ) : (
                <Button
                    type="submit"
                    size="lg"
                    isLoading={isLoading}
                    disabled={!location || !dateStart || !dateEnd}
                    className="w-full"
                >
                    {isLoading ? 'Analyse en cours...' : '🎯 Lancer la recommandation'}
                </Button>
            )}
        </form>
    );
}
