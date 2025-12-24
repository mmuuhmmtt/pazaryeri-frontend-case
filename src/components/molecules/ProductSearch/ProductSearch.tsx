'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface ProductSearchProps {
    onSearch: (query: string) => void;
    locale: string;
}

export function ProductSearch({ onSearch, locale }: ProductSearchProps) {
    const [query, setQuery] = useState('');


    const debouncedSearch = useCallback(
        (() => {
            let timeout: NodeJS.Timeout;
            return (searchQuery: string) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    onSearch(searchQuery);
                }, 300);
            };
        })(),
        [onSearch]
    );

    useEffect(() => {
        if (query !== undefined) {
            debouncedSearch(query);
        }
    }, [query, debouncedSearch]);

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    return (
        <div className="relative mb-8">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                        locale === 'tr'
                            ? 'Ürün, marka veya kategori ara...'
                            : 'Search products, brands or categories...'
                    }
                    className="w-full rounded-lg border border-secondary-300 bg-white py-3 pl-12 pr-12 text-secondary-900 placeholder-secondary-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-100 dark:placeholder-secondary-500"
                />
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 transition-colors hover:text-secondary-600 dark:hover:text-secondary-300"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>
        </div>
    );
}


