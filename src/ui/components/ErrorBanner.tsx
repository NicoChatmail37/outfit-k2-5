'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ErrorBannerProps {
    message: string;
    code?: string;
    onRetry?: () => void;
    className?: string;
}

export function ErrorBanner({ message, code, onRetry, className }: ErrorBannerProps) {
    return (
        <div className={cn('bg-red-50 border border-red-200 rounded-lg p-4', className)}>
            <div className="flex items-start gap-3">
                <svg
                    className="h-5 w-5 text-red-600 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-red-800">Une erreur est survenue</h3>
                    <p className="mt-1 text-sm text-red-700">{message}</p>
                    {code && <p className="mt-1 text-xs text-red-500">Code: {code}</p>}
                </div>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="text-sm font-medium text-red-700 hover:text-red-800 underline"
                    >
                        Réessayer
                    </button>
                )}
            </div>
        </div>
    );
}
