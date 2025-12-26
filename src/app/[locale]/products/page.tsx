'use client';

import { useState, useMemo, use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/features/header';
import { ProductGrid } from '@/components/features/product-grid';
import { ProductFilters } from '@/components/features/product-filters';
import { ProductSearch } from '@/components/features/product-search';
import { Pagination } from '@/components/features/pagination';
import { mockProducts } from '@/mock-data/products';
import { filterProducts, sortProducts, searchProducts, paginateProducts } from '@/lib/utils';
import type { FilterOptions, SortOption } from '@/types';

export default function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params);
    const searchParams = useSearchParams();
    const router = useRouter();

    const [filters, setFilters] = useState<FilterOptions>(() => {
        const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
        const brands = searchParams.get('brands')?.split(',').filter(Boolean) || [];
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        
        const initialFilters: FilterOptions = {};
        
        if (categories.length > 0) {
            initialFilters.categories = categories;
        }
        
        if (brands.length > 0) {
            initialFilters.brands = brands;
        }
        
        if (minPrice && maxPrice) {
            initialFilters.priceRange = { min: Number(minPrice), max: Number(maxPrice) };
        }
        
        return initialFilters;
    });

    const [sortOption, setSortOption] = useState<SortOption>(
        (searchParams.get('sort') as SortOption) || 'featured'
    );
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);

    const pageSize = 12;


    const processedProducts = useMemo(() => {
        let result = [...mockProducts];

        // Search
        if (searchQuery) {
            result = searchProducts(result, searchQuery);
        }

        // Filter
        result = filterProducts(result, filters);


        result = sortProducts(result, sortOption);

        return result;
    }, [filters, sortOption, searchQuery]);


    const { data: paginatedProducts, meta } = paginateProducts(
        processedProducts,
        currentPage,
        pageSize
    );


    const updateURL = (updates: Record<string, string | null>, scrollToTop = false) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(updates).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });
        
        const newUrl = `?${params.toString()}`;
        

        if (scrollToTop) {
            router.push(newUrl);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {

            window.history.replaceState(
                { ...window.history.state, as: newUrl, url: newUrl },
                '',
                newUrl
            );
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateURL({ page: page.toString() }, true);
    };

    const handleFiltersChange = (newFilters: FilterOptions) => {
        setFilters(newFilters);
        setCurrentPage(1);
        const params: Record<string, string | null> = { page: null };
        if (newFilters.categories) {
            params.categories = newFilters.categories.join(',');
        }
        if (newFilters.brands) {
            params.brands = newFilters.brands.join(',');
        }
        if (newFilters.priceRange) {
            params.minPrice = newFilters.priceRange.min.toString();
            params.maxPrice = newFilters.priceRange.max.toString();
        }
        updateURL(params, false);
    };

    const handleSortChange = (sort: SortOption) => {
        setSortOption(sort);
        setCurrentPage(1);
        updateURL({ sort, page: null }, false);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
        updateURL({ search: query || null, page: null }, false);
    };

    return (
        <>
            <Header locale={locale} />
            <main className="min-h-screen bg-gradient-to-b from-white to-secondary-50 py-8 transition-colors dark:from-secondary-900 dark:to-secondary-950">
                <div className="container mx-auto px-4">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-secondary-900 dark:text-secondary-100">
                            {locale === 'tr' ? 'Tüm Ürünler' : 'All Products'}
                        </h1>
                        <p className="mt-2 text-lg text-secondary-600 dark:text-secondary-400">
                            {locale === 'tr'
                                ? `${processedProducts.length} ürün bulundu`
                                : `${processedProducts.length} products found`}
                        </p>
                    </div>

                    {/* Search */}
                    <ProductSearch onSearch={handleSearch} locale={locale} />

                    {/* Filters and Sort */}
                    <ProductFilters
                        filters={filters}
                        sortOption={sortOption}
                        onFiltersChange={handleFiltersChange}
                        onSortChange={handleSortChange}
                        locale={locale}
                    />

                    {/* Products Grid */}
                    <ProductGrid products={paginatedProducts} locale={locale} />

                    {/* Pagination */}
                    <Pagination meta={meta} onPageChange={handlePageChange} locale={locale} />
                </div>
            </main>
        </>
    );
}