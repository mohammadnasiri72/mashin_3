import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getItemFindByTerm } from "@/services/Item/ItemFindByTerm";
import React from "react";
import MainPageTags from "./components/MainPageTags";
import { getItem } from "@/services/Item/Item";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const term = decodeURIComponent(param.slug[0])
    .slice(0, decodeURIComponent(param.slug[0]).indexOf("."))
    .replaceAll("-", " ");
  return {
    title: term ? term : "کلید واژه‌ها | ماشین3",
    description: "جستجوی کلید واژه‌ها",
  };
}

async function pageTag({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
   const searchParam = await searchParams;
   const page = Number(searchParam.page);
  const term = decodeURIComponent(param.slug[0])
    .slice(0, decodeURIComponent(param.slug[0]).indexOf("."))
    .replaceAll("-", " ");

  const keyWord: ItemsFindByTerm[] = await getItemFindByTerm({
    langCode: "fa",
    pageIndex: page || 1,
    pageSize: 20,
    term,
    typeId: -2,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  return (
    <>
      <BreadcrumbCategory breadcrumb={[]} title={"جستجو"} />
      <MainPageTags term={term} banner={banner} keyWord={keyWord} />
    </>
  );
}

export default pageTag;
