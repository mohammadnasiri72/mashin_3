import React from "react";
import EducationCar from "./components/EducationCar";
import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";

async function pageEducationTips({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = Number(param.slug[0]);
  const page = Number(searchParam.page);

  const education: Items[] = await getItem({
    TypeId: 3,
    langCode: "fa",
    ...(String(id) !== "NaN" && id > 0 && { CategoryIdArray: String(id) }),
    PageIndex: page || 1,
    PageSize: 20,
  });

  const educationCat: ItemsCategory[] = await getCategory({
    TypeId: 3,
    LangCode: "fa",
    PageIndex: 1,
    PageSize: 10,
  });

  

  return (
    <EducationCar
      education={education}
      educationCat={educationCat}
      id={String(id) !== "NaN" ? id : 0}
    />
  );
}

export default pageEducationTips;
