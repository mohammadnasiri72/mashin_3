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
    const dataPage: ItemsId | null = await getItemByUrl(decodedPathname);

    if (dataPage && dataPage.title) {
      const title = `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`;
      const description = dataPage.seoInfo?.seoDescription
        ? dataPage.seoInfo?.seoDescription
        : dataPage.title;
      const keywords = dataPage.seoInfo?.seoKeywords
        ? dataPage.seoInfo?.seoKeywords
        : dataPage.seoKeywords;
      const metadataBase = new URL(mainDomainOld);
      const seoUrl = dataPage?.seoUrl
        ? `${mainDomainOld}${dataPage?.seoUrl}`
        : dataPage?.url
          ? `${mainDomainOld}${dataPage?.url}`
          : `${mainDomainOld}`;
      const seoHeadTags = dataPage?.seoInfo?.seoHeadTags;

      return {
        title,
        description,
        keywords,
        metadataBase,
        alternates: {
          canonical: seoUrl,
        },
        openGraph: {
          title,
          description,
        },
        other: {
          seoHeadTags,
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
    const dataPage: ItemsCategoryId = await getCategoryId(id);

    if (dataPage.title) {
      const title = `${
        dataPage.seoTitle ? dataPage.seoTitle : dataPage.title + " | ماشین3"
      }`;
      const description = dataPage.seoDescription
        ? dataPage.seoDescription
        : dataPage.title;
      const keywords = dataPage?.seoKeywords;
      const metadataBase = new URL(mainDomainOld);
      const seoUrl = dataPage?.seoUrl
        ? `${mainDomainOld}${dataPage?.seoUrl}`
        : dataPage?.url
          ? `${mainDomainOld}${dataPage?.url}`
          : `${mainDomainOld}`;
      const seoHeadTags = dataPage?.headTags;

      return {
        title,
        description,
        keywords,
        metadataBase,
        alternates: {
          canonical: seoUrl,
        },
        openGraph: {
          title,
          description,
        },
        other: {
          seoHeadTags,
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

  const educationDetails: ItemsId | ItemsCategoryId | null = isNaN(id)
    ? await getItemByUrl(decodedPathname)
    : await getCategoryId(id);

  return (
    <>
      {educationDetails && (
        <BreadcrumbCategory
          breadcrumb={educationDetails.breadcrumb}
          title={educationDetails.title}
        />
      )}
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
