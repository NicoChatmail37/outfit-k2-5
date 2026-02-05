import React from 'react';

export function TshirtLongLayer({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M70,70 Q100,75 130,70 L135,155 L65,155 Z" fill="#2C3E50" />
            <path d="M70,75 L45,140" stroke="#2C3E50" strokeWidth="20" strokeLinecap="round" />
            <path d="M130,75 L155,140" stroke="#2C3E50" strokeWidth="20" strokeLinecap="round" />
        </svg>
    );
}
