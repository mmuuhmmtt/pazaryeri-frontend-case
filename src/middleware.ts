import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';
import { NextResponse } from 'next/server';

// Static export için middleware'i devre dışı bırak
// GitHub Pages static export kullanır, middleware çalışmaz
const isStaticExport = process.env.GITHUB_ACTIONS === 'true' || 
                       process.env.NEXT_PUBLIC_BASE_PATH;

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
});

export default function middleware(request: any) {
    // Static export için middleware'i atla
    if (isStaticExport) {
        return NextResponse.next();
    }
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};