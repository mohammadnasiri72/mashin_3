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
import { decodeHtmlServer } from "@/utils/func";

export const revalidate = 60;

// ✅ تابع generateMetadata - اینجا تمام متادیتاها تنظیم می‌شود
export async function generateMetadata() {
  const dataPage: ItemsId | null = await getItemByUrl("/");
  const seoUrl = `${mainDomainOld}${dataPage?.seoUrl}`;

  if (dataPage && dataPage.title) {
    // استخراج و پردازش seoHeadTags
    const seoHeadTags = dataPage?.seoInfo?.seoHeadTags || "";
    
    // تگ‌های سفارشی را به صورت یک آبجکت برای other استخراج می‌کنیم
    const customTags = extractCustomMetaTags(seoHeadTags);

    return {
      title: decodeHtmlServer(
        `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title}`
      ),
      description: decodeHtmlServer(
        dataPage.seoInfo?.seoDescription
          ? dataPage.seoInfo?.seoDescription
          : dataPage.title
      ),
      keywords: decodeHtmlServer(
        dataPage.seoInfo?.seoKeywords
          ? dataPage.seoInfo?.seoKeywords
          : dataPage.seoKeywords
      ),
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: decodeHtmlServer(
          `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title}`
        ),
        description: decodeHtmlServer(
          dataPage.seoInfo?.seoDescription
            ? dataPage.seoInfo?.seoDescription
            : dataPage.title
        ),
        // اضافه کردن تصویر اگر وجود دارد
        images: dataPage?.image ? [dataPage.image] : [],
        type: 'website',
        locale: 'fa_IR',
        siteName: 'ماشین سه',
      },
      twitter: {
        card: 'summary_large_image',
        title: decodeHtmlServer(
          `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title}`
        ),
        description: decodeHtmlServer(
          dataPage.seoInfo?.seoDescription
            ? dataPage.seoInfo?.seoDescription
            : dataPage.title
        ),
        images: dataPage?.image ? [dataPage.image] : [],
      },
      // ✅ تگ‌های سفارشی و متاهای اضافی
      other: {
        'copyright': 'activeidea.net',
        'author': 'ایده پویا',
        'document-type': 'Public',
        'document-rating': 'General',
        'classification': 'Consumer',
        'rating': 'ماشین',
        'resource-type': 'document',
        'og:locale': 'fa_IR',
        'og:type': 'ماشین',
        ...customTags, // اضافه کردن تگ‌های سفارشی از seoHeadTags
      },
    };
  } else {
    return {
      title: "ماشین 3 - بانک اطلاعات خودرو ، بررسی خودرو ، سایت تخصصی خودرو ماشین",
      description: "بانک اطلاعات خودرو ، بررسی خودرو ، سایت تخصصی خودرو ماشین",
    };
  }
}

// ✅ تابع کمکی برای استخراج تگ‌های سفارشی از seoHeadTags
function extractCustomMetaTags(htmlString: string): Record<string, string> {
  if (!htmlString) return {};
  
  const tags: Record<string, string> = {};
  
  // استخراج تگ‌های meta با استفاده از regex
  const metaRegex = /<meta\s+([^>]*?)>/gi;
  const matches = htmlString.matchAll(metaRegex);
  
  for (const match of matches) {
    const attrs = match[1];
    
    // استخراج name و content
    const nameMatch = attrs.match(/name=["']([^"']*)["']/i);
    const contentMatch = attrs.match(/content=["']([^"']*)["']/i);
    
    if (nameMatch && contentMatch) {
      const name = nameMatch[1];
      const content = contentMatch[1];
      
      // فقط تگ‌هایی که در Metadata API پشتیبانی می‌شوند را اضافه کن
      if (!['title', 'description', 'keywords', 'robots'].includes(name)) {
        tags[name] = content;
      }
    }
  }
  
  return tags;
}

export default async function Home() {
  const [
    slider,
    news,
    newsCar,
    linkSelected,
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
    Items[],
    ItemsCategory[],
    ItemsCategory[],
    ItemsCategory[],
  ] = await Promise.all([
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
      TypeId: 6,
      langCode: "fa",
      CategoryIdArray: "10",
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
      FullData: true,
    }),
    getItem({ TypeId: 1045, langCode: "fa", PageIndex: 1, PageSize: 10 }),
    getItem({ TypeId: 3, langCode: "fa", PageIndex: 1, PageSize: 13 }),
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
      carSpecs.map((item) => item.id).join(",")
    );
  }

  const brands: BrandsPrice = await getPriceCarBrands("internal");
  const prices: Price = await getPriceCar({
    Type: "internal",
    BrandId: brands.brands[0].id,
  });

  // ❌ حذف: دیگر نیازی به fetch مجدد dataPage نیست
  // const dataPage: ItemsId | null = await getItemByUrl("/");
  // const seoHeadTags = decodeHtmlServer(dataPage?.seoInfo?.seoHeadTags);
  // const tags = parseMetaTags(seoHeadTags);

  return (
    <div className="page-wrapper min-h-screen bg-[#f4f4f4]">
      <div className="content-box pt-4">
        {/* Hero Slider */}
        {/* {slider.length > 0 && <HeroSlider slider={slider} />} */}

        {/* News */}
        <NewsSection news={newsCar} saleNews={saleNews} />
        
        {/* compare & bestChoices & instaLink */}
        <ComparisonSection
          news={linkSelected}
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