import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";
import React from "react";
import CarsDetails from "../../cars/[...slug]/components/CarsDetails";

async function pageMotorcyclesDainamic({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const id = Number(searchParam.id);

  const motorBrands: ItemsCategory[] = await getCategory({
    TypeId: 1052,
    LangCode: "fa",
    ParentIdArray: id,
    PageIndex: 1,
    PageSize: 200,
  });
  const motorDetails: ItemsCategoryId = await getCategoryId(id);
  const motorView: Items[] = await getItem({
    TypeId: 1052,
    langCode: "fa",
    CategoryIdArray: String(id),
    PageIndex: 1,
    PageSize: 200,
  });

  const uniqueArray = motorBrands.filter(
    (item, index, self) => index === self.findIndex((i) => i.id === item.id)
  );
  const productsWithCategories = uniqueArray.filter((product) =>
    motorView.some((category) => category.categoryId === product.id)
  );

  return (
    <CarsDetails
      carBrands={productsWithCategories}
      carDetails={motorDetails}
      carView={motorView}
    />
  );
}

export default pageMotorcyclesDainamic;
