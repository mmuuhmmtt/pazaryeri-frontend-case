import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/features/header';
import { Badge } from '@/components/ui/badge';
import { AddToCartButton } from '@/components/features/add-to-cart-button';
import { mockProducts } from '@/mock-data/products';
import { formatPrice } from '@/lib/utils';
import { Star } from 'lucide-react';
// Static imports for messages (webpack can analyze these)
import trMessages from '@/i18n/messages/tr.json';
import enMessages from '@/i18n/messages/en.json';

// Static export için gerekli
export const dynamic = 'force-static';

export async function generateStaticParams() {
    return mockProducts.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ locale: string; slug: string }> | { locale: string; slug: string };
}): Promise<Metadata> {
    // Static export için params Promise olmayabilir
    const { locale, slug } = params instanceof Promise ? await params : params;

    const product = mockProducts.find((p) => p.slug === slug);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }




    return {
        title: `${product.name} | Pazaryeri (${locale.toUpperCase()})`,
        description: product.shortDescription || product.description,
        openGraph: {
            title: `${product.name} | Pazaryeri (${locale.toUpperCase()})`,
            description: product.shortDescription || product.description,
            images: product.images[0] ? [product.images[0].url] : [],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name} | Pazaryeri (${locale.toUpperCase()})`,
            description: product.shortDescription || product.description,
            images: product.images[0] ? [product.images[0].url] : [],
        },
    };
}

export default async function ProductDetailPage({
                                                    params,
                                                }: {
    params: Promise<{ locale: string; slug: string }> | { locale: string; slug: string };
}) {
    // Static export için params Promise olmayabilir
    const { locale, slug } = params instanceof Promise ? await params : params;
    
    // Runtime'da seç (static imports webpack tarafından analiz edilebilir)
    const messages = locale === 'tr' ? trMessages : enMessages;
    const productMessages = messages?.product || {};
    
    // Translation helper function
    const t = (key: string) => {
        const keys = key.split('.');
        let value: any = productMessages;
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    };

    const product = mockProducts.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    const discountPercentage = product.originalPrice
        ? Math.round(
            ((product.originalPrice.amount - product.price.amount) /
                product.originalPrice.amount) *
            100
        )
        : null;

    return (
        <>
            <Header locale={locale} />
            <main className="min-h-screen py-8">
                <div className="container">
                    <div className="grid gap-8 lg:grid-cols-2">
                        {/* Images */}
                        <div className="space-y-4">
                            <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary-100 dark:bg-secondary-800">
                                {product.images[0] && (
                                    <Image
                                        src={product.images[0].url}
                                        alt={product.images[0].alt}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                )}
                                {discountPercentage && (
                                    <Badge
                                        variant="danger"
                                        size="lg"
                                        className="absolute left-4 top-4"
                                    >
                                        -{discountPercentage}%
                                    </Badge>
                                )}
                            </div>
                            {product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {product.images.slice(1).map((image) => (
                                        <div
                                            key={image.id}
                                            className="relative aspect-square overflow-hidden rounded-lg bg-secondary-100 dark:bg-secondary-800"
                                        >
                                            <Image
                                                src={image.url}
                                                alt={image.alt}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <p className="mb-2 text-sm font-medium text-primary-600 dark:text-primary-400">
                                    {product.brand.name}
                                </p>
                                <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                                    {product.name}
                                </h1>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    <span className="text-lg font-semibold">
                    {product.rating.average}
                  </span>
                                </div>
                                <span className="text-secondary-600 dark:text-secondary-400">
                  ({product.rating.count} {t('product.reviews')})
                </span>
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                    {formatPrice(product.price, locale)}
                  </span>
                                    {product.originalPrice && (
                                        <span className="text-xl text-secondary-500 line-through dark:text-secondary-400">
                      {formatPrice(product.originalPrice, locale)}
                    </span>
                                    )}
                                </div>
                                <Badge
                                    variant={
                                        product.stock.status === 'in-stock' ? 'success' : 'warning'
                                    }
                                >
                                    {t(`product.${product.stock.status}`)}
                                </Badge>
                            </div>

                            {/* Description */}
                            <div className="border-t border-secondary-200 pt-6 dark:border-secondary-700">
                                <h2 className="mb-3 text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                                    {t('product.description')}
                                </h2>
                                <p className="text-secondary-700 dark:text-secondary-300">
                                    {product.description}
                                </p>
                            </div>

                            {/* Attributes */}
                            {product.attributes.length > 0 && (
                                <div className="border-t border-secondary-200 pt-6 dark:border-secondary-700">
                                    <h2 className="mb-3 text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                                        {t('product.specifications')}
                                    </h2>
                                    <dl className="space-y-2">
                                        {product.attributes.map((attr, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between text-sm"
                                            >
                                                <dt className="text-secondary-600 dark:text-secondary-400">
                                                    {attr.name}
                                                </dt>
                                                <dd className="font-medium text-secondary-900 dark:text-secondary-100">
                                                    {attr.value}
                                                </dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            )}

                            {/* Add to Cart */}
                            <AddToCartButton product={product} locale={locale} />
                        </div>
                    </div>
                </div>
            </main>

            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Product',
                        name: product.name,
                        description: product.description,
                        image: product.images.map((img) => img.url),
                        brand: {
                            '@type': 'Brand',
                            name: product.brand.name,
                        },
                        offers: {
                            '@type': 'Offer',
                            price: product.price.amount,
                            priceCurrency: product.price.currency,
                            availability:
                                product.stock.status === 'in-stock'
                                    ? 'https://schema.org/InStock'
                                    : 'https://schema.org/OutOfStock',
                        },
                        aggregateRating: {
                            '@type': 'AggregateRating',
                            ratingValue: product.rating.average,
                            reviewCount: product.rating.count,
                        },
                    }),
                }}
            />
        </>
    );
}