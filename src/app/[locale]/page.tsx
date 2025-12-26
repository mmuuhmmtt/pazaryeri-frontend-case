import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { Header } from '@/components/features/header';
import { mockProducts } from '@/mock-data/products';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Lazy load ProductGrid for better code splitting
const ProductGrid = dynamic(
    () => import('@/components/features/product-grid').then((mod) => ({ default: mod.ProductGrid })),
    {
        loading: () => (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-96 animate-pulse rounded-xl bg-secondary-200 dark:bg-secondary-700" />
                ))}
            </div>
        ),
        ssr: true,
    }
);

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'meta.home' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('ogTitle'),
            description: t('ogDescription'),
            type: 'website',
        },
    };
}

export default async function HomePage({
                                           params,
                                       }: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'home' });

    const featuredProducts = mockProducts.filter((p) => p.isFeatured);

    return (
        <>
            <Header locale={locale} />
            <main className="min-h-screen bg-gradient-to-br from-white via-secondary-50 to-secondary-100 dark:from-secondary-950 dark:via-secondary-900 dark:to-black relative overflow-hidden transition-colors duration-300">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-600/10 dark:bg-primary-600/20 rounded-full blur-3xl animate-float" />
                    <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent-pink/10 dark:bg-accent-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
                    <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-accent-cyan/10 dark:bg-accent-cyan/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
                </div>

                <section className="relative min-h-[600px] overflow-hidden">
                    {/* Video Background */}
                    <div className="absolute inset-0 z-0">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="h-full w-full object-cover"
                            poster="/images/video-poster.jpg" //
                        >
                            <source
                                src="/videos/hero-background.mp4"
                                type="video/mp4"
                            />

                            <source
                                src="/videos/hero-background.webm"
                                type="video/webm"
                            />

                            <img
                                src="/images/hero-fallback.jpg"
                                alt="Background"
                                className="h-full w-full object-cover"
                            />
                        </video>


                        {/* Modern Purple-Black Gradient Overlay - Her iki modda da mor */}
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/85 via-primary-900/75 to-secondary-950/85 dark:from-secondary-950/90 dark:via-primary-900/80 dark:to-secondary-950/90 transition-opacity duration-300"></div>


                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDMuMzE0LTIuNjg2IDYtNiA2cy02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNnoiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
                    </div>


                    <div className="container relative z-10 mx-auto flex min-h-[600px] items-center px-4">
                        <div className="max-w-2xl">

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500/20 to-accent-pink/20 border border-primary-400/30 px-5 py-2 backdrop-blur-md shadow-glow-purple">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-primary-400 to-accent-pink shadow-glow-pink"></span>
                                <span className="text-sm font-bold bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                    ✨ {locale === 'tr' ? 'TREND ÜRÜNLER' : 'TRENDING NOW'}
                </span>
                            </div>

                            <h1 className="mb-4 text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
                <span className="drop-shadow-2xl">
                    {t('hero.title')}
                </span>
                            </h1>

                            <p className="mb-8 text-xl text-white/90 md:text-2xl">
                <span className="drop-shadow-lg">
                    {t('hero.subtitle')}
                </span>
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={`/${locale}/products`}
                                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 via-accent-pink to-primary-600 px-10 py-5 text-lg font-black text-white shadow-2xl shadow-primary-500/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-purple"
                                >
                    <span className="relative z-10 flex items-center gap-3">
                        <span className="text-2xl">🚀</span>
                        {locale === 'tr' ? 'ÜRÜNLERİ KEŞFET' : 'EXPLORE PRODUCTS'}
                        <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-3" />
                    </span>
                                    {/* Animated gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-primary-500 to-accent-pink opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Products with Modern Design */}
                <section className="py-20 relative z-10">
                    <div className="container">
                        <div className="mb-16 text-center animate-slide-up">
                            <h2 className="mb-4 text-5xl font-black md:text-6xl">
                                <span className="bg-gradient-to-r from-primary-400 via-accent-pink to-accent-cyan bg-clip-text text-transparent">
                                    {t('featured.title')}
                                </span>
                            </h2>
                            <p className="text-xl text-secondary-400 md:text-2xl">
                                {t('featured.subtitle')}
                            </p>
                            <div className="mx-auto mt-6 h-1 w-32 bg-gradient-to-r from-primary-600 via-accent-pink to-accent-cyan rounded-full" />
                        </div>
                        <ProductGrid products={featuredProducts} locale={locale} />
                    </div>
                </section>

                {/* All Products with Glass Effect */}
                <section className="py-20 relative z-10">
                    <div className="container">
                        {/* Glass Card Container */}
                        <div className="rounded-3xl bg-secondary-900/50 backdrop-blur-xl border border-primary-500/20 p-8 md:p-12 shadow-2xl animate-fade-in">
                            <div className="mb-12">
                                <h2 className="mb-4 text-4xl font-black text-white md:text-5xl">
                                    <span className="bg-gradient-to-r from-white to-primary-300 bg-clip-text text-transparent">
                                        {t('allProducts.title')}
                                    </span>
                                </h2>
                                <p className="text-lg text-secondary-300">
                                    {locale === 'tr'
                                        ? `${mockProducts.length} ürün arasından seçim yapın`
                                        : `Choose from ${mockProducts.length} products`}
                                </p>
                            </div>
                            <ProductGrid products={mockProducts} locale={locale} />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}