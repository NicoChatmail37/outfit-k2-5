import React from 'react';

export function ShoesLayer({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M65,285 L90,285 L92,295 L60,295 Z" fill="#D1D1D1" />
            <path d="M60,295 Q75,290 92,295" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            <path d="M110,285 L135,285 L140,295 L108,295 Z" fill="#D1D1D1" />
            <path d="M108,295 Q125,290 140,295" fill="none" stroke="#FFFFFF" strokeWidth="1" />
        </svg>
    );
}
