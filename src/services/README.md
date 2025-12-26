# Services Katmanı

Bu klasör, tüm backend API çağrılarını merkezi bir şekilde yönetir.

## 📁 Dosya Yapısı

```
services/
├── api-client.ts         # Merkezi API client (fetch wrapper)
├── product-service.ts    # Ürün CRUD işlemleri
├── category-service.ts   # Kategori işlemleri
├── brand-service.ts      # Marka işlemleri
└── index.ts             # Tüm servisleri export eder
```

## 🎯 Kullanım

### 1. API Client Konfigürasyonu

```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.meshur.co
```

### 2. Service Kullanımı

```typescript
import { getProducts, getProductBySlug } from '@/services';

// Ürünleri getir
const products = await getProducts({
  page: 1,
  pageSize: 12,
  category: 'electronics'
});

// Tek ürün getir
const product = await getProductBySlug('wireless-headphones');
```

## 🔄 Mock Data'dan Gerçek API'ye Geçiş

Şu an tüm servisler mock data kullanıyor. Backend hazır olduğunda:

1. `.env.local` dosyasında API URL'ini ayarlayın
2. Her service dosyasında `TODO` ile işaretli yerleri açın
3. Mock data kullanımını kaldırın veya fallback olarak bırakın

### Örnek Geçiş:

```typescript
// ❌ ŞU AN (Mock data)
export async function getProducts(): Promise<Product[]> {
    return Promise.resolve(mockProducts);
}

// ✅ BACKEND HAZIR OLUNCA
export async function getProducts(params?: GetProductsParams): Promise<Product[]> {
    const response = await apiClient.get<PaginatedResponse<Product>>('/products', params as any);
    
    if (!response.success) {
        // Fallback: Mock data döndür
        return mockProducts;
    }
    
    return response.data.data;
}
```

## 🏗️ Mimari Kararlar

### Neden Services Katmanı?

1. **Separation of Concerns**: API çağrıları component'lerden ayrıştırıldı
2. **Reusability**: Aynı API çağrısı birden fazla yerde kullanılabilir
3. **Testability**: Servisler kolayca mock'lanabilir
4. **Maintainability**: API değişiklikleri tek yerden yönetilir

### API Client Pattern

Merkezi bir API client kullanarak:
- Tüm isteklere otomatik header ekleme
- Error handling
- Request/response interceptors
- Retry logic
- Loading states

### Type Safety

Tüm API çağrıları TypeScript ile tip güvenli:

```typescript
interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    error?: string;
}
```

## 📝 Yeni Service Ekleme

Yeni bir service eklemek için:

1. `src/services/` altında yeni dosya oluştur (örn: `user-service.ts`)
2. API çağrılarını tanımla
3. `src/services/index.ts` dosyasından export et

```typescript
// user-service.ts
import { apiClient } from './api-client';
import type { User } from '@/types';

export async function getUserProfile(userId: string): Promise<User | null> {
    const response = await apiClient.get<User>(`/users/${userId}`);
    return response.success ? response.data : null;
}

// index.ts
export * from './user-service';
```

## 🔐 Authentication

API client, authentication token'ları otomatik olarak ekler:

```typescript
// api-client.ts içinde
headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`, // TODO: Implement
    ...options.headers,
}
```

## 🚀 Best Practices

1. **Her zaman tip tanımla**: API response'ları için interface kullan
2. **Error handling**: Try-catch blokları kullan
3. **Loading states**: API çağrıları sırasında loading göster
4. **Caching**: Gerekirse React Query veya SWR kullan
5. **Retry logic**: Başarısız istekleri tekrar dene

## 📚 Referanslar

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [REST API Design](https://restfulapi.net/)
