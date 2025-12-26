'use client';

import { useState } from 'react';
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import type { Product } from '@/types';

interface AddToCartButtonProps {
    product: Product;
    locale: string;
}

export function AddToCartButton({ product, locale }: AddToCartButtonProps) {
    const items = useCartStore((state) => state.items);
    const addToCart = useCartStore((state) => state.addToCart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const [quantity, setQuantity] = useState(1);
    const [justAdded, setJustAdded] = useState(false);

    const cartItem = items.find((item) => item.product.id === product.id);
    const inCart = !!cartItem;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 2000);
    };

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleUpdateCartQuantity = (newQuantity: number) => {
        if (newQuantity > 0) {
            updateQuantity(product.id, newQuantity);
        }
    };

    // Stok kontrolü
    const isOutOfStock = product.stock.status === 'out-of-stock';
    const isLowStock = product.stock.status === 'low-stock';

    return (
        <div className="space-y-4">
            {/* Miktar Seçici */}
            {!inCart && (
                <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-300">
                        {locale === 'tr' ? 'Miktar:' : 'Quantity:'}
                    </span>
                    <div className="flex items-center gap-2 rounded-lg border-2 border-secondary-300 dark:border-secondary-700 p-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={handleDecrement}
                            disabled={quantity <= 1}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="min-w-[40px] text-center font-bold text-lg">
                            {quantity}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={handleIncrement}
                            disabled={isLowStock && quantity >= 5}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    {isLowStock && (
                        <span className="text-xs text-yellow-600 dark:text-yellow-400">
                            {locale === 'tr' ? 'Sınırlı stok!' : 'Limited stock!'}
                        </span>
                    )}
                </div>
            )}

            {/* Sepetteki Miktar Güncelleme */}
            {inCart && cartItem && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
                    <Check className="h-5 w-5 text-primary-600" />
                    <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                        {locale === 'tr' ? 'Sepette' : 'In Cart'}: {cartItem.quantity} {locale === 'tr' ? 'adet' : 'items'}
                    </span>
                    <div className="flex items-center gap-2 ml-auto">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => handleUpdateCartQuantity(cartItem.quantity - 1)}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => handleUpdateCartQuantity(cartItem.quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Sepete Ekle Butonu */}
            <Button
                onClick={handleAddToCart}
                disabled={isOutOfStock || justAdded}
                className="w-full h-14 text-lg font-bold"
                size="lg"
            >
                {justAdded ? (
                    <>
                        <Check className="mr-2 h-5 w-5" />
                        {locale === 'tr' ? '✓ Eklendi!' : '✓ Added!'}
                    </>
                ) : isOutOfStock ? (
                    locale === 'tr' ? 'Stokta Yok' : 'Out of Stock'
                ) : (
                    <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        {locale === 'tr' ? 'Sepete Ekle' : 'Add to Cart'}
                    </>
                )}
            </Button>

            {/* Stok Durumu */}
            {isLowStock && !isOutOfStock && (
                <p className="text-sm text-yellow-600 dark:text-yellow-400 text-center">
                    ⚠️ {locale === 'tr' ? 'Son birkaç ürün!' : 'Only few items left!'}
                </p>
            )}
        </div>
    );
}

