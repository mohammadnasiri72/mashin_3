import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { getPriceCar } from "@/services/Price/PriceCar";
import { getPriceCarBrands } from "@/services/Price/PriceCarBrands";
import { getPropertyIds } from "@/services/Property/propertyIds";
import CarBrandPricesSection from "../components/CarBrandPricesSection";
import CarComparisonSection from "../components/CarComparisonSection";
import CarFinderSection from "../components/CarFinderSection";
import CarSpecsSection from "../components/CarSpecsSection";
import CarTypes from "../components/CarTypes";
import HeroSlider from "../components/HeroSlider";
import MotorcycleBrandsSection from "../components/MotorcycleBrandsSection";
import NewsListSection from "../components/NewsListSection";
import NewsSection from "../components/NewsSection";
import PopularCarsSection from "../components/PopularCarsSection";
import VideoBannerSection from "../components/VideoBannerSection";
import { mainDomainOld } from "@/utils/mainDomain";

export const revalidate = 60;

export async function generateMetadata() {
  const dataPage: ItemsId | null = await getItemByUrl("/");
  const seoUrl = `${mainDomainOld}${dataPage?.seoUrl}`;

  if (dataPage && dataPage.title) {
    return {
      title: `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`,
      description: dataPage.seoInfo?.seoDescription
        ? dataPage.seoInfo?.seoDescription
        : "بانک اطلاعات خودرو ، بررسی خودرو ، سایت تخصصی خودرو ماشین",
      keywords: dataPage.seoInfo?.seoKeywords
        ? dataPage.seoInfo?.seoKeywords
        : dataPage.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`,
        description: dataPage.seoInfo?.seoDescription
          ? dataPage.seoInfo?.seoDescription
          : "بانک اطلاعات خودرو ، بررسی خودرو ، سایت تخصصی خودرو ماشین",
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
  const slider: Items[] = await getItem({ TypeId: 6, langCode: "fa" });

  const news: Items[] = await getItem({
    TypeId: 5,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 6,
  });
  const newsCar: Items[] = await getItem({
    TypeId: 5,
    langCode: "fa",
    CategoryIdArray: "6323",
    PageIndex: 1,
    PageSize: 2,
  });
  const saleNews: Items[] = await getItem({
    TypeId: 5,
    langCode: "fa",
    CategoryIdArray: "6593",
    PageIndex: 1,
    PageSize: 4,
  });
  const lastCompare: Items[] = await getItem({
    TypeId: 1045,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 1,
  });
  const segmentCars: Items[] = await getItem({
    TypeId: 1048,
    langCode: "fa",
  });
  const video: Items[] = await getItem({
    TypeId: 1028,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 4,
  });
  const carSpecs: Items[] = await getItem({
    TypeId: 1042,
    langCode: "fa",
    IsHome: 1,
    PageIndex: 1,
    PageSize: 12,
  });
  let Properties: properties[] = [];
  if (carSpecs.length > 0) {
    Properties = await getPropertyIds(
      carSpecs.map((item) => item.id).join(","),
    );
  }

  const carView: Items[] = await getItem({
    TypeId: 1042,
    langCode: "fa",
    OrderBy: 8,
    PageIndex: 1,
    PageSize: 12,
  });

  const brandMotor: ItemsCategory[] = await getCategory({
    TypeId: 1052,
    LangCode: "fa",
    ParentIdArray: 6059,
    PageIndex: 1,
    PageSize: 200,
  });

  const brandsCar: ItemsCategory[] = await getCategory({
    TypeId: 1042,
    LangCode: "fa",
    ParentIdArray: 6058,
    PageIndex: 1,
    PageSize: 200,
  });

  const whichCars: Items[] = await getItem({
    TypeId: 1045,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 10,
  });

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

        {/* News and Comparison */}
        <NewsSection
          news={newsCar}
          saleNews={saleNews}
          lastCompare={lastCompare}
        />

        {/* Car Types */}
        <CarTypes segmentCars={segmentCars} />

        {/* Video Banner Section */}
        <VideoBannerSection video={video} />

        {/* News List Section */}
        <NewsListSection news={news} />

        {/* Car Specs Section */}
        <CarSpecsSection carSpecs={carSpecs} Properties={Properties} />

        {/* Popular Cars Section */}
        <PopularCarsSection carView={carView} />

        {/* Car Comparison Section */}
        <CarComparisonSection brandsCar={brandsCar} whichCars={whichCars} />

        {/* Car BrandPrices Section */}
        <CarBrandPricesSection
          initialBrands={brands.brands}
          initialPrices={prices.prices}
        />

        {/* Motorcycle Brands Section */}
        <MotorcycleBrandsSection brands={brandMotor} />

        {/* Car Finder Section */}
        <CarFinderSection brands={brandsCar} segmentCars={segmentCars} />
      </div>
    </div>
  );
}
