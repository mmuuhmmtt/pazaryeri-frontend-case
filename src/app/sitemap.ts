import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { mockProducts } from '@/mock-data/products';

// Static export için gerekli
export const dynamic = 'force-static';

// Base URL'i environment variable'dan al, GitHub Pages için basePath ekle
const getBaseUrl = () => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    if (basePath) {
        // GitHub Pages: https://username.github.io/repo-name
        return `https://mmuuhmmtt.github.io${basePath}`;
    }
    // Vercel/Netlify: environment variable veya default
    return process.env.NEXT_PUBLIC_BASE_URL || 'https://pazaryeri.com';
};

const baseUrl = getBaseUrl();

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: MetadataRoute.Sitemap = [];


    locales.forEach((locale) => {
        routes.push({
            url: `${baseUrl}/${locale}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        });


        routes.push({
            url: `${baseUrl}/${locale}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        });


        routes.push({
            url: `${baseUrl}/${locale}/favorites`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        });


        mockProducts.forEach((product) => {
            routes.push({
                url: `${baseUrl}/${locale}/products/${product.slug}`,
                lastModified: new Date(product.updatedAt),
                changeFrequency: 'weekly',
                priority: 0.6,
            });
        });
    });

    return routes;
}
