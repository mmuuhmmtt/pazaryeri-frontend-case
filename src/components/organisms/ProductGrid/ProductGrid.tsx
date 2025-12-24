'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { ProductCard } from '@/components/molecules/ProductCard/ProductCard';

export interface ProductGridProps {
    products: Product[];
    locale: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

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
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
            {products.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    priority={index < 4}
                />
            ))}
        </motion.div>
    );
});
