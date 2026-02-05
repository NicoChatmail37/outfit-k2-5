import React from 'react';

export function BootsLayer({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M65,275 L85,275 L85,295 L60,295 L60,285 Z" fill="#2C3E50" />
            <path d="M115,275 L135,275 L140,285 L140,295 L115,295 Z" fill="#2C3E50" />
        </svg>
    );
}
