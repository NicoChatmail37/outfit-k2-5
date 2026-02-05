import React from 'react';

export function CoatLayer({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M65,70 L135,70 L145,240 L55,240 Z" fill="#A67C52" />
            <path d="M70,70 L100,110 L130,70" fill="none" stroke="#8B623E" strokeWidth="3" />
            <path d="M65,75 L40,145" stroke="#A67C52" strokeWidth="24" strokeLinecap="round" />
            <path d="M135,75 L160,145" stroke="#A67C52" strokeWidth="24" strokeLinecap="round" />
        </svg>
    );
}
