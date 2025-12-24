import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';


export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'tr';

export default getRequestConfig(async ({ requestLocale }) => {

    let locale = await requestLocale;

    // Eğer locale tanımlı değilse veya desteklenmiyorsa
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});