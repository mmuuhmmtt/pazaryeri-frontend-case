'use client';

import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { Heart, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
        <div className="group relative h-full transition-transform duration-300 hover:-translate-y-2 hover:scale-[1.02]">
            <Link
                href={`/${locale}/products/${product.slug}`}
                className="block h-full overflow-hidden rounded-2xl bg-gradient-to-br from-secondary-900 to-secondary-950 shadow-lg transition-all duration-300 hover:shadow-glow-purple dark:from-secondary-950 dark:to-black"
            >
                {/* Image Container with Gradient Overlay */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary-900/20 to-accent-pink/20">
                    {product.images[0] && (
                        <>
                            <Image
                                src={product.images[0].url}
                                alt={product.images[0].alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                                priority={priority}
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </>
                    )}

                    {/* Badges with Glow Effect */}
                    <div className="absolute left-3 top-3 flex flex-col gap-2">
                        {product.isNew && (
                            <Badge 
                                variant="info" 
                                size="sm"
                                className="bg-gradient-to-r from-accent-cyan to-accent-indigo shadow-glow-cyan font-bold animate-scale-in"
                            >
                                ✨ NEW
                            </Badge>
                        )}
                        {discountPercentage && discountPercentage > 0 && (
                            <Badge 
                                variant="danger" 
                                size="sm"
                                className="bg-gradient-to-r from-accent-pink to-primary-500 shadow-glow-pink font-bold"
                            >
                                🔥 -{discountPercentage}%
                            </Badge>
                        )}
                    </div>

                    {/* Favorite Button with Glow - Sadece istemcide render et */}
                    {isMounted && (
                        <div className="absolute right-3 top-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "h-10 w-10 rounded-full p-0 backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95",
                                    isLiked
                                        ? "bg-gradient-to-br from-primary-500 to-accent-pink shadow-glow-purple"
                                        : "bg-black/40 hover:bg-black/60"
                                )}
                                onClick={handleFavoriteClick}
                                aria-label={
                                    isLiked ? 'Remove from favorites' : 'Add to favorites'
                                }
                            >
                                <Heart
                                    className={cn(
                                        'h-5 w-5 transition-all duration-200',
                                        isLiked
                                            ? 'fill-white text-white scale-110'
                                            : 'text-white/80'
                                    )}
                                />
                            </Button>
                        </div>
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

                {/* Content with Modern Styling */}
                <div className="p-5 space-y-3">
                    {/* Brand with Gradient */}
                    <p className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-primary-400 to-accent-pink bg-clip-text text-transparent">
                        {product.brand.name}
                    </p>

                    {/* Title */}
                    <h3 className="line-clamp-2 text-base font-bold text-white group-hover:text-primary-300 transition-colors duration-300">
                        {product.name}
                    </h3>

                    {/* Rating with Glow */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 backdrop-blur-sm">
                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-bold text-yellow-400">
                                {product.rating.average}
                            </span>
                        </div>
                        <span className="text-xs text-secondary-400">
                            ({product.rating.count} reviews)
                        </span>
                    </div>

                    {/* Price with Gradient */}
                    <div className="flex items-baseline gap-3 pt-2">
                        <span className="text-2xl font-black bg-gradient-to-r from-primary-400 via-accent-pink to-accent-cyan bg-clip-text text-transparent">
                            {formatPrice(product.price, locale)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-secondary-500 line-through">
                                {formatPrice(product.originalPrice, locale)}
                            </span>
                        )}
                    </div>

                    {/* Hover Action Button - Tüm kart hover'ında görünür */}
                    <div className="mt-3 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <div className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-accent-pink text-white text-center font-bold shadow-lg hover:shadow-glow-purple transition-shadow">
                            ✨ {locale === 'tr' ? 'Detayları Gör' : 'View Details'}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}, (prevProps, nextProps) => {

    return (
        prevProps.product.id === nextProps.product.id &&
        prevProps.locale === nextProps.locale &&
        prevProps.priority === nextProps.priority
    );
});
