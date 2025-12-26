import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
    const t = useTranslations('notFound');

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
            <div className="text-center">
                <h1 className="mb-4 text-9xl font-bold text-primary-600">404</h1>
                <h2 className="mb-4 text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                    {t('title')}
                </h2>
                <p className="mb-8 text-lg text-secondary-600 dark:text-secondary-400">
                    {t('description')}
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Link href="/">
                        <Button leftIcon={<Home className="h-5 w-5" />}>
                            {t('goHome')}
                        </Button>
                    </Link>
                    <Link href="/products">
                        <Button variant="outline" leftIcon={<Search className="h-5 w-5" />}>
                            {t('browseProducts')}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
