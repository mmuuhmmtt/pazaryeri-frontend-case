'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/features/header';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
    const params = useParams();
    const locale = params.locale as string;
    const items = useCartStore((state) => state.items);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const clearCart = useCartStore((state) => state.clearCart);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Hydration mismatch önleme
    }

    const total = items.reduce(
        (sum, item) => sum + item.product.price.amount * item.quantity,
        0
    );
    const isEmpty = items.length === 0;

    return (
        <>
            <Header locale={locale} />
            <main className="min-h-screen bg-gradient-to-br from-white via-secondary-50 to-secondary-100 dark:from-secondary-950 dark:via-secondary-900 dark:to-black py-12 transition-colors duration-300">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-secondary-900 dark:text-white mb-2">
                                🛒 {locale === 'tr' ? 'Sepetim' : 'My Cart'}
                            </h1>
                            <p className="text-secondary-600 dark:text-secondary-400">
                                {locale === 'tr' 
                                    ? `${items.length} ürün` 
                                    : `${items.length} item${items.length !== 1 ? 's' : ''}`
                                }
                            </p>
                        </div>
                        <Link href={`/${locale}/products`}>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {locale === 'tr' ? 'Alışverişe Devam' : 'Continue Shopping'}
                            </Button>
                        </Link>
                    </div>

                    {isEmpty ? (
                        /* Empty Cart */
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-32 h-32 mb-6 rounded-full bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center">
                                <ShoppingBag className="w-16 h-16 text-secondary-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                                {locale === 'tr' ? 'Sepetiniz Boş' : 'Your Cart is Empty'}
                            </h2>
                            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                                {locale === 'tr' 
                                    ? 'Alışverişe başlamak için ürünleri keşfedin!' 
                                    : 'Start shopping to add items to your cart!'}
                            </p>
                            <Link href={`/${locale}/products`}>
                                <Button size="lg">
                                    {locale === 'tr' ? 'Ürünleri İncele' : 'Browse Products'}
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-lg border border-secondary-200 dark:border-secondary-800 transition-all duration-300 hover:shadow-xl"
                                    >
                                        <div className="flex gap-6">
                                            {/* Image */}
                                            <Link 
                                                href={`/${locale}/products/${item.product.slug}`}
                                                className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 group"
                                            >
                                                {item.product.images[0] && (
                                                    <Image
                                                        src={item.product.images[0].url}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                )}
                                            </Link>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <Link href={`/${locale}/products/${item.product.slug}`}>
                                                    <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
                                                        {item.product.name}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-3">
                                                    {item.product.brand.name} • {item.product.category.name}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-3">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <span className="text-lg font-bold min-w-[30px] text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="text-right">
                                                        <p className="text-xl font-black bg-gradient-to-r from-primary-600 to-accent-pink bg-clip-text text-transparent">
                                                            {formatPrice({
                                                                amount: item.product.price.amount * item.quantity,
                                                                currency: item.product.price.currency
                                                            }, locale)}
                                                        </p>
                                                        <p className="text-xs text-secondary-500 dark:text-secondary-400">
                                                            {formatPrice(item.product.price, locale)} {locale === 'tr' ? 'birim' : 'each'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                onClick={() => removeFromCart(item.product.id)}
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                {/* Clear Cart */}
                                <Button
                                    variant="outline"
                                    className="w-full text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20"
                                    onClick={clearCart}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    {locale === 'tr' ? 'Sepeti Temizle' : 'Clear Cart'}
                                </Button>
                            </div>

                            {/* Summary */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 bg-white dark:bg-secondary-900 rounded-2xl p-6 shadow-xl border border-secondary-200 dark:border-secondary-800">
                                    <h2 className="text-xl font-black text-secondary-900 dark:text-white mb-6">
                                        {locale === 'tr' ? 'Sipariş Özeti' : 'Order Summary'}
                                    </h2>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                                            <span>{locale === 'tr' ? 'Ara Toplam' : 'Subtotal'}</span>
                                            <span className="font-semibold">{formatPrice({ amount: total, currency: 'TRY' }, locale)}</span>
                                        </div>
                                        <div className="flex justify-between text-secondary-600 dark:text-secondary-400">
                                            <span>{locale === 'tr' ? 'Kargo' : 'Shipping'}</span>
                                            <span className="font-semibold text-green-600">{locale === 'tr' ? 'Ücretsiz' : 'Free'}</span>
                                        </div>
                                        <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-black text-secondary-900 dark:text-white">
                                                    {locale === 'tr' ? 'Toplam' : 'Total'}
                                                </span>
                                                <span className="text-2xl font-black bg-gradient-to-r from-primary-600 to-accent-pink bg-clip-text text-transparent">
                                                    {formatPrice({ amount: total, currency: 'TRY' }, locale)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full h-14 text-lg font-bold" size="lg">
                                        {locale === 'tr' ? '🎉 Siparişi Tamamla' : '🎉 Checkout'}
                                    </Button>

                                    <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-4 text-center">
                                        {locale === 'tr' 
                                            ? '🔒 Güvenli ödeme ile korunan alışveriş' 
                                            : '🔒 Secure checkout with protection'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

