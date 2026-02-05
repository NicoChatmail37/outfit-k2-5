'use client';

import { useState } from 'react';
import { Button } from '../../ui/components/Button';

export default function SettingsPage() {
    const [healthStatus, setHealthStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

    const testConnection = async () => {
        setHealthStatus('loading');
        try {
            const res = await fetch('/api/weather/health');
            const data = await res.json();
            setHealthStatus(data.ok ? 'ok' : 'error');
        } catch {
            setHealthStatus('error');
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">👔 Comment s'habiller ?</h1>
                    <nav className="flex gap-4">
                        <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">Accueil</a>
                        <a href="/settings" className="text-blue-600 font-medium">Paramètres</a>
                    </nav>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres</h2>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Paramètres</h3>
                        <p className="text-gray-500 text-sm">
                            Les paramètres avancés (compte utilisateur, préférences précises) arriveront dans une prochaine version.
                        </p>
                    </div>
                </div>

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">ℹ️ À propos</h4>
                    <p className="text-sm text-blue-800">
                        Version MVP 1.0. Les recommandations sont générées localement
                        sans stockage de données personnelles.
                    </p>
                </div>
            </div>
        </main>
    );
}
