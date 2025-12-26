'use client';

import { memo } from 'react';
import type { Product } from '@/types';
import { ProductCard } from '@/components/features/product-card';

export interface ProductGridProps {
    products: Product[];
    locale: string;
}

export const ProductGrid = memo(function ProductGrid({ products, locale }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-lg text-secondary-600 dark:text-secondary-400">
                    {locale === 'tr' ? 'Ürün bulunamadı' : 'No products found'}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fade-in">
            {products.map((product, index) => (
                <div 
                    key={product.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                >
                    <ProductCard
                        product={product}
                        locale={locale}
                        priority={index < 4}
                    />
                </div>
            ))}
        </div>
    );
});
