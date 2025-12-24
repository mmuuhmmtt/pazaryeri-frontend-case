import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Price, Product, FilterOptions, SortOption, PaginationMeta } from '@/types';

/**
 * Combines clsx and tailwind-merge for optimal className handling
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formats a price object to localized string
 */
export function formatPrice(price: Price, locale: string = 'tr-TR'): string {
    const currencyMap = {
        TRY: 'TRY',
        USD: 'USD',
        EUR: 'EUR',
    };

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyMap[price.currency],
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price.amount);
}

/**
 * Formats a number to compact notation (e.g., 1.2K, 3.4M)
 */
export function formatCompactNumber(num: number, locale: string = 'tr-TR'): string {
    return new Intl.NumberFormat(locale, {
        notation: 'compact',
        compactDisplay: 'short',
    }).format(num);
}

/**
 * Calculates discount percentage
 */
export function calculateDiscountPercentage(
    originalPrice: number,
    discountedPrice: number
): number {
    if (originalPrice <= 0) return 0;
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

/**
 * Formats a date to localized string
 */
export function formatDate(
    date: string | Date,
    locale: string = 'tr-TR',
    options?: Intl.DateTimeFormatOptions
): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options,
    }).format(dateObj);
}

/**
 * Truncates text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
}

/**
 * Generates a slug from a string
 */
export function generateSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * Debounces a function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Checks if code is running on client side
 */
export const isClient = typeof window !== 'undefined';

/**
 * Safely parses JSON
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
    try {
        return JSON.parse(json);
    } catch {
        return fallback;
    }
}

/**
 * Gets initials from a name
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

/**
 * Filters products based on filter options
 */
export function filterProducts(
    products: Product[],
    filters: FilterOptions
): Product[] {
    return products.filter((product) => {
        // Category filter
        if (filters.categories && filters.categories.length > 0) {
            if (!filters.categories.includes(product.category.id)) {
                return false;
            }
        }

        // Brand filter
        if (filters.brands && filters.brands.length > 0) {
            if (!filters.brands.includes(product.brand.id)) {
                return false;
            }
        }

        // Price range filter
        if (filters.priceRange) {
            const price = product.price.amount;
            if (price < filters.priceRange.min || price > filters.priceRange.max) {
                return false;
            }
        }

        // Rating filter
        if (filters.rating !== undefined) {
            if (product.rating.average < filters.rating) {
                return false;
            }
        }

        // Stock filter
        if (filters.inStock !== undefined) {
            if (filters.inStock && product.stock.status !== 'in-stock') {
                return false;
            }
        }

        // Tags filter
        if (filters.tags && filters.tags.length > 0) {
            const hasTag = filters.tags.some((tag) => product.tags.includes(tag));
            if (!hasTag) {
                return false;
            }
        }

        return true;
    });
}

/**
 * Sorts products based on sort option
 */
export function sortProducts(products: Product[], sortOption: SortOption): Product[] {
    const sorted = [...products];

    switch (sortOption) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price.amount - b.price.amount);
        case 'price-desc':
            return sorted.sort((a, b) => b.price.amount - a.price.amount);
        case 'rating':
            return sorted.sort((a, b) => b.rating.average - a.rating.average);
        case 'newest':
            return sorted.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        case 'popular':
            return sorted.sort((a, b) => b.rating.count - a.rating.count);
        case 'featured':
        default:
            return sorted.sort((a, b) => {
                if (a.isFeatured && !b.isFeatured) return -1;
                if (!a.isFeatured && b.isFeatured) return 1;
                return 0;
            });
    }
}

/**
 * Searches products by name, description, or brand
 */
export function searchProducts(products: Product[], query: string): Product[] {
    if (!query.trim()) return products;

    const lowerQuery = query.toLowerCase();

    return products.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(lowerQuery);
        const descriptionMatch = product.description.toLowerCase().includes(lowerQuery);
        const brandMatch = product.brand.name.toLowerCase().includes(lowerQuery);
        const categoryMatch = product.category.name.toLowerCase().includes(lowerQuery);

        return nameMatch || descriptionMatch || brandMatch || categoryMatch;
    });
}

/**
 * Paginates an array of products
 */
export function paginateProducts<T>(
    items: T[],
    page: number,
    pageSize: number
): { data: T[]; meta: PaginationMeta } {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const data = items.slice(startIndex, endIndex);

    return {
        data,
        meta: {
            currentPage: page,
            totalPages,
            pageSize,
            totalItems,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        },
    };
}