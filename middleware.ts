import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    // Static export için middleware'i atla (GitHub Pages)
    if (process.env.NEXT_PUBLIC_BASE_PATH || process.env.GITHUB_ACTIONS) {
        return NextResponse.next();
    }

    // Root path'i default locale'e yönlendir (en önce kontrol et)
    if (request.nextUrl.pathname === '/') {
        const url = request.nextUrl.clone();
        url.pathname = `/${routing.defaultLocale}`;
        return NextResponse.redirect(url, 307); // 307 Temporary Redirect
    }

    // Vercel production'da HTTPS kontrolü
    if (
        process.env.NODE_ENV === 'production' &&
        request.headers.get('x-forwarded-proto') === 'http'
    ) {
        const url = request.nextUrl.clone();
        url.protocol = 'https';
        return NextResponse.redirect(url, 301);
    }

    // next-intl middleware locale yönlendirmelerini handle ediyor
    try {
        return intlMiddleware(request);
    } catch (error) {
        // Middleware hatalarını yakala ve varsayılan locale'e yönlendir
        console.error('Middleware error:', error);
        const url = request.nextUrl.clone();
        url.pathname = `/${routing.defaultLocale}${url.pathname}`;
        return NextResponse.redirect(url);
    }
}

export const config = {
    // Root path'i ve tüm path'leri yakala (static dosyalar hariç)
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - Dosya uzantılı path'ler (.*\..*)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};

