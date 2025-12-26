'use client';

import { useState, useMemo, use, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
    
    // currentPage'i doğrudan URL'den oku (single source of truth)
    const currentPage = Number(searchParams.get('page')) || 1;

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
        // Sadece URL'i güncelle, state URL'den otomatik okunacak
        updateURL({ page: page.toString() }, true);
    };

    const handleFiltersChange = (newFilters: FilterOptions) => {
        setFilters(newFilters);
        // Filtre değiştiğinde sayfa 1'e dön
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
        // Sıralama değiştiğinde sayfa 1'e dön
        updateURL({ sort, page: null }, false);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // Arama değiştiğinde sayfa 1'e dön
        updateURL({ search: query || null, page: null }, false);
    };

    return (
        <>
            <Header locale={locale} />
            <main className="min-h-screen bg-gradient-to-br from-secondary-950 via-secondary-900 to-black py-8 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-pink/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    {/* Page Header with Gradient */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 text-center"
                    >
                        <h1 className="text-5xl md:text-6xl font-black mb-4">
                            <span className="bg-gradient-to-r from-primary-400 via-accent-pink to-accent-cyan bg-clip-text text-transparent">
                                {locale === 'tr' ? 'Tüm Ürünler' : 'All Products'}
                            </span>
                        </h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-secondary-400"
                        >
                            {locale === 'tr'
                                ? `${processedProducts.length} ürün bulundu`
                                : `${processedProducts.length} products found`}
                        </motion.p>
                        {/* Decorative Line */}
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="mx-auto mt-6 h-1 w-32 bg-gradient-to-r from-primary-600 via-accent-pink to-accent-cyan rounded-full"
                        />
                    </motion.div>

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