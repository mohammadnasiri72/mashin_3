import dynamic from "next/dynamic";

export const LazyCarTypes = dynamic(() => import("@/app/components/CarTypes"));

export const LazyVideoBannerSection = dynamic(
  () => import("@/app/components/VideoBannerSection"),
);

export const LazyCarSpecsSection = dynamic(
  () => import("@/app/components/CarSpecsSection"),
);

export const LazyCarComparisonSection = dynamic(
  () => import("@/app/components/CarComparisonSection"),
);

export const LazyCarBrandPricesSection = dynamic(
  () => import("@/app/components/CarBrandPricesSection"),
);

export const LazyCreativeCategoriesSection = dynamic(
  () => import("@/app/components/CreativeCategoriesSection"),
);

export const LazyEducationSection = dynamic(
  () => import("@/app/components/EducationSection"),
);

export const LazyMotorcycleBrandsSection = dynamic(
  () => import("@/app/components/MotorcycleBrandsSection"),
);

export const LazyCarFinderSection = dynamic(
  () => import("@/app/components/CarFinderSection"),
);
