import { mainDomain } from "@/utils/mainDomain";
import HeroSlider from "@/app/components/HeroSlider";
import NewsSection from "@/app/components/NewsSection";
import {
  LazyCarBrandPricesSection,
  LazyCarComparisonSection,
  LazyCarFinderSection,
  LazyCarSpecsSection,
  LazyCarTypes,
  LazyCreativeCategoriesSection,
  LazyEducationSection,
  LazyMotorcycleBrandsSection,
  LazyVideoBannerSection,
} from "./lazyClients";
import {
  getHomeBrandMotor,
  getHomeBrandsCar,
  getHomeCarSpecProperties,
  getHomeEducation,
  getHomeNews,
  getHomeNewsCar,
  getHomePrices,
  getHomeSaleNews,
  getHomeSegmentCars,
  getHomeSlider,
  getHomeVideos,
  getHomeWhichCars,
  getHomeAutoServices,
} from "./queries";

export async function HomeHero() {
  const [slider, newsCar, whichCars, saleNews] = await Promise.all([
    getHomeSlider(),
    getHomeNewsCar(),
    getHomeWhichCars(),
    getHomeSaleNews(),
  ]);

  if (slider.length === 0) return null;

  const firstImage = slider[0]?.image;
  const firstImageSrc = firstImage
    ? firstImage.startsWith("http")
      ? firstImage
      : `${mainDomain}${firstImage}`
    : "";

  return (
    <>
      {firstImageSrc ? (
        <link
          rel="preload"
          as="image"
          href={firstImageSrc}
          fetchPriority="high"
        />
      ) : null}
      <HeroSlider
        slider={slider}
        latestNews={newsCar}
        latestComparisons={whichCars.slice(0, 2)}
        latestPresales={saleNews}
      />
    </>
  );
}

export async function HomeNews() {
  const [news, saleNews] = await Promise.all([
    getHomeNews(),
    getHomeSaleNews(),
  ]);

  return <NewsSection news={news} saleNews={saleNews} />;
}

export async function HomeCarTypes() {
  const segmentCars = await getHomeSegmentCars();
  return <LazyCarTypes segmentCars={segmentCars} />;
}

export async function HomeVideo() {
  const video = await getHomeVideos();
  return <LazyVideoBannerSection video={video} />;
}

export async function HomeCarSpecs() {
  const { carSpecs, Properties } = await getHomeCarSpecProperties();
  return <LazyCarSpecsSection carSpecs={carSpecs} Properties={Properties} />;
}

export async function HomeComparison() {
  const [brandsCar, whichCars] = await Promise.all([
    getHomeBrandsCar(),
    getHomeWhichCars(),
  ]);
  return (
    <LazyCarComparisonSection brandsCar={brandsCar} whichCars={whichCars} />
  );
}

export async function HomePrices() {
  const { brands, prices } = await getHomePrices();
  return (
    <LazyCarBrandPricesSection
      initialBrands={brands.brands}
      initialPrices={prices.prices}
    />
  );
}

export async function HomeAutoServices() {
  const { AutoServiceData, propertyItems, brandsAuto } =
    await getHomeAutoServices();
  return (
    <LazyCreativeCategoriesSection
      brandsAuto={AutoServiceData}
      carView={brandsAuto}
      propertyItems={propertyItems}
    />
  );
}

export async function HomeEducation() {
  const education = await getHomeEducation();
  return <LazyEducationSection education={education} />;
}

export async function HomeMotorBrands() {
  const brandMotor = await getHomeBrandMotor();
  return <LazyMotorcycleBrandsSection brands={brandMotor} />;
}

export async function HomeCarFinder() {
  const [brandsCar, segmentCars] = await Promise.all([
    getHomeBrandsCar(),
    getHomeSegmentCars(),
  ]);
  return (
    <LazyCarFinderSection brands={brandsCar} segmentCars={segmentCars} />
  );
}
