'use client';

import { Header } from '@/components/features/header';
import { ProductGrid } from '@/components/features/product-grid';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { Heart } from 'lucide-react';
// Static imports for messages (webpack can analyze these)
import trMessages from '@/i18n/messages/tr.json';
import enMessages from '@/i18n/messages/en.json';

interface FavoritesPageClientProps {
    locale: string;
}

function FavoritesPageClient({ locale }: FavoritesPageClientProps) {
    
    // Runtime'da seç (static imports webpack tarafından analiz edilebilir)
    const messages = locale === 'tr' ? trMessages : enMessages;
    const favoritesMessages = messages?.favorites || {};
    const t = (key: string, options?: { count?: number }) => {
        const keys = key.split('.');
        let value: any = favoritesMessages;
        for (const k of keys) {
            value = value?.[k];
        }
        if (options?.count !== undefined && typeof value === 'string') {
            return value.replace('{count}', options.count.toString());
        }
        return value || key;
    };
    
    const { favorites } = useFavoritesStore();

    return (
        <>
            <Header locale={locale} />
            <main className="min-h-screen py-8">
                <div className="container">
                    <div className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                            {t('title')}
                        </h1>
                        <p className="text-secondary-600 dark:text-secondary-400">
                            {t('subtitle', { count: favorites.length })}
                        </p>
                    </div>

                    {favorites.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Heart className="mb-4 h-16 w-16 text-secondary-300 dark:text-secondary-600" />
                            <h2 className="mb-2 text-xl font-semibold text-secondary-900 dark:text-secondary-100">
                                {t('empty.title')}
                            </h2>
                            <p className="text-secondary-600 dark:text-secondary-400">
                                {t('empty.description')}
                            </p>
                        </div>
                    ) : (
                        <ProductGrid products={favorites} locale={locale} />
                    )}
                </div>
            </main>
        </>
    );
}

// Server component wrapper to pass locale as prop
export default async function FavoritesPage({
    params,
}: {
    params: Promise<{ locale: string }> | { locale: string };
}) {
    const { locale } = params instanceof Promise ? await params : params;
    return <FavoritesPageClient locale={locale} />;
}