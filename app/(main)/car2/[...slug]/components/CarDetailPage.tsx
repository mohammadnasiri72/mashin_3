"use client";

import React from "react";

import DirectionsCarFilledRoundedIcon from "@mui/icons-material/DirectionsCarFilledRounded";
import LocalGasStationRoundedIcon from "@mui/icons-material/LocalGasStationRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import RotateRightRoundedIcon from "@mui/icons-material/RotateRightRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";

import HeroSection from "./components/HeroSection";
import SectionTabs from "./components/SectionTabs";
import TechnicalSpecs from "./components/TechnicalSpecs";
import CarDimensions from "./components/CarDimensions";
import RatingProsCons from "./components/RatingProsCons";
import ImageGallery from "./components/ImageGallery";
import PriceChart from "./components/PriceChart";
import ComparisonTable from "./components/ComparisonTable";
import SimilarCars from "./components/SimilarCars";
import SummaryBanner from "./components/SummaryBanner";

import type {
  HeroData,
  NavTab,
  QuickSpecItem,
  DimensionItem,
  DetailSpecRow,
  RatingBreakdownItem,
  ProsConsData,
  GalleryCategory,
  GalleryImage,
  PriceRange,
  PricePoint,
  CompetitorCar,
  CompetitorRow,
  SimilarCarItem,
  SummaryBannerData,
} from "./types";

// ----------------------------------------------------------------------
// Sample data — replace every value below with real data from your API.
// Each section component only depends on the typed props, so swapping
// this block out for a data-fetching hook (React Query / server data)
// will not require touching the components themselves.
// ----------------------------------------------------------------------

const heroData: HeroData = {
  brand: "SWM",
  model: "SWM G01",
  tags: ["لوکس", "انگلیسی", "کراس‌اوور"],
  rating: 8.4,
  reviewsCount: 3,
  backgroundImage: "/images/swm-g01/hero.jpg",
  badgeText: "امکان دریافت در وام‌خشتی",
  price: "1,865,000,000",
  priceYear: "قیمت بازار (1403)",
  specs: [
    { label: "سال تولید", value: "2024", icon: <DirectionsCarFilledRoundedIcon fontSize="small" /> },
    { label: "موتور", value: "1.8 لیتر توربو", icon: <LocalGasStationRoundedIcon fontSize="small" /> },
    { label: "قدرت", value: "قدرت اسب بخار", icon: <BoltRoundedIcon fontSize="small" /> },
    { label: "گیربکس", value: "6 دنده اتوماتیک", icon: <SettingsSuggestRoundedIcon fontSize="small" /> },
    { label: "مصرف سوخت", value: "7.8 لیتر ترکیبی", icon: <LocalFireDepartmentRoundedIcon fontSize="small" /> },
    { label: "شتاب 0-100", value: "9.6 ثانیه", icon: <SpeedRoundedIcon fontSize="small" /> },
    { label: "گارانتی", value: "5 سال یا 150,000 کیلومتر", icon: <VerifiedUserRoundedIcon fontSize="small" /> },
  ],
};

const navTabs: NavTab[] = [
  { id: "technical-specs", label: "مشخصات فنی" },
  { id: "chassis", label: "شرح شاسی" },
  { id: "comparison", label: "رقبا و مقایسه" },
  { id: "pros-cons", label: "مزایا و معایب" },
  { id: "features", label: "امکانات و تجهیزات" },
  { id: "gallery", label: "گالری تصاویر" },
];

const quickSpecs: QuickSpecItem[] = [
  { label: "قدرت موتور", value: "155", unit: "اسب بخار", icon: <BoltRoundedIcon fontSize="small" /> },
  { label: "گشتاور", value: "230", unit: "نیوتن متر", icon: <RotateRightRoundedIcon fontSize="small" /> },
  { label: "شتاب 0-100", value: "11.5", unit: "ثانیه", icon: <TimerRoundedIcon fontSize="small" /> },
  { label: "حداکثر سرعت", value: "180", unit: "کیلومتر", icon: <SpeedRoundedIcon fontSize="small" /> },
  { label: "گیربکس", value: "6 AT", icon: <SettingsRoundedIcon fontSize="small" /> },
  { label: "حجم موتور", value: "1.5", unit: "لیتر توربو", icon: <LocalGasStationRoundedIcon fontSize="small" /> },
];

const dimensions: DimensionItem[] = [
  { label: "طول", value: "4,610 میلی‌متر" },
  { label: "عرض", value: "1,855 میلی‌متر" },
  { label: "ارتفاع", value: "1,730 میلی‌متر" },
  { label: "فاصله محوری", value: "2,750 میلی‌متر" },
  { label: "حجم باک", value: "52 لیتر" },
  { label: "حجم صندوق عقب", value: "480 لیتر" },
];

const detailSpecs: DetailSpecRow[] = [
  { label: "نوع موتور", value: "توربو شارژ بنزینی" },
  { label: "تعداد سیلندر", value: "4 سیلندر" },
  { label: "حجم موتور", value: "1,498 سی سی" },
  { label: "انتقال قدرت", value: "دیفرانسیل جلو" },
  { label: "استاندارد آلایندگی", value: "یورو 5" },
  { label: "وزن خالص", value: "1,560 کیلوگرم" },
];

const ratingBreakdown: RatingBreakdownItem[] = [
  { label: "کیفیت ساخت", score: 8.6 },
  { label: "امکانات", score: 8.9 },
  { label: "مصرف سوخت", score: 7.2 },
  { label: "شتاب و قدرت", score: 8 },
  { label: "ارزش خرید در برابر امکانات", score: 8.3 },
];

const prosCons: ProsConsData = {
  pros: [
    "کابین جادار و طراحی مدرن",
    "امکانات رفاهی و ایمنی کامل",
    "سواری نرم و هندلینگ مناسب",
    "شتاب و قدرت قابل قبول",
  ],
  cons: [
    "مصرف سوخت نسبتاً بالا",
    "بازار دست دوم هنوز جا نیفتاده",
    "شبکه خدمات پس از فروش محدود",
    "هزینه قطعات بدنه",
    "حساسیت گیربکس به سرعت‌های زیاد",
  ],
};

const galleryCategories: GalleryCategory[] = [
  { id: "all", label: "همه" },
  { id: "front", label: "نمای جلو" },
  { id: "interior", label: "نمای داخلی" },
  { id: "dashboard", label: "داشبورد" },
  { id: "trunk", label: "صندوق عقب" },
  { id: "engine", label: "موتور" },
  { id: "doors", label: "در ها" },
];

const galleryImages: GalleryImage[] = [
  { id: "1", category: "front", src: "/images/swm-g01/gallery-1.jpg", alt: "نمای جلو SWM G01" },
  { id: "2", category: "front", src: "/images/swm-g01/gallery-2.jpg", alt: "نمای جلو SWM G01" },
  { id: "3", category: "interior", src: "/images/swm-g01/gallery-3.jpg", alt: "داشبورد SWM G01" },
  { id: "4", category: "interior", src: "/images/swm-g01/gallery-4.jpg", alt: "صندلی‌های SWM G01" },
  { id: "5", category: "engine", src: "/images/swm-g01/gallery-5.jpg", alt: "موتور SWM G01" },
  { id: "6", category: "trunk", src: "/images/swm-g01/gallery-6.jpg", alt: "صندوق عقب SWM G01" },
];

const priceRanges: PriceRange[] = [
  { id: "1m", label: "1 ماه" },
  { id: "3m", label: "3 ماه" },
  { id: "6m", label: "6 ماه" },
  { id: "1y", label: "1 سال" },
  { id: "all", label: "همه" },
];

const priceDataByRange: Record<string, PricePoint[]> = {
  "3m": [
    { label: "بهمن", value: 1865000000 },
    { label: "اسفند", value: 1900000000 },
    { label: "فروردین", value: 1850000000 },
    { label: "اردیبهشت", value: 1780000000 },
    { label: "خرداد", value: 1720000000 },
    { label: "تیر", value: 1800000000 },
  ],
  "1m": [
    { label: "هفته 1", value: 1830000000 },
    { label: "هفته 2", value: 1800000000 },
    { label: "هفته 3", value: 1780000000 },
    { label: "هفته 4", value: 1800000000 },
  ],
  "6m": [
    { label: "دی", value: 1750000000 },
    { label: "بهمن", value: 1865000000 },
    { label: "اسفند", value: 1900000000 },
    { label: "فروردین", value: 1850000000 },
    { label: "اردیبهشت", value: 1780000000 },
    { label: "خرداد", value: 1720000000 },
  ],
  "1y": [
    { label: "تیر ۱۴۰۲", value: 1600000000 },
    { label: "مهر ۱۴۰۲", value: 1700000000 },
    { label: "دی ۱۴۰۲", value: 1750000000 },
    { label: "بهمن ۱۴۰۲", value: 1865000000 },
    { label: "اردیبهشت ۱۴۰۳", value: 1780000000 },
    { label: "خرداد ۱۴۰۳", value: 1720000000 },
  ],
  all: [
    { label: "۱۴۰۲", value: 1600000000 },
    { label: "۱۴۰۳", value: 1865000000 },
  ],
};

const competitors: CompetitorCar[] = [
  { id: "swm-g01", name: "SWM G01", image: "/images/swm-g01/thumb.png" },
  { id: "haval-jolion", name: "هاوال جولیون", image: "/images/competitors/haval-jolion.png" },
  { id: "jac-js4", name: "جک جوان", image: "/images/competitors/jac-js4.png" },
  { id: "kmc-x5", name: "KMC X5", image: "/images/competitors/kmc-x5.png" },
];

const comparisonRows: CompetitorRow[] = [
  { label: "قیمت بازار (تومان)", values: ["1,865,000,000", "2,120,000,000", "1,950,000,000", "1,780,000,000"] },
  { label: "قدرت (اسب بخار)", values: ["155", "147", "143", "230"] },
  { label: "شتاب 0-100 (ثانیه)", values: ["11.5", "11.8", "12.1", "10.8"] },
  { label: "مصرف ترکیبی (لیتر)", values: ["7.8", "7.5", "7.3", "7.6"] },
  { label: "حجم صندوق عقب (لیتر)", values: ["480", "475", "337", "450"] },
];

const similarCars: SimilarCarItem[] = [
  { id: "1", name: "تیگو 7 پرو", image: "/images/similar/tiggo-7-pro.jpg", rating: 8.6, price: "2,200,000,000", href: "#" },
  { id: "2", name: "هاوال جولیون", image: "/images/similar/haval-jolion.jpg", rating: 8.2, price: "1,865,000,000", href: "#" },
  { id: "3", name: "KMC X5", image: "/images/similar/kmc-x5.jpg", rating: 8.1, price: "1,950,000,000", href: "#" },
  { id: "4", name: "لاماری ایما", image: "/images/similar/lamari-ima.jpg", rating: 8.0, price: "2,050,000,000", href: "#" },
  { id: "5", name: "فیدلیتی پرسنیس", image: "/images/similar/fidelity-persence.jpg", rating: 8.2, price: "1,995,000,000", href: "#" },
];

const summaryBanner: SummaryBannerData = {
  title: "جمع‌بندی ماشین۳",
  body: "SWM G01 یک کراس‌اوور خانوادگی با طراحی جذاب، کابین جادار و امکانات رفاهی کامل است. اگر به دنبال خودرویی با سواری نرم و راحت، قدرت مناسب و ظاهری متفاوت هستید، این خودرو یکی از بهترین گزینه‌ها در این بازه قیمتی خواهد بود.",
  image: "/images/swm-g01/summary.jpg",
  primaryCta: { label: "مشاهده آگهی‌های فروش", href: "#" },
  secondaryCta: { label: "مقایسه", href: "#" },
  tertiaryCta: { label: "دانلود مشخصات", href: "#" },
};

// ----------------------------------------------------------------------

export default function CarDetailPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <HeroSection data={heroData} />
      <SectionTabs tabs={navTabs} />

      <TechnicalSpecs items={quickSpecs} />

      <CarDimensions
        silhouetteImage="/images/swm-g01/silhouette.png"
        lengthLabel="4,610 میلی‌متر"
        widthLabel="1,855 mm"
        dimensions={dimensions}
        detailSpecs={detailSpecs}
      />

      <RatingProsCons
        overallScore={heroData.rating}
        breakdown={ratingBreakdown}
        prosCons={prosCons}
      />

      <ImageGallery categories={galleryCategories} images={galleryImages} />

      <PriceChart
        ranges={priceRanges}
        dataByRange={priceDataByRange}
        defaultRangeId="3m"
      />

      <ComparisonTable competitors={competitors} rows={comparisonRows} />

      <SimilarCars items={similarCars} />

      <SummaryBanner data={summaryBanner} />
    </main>
  );
}
