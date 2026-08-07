// types.ts
// Shared types for the car detail page components (SWM G01 style page)

export interface HeroSpecItem {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export interface HeroData {
  brand: string;
  model: string;
  tags: string[]; // e.g. ["لوکس", "انگلیسی", "کراس‌اوور"]
  rating: number; // e.g. 8.4
  reviewsCount: number;
  backgroundImage: string;
  badgeText?: string; // top ribbon e.g. loan/finance badge
  price: string; // formatted price string
  priceYear: string; // e.g. "قیمت بازار (1403)"
  specs: HeroSpecItem[];
}

export interface NavTab {
  id: string;
  label: string;
}

export interface QuickSpecItem {
  label: string;
  value: string;
  unit?: string;
  icon: React.ReactNode;
}

export interface DimensionItem {
  label: string;
  value: string;
}

export interface DetailSpecRow {
  label: string;
  value: string;
}

export interface RatingBreakdownItem {
  label: string;
  score: number; // 0-10 (or 0-100, component handles scaling)
}

export interface ProsConsData {
  pros: string[];
  cons: string[];
}

export interface GalleryCategory {
  id: string;
  label: string;
}

export interface GalleryImage {
  id: string;
  category: string;
  src: string;
  alt: string;
}

export interface PricePoint {
  label: string; // x-axis label (date)
  value: number;
}

export interface PriceRange {
  id: string;
  label: string; // "1 ماه" | "3 ماه" | ...
}

export interface CompetitorRow {
  label: string; // metric name e.g. "قیمت بازار (تومان)"
  values: string[]; // one value per competitor, aligned with CompetitorCar[]
}

export interface CompetitorCar {
  id: string;
  name: string;
  image: string;
}

export interface SimilarCarItem {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: string;
  href?: string;
}

export interface SummaryBannerData {
  title: string;
  body: string;
  image: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tertiaryCta?: { label: string; href: string };
}
