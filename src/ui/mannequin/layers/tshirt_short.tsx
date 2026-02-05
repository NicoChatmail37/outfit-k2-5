import React from 'react';

export function TshirtShortLayer({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M70,70 Q100,75 130,70 L135,155 L65,155 Z" fill="#3498DB" />
            <path d="M70,75 L55,100" stroke="#3498DB" strokeWidth="20" strokeLinecap="round" />
            <path d="M130,75 L145,100" stroke="#3498DB" strokeWidth="20" strokeLinecap="round" />
        </svg>
    );
}
