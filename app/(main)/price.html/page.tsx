import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { JsonLd } from "@/app/components/JsonLd";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { getPriceCar } from "@/services/Price/PriceCar";
import { getPriceCarBrands } from "@/services/Price/PriceCarBrands";
import { headers } from "next/headers";
import PriceCar from "./components/PriceCar";

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