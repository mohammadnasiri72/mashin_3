import { getPriceCar } from "@/services/Price/PriceCar";
import { getPriceCarBrands } from "@/services/Price/PriceCarBrands";
import PriceCar from "./components/PriceCar";
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

  const price: Price = await getPriceCar({
    Type: type ? String(type) : "internal",
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
      title: "لیست قیمت خودروهای بازار | ماشین3",
      description: "لیست قیمت خودروهای بازار",
    };
  }

  return {
    title: `ماشین3 - ${price.seoTitle ? price.seoTitle : price.title}`,
    description: price.seoDescription,
    openGraph: {
      title: `ماشین3 - ${price.seoTitle ? price.seoTitle : price.title}`,
      description: price.seoDescription,
    },
  };
}

async function pagePrice({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const type = searchParam.type;
  const brandId = Number(searchParam.brandId);
  const brands: BrandsPrice = await getPriceCarBrands(
    type ? String(type) : "internal",
  );
  const price: Price = await getPriceCar({
    Type: type ? String(type) : "internal",
    BrandId: brandId ? brandId : -1,
  });

  return (
    <>
      <div className="mb-4!">
        <BreadcrumbCategory breadcrumb={[]} title={price.title} />
      </div>
      <PriceCar
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

export default pagePrice;
