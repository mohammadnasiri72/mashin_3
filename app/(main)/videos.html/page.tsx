import React from "react";
import Video from "./components/Video";
import { getItem } from "@/services/Item/Item";
import { getCategory } from "@/services/Category/Category";
import BoxCatVideos from "./components/BoxCatVideos";
import { headers } from "next/headers";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { mainDomainOld } from "@/utils/mainDomain";
import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

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
      title: "ماشین3 -  فیلم های تست و بررسی خودرو",
      description: " فیلم های تست و بررسی خودرو",
    };
  }
}

async function pageVideo({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page);
  const term = String(searchParam.term);

  const videos: Items[] = await getItem({
    TypeId: 1028,
    langCode: "fa",
    PageIndex: page || 1,
    ...(term && term !== "undefined" && { Term: term }),
    PageSize: 12,
  });
  const popularVideos: Items[] = await getItem({
    TypeId: 1028,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 5,
    OrderBy: 8,
  });
  const videosCat: ItemsCategory[] = await getCategory({
    TypeId: 1028,
    LangCode: "fa",
    PageIndex: 1,
    PageSize: 200,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const videoCat: ItemsId | null = await getItemByUrl(decodedPathname);

  return (
    <>
      {videoCat && (
        <div className="mb-4!">
          <BreadcrumbCategory
            breadcrumb={videoCat.breadcrumb}
            title={videoCat.title}
          />
        </div>
      )}
      <div className="bg-[#f4f4f4]">
        <Video
          popularVideos={popularVideos}
          videos={videos}
          banner={banner}
          titleCat={""}
        />
        <BoxCatVideos videosCat={videosCat} />
      </div>
    </>
  );
}

export default pageVideo;
