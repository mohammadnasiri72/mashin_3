import { getPriceMotor } from "@/services/Price/PriceMotor";
import { getPriceMotorBrands } from "@/services/Price/PriceMotorBrands";
import PriceMotor from "./components/PriceMotor";
import { mainDomainOld } from "@/utils/mainDomain";
import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { headers } from "next/headers";
import { getItemByUrl } from "@/services/Item/ItemByUrl";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const dataPage: ItemsId | null = await getItemByUrl(decodedPathname);

  if (dataPage && dataPage.title) {
    const title = `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`;
    const description = dataPage.seoInfo?.seoDescription
      ? dataPage.seoInfo?.seoDescription
      : dataPage.title;
    const keywords = dataPage.seoInfo?.seoKeywords
      ? dataPage.seoInfo?.seoKeywords
      : dataPage.seoKeywords;
    const metadataBase = new URL(mainDomainOld);
    const seoUrl = dataPage?.seoUrl
      ? `${mainDomainOld}${dataPage?.seoUrl}`
      : dataPage?.url
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

async function pageMotorcyclePrices({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;

  const type = searchParam.type;
  const brandId = Number(searchParam.brandId);
  const brands: BrandsPrice = await getPriceMotorBrands(
    type ? String(type) : "all",
  );
  const price: Price = await getPriceMotor({
    Type: type ? String(type) : "all",
    BrandId: brandId ? brandId : -1,
  });

  return (
    <>
      <div className="mb-4!">
        <BreadcrumbCategory breadcrumb={[]} title={price.title} />
      </div>
      <PriceMotor
        brands={brands.brands}
        price={price.prices}
        title={price.title}
        summary={price.summary}
        body={price.body}
        brandIdSearchParams={brandId}
      />
    </>
  );
}

export default pageMotorcyclePrices;
