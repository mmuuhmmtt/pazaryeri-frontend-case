import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import { PageTransition } from '@/components/ui/page-transition';
import { ThemeProvider } from '@/components/ui/theme-provider';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

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

    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning className="scroll-smooth">
        <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
            <ThemeProvider>
                <PageTransition>
                    {children}
                </PageTransition>
            </ThemeProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}