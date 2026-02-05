import React from 'react';

export function UmbrellaLayer({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M155,140 L155,190 Q155,200 145,200" fill="none" stroke="#333333" strokeWidth="4" />
            <path d="M125,120 Q155,80 185,120 Z" fill="#F1C40F" />
            <path d="M155,120 L155,85" stroke="#333333" strokeWidth="3" />
        </svg>
    );
}
