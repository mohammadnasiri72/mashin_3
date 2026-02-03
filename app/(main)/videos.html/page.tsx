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

  const videoCat: ItemsId | null = await getItemByUrl(decodedPathname);
  const seoUrl = `${mainDomainOld}${videoCat?.seoUrl}`;

  if (videoCat && videoCat.title) {
    return {
      title: `${videoCat.seoInfo?.seoTitle ? videoCat?.seoInfo?.seoTitle : videoCat.title + " | ماشین3"}`,
      description: videoCat.seoInfo?.seoDescription,
      keywords: videoCat.seoInfo?.seoKeywords
        ? videoCat.seoInfo?.seoKeywords
        : videoCat.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${videoCat.seoInfo?.seoTitle ? videoCat?.seoInfo?.seoTitle : videoCat.title + " | ماشین3"}`,
        description: videoCat.seoInfo?.seoDescription,
      },
      other: {
        seoHeadTags: videoCat?.seoInfo?.seoHeadTags,
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
    PageSize: 10,
  });
  const popularVideos: Items[] = await getItem({
    TypeId: 1028,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 10,
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
