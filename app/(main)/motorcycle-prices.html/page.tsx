import { getPriceMotor } from "@/services/Price/PriceMotor";
import { getPriceMotorBrands } from "@/services/Price/PriceMotorBrands";
import PriceMotor from "./components/PriceMotor";
import { mainDomainOld } from "@/utils/mainDomain";
import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const type = searchParam.type;
  const brandId = Number(searchParam.brandId);

  const price: Price = await getPriceMotor({
    Type: type ? String(type) : "all",
    BrandId: brandId ? brandId : -1,
  });
  const seoUrl = `${mainDomainOld}${price?.seoUrl}`;

  if (price.title) {
    return {
      title: `${price.seoTitle ? price.seoTitle : price.title + " | ماشین3"}`,
      description: price.seoDescription,
      keywords: price?.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${price.seoTitle ? price.seoTitle : price.title + " | ماشین3"}`,
        description: price.seoDescription,
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
