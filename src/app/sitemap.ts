import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { mockProducts } from '@/mock-data/products';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://pazaryeri.com';

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
