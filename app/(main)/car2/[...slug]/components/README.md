# SWM G01 — Car Detail Page Components

کامپوننت‌های جدا برای صفحه جزئیات خودرو (بر اساس طرح ارسالی)، با Next.js + TypeScript + Tailwind + MUI + Swiper.
هدر، فوتر و بخش نظرات کاربران عمداً پیاده‌سازی نشده‌اند (طبق درخواست).

## نصب پکیج‌های مورد نیاز

```bash
npm install swiper @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## ساختار فایل‌ها

```
car-detail/
├── types.ts                      # تایپ‌های مشترک همه کامپوننت‌ها
├── CarDetailPage.tsx              # صفحه نهایی که همه سکشن‌ها رو کنار هم می‌چینه + دیتای نمونه
└── components/
    ├── HeroSection.tsx            # هیرو تمام‌عرض + کارت قیمت/مشخصات شناور
    ├── SectionTabs.tsx            # نوار تب‌های ناوبری بین سکشن‌ها (زیر هیرو)
    ├── TechnicalSpecs.tsx         # گرید ۶ تایی مشخصات فنی سریع
    ├── CarDimensions.tsx          # نمای بالا + ابعاد + جدول مشخصات موتور
    ├── RatingProsCons.tsx         # امتیاز دایره‌ای + شاخص‌ها + مزایا/معایب
    ├── ImageGallery.tsx           # گالری تصاویر با Swiper (فیلتر دسته‌بندی + thumbnail)
    ├── PriceChart.tsx             # نمودار قیمت (SVG سبک، بدون کتابخانه اضافه) + تب‌های بازه زمانی
    ├── ComparisonTable.tsx        # جدول مقایسه با رقبا
    ├── SimilarCars.tsx            # اسلایدر خودروهای مشابه (Swiper)
    └── SummaryBanner.tsx          # بنر جمع‌بندی تیره در پایین صفحه
```

## نحوه استفاده

```tsx
// app/cars/[slug]/page.tsx
import CarDetailPage from "@/car-detail/CarDetailPage";

export default function Page() {
  return <CarDetailPage />;
}
```

بعد در لایه‌ی خودتون (که هدر/فوتر توش هست) این page component رو رندر کنید.

## نکات مهم

1. **دیتای واقعی**: همه‌ی دیتای نمونه (`heroData`, `quickSpecs`, `dimensions`, ...) داخل
   `CarDetailPage.tsx` تعریف شده. برای اتصال به API فقط کافیه این آبجکت‌ها رو با نتیجه‌ی
   fetch/SWR/React Query خودتون جایگزین کنید — چون هر کامپوننت فقط به تایپ‌های داخل
   `types.ts` وابسته‌ست، تغییر منبع دیتا نیازی به تغییر کامپوننت‌ها نداره.

2. **مسیر عکس‌ها**: مسیرهایی مثل `/images/swm-g01/hero.jpg` فرضی هستن، جایگزین کنید
   با عکس‌های واقعی (یا URL از CDN/CMS خودتون). از `next/image` استفاده شده، پس دامنه‌ی
   عکس‌های خارجی رو باید در `next.config.js` (`images.remotePatterns`) اضافه کنید.

3. **RTL**: هر کامپوننت خودش `dir="rtl"` داره تا مستقل هم قابل استفاده باشه. اگر در
   `<html dir="rtl">` یا لایه‌ی اصلی پروژه از قبل RTL ست کردید، این attributeها رو
   می‌تونید حذف کنید تا تکراری نباشه.

4. **فونت**: فونت فارسی (مثل وزیرمتن) رو فرض کردم قبلاً در لایه‌ی کلی پروژه ست شده؛
   کامپوننت‌ها فونت رو hardcode نکردن.

5. **رنگ قرمز برند**: از `red-600` / `red-700` توییلویند استفاده شده که نزدیک‌ترین رنگ
   پیش‌فرض به قرمز طرح شماست. اگر رنگ دقیق برندتون هست، پیشنهاد می‌کنم توی
   `tailwind.config.ts` یک رنگ سفارشی مثل `brand: { DEFAULT: "#E31C25" }` تعریف کنید و
   کلاس‌های `red-600`/`red-700` رو با `brand`/`brand-dark` جایگزین کنید (یک find & replace ساده).

6. **نمودار قیمت**: `PriceChart.tsx` یک SVG سبک و بدون وابستگی خارجی می‌سازه. اگه ترجیح
   می‌دید از `recharts` یا `MUI X Charts` استفاده کنید، فقط کافیه تابع `MiniLineChart`
   داخل همون فایل رو عوض کنید — پراپ‌های بیرونی کامپوننت (`ranges`, `dataByRange`) ثابت می‌مونن.

7. **Swiper CSS**: در `ImageGallery.tsx` و `SimilarCars.tsx` استایل پایه‌ی Swiper ایمپورت
   شده (`swiper/css`, `swiper/css/navigation`, `swiper/css/thumbs`). اگه پروژه از قبل این
   ایمپورت‌ها رو در یک جای مرکزی (مثلاً `globals.css`) داره، می‌تونید از این فایل‌ها حذفشون کنید.

8. **آیکون‌ها**: از `@mui/icons-material` استفاده شده. اگه می‌خواید سبک‌تر باشه می‌تونید با
   `lucide-react` یا آیکون‌های SVG دستی جایگزین کنید — فقط پراپ `icon: React.ReactNode` رو
   عوض کنید.

## سکشن‌هایی که عمداً پیاده‌سازی نشدن (طبق درخواست شما)

- Header (نوار بالای سایت)
- Footer
- بخش «نظرات کاربران»
