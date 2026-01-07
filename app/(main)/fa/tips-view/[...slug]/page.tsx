import { getItem } from "@/services/Item/Item";
import { getItemId } from "@/services/Item/ItemId";
import React from "react";
import EducationView from "./components/EducationView";
import { getComment } from "@/services/Comment/Comment";

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
  console.log(education);

  const popularEducations: Items[] = await getItem({
    TypeId: 3,
    langCode: "fa",
    CategoryIdArray: String(education.categoryId),
    PageIndex: 1,
    PageSize: 10,
    OrderBy: 8,
  });
  const relatedEducations: Items[] = await getItem({
    TypeId: 3,
    langCode: "fa",
    CategoryIdArray: String(education.categoryId),
    PageIndex: 1,
    PageSize: 10,
  });

  const comments: CommentResponse[] = await getComment({
    id: Number(id),
    langCode: "fa",
    type: 0,
    pageSize: 10,
    pageIndex: 1,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  return (
    <EducationView
      education={education}
      popularEducations={popularEducations.filter((e) => e.id !== education.id)}
      relatedEducations={relatedEducations.filter((e) => e.id !== education.id)}
      id={id}
      comments={comments}
      banner={banner}
    />
  );
}

export default pageTipView;
