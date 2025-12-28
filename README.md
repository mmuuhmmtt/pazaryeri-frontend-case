# ShopNova  Projesi

Modern, ölçeklenebilir ve performanslı bir e-ticaret frontend uygulaması.

##  Proje Hakkında

Bu proje **Next.js 15**, **TypeScript (Strict Mode)**, **Tailwind CSS** ve modern frontend best practices kullanılarak geliştirilmiştir. Production'a hazır, SEO optimized ve responsive bir yapıya sahiptir.


## Teknolojiler

- **Next.js 15.5.9** - React framework (App Router)
- **TypeScript 5.7.2** - Type safety (Full Strict Mode)
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Zustand 5.0** - State management
- **next-intl 3.26** - Internationalization (i18n)
- **Framer Motion 11.15** - Animations
- **Lucide React** - Icons
- **Jest + React Testing Library** - Testing

##  Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   └── [locale]/          # Locale-based routing (TR/EN)
│       ├── page.tsx       # Ana sayfa (SSG)
│       ├── products/      # Ürün sayfaları (SSG + ISR ready)
│       ├── favorites/     # Favoriler (CSR)
│       ├── error.tsx      # Error boundary
│       └── not-found.tsx  # 404 sayfası
├── components/
│   ├── ui/                # Genel UI bileşenleri (Button, Badge)
│   └── features/          # Özellik bazlı bileşenler (Header, ProductCard)
├── services/              # API servis katmanı 
│   ├── api-client.ts      # Merkezi API client
│   ├── product-service.ts # Ürün API çağrıları
│   ├── category-service.ts
│   ├── brand-service.ts
│   └── README.md          # Services dokümantasyonu
├── store/                 # Zustand state management
│   ├── useFavoritesStore.ts  # Favoriler (localStorage persist)
│   └── useUIStore.ts         # UI state (dark mode)
├── lib/                   # Utility fonksiyonlar
├── i18n/                  # Internationalization
├── mock-data/             # Mock data (geçici)
├── styles/                # Global styles
└── types/                 # TypeScript type definitions
```


### 1. Framework & TypeScript 
-  Next.js 15.5.9 
-  TypeScript 5.7.2 with **Full Strict Mode**
  - `strict: true`
  - `noImplicitAny: true`
  - `strictNullChecks: true`
  - `noUncheckedIndexedAccess: true`
  - `exactOptionalPropertyTypes: true`
  - Ve tüm strict kurallar aktif
### 2. Rendering & Performance 
-  **SSG**: Ana sayfa ve ürün detay sayfaları
-  **ISR Ready**: Backend hazır olduğunda aktif edilebilir
-  **CSR**: Favoriler ve dinamik içerik
-  `next/image` optimizasyonu
-  Route & component bazlı code splitting
-  Lazy loading (ProductGrid)
-  React.memo memoization
### 3. Internationalization (i18n) 
-  TR (`/tr`) ve EN (`/en`) dil desteği
-  URL tabanlı routing
-  `next-intl` ile merkezi yönetim
-  Tüm metinler i18n yapısında

### 4. State Management 
-  **Zustand** kullanımı
-  Favoriler özelliği (localStorage persist)
-  Normalize edilmiş state yapısı
-  Test edilebilir mimari

### 5. UI & Styling 
-  **Tailwind CSS**
-  **Storybook** kurulu (Button stories mevcut)
-  **Dark Mode** desteği
-  **Framer Motion** animasyonlar
-  Responsive design (mobile-first)

### 6. Veri Yönetimi 
-  Mock JSON dosyaları
-  **Services katmanı** (API çağrıları için hazır)
-  Veri dönüşümleri ayrı katmanlarda
-  Component'ler sadece ihtiyaç duydukları veriyi alır

### 7. SEO & Accessibility 
-  Dynamic metadata (her sayfa için)
-  OpenGraph & Twitter Cards
-  JSON-LD schema.org
-  404 ve 500 hata sayfaları
-  `sitemap.xml` ve `robots.txt`
-  Semantic HTML
-  ARIA labels

### 8. Kod Kalitesi 
-  ESLint
-  Prettier
-  TypeScript strict mode
-  Naming conventions
-  Separation of concerns
-  Clean architecture

### 9. Testing 
-  Jest + React Testing Library
-  Component testleri (Button)
-  Store testleri (useFavoritesStore)

##  Nasıl Çalıştırılır?

### Geliştirme Ortamı

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini ziyaret edin.

### Production Build

```bash
# Type check
npm run type-check

# Production build
npm run build

# Production server'ı başlat
npm start
```

### Testler

```bash
# Testleri çalıştır
npm test

# Watch modunda
npm run test:watch
```

### Storybook

```bash
# Storybook'u başlat
npm run storybook
```

## 🔌 Backend Entegrasyonu

Proje **Meshur.co API yapısına uygun** olarak tasarlanmıştır. Backend hazır olduğunda:

### 1. Environment Variables

`.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_API_URL=https://api.meshur.co
```

### 2. Services Katmanı

`src/services/` klasöründeki TODO yorumlarını açın:

```typescript
//  ŞU AN (Mock data)
export async function getProducts(): Promise<Product[]> {
    return Promise.resolve(mockProducts);
}

//  BACKEND HAZIR OLUNCA
export async function getProducts(params?: GetProductsParams): Promise<Product[]> {
    const response = await apiClient.get<PaginatedResponse<Product>>('/products', params);
    return response.data.data;
}
```

### API Client Özellikleri

-  Merkezi API client (fetch wrapper)
-  Automatic retry logic (5xx errors)
-  Request timeout (30s)
-  Error handling
-  Type-safe requests
-  Authentication ready (Bearer token)
-  Request/response logging

##  Mimari Kararlar

### 1. Component Yapısı



- `components/ui/` - Genel UI bileşenleri
- `components/features/` - Özellik bazlı bileşenler



### 2. Services Katmanı

**Neden Services?**

Backend bağlantıları component'lerin içinde DEĞİL, ayrı bir services katmanında:

-  Separation of Concerns
-  Reusability
-  Testability
-  Maintainability

### 3. TypeScript Strict Mode

**Tüm strict kurallar aktif:**

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true,
  "noImplicitReturns": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

**Sonuç:** Sıfır TypeScript hatası 

### 4. Rendering Strategy

| Sayfa | Strateji | Sebep |
|-------|----------|-------|
| Ana Sayfa | SSG | Statik içerik, SEO önemli |
| Ürün Listesi | SSG | Pre-render, hızlı yükleme |
| Ürün Detay | SSG | 24 ürün için static generation |
| Favoriler | CSR | Kullanıcı bazlı, localStorage |

**ISR Ready:** Backend hazır olduğunda ISR aktif edilebilir.

### 5. State Management

**Zustand Seçimi:**

-  Minimal boilerplate
-  TypeScript support
-  DevTools
-  Middleware (persist)
-  React 19 compatible

## 🎨 Özellikler

### Kullanıcı Özellikleri
-  Ürün listeleme ve detay
-  Gelişmiş arama ve filtreleme
-  Sıralama (fiyat, rating, tarih)
-  Pagination
-  Favorilere ekleme
-  Dark mode
-  Responsive design
-  Animasyonlar
-  Video background hero

### Teknik Özellikler
-  SEO optimized
-  Type-safe
-  Error boundaries
-  Loading states
-  Image optimization
-  Code splitting
-  i18n support

##  Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm start            # Production server
npm run lint         # ESLint
npm run format       # Prettier
npm run type-check   # TypeScript check
npm test             # Jest tests
npm run storybook    # Storybook
```

##  Meshur.co API Entegrasyonu

Proje **Meshur.co API yapısına uygun** olarak tasarlanmıştır:

### API Endpoint Yapısı

```typescript
// Products
GET    /api/v1/products              # Ürün listesi
GET    /api/v1/products/:slug        # Ürün detay
GET    /api/v1/products/featured     # Öne çıkan ürünler
GET    /api/v1/products/search       # Ürün arama

// Categories
GET    /api/v1/categories            # Kategori listesi
GET    /api/v1/categories/:slug      # Kategori detay

// Brands
GET    /api/v1/brands                # Marka listesi
GET    /api/v1/brands/:slug          # Marka detay
```



##  Deployment

### Vercel (Önerilen)

```bash
vercel deploy
```

**Live Demo:** [https://pazaryeri-frontend-case.vercel.app](https://pazaryeri-frontend-case.vercel.app)

### Netlify (Alternatif Hosting)

Netlify, Vercel'e benzer bir platformdur ve Next.js'i destekler.

#### Adımlar:

1. **Netlify CLI ile deploy:**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

2. **GitHub ile otomatik deploy (Önerilen):**
   - Netlify.com'a gidin ve hesap oluşturun
   - "New site from Git" seçin
   - GitHub repository'nizi bağlayın
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - **ÖNEMLİ:** Netlify UI'da "Plugins" bölümüne gidin ve `@netlify/plugin-nextjs` plugin'ini ekleyin
   - "Deploy site" butonuna tıklayın

3. **Netlify yapılandırması:**
   - Projeye `netlify.toml` dosyası eklenmiştir
   - Plugin otomatik olarak yapılandırılmıştır

**Avantajlar:**
- Ücretsiz tier mevcut
- Otomatik HTTPS
- Form handling desteği
- Serverless functions

**Canlı URL:** Otomatik olarak `your-project-name.netlify.app` formatında oluşturulur.

### Render (Alternatif Hosting)

Render, modern web uygulamaları için cloud platformdur.

#### Adımlar:

1. **Render Dashboard:**
   - Render.com'a gidin ve hesap oluşturun
   - "New +" → "Web Service" seçin
   - GitHub repository'nizi bağlayın

2. **Yapılandırma:**
   - Name: `pazaryeri-frontend` (istediğiniz isim)
   - Region: `Frankfurt` (Türkiye'ye yakın)
   - Branch: `main`
   - Root Directory: `./` (boş bırakın)
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: `Node`

3. **Environment Variables:**
   - `NODE_ENV=production`
   - Diğer gerekli environment variable'ları ekleyin

4. **Deploy:**
   - "Create Web Service" butonuna tıklayın
   - İlk build 5-10 dakika sürebilir

**Avantajlar:**
- Ücretsiz tier (sınırlı)
- Otomatik HTTPS
- Auto-deploy from Git
- Custom domain desteği

**Canlı URL:** `your-project-name.onrender.com` formatında oluşturulur.




### Güçlü Yönler

1. **TypeScript Strict Mode** - Tüm strict kurallar aktif, sıfır hata
2. **Services Katmanı** - Backend entegrasyonu için hazır yapı
3. **Type Safety** - Her şey type-safe
4. **SEO** - Comprehensive SEO implementation
5. **Performance** - Code splitting, lazy loading, memoization
6. **i18n** - Complete internationalization
7. **Testing** - Jest + RTL setup





## 👤 Geliştirici

**Muhammet Coşgun**

## 📄 Lisans


---
