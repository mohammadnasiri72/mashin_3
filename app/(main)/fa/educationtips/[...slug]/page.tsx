import React from "react";
import EducationCar from "./components/EducationCar";
import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import { getCategoryId } from "@/services/Category/CategoryId";
import { mainDomainOld } from "@/utils/mainDomain";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { headers } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  if (isNaN(id)) {
    const dataPage: ItemsId = await getItemByUrl(decodedPathname);
    const seoUrl = `${mainDomainOld}${dataPage?.seoUrl}`;
    if (dataPage.title) {
      return {
        title: `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`,
        description: dataPage.seoInfo?.seoDescription,
        keywords: dataPage.seoInfo?.seoKeywords
          ? dataPage.seoInfo?.seoKeywords
          : dataPage.seoKeywords,
        metadataBase: new URL(mainDomainOld),
        alternates: {
          canonical: seoUrl,
        },
        openGraph: {
          title: `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`,
          description: dataPage.seoInfo?.seoDescription,
        },
        other: {
          seoHeadTags: dataPage?.seoInfo?.seoHeadTags,
        },
      };
    } else {
      return {
        title: "ماشین3 - آموزش و نکات فنی",
        description:
          "جامع‌ترین منبع آموزشی برای نگهداری، تعمیر و رانندگی حرفه‌ای با خودرو و موتورسیکلت",
      };
    }
  } else {
    const eduDetails: ItemsCategoryId = await getCategoryId(id);
    const seoUrl = `${mainDomainOld}${eduDetails?.seoUrl}`;
    if (eduDetails.title) {
      return {
        title: `${
          eduDetails.seoTitle
            ? eduDetails.seoTitle
            : eduDetails.title + " | ماشین3"
        }`,
        description: eduDetails.seoDescription,
        keywords: eduDetails?.seoKeywords,
        metadataBase: new URL(mainDomainOld),
        alternates: {
          canonical: seoUrl,
        },
        openGraph: {
          title: `${
            eduDetails.seoTitle
              ? eduDetails.seoTitle
              : eduDetails.title + " | ماشین3"
          }`,
          description: eduDetails.seoDescription,
        },
        other: {
          seoHeadTags: eduDetails?.headTags,
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

  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const educationDetails: ItemsId | ItemsCategoryId = isNaN(id)
    ? await getItemByUrl(decodedPathname)
    : await getCategoryId(id);

  return (
    <>
      <BreadcrumbCategory
        breadcrumb={educationDetails.breadcrumb}
        title={educationDetails.title}
      />
      <EducationCar
        education={education}
        educationPopular={educationPopular}
        educationCat={educationCat}
        id={String(id) !== "NaN" ? id : 0}
        banner={banner}
      />
    </>
  );
}

export default pageEducationTips;
