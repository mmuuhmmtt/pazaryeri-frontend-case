# Pazaryeri Frontend Projesi

Merhaba! Bu proje bir pazaryeri uygulaması için yaptığım frontend çalışması. Next.js  kullanarak geliştirdim ve production'a hazır bir şekilde tasarladım.

## Proje Hakkında

Bu projeyi geliştirirken özellikle şunlara dikkat ettim:
- Kodun okunabilir ve maintain edilebilir olması
- Gelecekte büyüyebilecek bir mimari
- Kullanıcı deneyiminin iyi olması
- Performans optimizasyonları

## Teknolojiler

Projede şu teknolojileri kullandım:

- **Next.js**
- **TypeScript**
- **Zustand**
- **Tailwind CSS**
- **next-intl**
- **Framer Motion**

## Nasıl Çalıştırılır?

Önce bağımlılıkları yükle:

```bash
npm install
```

Sonra development server'ı başlat:

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresine git. Varsayılan dil Türkçe, `/en` yazarak İngilizce'ye geçebilirsin.

## Proje Yapısı

Klasör yapısını Atomic Design prensiplerine göre organize ettim. Başta biraz fazla klasör gibi görünse de, proje büyüdükçe nerede ne olduğunu bulmak çok kolaylaşıyor.



## Özellikler

### Temel Özellikler

-  **Çoklu Dil Desteği**: Türkçe ve İngilizce. URL tabanlı 
-  **Dark Mode**: Header'da toggle butonu var, sistem tercihini de destekliyor
-  **Favoriler**: Ürünleri favorilere ekleyip çıkarabiliyorsun, localStorage'da saklanıyor
-  **Responsive Design**: Mobil, tablet ve desktop'ta düzgün çalışıyor

### Ürün Listeleme ve Filtreleme

-  **Arama**: Ürün adı, marka veya kategoriye göre arama yapabiliyorsun
-  **Filtreleme**: Kategori, marka ve fiyat aralığına göre filtreleme var
-  **Sıralama**: Fiyat, rating, tarih ve popülerliğe göre sıralama yapabiliyorsun
-  **Pagination**: Sayfa başına 12 ürün gösteriliyor, sayfa numaralarıyla gezebiliyorsun

### SEO ve Performans

-  **SEO**: Her sayfa için dynamic metadata, OpenGraph ve Twitter Cards var
-  **JSON-LD**: Ürün detay sayfalarında schema.org uyumlu structured data
-  **Sitemap**: Otomatik sitemap.xml oluşturuluyor
-  **Image Optimization**: next/image kullanarak görseller optimize edildi
-  **Code Splitting**: Route ve component bazlı otomatik code splitting

## Önemli Kararlar

### Rendering Stratejisi

Şu anda mock data kullanıyorum, bu yüzden sayfalar SSG  ile pre-render ediliyor. Gerçek bir API'ye geçildiğinde:

- Ana sayfa: ISR kullanılabilir 
- Ürün listesi: ISR veya SSR
- Ürün detay: Her ürün için SSG, yeni ürünler için ISR
- Favoriler: CSR çünkü kullanıcı bazlı dinamik içerik

### State Management

Zustand'ı iki ayrı store'da kullandım:
- `useFavoritesStore`: Favoriler için, localStorage'a persist ediyor
- `useUIStore`: Dark mode ve UI state için

Favoriler store'unda hem array hem de Set kullandım. Set kullanma sebebim lookup işlemlerinin çok daha hızlı olması 

### URL Parametreleri

Filtreleme, sıralama ve arama işlemlerini URL parametreleriyle senkronize ettim. Böylece sayfa yenilendiğinde veya link paylaşıldığında filtreler korunuyor.

## Geliştirme Notları


### Dark Mode

Dark mode için `useUIStore` kullanıyorum ve `document.documentElement`'e class ekliyorum. Sistem tercihini de destekliyor ama şu an sadece manuel toggle var header'da. Bazı yerlerde dark mode tam çalışmıyor olabilir, zamanla düzeltilebilir.

### Testler

Jest ve React Testing Library kurulu. Şu an sadece birkaç temel test var:
- `useFavoritesStore.test.ts`
- `Button.test.tsx`


### Storybook

Storybook kurulu ve Button component için story var. Component'leri izole bir şekilde geliştirmek için kullanılabilir. Çalıştırmak için `npm run storybook`.

## Eksikler ve Gelecek Geliştirmeler




## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm start            # Production server
npm run lint         # ESLint kontrolü
npm run format       # Prettier ile formatla
npm run type-check   # TypeScript tip kontrolü
npm test             # Testleri çalıştır
npm run storybook    # Storybook'u başlat
```



## Lisans

Bu proje bir teknik değerlendirme case'i için geliştirilmiştir.
Muhammet Coşgun 
```


