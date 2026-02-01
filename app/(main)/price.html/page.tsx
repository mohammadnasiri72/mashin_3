import { getPriceCar } from "@/services/Price/PriceCar";
import { getPriceCarBrands } from "@/services/Price/PriceCarBrands";
import PriceCar from "./components/PriceCar";

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
