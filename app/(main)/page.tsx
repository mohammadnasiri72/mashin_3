import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { getPriceCar } from "@/services/Price/PriceCar";
import { getPriceCarBrands } from "@/services/Price/PriceCarBrands";
import { getPropertyIds } from "@/services/Property/propertyIds";
import { mainDomainOld } from "@/utils/mainDomain";
import CarBrandPricesSection from "../components/CarBrandPricesSection";
import CarComparisonSection from "../components/CarComparisonSection";
import CarFinderSection from "../components/CarFinderSection";
import CarSpecsSection from "../components/CarSpecsSection";
import CarTypes from "../components/CarTypes";
import ComparisonSection from "../components/ComparisonSection";
import CreativeCategoriesSection from "../components/CreativeCategoriesSection";
import HeroSlider from "../components/HeroSlider";
import MotorcycleBrandsSection from "../components/MotorcycleBrandsSection";
import NewsListSection from "../components/NewsListSection";
import NewsSection from "../components/NewsSection";
import VideoBannerSection from "../components/VideoBannerSection";

export const revalidate = 60;

export async function generateMetadata() {
  const dataPage: ItemsId | null = await getItemByUrl("/");
  const seoUrl = `${mainDomainOld}${dataPage?.seoUrl}`;

  if (dataPage && dataPage.title) {
    return {
      title: `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title}`,
      description: dataPage.seoInfo?.seoDescription
        ? dataPage.seoInfo?.seoDescription
        : dataPage.title,
      keywords: dataPage.seoInfo?.seoKeywords
        ? dataPage.seoInfo?.seoKeywords
        : dataPage.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title}`,
        description: dataPage.seoInfo?.seoDescription
          ? dataPage.seoInfo?.seoDescription
          : dataPage.title,
      },
      other: {
        seoHeadTags: dataPage?.seoInfo?.seoHeadTags,
      },
    };
  } else {
    return {
      title:
        "ماشین 3 - بانک اطلاعات خودرو ، بررسی خودرو ، سایت تخصصی خودرو ماشین",
      description: "بانک اطلاعات خودرو ، بررسی خودرو ، سایت تخصصی خودرو ماشین",
    };
  }
}

export default async function Home() {
  const [
    slider,
    news,
    newsCar,
    saleNews,
    compare,
    bestChoices,
    segmentCars,
    video,
    carSpecs,
    carView,
    whichCars,
    education,
    brandMotor,
    brandsCar,
    brandsAuto,
  ]: [
    Items[],
    Items[],
    Items[],
    Items[],
    Items[],
    Items[],
    Items[],
    Items[],
    Items[],
    Items[],
    Items[],
    Items[],
    ItemsCategory[],
    ItemsCategory[],
    ItemsCategory[],
  ] = await Promise.all([
    // درخواست‌های getItem
    getItem({ TypeId: 6, langCode: "fa" }),
    getItem({ TypeId: 5, langCode: "fa", PageIndex: 1, PageSize: 6 }),
    getItem({
      TypeId: 5,
      langCode: "fa",
      CategoryIdArray: "6323",
      PageIndex: 1,
      PageSize: 5,
    }),
    getItem({
      TypeId: 5,
      langCode: "fa",
      CategoryIdArray: "6593",
      PageIndex: 1,
      PageSize: 10,
    }),
    getItem({ TypeId: 1045, langCode: "fa", PageIndex: 1, PageSize: 2 }),
    getItem({ TypeId: 1043, langCode: "fa", PageIndex: 1, PageSize: 10 }),
    getItem({ TypeId: 1048, langCode: "fa" }),
    getItem({ TypeId: 1028, langCode: "fa", PageIndex: 1, PageSize: 10 }),
    getItem({
      TypeId: 1042,
      langCode: "fa",
      IsHome: 1,
      PageIndex: 1,
      PageSize: 12,
    }),
    getItem({
      TypeId: 1042,
      langCode: "fa",
      OrderBy: 8,
      PageIndex: 1,
      PageSize: 12,
    }),
    getItem({ TypeId: 1045, langCode: "fa", PageIndex: 1, PageSize: 10 }),
    getItem({ TypeId: 3, langCode: "fa", PageIndex: 1, PageSize: 13 }),

    // درخواست‌های getCategory
    getCategory({
      TypeId: 1052,
      LangCode: "fa",
      ParentIdArray: 6059,
      PageIndex: 1,
      PageSize: 200,
    }),
    getCategory({
      TypeId: 1042,
      LangCode: "fa",
      ParentIdArray: 6058,
      PageIndex: 1,
      PageSize: 200,
    }),
    getCategory({ TypeId: 1050, LangCode: "fa", PageIndex: 1, PageSize: 13 }),
  ]);

  let Properties: properties[] = [];
  if (carSpecs.length > 0) {
    Properties = await getPropertyIds(
      carSpecs.map((item) => item.id).join(","),
    );
  }

  const brands: BrandsPrice = await getPriceCarBrands("internal");
  const prices: Price = await getPriceCar({
    Type: "internal",
    BrandId: brands.brands[0].id,
  });

  return (
    <div className="page-wrapper min-h-screen bg-[#f4f4f4]">
      <div className="content-box pt-4">
        {/* Hero Slider */}
        {slider.length > 0 && <HeroSlider slider={slider} />}

        {/* News */}
        <NewsSection news={newsCar} saleNews={saleNews} />
        {/* compare & bestChoices & instaLink */}
        <ComparisonSection
          news={newsCar}
          compare={compare}
          bestChoices={bestChoices}
        />

        {/* Car Types */}
        <CarTypes segmentCars={segmentCars} />

        {/* Video Banner Section */}
        <VideoBannerSection video={video} />

        {/* News List Section */}
        <NewsListSection news={news} />

        {/* Car Specs Section */}
        <CarSpecsSection carSpecs={carSpecs} Properties={Properties} />

        {/* Car Comparison Section */}
        <CarComparisonSection brandsCar={brandsCar} whichCars={whichCars} />

        {/* Car BrandPrices Section */}
        <CarBrandPricesSection
          initialBrands={brands.brands}
          initialPrices={prices.prices}
        />
        {/* Brands AutoServices & education */}
        <CreativeCategoriesSection
          brandsAuto={brandsAuto}
          carView={carView}
          education={education}
        />

        {/* Motorcycle Brands Section */}
        <MotorcycleBrandsSection brands={brandMotor} />

        {/* Car Finder Section */}
        <CarFinderSection brands={brandsCar} segmentCars={segmentCars} />
      </div>
    </div>
  );
}
