import React from 'react';

export function ShortLayer({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M70,150 L130,150 L135,220 L105,220 L100,180 L95,220 L65,220 Z" fill="#7F8C8D" />
        </svg>
    );
}
