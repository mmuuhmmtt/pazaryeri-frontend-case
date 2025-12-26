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
        <header className="sticky top-0 z-50 border-b border-primary-500/20 bg-secondary-950/95 backdrop-blur-xl shadow-lg shadow-primary-500/10">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href={`/${locale}`} className="flex items-center gap-2 text-xl font-black">
                        <div className="rounded-xl bg-gradient-to-br from-primary-500 to-accent-pink p-2 shadow-glow-purple">
                            <ShoppingCart className="h-5 w-5 text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-primary-400 to-accent-pink bg-clip-text text-transparent">
                            ShopNova
                        </span>
                    </Link>

                    <nav className="hidden gap-3 md:flex">
                        <Link
                            href={`/${locale}`}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-glow-purple"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {t('nav.home')}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-pink opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        </Link>

                        <Link
                            href={`/${locale}/products`}
                            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent-pink to-primary-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-glow-pink"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                ✨ {t('nav.products')}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-primary-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
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

                        <Link href={locale === 'tr' ? '/en' : '/tr'}>
                            <Button 
                                variant="outline" 
                                size="sm"
                                className="h-9 px-4 font-bold border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
                            >
                                {locale === 'tr' ? '🌐 EN' : '🌐 TR'}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};
