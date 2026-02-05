import React from 'react';

export function CardiganLayer({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M75,75 L55,140" stroke="#95A5A6" strokeWidth="14" strokeLinecap="round" />
            <path d="M125,75 L145,140" stroke="#95A5A6" strokeWidth="14" strokeLinecap="round" />
            <path d="M75,70 L90,70 L90,160 L70,160 Z" fill="#95A5A6" />
            <path d="M110,70 L125,70 L130,160 L110,160 Z" fill="#95A5A6" />
        </svg>
    );
}
