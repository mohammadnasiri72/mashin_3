import { getItem } from "@/services/Item/Item";
import React from "react";
import WhichCars from "./components/WhichCars";

export async function generateMetadata() {
  return {
    title: "ماشین3 - مقایسه خودرو",
    description: "مقایسه تخصصی خودروها برای کمک به انتخاب بهترین گزینه خرید",
  };
}

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
    PageIndex: 1,
    OrderBy: 8,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  return (
    <>
      <WhichCars
        whichCars={whichCars}
        popularComparisons={popularComparisons}
        banner={banner}
      />
    </>
  );
}

export default pageWhichCars;
