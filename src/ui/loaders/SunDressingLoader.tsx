import React from 'react';

export function SunDressingLoader() {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 mb-4">
                <g>
                    <circle cx="50" cy="50" r="20" fill="#F1C40F" />
                    <g stroke="#F1C40F" strokeWidth="4" strokeLinecap="round">
                        <line x1="50" y1="20" x2="50" y2="10" />
                        <line x1="50" y1="80" x2="50" y2="90" />
                        <line x1="20" y1="50" x2="10" y2="50" />
                        <line x1="80" y1="50" x2="90" y2="50" />
                        <line x1="29" y1="29" x2="22" y2="22" />
                        <line x1="71" y1="71" x2="78" y2="78" />
                    </g>
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="10 50 50" dur="0.5s" repeatCount="indefinite" additive="sum" autoReverse="true" />
                </g>

                <path d="M35,40 L65,40 L68,60 L32,60 Z" fill="#3498DB" opacity="0.8">
                    <animate attributeName="d"
                        values="M35,10 L65,10 L68,30 L32,30 Z; M35,40 L65,40 L68,60 L32,60 Z; M35,10 L65,10 L68,30 L32,30 Z"
                        dur="1.5s"
                        repeatCount="indefinite" />
                </path>
            </svg>
            <p className="text-sm text-gray-500 font-medium animate-pulse">
                Préparation de votre look paisible…
            </p>
        </div>
    );
}
