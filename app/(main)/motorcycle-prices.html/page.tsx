import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
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
  const brandId = Number(searchParam.brandId);
  
  // دریافت لیست برندها
  const brands: BrandsPrice = await getPriceMotorBrands(
    type ? String(type) : "all",
  );
  
  // دریافت قیمت‌های ۶ برند اول
  const price: Price = await getPriceMotor({
    Type: type ? String(type) : "all",
    BrandId: -1,
    PageSize: 6,
  });

  // برندهای دارای قیمت (۶ برند اول)
  const brandIdsWithPrice = new Set(price.prices?.map(p => p.brandId) || []);
  const brandsWithPrice = brands.brands?.filter(b => brandIdsWithPrice.has(b.id)) || [];
  const brandsWithoutPrice = brands.brands?.filter(b => !brandIdsWithPrice.has(b.id)) || [];

  return (
    <>
      <div className="mb-4!">
        <BreadcrumbCategory breadcrumb={[]} title={price.title} />
      </div>
      <PriceMotor
        brandsWithPrice={brandsWithPrice}
        brandsWithoutPrice={brandsWithoutPrice}
        initialPrices={price.prices || []}
        title={price.title}
        summary={price.summary}
        body={price.body}
        brandIdSearchParams={brandId}
        type={type ? String(type) : "all"}
      />
    </>
  );
}

export default pageMotorcyclePrices;