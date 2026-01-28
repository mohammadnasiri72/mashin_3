import { getPriceMotor } from "@/services/Price/PriceMotor";
import { getPriceMotorBrands } from "@/services/Price/PriceMotorBrands";
import PriceMotor from "./components/PriceMotor";

async function pageMotorcyclePrices({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const type = searchParam.type;
  

  const brands: PriceBrands[] = await getPriceMotorBrands(
    type ? String(type) : "all",
  );
  const price: Price[] = await getPriceMotor({
    Type: type ? String(type) : "all",
    BrandId: -1,
  });
  return (
    <>
      <PriceMotor brands={brands} price={price} />
    </>
  );
}

export default pageMotorcyclePrices;
