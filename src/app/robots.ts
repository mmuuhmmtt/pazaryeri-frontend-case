import { MetadataRoute } from 'next';

// Static export için gerekli
export const dynamic = 'force-static';

// Base URL'i environment variable'dan al
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

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}