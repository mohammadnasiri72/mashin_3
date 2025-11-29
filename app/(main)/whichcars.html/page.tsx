import { getItem } from "@/services/Item/Item";
import React from "react";
import WhichCars from "./components/WhichCars";

async function pageWhichCars({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page);
  const term = String(searchParam.term);

  const whichCars: Items[] = await getItem({
    TypeId: 1045,
    langCode: "fa",
    PageIndex: page || 1,
    ...(term && term !== "undefined" && { Term: term }),
    PageSize: 15,
  });
  const popularComparisons: Items[] = await getItem({
    TypeId: 1045,
    langCode: "fa",
    PageSize: 15,
  });

  return (
    <>
      <WhichCars whichCars={whichCars} popularComparisons={popularComparisons}/>
    </>
  );
}

export default pageWhichCars;
