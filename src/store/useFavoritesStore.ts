import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/types';

interface FavoritesState {
    favorites: Product[];
    favoriteIds: Set<string>;
}

interface FavoritesActions {
    addFavorite: (product: Product) => void;
    removeFavorite: (productId: string) => void;
    toggleFavorite: (product: Product) => void;
    isFavorite: (productId: string) => boolean;
    clearFavorites: () => void;
    getFavoriteCount: () => number;
}

type FavoritesStore = FavoritesState & FavoritesActions;

export const useFavoritesStore = create<FavoritesStore>()(
    persist(
        (set, get) => ({
            // State
            favorites: [],
            favoriteIds: new Set<string>(),

            // Actions
            addFavorite: (product) => {
                set((state) => {
                    if (state.favoriteIds.has(product.id)) {
                        return state;
                    }

                    const newFavoriteIds = new Set(state.favoriteIds);
                    newFavoriteIds.add(product.id);

                    return {
                        favorites: [...state.favorites, product],
                        favoriteIds: newFavoriteIds,
                    };
                });
            },

            removeFavorite: (productId) => {
                set((state) => {
                    const newFavoriteIds = new Set(state.favoriteIds);
                    newFavoriteIds.delete(productId);

                    return {
                        favorites: state.favorites.filter((p) => p.id !== productId),
                        favoriteIds: newFavoriteIds,
                    };
                });
            },

            toggleFavorite: (product) => {
                const { isFavorite, addFavorite, removeFavorite } = get();

                if (isFavorite(product.id)) {
                    removeFavorite(product.id);
                } else {
                    addFavorite(product);
                }
            },

            isFavorite: (productId) => {
                return get().favoriteIds.has(productId);
            },

            clearFavorites: () => {
                set({ favorites: [], favoriteIds: new Set() });
            },

            getFavoriteCount: () => {
                return get().favorites.length;
            },
        }),
        {
            name: 'favorites-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                favorites: state.favorites,
                favoriteIds: Array.from(state.favoriteIds),
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.favoriteIds = new Set(state.favoriteIds);
                }
            },
        }
    )
);