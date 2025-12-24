'use client';

import { useTranslations } from 'next-intl';
import { Header } from '@/components/organisms/Header/Header';
import { ProductGrid } from '@/components/organisms/ProductGrid/ProductGrid';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { Heart } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function FavoritesPage() {
    const params = useParams();
    const locale = params?.locale as string;
    const t = useTranslations();
    const { favorites } = useFavoritesStore();

    return (
        <>
            <Header locale={locale} />
            <main className="min-h-screen py-8">
                <div className="container">
                    <div className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                            {t('favorites.title')}
                        </h1>
                        <p className="text-secondary-600 dark:text-secondary-400">
                            {t('favorites.subtitle', { count: favorites.length })}
                        </p>
                    </div>

                    {favorites.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Heart className="mb-4 h-16 w-16 text-secondary-300 dark:text-secondary-600" />
                            <h2 className="mb-2 text-xl font-semibold text-secondary-900 dark:text-secondary-100">
                                {t('favorites.empty.title')}
                            </h2>
                            <p className="text-secondary-600 dark:text-secondary-400">
                                {t('favorites.empty.description')}
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