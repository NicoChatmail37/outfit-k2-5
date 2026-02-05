import React from 'react';

export function DressLayer({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M75,70 Q100,75 125,70 L130,155 L70,155 Z" fill="#E74C3C" />
            <path d="M70,155 L130,155 L150,250 L50,250 Z" fill="#E74C3C" />
        </svg>
    );
}
