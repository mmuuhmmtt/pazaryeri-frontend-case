'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const t = useTranslations('error');

    useEffect(() => {

        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
            <div className="text-center">
                <AlertCircle className="mx-auto mb-4 h-16 w-16 text-danger-500" />
                <h1 className="mb-4 text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                    {t('title')}
                </h1>
                <p className="mb-8 text-lg text-secondary-600 dark:text-secondary-400">
                    {t('description')}
                </p>
                {error.digest && (
                    <p className="mb-4 text-sm text-secondary-500 dark:text-secondary-400">
                        Error ID: {error.digest}
                    </p>
                )}
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Button onClick={reset} leftIcon={<RefreshCw className="h-5 w-5" />}>
                        {t('tryAgain')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
