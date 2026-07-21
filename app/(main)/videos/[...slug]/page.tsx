import { getItem } from "@/services/Item/Item";
import Video from "../../videos.html/components/Video";
import VideoNotFound from "./VideoNotFound";
import BoxCatVideos from "../../videos.html/components/BoxCatVideos";
import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { mainDomainOld } from "@/utils/mainDomain";
import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { headers } from "next/headers";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const dataPage: ItemsId | ItemsCategoryId | null =
    await getItemByUrl(decodedPathname);

  if (dataPage && dataPage.title) {
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
      title: "ماشین3 -  فیلم های تست و بررسی خودرو",
      description: "فیلم های تست و بررسی خودرو",
    };
  }
}

async function pageVideosDainamic({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const videoCat: ItemsId | ItemsCategoryId | null =
    await getItemByUrl(decodedPathname);
 if (!videoCat) {
    return notFound();
  }
const id =
    videoCat.typeUrl === "item" ? 0 : Number(videoCat.id);


  const searchParam = await searchParams;
  const page = Number(searchParam.page);
  const term = String(searchParam.term);

  let videos: Items[] = [];
  try {
    videos = await getItem({
      TypeId: 1028,
      langCode: "fa",
      CategoryIdArray: String(id),
      PageIndex: page || 1,
      ...(term && term !== "undefined" && { Term: term }),
      PageSize: 12,
    });
  } catch (err) {
    return <VideoNotFound />;
  }

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
    FullData: true,
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


  return (
    <>
      <div className="mb-4!">
        <BreadcrumbCategory
          breadcrumb={videoCat.breadcrumb}
          title={videoCat.title}
        />
      </div>
      <div className="bg-[#f4f4f4]">
        <Video
          popularVideos={popularVideos}
          videos={videos}
          banner={banner}
          titleCat={videoCat.title}
        />
        <BoxCatVideos videosCat={videosCat} />
      </div>
    </>
  );
}

export default pageVideosDainamic;
