'use client';

import { useState, useEffect } from 'react';
import { SunDressingLoader } from '../ui/loaders/SunDressingLoader';
import { OutfitForm } from '../features/outfit/OutfitForm';
import { OutfitResult } from '../features/outfit/OutfitResult';
import { useOutfitRecommendation } from '../features/outfit/useOutfitRecommendation';
import { AdSlot } from '../ui/components/AdSlot';
import { ErrorBanner } from '../ui/components/ErrorBanner';
import { Time } from '../shared/time';

const AD_STORAGE_KEY = 'ad_unlocked_until';
const FREE_RECOMMENDATIONS_KEY = 'free_recommendations_used';

export default function Home() {
    const { recommendation, isLoading, error, fetchRecommendation, reset } = useOutfitRecommendation();
    const [showAdModal, setShowAdModal] = useState(false);
    const [adTimer, setAdTimer] = useState(8);
    const [isAdWatched, setIsAdWatched] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [pendingSubmit, setPendingSubmit] = useState<Parameters<typeof fetchRecommendation>[0] | null>(null);

    // Check lock status on mount
    useEffect(() => {
        const unlockedUntil = localStorage.getItem(AD_STORAGE_KEY);
        const freeUsed = localStorage.getItem(FREE_RECOMMENDATIONS_KEY);

        if (!freeUsed) {
            setIsLocked(false);
        } else if (unlockedUntil && Date.now() < parseInt(unlockedUntil)) {
            setIsLocked(false);
        } else {
            setIsLocked(true);
        }
    }, [recommendation]);

    // Ad countdown timer
    useEffect(() => {
        if (!showAdModal || adTimer <= 0) return;

        const interval = setInterval(() => {
            setAdTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [showAdModal, adTimer]);

    const handleSubmit = async (data: Parameters<typeof fetchRecommendation>[0]) => {
        if (isLocked) {
            setPendingSubmit(data);
            setShowAdModal(true);
            setAdTimer(8);
            setIsAdWatched(false);
            return;
        }

        // First use is free
        const freeUsed = localStorage.getItem(FREE_RECOMMENDATIONS_KEY);
        if (!freeUsed) {
            localStorage.setItem(FREE_RECOMMENDATIONS_KEY, '1');
        }

        await fetchRecommendation(data);
    };

    const handleAdComplete = () => {
        const unlockUntil = Date.now() + Time.days(1);
        localStorage.setItem(AD_STORAGE_KEY, unlockUntil.toString());
        setIsLocked(false);
        setShowAdModal(false);

        if (pendingSubmit) {
            fetchRecommendation(pendingSubmit);
            setPendingSubmit(null);
        }
    };

    const handleReset = () => {
        reset();

        // Check if we need to lock for next time
        const freeUsed = localStorage.getItem(FREE_RECOMMENDATIONS_KEY);
        const unlockedUntil = localStorage.getItem(AD_STORAGE_KEY);

        if (freeUsed && (!unlockedUntil || Date.now() > parseInt(unlockedUntil))) {
            setIsLocked(true);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">👔 Comment s'habiller ?</h1>
                    <nav className="flex gap-4">
                        <a href="/" className="text-gray-600 hover:text-gray-900 font-medium">Accueil</a>
                        <a href="/settings" className="text-gray-600 hover:text-gray-900 font-medium">Paramètres</a>
                    </nav>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Hero */}
                        {!recommendation && !isLoading && (
                            <div className="text-center py-12">
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                    Prêt pour votre prochain voyage ?
                                </h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Dites-nous où vous allez, quand, et comment vous supportez le froid.
                                    Nous vous dirons exactement quoi mettre dans votre valise.
                                </p>
                            </div>
                        )}

                        {error && (
                            <ErrorBanner
                                message={error.message}
                                code={error.code}
                                onRetry={() => pendingSubmit && fetchRecommendation(pendingSubmit)}
                            />
                        )}

                        {isLoading ? (
                            <div className="flex justify-center py-12 animate-in fade-in duration-500">
                                <SunDressingLoader />
                            </div>
                        ) : recommendation ? (
                            <OutfitResult recommendation={recommendation} onReset={handleReset} />
                        ) : (
                            <OutfitForm
                                onSubmit={handleSubmit}
                                isLoading={isLoading}
                                isLocked={isLocked}
                                onUnlockRequest={() => {
                                    setShowAdModal(true);
                                    setAdTimer(8);
                                }}
                            />
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="hidden lg:block">
                        <div className="sticky top-8 space-y-6">
                            <AdSlot position="sidebar" />

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h3 className="font-medium text-blue-900 mb-2">💡 Conseil</h3>
                                <p className="text-sm text-blue-800">
                                    La météo peut changer. Prévoyez toujours une couche supplémentaire
                                    pour les soirées.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ad Modal */}
            {showAdModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 animate-in zoom-in-95 duration-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            🎬 Regardez cette courte vidéo
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Pour débloquer les recommandations illimitées pendant 24h,
                            regardez cette simulation publicitaire.
                        </p>

                        <AdSlot position="modal" />

                        <div className="mt-6 flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                                {adTimer > 0 ? `Attendez ${adTimer}s...` : '✓ Terminé !'}
                            </span>

                            <button
                                onClick={handleAdComplete}
                                disabled={adTimer > 0}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors ${adTimer > 0
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                J'ai regardé
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
