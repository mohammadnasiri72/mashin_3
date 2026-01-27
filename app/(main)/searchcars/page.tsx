import React from "react";
import SearchCarsDetails from "./components/SearchCarsDetails";
import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";

async function pageSearchCars({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const id = Number(searchParam.id);
  const type = Number(searchParam.type);
  const carBrands: ItemsCategory[] = await getCategory({
    TypeId: 1042,
    LangCode: "fa",
    ParentIdArray: 6058,
    PageIndex: 1,
    PageSize: 200,
  });
  const carDetails: ItemsCategoryId = await getCategoryId(id);
  const carView: Items[] = await getItem({
    TypeId: 1042,
    langCode: "fa",
    CategoryIdArray: String(id),
    PageIndex: 1,
    PageSize: 200,
    ...(type && { FilterProps: `22690=${type}` }),
  });
  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  const segmentCars: Items[] = await getItem({
    TypeId: 1048,
    langCode: "fa",
  });

  return (
    <>
      <SearchCarsDetails
        carBrands={carBrands}
        carDetails={carDetails}
        carView={carView}
        banner={banner}
        segmentCars={segmentCars}
        initialtype={type}
      />
    </>
  );
}

export default pageSearchCars;
