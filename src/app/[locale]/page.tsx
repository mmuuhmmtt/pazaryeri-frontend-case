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
            <main className="min-h-screen bg-gradient-to-b from-white to-secondary-50 transition-colors dark:from-secondary-900 dark:to-secondary-950">

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


                        <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 via-red-800/60 to-red-900/70"></div>


                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGMwIDMuMzE0LTIuNjg2IDYtNiA2cy02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiA2IDIuNjg2IDYgNnoiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
                    </div>


                    <div className="container relative z-10 mx-auto flex min-h-[600px] items-center px-4">
                        <div className="max-w-2xl">

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                                <span className="h-2 w-2 animate-pulse rounded-full bg-red-400"></span>
                                <span className="text-sm font-semibold text-white">
                    🚀 {locale === 'tr' ? 'TREND ÜRÜNLER' : 'TRENDING NOW'}
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
                                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-white to-red-100 px-8 py-4 text-lg font-bold text-red-700 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                                >
                    <span className="relative z-10 flex items-center gap-2">
                        {locale === 'tr' ? 'ÜRÜNLERİ KEŞFET' : 'EXPLORE PRODUCTS'}
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-white opacity-0 transition-opacity group-hover:opacity-30"></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-16 transition-colors">
                    <div className="container">
                        <div className="mb-12 text-center">
                            <h2 className="mb-3 text-4xl font-bold text-secondary-900 dark:text-secondary-100 md:text-5xl">
                                {t('featured.title')}
                            </h2>
                            <p className="text-lg text-secondary-600 dark:text-secondary-400 md:text-xl">
                                {t('featured.subtitle')}
                            </p>
                        </div>
                        <ProductGrid products={featuredProducts} locale={locale} />
                    </div>
                </section>

                {/* All Products */}
                <section className="bg-white py-16 transition-colors dark:bg-secondary-800">
                    <div className="container">
                        <div className="mb-12">
                            <h2 className="mb-2 text-4xl font-bold text-secondary-900 dark:text-secondary-100 md:text-5xl">
                                {t('allProducts.title')}
                            </h2>
                            <p className="text-lg text-secondary-600 dark:text-secondary-400">
                                {locale === 'tr'
                                    ? `${mockProducts.length} ürün arasından seçim yapın`
                                    : `Choose from ${mockProducts.length} products`}
                            </p>
                        </div>
                        <ProductGrid products={mockProducts} locale={locale} />
                    </div>
                </section>
            </main>
        </>
    );
}