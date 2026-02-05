import React from 'react';

export function SkirtLayer({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M75,155 L125,155 L145,230 L55,230 Z" fill="#34495E" />
        </svg>
    );
}
