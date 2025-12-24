'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import type { FilterOptions, SortOption } from '@/types';
import { mockCategories } from '@/mock-data/products';
import { mockBrands } from '@/mock-data/products';

interface ProductFiltersProps {
    filters: FilterOptions;
    sortOption: SortOption;
    onFiltersChange: (filters: FilterOptions) => void;
    onSortChange: (sort: SortOption) => void;
    locale: string;
}

export function ProductFilters({
    filters,
    sortOption,
    onFiltersChange,
    onSortChange,
    locale,
}: ProductFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleCategoryToggle = (categoryId: string) => {
        const currentCategories = filters.categories || [];
        const newCategories = currentCategories.includes(categoryId)
            ? currentCategories.filter((id) => id !== categoryId)
            : [...currentCategories, categoryId];
        onFiltersChange({ ...filters, categories: newCategories });
    };

    const handleBrandToggle = (brandId: string) => {
        const currentBrands = filters.brands || [];
        const newBrands = currentBrands.includes(brandId)
            ? currentBrands.filter((id) => id !== brandId)
            : [...currentBrands, brandId];
        onFiltersChange({ ...filters, brands: newBrands });
    };

    const handlePriceRangeChange = (min: number, max: number) => {
        onFiltersChange({
            ...filters,
            priceRange: { min, max },
        });
    };

    const clearFilters = () => {
        onFiltersChange({});
    };

    const activeFilterCount =
        (filters.categories?.length || 0) +
        (filters.brands?.length || 0) +
        (filters.priceRange ? 1 : 0) +
        (filters.rating ? 1 : 0);

    return (
        <div className="mb-8">
            {/* Filter Toggle Button */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Button
                    variant="outline"
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative"
                >
                    <Filter className="mr-2 h-4 w-4" />
                    {locale === 'tr' ? 'Filtrele' : 'Filter'}
                    {activeFilterCount > 0 && (
                        <Badge
                            variant="danger"
                            size="sm"
                            className="ml-2"
                        >
                            {activeFilterCount}
                        </Badge>
                    )}
                </Button>

                {/* Sort Dropdown */}
                <select
                    value={sortOption}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                    className="rounded-lg border border-secondary-300 bg-white px-4 py-2 text-sm font-medium text-secondary-900 transition-colors hover:border-primary-500 dark:border-secondary-600 dark:bg-secondary-800 dark:text-secondary-100"
                >
                    <option value="featured">
                        {locale === 'tr' ? 'Öne Çıkanlar' : 'Featured'}
                    </option>
                    <option value="newest">
                        {locale === 'tr' ? 'En Yeni' : 'Newest'}
                    </option>
                    <option value="price-asc">
                        {locale === 'tr' ? 'Fiyat: Düşükten Yükseğe' : 'Price: Low to High'}
                    </option>
                    <option value="price-desc">
                        {locale === 'tr' ? 'Fiyat: Yüksekten Düşüğe' : 'Price: High to Low'}
                    </option>
                    <option value="rating">
                        {locale === 'tr' ? 'En Yüksek Puan' : 'Highest Rated'}
                    </option>
                    <option value="popular">
                        {locale === 'tr' ? 'En Popüler' : 'Most Popular'}
                    </option>
                </select>
            </div>

            {/* Filter Panel */}
            {isOpen && (
                <div className="mt-4 rounded-lg border border-secondary-200 bg-white p-6 dark:border-secondary-700 dark:bg-secondary-800">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                            {locale === 'tr' ? 'Filtreler' : 'Filters'}
                        </h3>
                        {activeFilterCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="text-sm"
                            >
                                <X className="mr-1 h-4 w-4" />
                                {locale === 'tr' ? 'Temizle' : 'Clear'}
                            </Button>
                        )}
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Categories */}
                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-secondary-900 dark:text-secondary-100">
                                {locale === 'tr' ? 'Kategoriler' : 'Categories'}
                            </h4>
                            <div className="space-y-2">
                                {mockCategories.map((category) => (
                                    <label
                                        key={category.id}
                                        className="flex cursor-pointer items-center gap-2 text-sm"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.categories?.includes(category.id) || false}
                                            onChange={() => handleCategoryToggle(category.id)}
                                            className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                                        />
                                        <span className="text-secondary-700 dark:text-secondary-300">
                                            {category.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Brands */}
                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-secondary-900 dark:text-secondary-100">
                                {locale === 'tr' ? 'Markalar' : 'Brands'}
                            </h4>
                            <div className="space-y-2">
                                {mockBrands.map((brand) => (
                                    <label
                                        key={brand.id}
                                        className="flex cursor-pointer items-center gap-2 text-sm"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filters.brands?.includes(brand.id) || false}
                                            onChange={() => handleBrandToggle(brand.id)}
                                            className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                                        />
                                        <span className="text-secondary-700 dark:text-secondary-300">
                                            {brand.name}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <h4 className="mb-3 text-sm font-semibold text-secondary-900 dark:text-secondary-100">
                                {locale === 'tr' ? 'Fiyat Aralığı' : 'Price Range'}
                            </h4>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder={locale === 'tr' ? 'Min' : 'Min'}
                                        value={filters.priceRange?.min || ''}
                                        onChange={(e) =>
                                            handlePriceRangeChange(
                                                Number(e.target.value) || 0,
                                                filters.priceRange?.max || 10000
                                            )
                                        }
                                        className="w-full rounded border border-secondary-300 px-3 py-2 text-sm dark:border-secondary-600 dark:bg-secondary-700"
                                    />
                                    <input
                                        type="number"
                                        placeholder={locale === 'tr' ? 'Max' : 'Max'}
                                        value={filters.priceRange?.max || ''}
                                        onChange={(e) =>
                                            handlePriceRangeChange(
                                                filters.priceRange?.min || 0,
                                                Number(e.target.value) || 10000
                                            )
                                        }
                                        className="w-full rounded border border-secondary-300 px-3 py-2 text-sm dark:border-secondary-600 dark:bg-secondary-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


