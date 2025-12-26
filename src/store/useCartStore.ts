import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/types';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

interface CartActions {
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getItemCount: () => number;
    getTotal: () => number;
    isInCart: (productId: string) => boolean;
    getCartItem: (productId: string) => CartItem | undefined;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            // State
            items: [],

            // Actions
            addToCart: (product, quantity = 1) => {
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.product.id === product.id
                    );

                    if (existingItem) {
                        // Ürün zaten sepette - miktarı artır
                        return {
                            items: state.items.map((item) =>
                                item.product.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    }

                    // Yeni ürün ekle
                    return {
                        items: [...state.items, { product, quantity }],
                    };
                });
            },

            removeFromCart: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.product.id !== productId),
                }));
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.product.id === productId ? { ...item, quantity } : item
                    ),
                }));
            },

            clearCart: () => {
                set({ items: [] });
            },

            getItemCount: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.product.price.amount * item.quantity,
                    0
                );
            },

            isInCart: (productId) => {
                return get().items.some((item) => item.product.id === productId);
            },

            getCartItem: (productId) => {
                return get().items.find((item) => item.product.id === productId);
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

