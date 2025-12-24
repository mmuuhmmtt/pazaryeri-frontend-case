// Locale types
export type Locale = 'tr' | 'en';

// Base types
export interface Image {
    id: string;
    url: string;
    alt: string;
    width?: number;
    height?: number;
}

export interface Price {
    amount: number;
    currency: 'TRY' | 'USD' | 'EUR';
    formatted: string;
}

export interface Discount {
    type: 'percentage' | 'fixed';
    value: number;
    label?: string;
}

// Brand
export interface Brand {
    id: string;
    name: string;
    slug: string;
    logo?: Image;
    description?: string;
}

// Category
export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: Image;
    parentId?: string;
    children?: Category[];
    productCount: number;
}

// Product
export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    images: Image[];
    price: Price;
    originalPrice?: Price;
    discount?: Discount;
    brand: Brand;
    category: Category;
    rating: Rating;
    stock: Stock;
    variants?: ProductVariant[];
    attributes: ProductAttribute[];
    tags: string[];
    createdAt: string;
    updatedAt: string;
    isFeatured: boolean;
    isNew: boolean;
}

export interface ProductVariant {
    id: string;
    name: string;
    type: 'color' | 'size' | 'material';
    value: string;
    priceModifier?: number;
    stock: number;
    image?: Image;
}

export interface ProductAttribute {
    name: string;
    value: string;
}

export interface Rating {
    average: number;
    count: number;
    distribution: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}

export interface Stock {
    available: number;
    status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'pre-order';
    restockDate?: string;
}

// Review
export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    rating: number;
    title: string;
    comment: string;
    images?: Image[];
    verified: boolean;
    helpful: number;
    createdAt: string;
}

// Filter & Sort
export interface FilterOptions {
    categories?: string[];
    brands?: string[];
    priceRange?: {
        min: number;
        max: number;
    };
    rating?: number;
    inStock?: boolean;
    tags?: string[];
}

export type SortOption =
    | 'featured'
    | 'newest'
    | 'price-asc'
    | 'price-desc'
    | 'rating'
    | 'popular';

// Pagination
export interface PaginationMeta {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

// API Response
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    errors?: ApiError[];
}

export interface ApiError {
    code: string;
    message: string;
    field?: string;
}

// SEO
export interface SEOData {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
    noindex?: boolean;
}

// Breadcrumb
export interface BreadcrumbItem {
    label: string;
    href: string;
    isCurrentPage?: boolean;
}