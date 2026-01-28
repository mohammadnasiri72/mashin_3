import { getPrice } from "@/services/Price/Price";
import { getPriceBrands } from "@/services/Price/PriceBrands";
import PriceCar from "./components/PriceCar";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const type = String(searchParam.type);

  if (type === "internal") {
    return {
      title: "ماشین3 - قیمت خودرو داخلی",
      description: "قیمت خودرو داخلی",
    };
  } else if (type === "import") {
    return {
      title: "ماشین3 - قیمت خودرو وارداتی",
      description: "قیمت خودرو وارداتی",
    };
  } else {
    return {
      title: "ماشین3 - قیمت خودروهای بازار",
      description: "قیمت خودروهای بازار",
    };
  }
}

async function pagePrice({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const type = String(searchParam.type);
  const brands: PriceBrands[] = await getPriceBrands(type);
  const price: Price[] = await getPrice({ Type: type, BrandId: -1 });

  return <PriceCar brands={brands} price={price} />;
}

export default pagePrice;
