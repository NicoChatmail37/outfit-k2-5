import React from 'react';

export function PantsLayer({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M70,150 L130,150 L135,285 L105,285 L100,180 L95,285 L65,285 Z" fill="#1A1A1A" />
        </svg>
    );
}
