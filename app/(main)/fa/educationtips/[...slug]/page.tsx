import React from "react";
import EducationCar from "./components/EducationCar";
import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import { getCategoryId } from "@/services/Category/CategoryId";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);

  if (isNaN(id)) {
    return {
      title: "ماشین3 - آموزش و نکات فنی",
      description:
        "جامع‌ترین منبع آموزشی برای نگهداری، تعمیر و رانندگی حرفه‌ای با خودرو و موتورسیکلت",
    };
  } else {
    const eduDetails: ItemsCategoryId = await getCategoryId(id);
    if (eduDetails.title) {
      return {
        title: `ماشین3 - ${
          eduDetails.seoTitle ? eduDetails.seoTitle : eduDetails.title
        }`,
        description: eduDetails.seoDescription,
        openGraph: {
          title: `ماشین3 - ${
            eduDetails.seoTitle ? eduDetails.seoTitle : eduDetails.title
          }`,
          description: eduDetails.seoDescription,
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
}

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
  const educationPopular: Items[] = await getItem({
    TypeId: 3,
    langCode: "fa",
    ...(String(id) !== "NaN" && id > 0 && { CategoryIdArray: String(id) }),
    PageIndex: page || 1,
    PageSize: 10,
    OrderBy: 8,
  });

  const educationCat: ItemsCategory[] = await getCategory({
    TypeId: 3,
    LangCode: "fa",
    PageIndex: 1,
    PageSize: 10,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  return (
    <EducationCar
      education={education}
      educationPopular={educationPopular}
      educationCat={educationCat}
      id={String(id) !== "NaN" ? id : 0}
      banner={banner}
    />
  );
}

export default pageEducationTips;
