import { getItem } from "@/services/Item/Item";
import { getItemId } from "@/services/Item/ItemId";
import React from "react";
import EducationView from "./components/EducationView";
import { getComment } from "@/services/Comment/Comment";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);

  const education: ItemsId = await getItemId(id);
  if (education.title) {
    return {
      title: `ماشین3 - ${
        education.seoTitle ? education.seoTitle : education.title
      }`,
      description: education.seoDescription,
      openGraph: {
        title: `ماشین3 - ${
          education.seoTitle ? education.seoTitle : education.title
        }`,
        description: education.seoDescription,
      },
    };
  } else {
    return {
      title: "ماشین3 - آموزش و نکات فنی",
      description:
        "جامع‌ترین منبع آموزشی برای نگهداری، تعمیر و رانندگی حرفه‌ای با خودرو و موتورسیکلت",
    };
  }
}

async function pageTipView({ params }: { params: Promise<{ slug: string }> }) {
  const param = await params;
  const id = Number(param.slug[0]);

  const education: ItemsId = await getItemId(id);

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
