import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import { PageTransition } from '@/components/ui/page-transition';
// Static imports for messages (webpack can analyze these)
import trMessages from '@/i18n/messages/tr.json';
import enMessages from '@/i18n/messages/en.json';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }> | { locale: string };
}) {
    // Static export için params Promise olmayabilir
    const { locale } = params instanceof Promise ? await params : params;

    if (!locales.includes(locale as never)) {
        notFound();
    }

    // Runtime'da seç (static imports webpack tarafından analiz edilebilir)
    const messages = locale === 'tr' ? trMessages : enMessages;

    return (
        <NextIntlClientProvider messages={messages}>
            <PageTransition>
                {children}
            </PageTransition>
        </NextIntlClientProvider>
    );
}