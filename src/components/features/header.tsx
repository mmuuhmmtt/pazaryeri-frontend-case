'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Heart, ShoppingCart, Moon, Sun, ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { useState, useEffect } from 'react';

interface HeaderProps {
    locale: string;
}

export const Header = ({ locale }: HeaderProps) => {
    const t = useTranslations();
    const favoriteCount = useFavoritesStore((state) => state.favorites.length);
    const cartCount = useCartStore((state) => 
        state.items.reduce((total, item) => total + item.quantity, 0)
    );
    const { theme, setTheme } = useUIStore();
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-primary-500/20 bg-white/95 dark:bg-secondary-950/95 backdrop-blur-xl shadow-lg shadow-primary-500/10 transition-colors duration-300">
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

                    {/* Desktop Navigation */}
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

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden h-9 w-9 p-0"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>

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

                        <Link href={`/${locale}/cart`}>
                            <Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
                                <ShoppingBag className="h-5 w-5" />
                                {mounted && cartCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-pink text-xs font-bold text-white animate-scale-in">
                                        {cartCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

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
                                className="hidden sm:flex h-9 px-4 font-bold border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
                            >
                                {locale === 'tr' ? '🌐 EN' : '🌐 TR'}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-primary-500/20 bg-white/95 dark:bg-secondary-950/95 backdrop-blur-xl">
                        <nav className="container mx-auto px-4 py-4 space-y-2">
                            <Link
                                href={`/${locale}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 active:scale-95"
                            >
                                {t('nav.home')}
                            </Link>
                            <Link
                                href={`/${locale}/products`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block rounded-xl bg-gradient-to-r from-accent-pink to-primary-600 px-4 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 active:scale-95"
                            >
                                ✨ {t('nav.products')}
                            </Link>
                            <Link
                                href={locale === 'tr' ? '/en' : '/tr'}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block rounded-xl border-2 border-primary-500 px-4 py-3 text-sm font-bold text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 active:scale-95"
                            >
                                {locale === 'tr' ? '🌐 EN' : '🌐 TR'}
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
