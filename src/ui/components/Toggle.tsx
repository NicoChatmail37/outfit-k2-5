'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ToggleProps {
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    label?: string;
    className?: string;
}

export function Toggle({ value, options, onChange, label, className }: ToggleProps) {
    return (
        <div className={cn('w-full', className)}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
            <div className="flex bg-gray-100 p-1 rounded-lg">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className={cn(
                            'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all',
                            value === option.value
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                        )}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
