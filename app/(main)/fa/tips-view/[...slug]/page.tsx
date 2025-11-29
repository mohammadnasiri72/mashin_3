import { getItem } from "@/services/Item/Item";
import { getItemId } from "@/services/Item/ItemId";
import React from "react";
import EducationView from "./components/EducationView";

async function pageTipView({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = Number(param.slug[0]);

  const education: ItemsId = await getItemId(id);
 const educations: Items[] = await getItem({
     TypeId: 3,
     langCode: "fa",
     PageIndex: 1,
     PageSize: 10,
   });

  return <EducationView education={education} educations={educations}/>;
}

export default pageTipView;
