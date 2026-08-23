import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { JsonLd } from "@/app/components/JsonLd";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { getPriceCar } from "@/services/Price/PriceCar";
import { getPriceCarBrands } from "@/services/Price/PriceCarBrands";
import { headers } from "next/headers";
import PriceCar from "./components/PriceCar";
import { mainDomainOld } from "@/utils/mainDomain";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const dataPage: ItemsId |ItemsCategoryId| null = await getItemByUrl(decodedPathname);

  if (dataPage && dataPage.title) {
    const title = `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`;
    const description = dataPage.seoInfo?.seoDescription
      ? dataPage.seoInfo?.seoDescription
      : dataPage.title;
    const keywords = dataPage.seoInfo?.seoKeywords
      ? dataPage.seoInfo?.seoKeywords
      : dataPage.seoKeywords;
    const metadataBase = new URL(mainDomainOld);
   const seoUrl = dataPage?.url
        ? `${mainDomainOld}${dataPage?.url}`
        : `${mainDomainOld}`;
    const seoHeadTags = dataPage?.seoInfo?.seoHeadTags;

    return {
      title,
      description,
      keywords,
      metadataBase,
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title,
        description,
      },
      other: {
        seoHeadTags,
      },
    };
  } else {
    return {
      title: "لیست قیمت موتور سیکلت‌های بازار | ماشین3",
      description: "لیست قیمت موتور سیکلت‌های بازار",
    };
  }
}

async function pagePrice({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const searchParam = await searchParams;
  const type = searchParam.type;
  const brandId = Number(searchParam.brandId);
  
  // دریافت لیست برندها
  const brands: BrandsPrice = await getPriceCarBrands(
    type ? String(type) : "internal",
  );
  
  // دریافت قیمت‌های ۶ برند اول
  const price: Price = await getPriceCar({
    Type: type ? String(type) : "internal",
    BrandId: -1,
    PageSize: 6,
  });



  const dataPage: ItemsId | ItemsCategoryId | null =
    await getItemByUrl(decodedPathname);

  const schemas = dataPage?.seoInfo?.schemas || [];

  // برندهای دارای قیمت (۶ برند اول)
  const brandIdsWithPrice = new Set(price.prices?.map(p => p.brandId) || []);
  const brandsWithPrice = brands.brands?.filter(b => brandIdsWithPrice.has(b.id)) || [];
  const brandsWithoutPrice = brands.brands?.filter(b => !brandIdsWithPrice.has(b.id)) || [];

  return (
    <>
      <JsonLd schemas={schemas} />
      <BreadcrumbCategory breadcrumb={[]} title={price.title} />
      <PriceCar
        brandsWithPrice={brandsWithPrice}
        brandsWithoutPrice={brandsWithoutPrice}
        initialPrices={price.prices || []}
        title={dataPage ? dataPage.title : ""}
        summary={price.summary}
        body={price.body}
        brandIdSearchParams={brandId}
        type={type ? String(type) : "internal"}
      />
    </>
  );
}

export default pagePrice;