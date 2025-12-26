/**
 * API Client Configuration
 * Bu dosya tüm API çağrıları için temel yapılandırmayı içerir
 * 
 * Meshur.co API yapısına uygun olarak tasarlanmıştır.
 * Backend hazır olduğunda, sadece NEXT_PUBLIC_API_URL environment variable'ını
 * ayarlamak yeterli olacaktır.
 * 
 * @example
 * // .env.local
 * NEXT_PUBLIC_API_URL=https://api.meshur.co
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const API_VERSION = 'v1';
const API_TIMEOUT = 30000; // 30 seconds

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    error?: string;
    timestamp?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

export interface ApiError {
    code: string;
    message: string;
    field?: string;
    details?: Record<string, unknown>;
}

class ApiClient {
    private baseURL: string;
    private timeout: number;

    constructor(baseURL: string, timeout: number = API_TIMEOUT) {
        this.baseURL = `${baseURL}/${API_VERSION}`;
        this.timeout = timeout;
    }

    /**
     * Get authentication token
     * TODO: Implement when auth is ready
     */
    private getAuthToken(): string | null {
        // TODO: Get from localStorage, cookie, or auth context
        return null;
    }

    /**
     * Main request handler with timeout, retry logic, and error handling
     */
    private async request<T>(
        endpoint: string,
        options: RequestInit = {},
        retries: number = 3
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`;
        const token = this.getAuthToken();
        
        const config: RequestInit = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers,
            },
            signal: AbortSignal.timeout(this.timeout),
        };

        try {
            const response = await fetch(url, config);
            
            // Handle different status codes
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                
                // Retry on 5xx errors
                if (response.status >= 500 && retries > 0) {
                    console.warn(`Retrying request to ${endpoint}, ${retries} attempts left`);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return this.request<T>(endpoint, options, retries - 1);
                }
                
                throw new Error(
                    errorData.message || 
                    `HTTP error! status: ${response.status}`
                );
            }

            const data = await response.json();
            
            return {
                data,
                success: true,
                timestamp: new Date().toISOString(),
            };
        } catch (error) {
            console.error('API Error:', {
                endpoint,
                error: error instanceof Error ? error.message : 'Unknown error',
            });
            
            return {
                data: {} as T,
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString(),
            };
        }
    }

    /**
     * GET request
     */
    async get<T>(
        endpoint: string, 
        params?: Record<string, string | number | boolean | undefined>
    ): Promise<ApiResponse<T>> {
        // Filter out undefined values
        const filteredParams = params 
            ? Object.fromEntries(
                Object.entries(params).filter(([_, v]) => v !== undefined)
            )
            : {};
            
        const queryString = Object.keys(filteredParams).length > 0
            ? '?' + new URLSearchParams(
                Object.entries(filteredParams).map(([k, v]) => [k, String(v)])
            ).toString()
            : '';
            
        return this.request<T>(`${endpoint}${queryString}`, {
            method: 'GET',
        });
    }

    /**
     * POST request
     */
    async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    /**
     * PUT request
     */
    async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    /**
     * PATCH request
     */
    async patch<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    /**
     * DELETE request
     */
    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
        });
    }
}

/**
 * Singleton API client instance
 * Tüm servisler bu instance'ı kullanır
 */
export const apiClient = new ApiClient(API_BASE_URL);
