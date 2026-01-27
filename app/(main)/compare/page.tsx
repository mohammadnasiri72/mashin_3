import React from "react";
import SelectCarCompare from "./[...slug]/components/SelectCarCompare";
import { getCategory } from "@/services/Category/Category";

async function pageCompare() {
  const brandsCar: ItemsCategory[] = await getCategory({
    TypeId: 1042,
    LangCode: "fa",
    ParentIdArray: 6058,
    PageIndex: 1,
    PageSize: 200,
  });
  return (
    <>
      <SelectCarCompare dataCompare={[]} brandsCar={brandsCar} ids={""} />
    </>
  );
}

export default pageCompare;
