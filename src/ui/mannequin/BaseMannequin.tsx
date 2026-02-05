import React from 'react';

export function BaseMannequin({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle cx="100" cy="40" r="25" fill="#E0E0E0" />
            <path d="M70,70 Q100,65 130,70 L140,150 L125,150 L125,280 L75,280 L75,150 L60,150 Z" fill="#E0E0E0" />
            <path d="M70,75 L45,140" stroke="#E0E0E0" strokeWidth="18" strokeLinecap="round" />
            <path d="M130,75 L155,140" stroke="#E0E0E0" strokeWidth="18" strokeLinecap="round" />
        </svg>
    );
}
