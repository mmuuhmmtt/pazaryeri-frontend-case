/**
 * Category Service
 * Kategorilerle ilgili tüm API çağrıları bu dosyada yapılır
 */

import type { Category } from '@/types';
// import { apiClient } from './api-client'; // TODO: Uncomment when backend is ready
import { mockCategories } from '@/mock-data/products';

/**
 * Tüm kategorileri getirir
 */
export async function getCategories(): Promise<Category[]> {
    // TODO: Backend hazır olduğunda bu kısım açılacak
    // const response = await apiClient.get<Category[]>('/categories');
    // return response.data;

    // Şimdilik mock data döndürüyoruz
    return Promise.resolve(mockCategories);
}

/**
 * Belirli bir kategoriyi slug ile getirir
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    // TODO: Backend hazır olduğunda bu kısım açılacak
    // const response = await apiClient.get<Category>(`/categories/${slug}`);
    // return response.data;

    // Şimdilik mock data'dan buluyoruz
    const category = mockCategories.find(c => c.slug === slug);
    return Promise.resolve(category || null);
}
