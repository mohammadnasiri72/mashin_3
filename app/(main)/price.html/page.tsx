import { getPrice } from "@/services/Price/Price";
import { getPriceBrands } from "@/services/Price/PriceBrands";
import PriceCar from "./components/PriceCar";

async function pagePrice({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const type = String(searchParam.type);

  const brands: PriceBrands[] = await getPriceBrands(type);
  const price: Price[] = await getPrice({ Type: type, BrandId: -1 });

  // const headersList = await headers();

  // const ip =
  //   headersList.get("x-forwarded-for") ||
  //   headersList.get("x-real-ip") ||
  //   "unknown";

  return <PriceCar brands={brands} price={price} />;
}

export default pagePrice;
