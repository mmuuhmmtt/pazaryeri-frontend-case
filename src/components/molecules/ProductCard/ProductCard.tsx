'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { cn, formatPrice, calculateDiscountPercentage } from '@/lib/utils';

export interface ProductCardProps {
    product: Product;
    locale: string;
    priority?: boolean;
}

export const ProductCard = memo(function ProductCard({
    product,
    locale,
    priority = false,
}: ProductCardProps) {
    const { isFavorite, toggleFavorite } = useFavoritesStore();
    const [isMounted, setIsMounted] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            setIsLiked(isFavorite(product.id));
        }
    }, [isMounted, isFavorite, product.id]);

    const discountPercentage = product.originalPrice
        ? calculateDiscountPercentage(
            product.originalPrice.amount,
            product.price.amount
        )
        : null;

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        toggleFavorite(product);
        if (isMounted) {
            setIsLiked(!isLiked);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group relative"
        >
            <Link
                href={`/${locale}/products/${product.slug}`}
                className="block overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-secondary-800"
            >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-secondary-100 dark:bg-secondary-700">
                    <Image
                        src={product.images[0].url}
                        alt={product.images[0].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={priority}
                    />

                    {/* Badges */}
                    <div className="absolute left-2 top-2 flex flex-col gap-1">
                        {product.isNew && (
                            <Badge variant="info" size="sm">
                                NEW
                            </Badge>
                        )}
                        {discountPercentage && discountPercentage > 0 && (
                            <Badge variant="danger" size="sm">
                                -{discountPercentage}%
                            </Badge>
                        )}
                    </div>

                    {/* Favorite Button - Sadece istemcide render et */}
                    {isMounted && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/90 p-0 backdrop-blur-sm hover:bg-white dark:bg-secondary-800/90 dark:hover:bg-secondary-800"
                            onClick={handleFavoriteClick}
                            aria-label={
                                isLiked ? 'Remove from favorites' : 'Add to favorites'
                            }
                        >
                            <Heart
                                className={cn(
                                    'h-4 w-4 transition-colors',
                                    isLiked
                                        ? 'fill-primary-600 text-primary-600'
                                        : 'text-secondary-600 dark:text-secondary-400'
                                )}
                            />
                        </Button>
                    )}

                    {/* Stock Badge */}
                    {product.stock.status === 'low-stock' && (
                        <Badge
                            variant="warning"
                            size="sm"
                            className="absolute bottom-2 left-2"
                        >
                            {locale === 'tr' ? 'Son Ürünler' : 'Low Stock'}
                        </Badge>
                    )}
                    {product.stock.status === 'out-of-stock' && (
                        <Badge
                            variant="danger"
                            size="sm"
                            className="absolute bottom-2 left-2"
                        >
                            {locale === 'tr' ? 'Tükendi' : 'Out of Stock'}
                        </Badge>
                    )}
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Brand */}
                    <p className="mb-1 text-xs font-medium text-secondary-600 dark:text-secondary-400">
                        {product.brand.name}
                    </p>

                    {/* Title */}
                    <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-secondary-900 dark:text-secondary-100">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="mb-3 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium text-secondary-700 dark:text-secondary-300">
                            {product.rating.average}
                        </span>
                        <span className="text-xs text-secondary-500 dark:text-secondary-400">
                            ({product.rating.count})
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-secondary-900 dark:text-secondary-100">
                            {formatPrice(product.price, locale)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-secondary-500 line-through dark:text-secondary-400">
                                {formatPrice(product.originalPrice, locale)}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}, (prevProps, nextProps) => {

    return (
        prevProps.product.id === nextProps.product.id &&
        prevProps.locale === nextProps.locale &&
        prevProps.priority === nextProps.priority
    );
});