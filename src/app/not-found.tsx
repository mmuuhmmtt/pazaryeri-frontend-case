import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function GlobalNotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
            <div className="text-center">
                <h1 className="mb-4 text-9xl font-bold text-primary-600">404</h1>
                <h2 className="mb-4 text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                    Page Not Found
                </h2>
                <p className="mb-8 text-lg text-secondary-600 dark:text-secondary-400">
                    The page you are looking for does not exist or may have been moved.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Link href="/tr">
                        <Button leftIcon={<Home className="h-5 w-5" />}>
                            Go Home
                        </Button>
                    </Link>
                    <Link href="/tr/products">
                        <Button variant="outline" leftIcon={<Search className="h-5 w-5" />}>
                            Browse Products
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

