import { renderHook, act } from '@testing-library/react';
import { useFavoritesStore } from './useFavoritesStore';
import { mockProducts } from '@/mock-data/products';

describe('useFavoritesStore', () => {
    beforeEach(() => {
        // Reset store before each test
        useFavoritesStore.getState().clearFavorites();
    });

    it('should add product to favorites', () => {
        const { result } = renderHook(() => useFavoritesStore());
        const product = mockProducts[0];

        act(() => {
            result.current.addFavorite(product);
        });

        expect(result.current.isFavorite(product.id)).toBe(true);
        expect(result.current.favorites).toHaveLength(1);
    });

    it('should remove product from favorites', () => {
        const { result } = renderHook(() => useFavoritesStore());
        const product = mockProducts[0];

        act(() => {
            result.current.addFavorite(product);
            result.current.removeFavorite(product.id);
        });

        expect(result.current.isFavorite(product.id)).toBe(false);
        expect(result.current.favorites).toHaveLength(0);
    });

    it('should toggle favorite status', () => {
        const { result } = renderHook(() => useFavoritesStore());
        const product = mockProducts[0];

        act(() => {
            result.current.toggleFavorite(product);
        });

        expect(result.current.isFavorite(product.id)).toBe(true);

        act(() => {
            result.current.toggleFavorite(product);
        });

        expect(result.current.isFavorite(product.id)).toBe(false);
    });
});

