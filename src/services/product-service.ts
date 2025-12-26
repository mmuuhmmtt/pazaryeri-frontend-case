/**
 * Product Service
 * Ürünlerle ilgili tüm API çağrıları bu dosyada yapılır
 * 
 * Meshur.co API yapısına uygun olarak tasarlanmıştır.
 * 
 * @example
 * // Ürünleri getir
 * const products = await getProducts({ 
 *   page: 1, 
 *   pageSize: 12,
 *   category: 'electronics' 
 * });
 * 
 * // Tek ürün getir
 * const product = await getProductBySlug('wireless-headphones');
 */

import type { Product } from '@/types';
// import { apiClient, PaginatedResponse } from './api-client'; // TODO: Uncomment when backend is ready
import { mockProducts } from '@/mock-data/products';

/**
 * Ürün listesi parametreleri
 */
export interface GetProductsParams {
    page?: number;
    pageSize?: number;
    limit?: number;
    offset?: number;
    category?: string;
    categoryId?: string;
    brand?: string;
    brandId?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    q?: string;
    sort?: string;
    sortBy?: 'price' | 'rating' | 'date' | 'popularity';
    sortOrder?: 'asc' | 'desc';
    inStock?: boolean;
    featured?: boolean;
    isNew?: boolean;
    tags?: string[];
}

/**
 * Tüm ürünleri getirir
 * 
 * @param params - Filtreleme ve sayfalama parametreleri
 * @returns Product array
 * 
 * @example
 * const products = await getProducts({ 
 *   page: 1, 
 *   pageSize: 12,
 *   category: 'electronics',
 *   sort: 'price-asc'
 * });
 */
export async function getProducts(_params?: GetProductsParams): Promise<Product[]> {
    try {
        // TODO: Backend hazır olduğunda bu kısım açılacak
        /*
        const response = await apiClient.get<PaginatedResponse<Product>>('/products', {
            page: _params?.page?.toString(),
            pageSize: _params?.pageSize?.toString(),
            category: _params?.category,
            brand: _params?.brand,
            minPrice: _params?.minPrice?.toString(),
            maxPrice: _params?.maxPrice?.toString(),
            search: _params?.search,
            sort: _params?.sort,
        });
        
        if (!response.success) {
            console.error('Failed to fetch products:', response.error);
            // Fallback to mock data
            return mockProducts;
        }
        
        return response.data.data;
        */

        // Şimdilik mock data döndürüyoruz
        return Promise.resolve(mockProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock data
        return mockProducts;
    }
}

/**
 * Belirli bir ürünü slug ile getirir
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
    // TODO: Backend hazır olduğunda bu kısım açılacak
    // const response = await apiClient.get<Product>(`/products/${slug}`);
    // return response.data;

    // Şimdilik mock data'dan buluyoruz
    const product = mockProducts.find(p => p.slug === slug);
    return Promise.resolve(product || null);
}

/**
 * Belirli bir ürünü ID ile getirir
 */
export async function getProductById(id: string): Promise<Product | null> {
    // TODO: Backend hazır olduğunda bu kısım açılacak
    // const response = await apiClient.get<Product>(`/products/${id}`);
    // return response.data;

    // Şimdilik mock data'dan buluyoruz
    const product = mockProducts.find(p => p.id === id);
    return Promise.resolve(product || null);
}

/**
 * Öne çıkan ürünleri getirir
 */
export async function getFeaturedProducts(): Promise<Product[]> {
    // TODO: Backend hazır olduğunda bu kısım açılacak
    // const response = await apiClient.get<Product[]>('/products/featured');
    // return response.data;

    // Şimdilik mock data'dan filtreliyoruz
    return Promise.resolve(mockProducts.filter(p => p.isFeatured));
}

/**
 * Yeni ürünleri getirir
 */
export async function getNewProducts(): Promise<Product[]> {
    // TODO: Backend hazır olduğunda bu kısım açılacak
    // const response = await apiClient.get<Product[]>('/products/new');
    // return response.data;

    // Şimdilik mock data'dan filtreliyoruz
    return Promise.resolve(mockProducts.filter(p => p.isNew));
}

/**
 * Ürün aramalarını yapar
 */
export async function searchProducts(query: string): Promise<Product[]> {
    // TODO: Backend hazır olduğunda bu kısım açılacak
    // const response = await apiClient.get<Product[]>('/products/search', { q: query });
    // return response.data;

    // Şimdilik mock data'da arama yapıyoruz
    const lowercaseQuery = query.toLowerCase();
    return Promise.resolve(
        mockProducts.filter(
            p =>
                p.name.toLowerCase().includes(lowercaseQuery) ||
                p.brand.name.toLowerCase().includes(lowercaseQuery) ||
                p.category.name.toLowerCase().includes(lowercaseQuery)
        )
    );
}
