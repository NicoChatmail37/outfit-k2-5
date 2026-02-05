'use client';

import { useState, useCallback, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface LocationInputProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    className?: string;
}

// Simulated suggestions - in real app, would call geocoding API
const POPULAR_DESTINATIONS = [
    'Paris, FR',
    'Malaga, ES',
    'Lyon, FR',
    'Marseille, FR',
    'Bordeaux, FR',
    'Nice, FR',
    'Toulouse, FR',
    'Lille, FR',
];

export function LocationInput({
    value,
    onChange,
    label = 'Destination',
    placeholder = 'Ex: Malaga, ES',
    className,
}: LocationInputProps) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const id = `location-input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    const handleInputChange = useCallback((input: string) => {
        onChange(input);

        if (input.length > 1) {
            const filtered = POPULAR_DESTINATIONS.filter(dest =>
                dest.toLowerCase().includes(input.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 5));
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [onChange]);

    const handleSelect = (suggestion: string) => {
        onChange(suggestion);
        setShowSuggestions(false);
    };

    return (
        <div className={cn('w-full relative', className)}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <input
                ref={inputRef}
                id={id}
                type="text"
                name="location"
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={() => value.length > 1 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion}
                            onClick={() => handleSelect(suggestion)}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
