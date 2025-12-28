import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
// Static imports for messages (webpack can analyze these)
import trMessages from './messages/tr.json';
import enMessages from './messages/en.json';

export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'tr';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Eğer locale tanımlı değilse veya desteklenmiyorsa
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    // Runtime'da seç (static imports webpack tarafından analiz edilebilir)
    const messages = locale === 'tr' ? trMessages : enMessages;

    return {
        locale,
        messages,
    };
});