'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Heart, ShoppingCart, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useUIStore } from '@/store/useUIStore';
import { useState, useEffect } from 'react';

interface HeaderProps {
    locale: string;
}

export const Header = ({ locale }: HeaderProps) => {
    const t = useTranslations();
    const { getFavoriteCount } = useFavoritesStore();
    const { theme, setTheme } = useUIStore();
    const [mounted, setMounted] = useState(false);
    const [favoriteCount, setFavoriteCount] = useState(0);

    useEffect(() => {
        setMounted(true);
        setFavoriteCount(getFavoriteCount());
    }, [getFavoriteCount]);

    return (
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-secondary-900/80">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href={`/${locale}`} className="text-xl font-bold text-primary-600">
                        <ShoppingCart className="inline h-6 w-6" /> ShopNova
                    </Link>

                    <nav className="hidden gap-4 md:flex">
                        <Link
                            href={`/${locale}`}
                            className="group relative rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-red-700 px-6 py-3 text-sm font-bold text-black shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30"
                        >
                            <span className="relative z-10">{t('nav.home')}</span>
                            <span className="absolute inset-0 rounded-xl bg-white opacity-0 transition-opacity group-hover:opacity-20"></span>
                        </Link>

                        <Link
                            href={`/${locale}/products`}
                            className="group relative rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-red-700 px-6 py-3 text-sm font-bold text-black shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30"
                        >
                            <span className="relative z-10">{t('nav.products')}</span>
                            <span className="absolute inset-0 rounded-xl bg-white opacity-0 transition-opacity group-hover:opacity-20"></span>
                        </Link>
                    </nav>

                    <div className="flex items-center gap-2">
                        {mounted && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 w-9 p-0"
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            >
                                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </Button>
                        )}

                        <Link href={`/${locale}/favorites`}>
                            <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
                                <Heart className="h-5 w-5" />
                                {mounted && favoriteCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                                        {favoriteCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        <Link href={locale === 'tr' ? '/en' : '/tr'} className="text-sm font-medium">
                            {locale === 'tr' ? 'EN' : 'TR'}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};
