'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    showValue?: boolean;
    valueFormatter?: (value: number) => string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
    ({ label, min, max, value, onChange, showValue = true, valueFormatter, className, ...props }, ref) => {
        return (
            <div className={cn('w-full', className)}>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">{label}</label>
                    {showValue && (
                        <span className="text-sm font-semibold text-blue-600">
                            {valueFormatter ? valueFormatter(value) : value}
                        </span>
                    )}
                </div>
                <input
                    ref={ref}
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    {...props}
                />
                <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>{min}</span>
                    <span>{max}</span>
                </div>
            </div>
        );
    }
);

Slider.displayName = 'Slider';
