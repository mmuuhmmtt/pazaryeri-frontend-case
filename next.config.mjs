// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts');

const isGitHubPages = process.env.NEXT_PUBLIC_BASE_PATH || process.env.GITHUB_ACTIONS;

/** @type {import('next').NextConfig} */
const nextConfig = {
    // GitHub Pages için statik export
    ...(isGitHubPages && { output: 'export' }),

    // GitHub Pages için basePath (repo adı ile deploy edilecekse)
    ...(process.env.NEXT_PUBLIC_BASE_PATH && {
        basePath: process.env.NEXT_PUBLIC_BASE_PATH,
        assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
    }),

    eslint: {
        ignoreDuringBuilds: true,
    },

    typescript: {
        ignoreBuildErrors: true,
    },

    images: {
        // Statik export için image optimization devre dışı
        ...(isGitHubPages && { unoptimized: true }),
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.coverr.co',
            },
        ],
    },
};

export default withNextIntl(nextConfig);