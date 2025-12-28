import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
});

export default function middleware(request: NextRequest) {
    // Vercel production'da HTTPS kontrolü
    if (
        process.env.NODE_ENV === 'production' &&
        request.headers.get('x-forwarded-proto') === 'http'
    ) {
        const url = request.nextUrl.clone();
        url.protocol = 'https';
        return NextResponse.redirect(url, 301);
    }

    // Static export için middleware'i atla (GitHub Pages)
    if (process.env.NEXT_PUBLIC_BASE_PATH || process.env.GITHUB_ACTIONS) {
        return NextResponse.next();
    }

    try {
        return intlMiddleware(request);
    } catch (error) {
        // Middleware hatalarını yakala ve varsayılan locale'e yönlendir
        console.error('Middleware error:', error);
        const url = request.nextUrl.clone();
        url.pathname = `/${defaultLocale}${url.pathname}`;
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: [
        // Tüm path'leri eşleştir ama dosyaları ve static asset'leri hariç tut
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};

