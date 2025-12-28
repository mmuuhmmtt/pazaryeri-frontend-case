import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
// Static imports for messages (webpack can analyze these)
import trMessages from './messages/tr.json';
import enMessages from './messages/en.json';

export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'tr';

// Static export için kontrol
const isStaticExport = process.env.NEXT_PUBLIC_BASE_PATH || process.env.GITHUB_ACTIONS;

export default getRequestConfig(async ({ requestLocale }) => {
    let locale: string;
    
    if (isStaticExport) {
        // Static export için requestLocale'ü hiç await etme (headers() çağrısı yapar)
        // Default locale kullan, locale layout'tan gelecek
        locale = routing.defaultLocale;
    } else {
        // Normal export için requestLocale kullan
        const requestedLocale = await requestLocale;
        
        // Eğer locale tanımlı değilse veya desteklenmiyorsa
        if (!requestedLocale || !routing.locales.includes(requestedLocale as any)) {
            locale = routing.defaultLocale;
        } else {
            locale = requestedLocale;
        }
    }

    // Runtime'da seç (static imports webpack tarafından analiz edilebilir)
    const messages = locale === 'tr' ? trMessages : enMessages;

    return {
        locale,
        messages,
    };
});