import { getPriceMotor } from "@/services/Price/PriceMotor";
import { getPriceMotorBrands } from "@/services/Price/PriceMotorBrands";
import PriceMotor from "./components/PriceMotor";

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

  return {
    title: `ماشین3 - ${price.seoTitle ? price.seoTitle : price.title}`,
    description: price.seoDescription,
    openGraph: {
      title: `ماشین3 - ${price.seoTitle ? price.seoTitle : price.title}`,
      description: price.seoDescription,
    },
  };
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
