'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface AdSlotProps {
    position?: 'sidebar' | 'inline' | 'modal';
    className?: string;
}

export function AdSlot({ position = 'inline', className }: AdSlotProps) {
    return (
        <div
            className={cn(
                'border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center',
                {
                    'h-96': position === 'sidebar',
                    'h-48': position === 'inline',
                    'h-64': position === 'modal',
                },
                className
            )}
        >
            <div className="text-center text-gray-400">
                <svg
                    className="mx-auto h-12 w-12 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <p className="text-sm font-medium">Espace Publicitaire</p>
                <p className="text-xs">Votre marque ici</p>
            </div>
        </div>
    );
}
