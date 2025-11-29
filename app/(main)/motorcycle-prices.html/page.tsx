import { getCategory } from "@/services/Category/Category";
import PriceListMotor from "./components/PriceListMotor";

async function pageMotorcyclePrices() {
  const brand: ItemsCategory[] = await getCategory({
    TypeId: 1052,
    LangCode: "fa",
    ParentIdArray: 6059,
    PageIndex: 1,
    PageSize: 200,
  });

  return (
    <>
      <PriceListMotor brand={brand} />
    </>
  );
}

export default pageMotorcyclePrices;
