import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { ThemeProvider } from '@/components/ui/theme-provider';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    icons: {
        icon: [
            { url: '/icon.svg', type: 'image/svg+xml' },
            { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
        ],
        shortcut: '/icon.svg',
        apple: '/icon.svg',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <body className={inter.className}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}

