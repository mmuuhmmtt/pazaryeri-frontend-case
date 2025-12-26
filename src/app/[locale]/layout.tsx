import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import { PageTransition } from '@/components/ui/page-transition';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
                                               children,
                                               params,
                                           }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!locales.includes(locale as never)) {
        notFound();
    }

    // Static export için messages'ı direkt import et
    // getMessages() static export'ta çalışmayabilir
    let messages;
    try {
        messages = await getMessages();
    } catch (error) {
        // Fallback: direkt import
        messages = (await import(`@/i18n/messages/${locale}.json`)).default;
    }

    return (
        <NextIntlClientProvider messages={messages}>
            <PageTransition>
                {children}
            </PageTransition>
        </NextIntlClientProvider>
    );
}