/**
 * Brand Service
 * Markalarla ilgili tüm API çağrıları bu dosyada yapılır
 */

import type { Brand } from '@/types';
// import { apiClient } from './api-client'; // TODO: Uncomment when backend is ready
import { mockBrands } from '@/mock-data/products';

/**
 * Tüm markaları getirir
 */
export async function getBrands(): Promise<Brand[]> {
    // TODO: Backend hazır olduğunda bu kısım açılacak
    // const response = await apiClient.get<Brand[]>('/brands');
    // return response.data;

    // Şimdilik mock data döndürüyoruz
    return Promise.resolve(mockBrands);
}

/**
 * Belirli bir markayı slug ile getirir
 */
export async function getBrandBySlug(slug: string): Promise<Brand | null> {
    // TODO: Backend hazır olduğunda bu kısım açılacak
    // const response = await apiClient.get<Brand>(`/brands/${slug}`);
    // return response.data;

    // Şimdilik mock data'dan buluyoruz
    const brand = mockBrands.find(b => b.slug === slug);
    return Promise.resolve(brand || null);
}
