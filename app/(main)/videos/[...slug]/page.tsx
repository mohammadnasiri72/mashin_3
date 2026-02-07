import { getItem } from "@/services/Item/Item";
import Video from "../../videos.html/components/Video";
import VideoNotFound from "./VideoNotFound";
import BoxCatVideos from "../../videos.html/components/BoxCatVideos";
import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { mainDomainOld } from "@/utils/mainDomain";
import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = param.slug[0];
  const videoCat: ItemsCategoryId = await getCategoryId(Number(id));
  const seoUrl = `${mainDomainOld}${videoCat?.seoUrl}`;

  if (videoCat.title) {
    return {
      title: `${
        videoCat.seoTitle ? videoCat.seoTitle : videoCat.title + " | ماشین3"
      }`,
      description: videoCat.seoDescription
        ? videoCat.seoDescription
        : "فیلم های تست و بررسی خودرو",
      keywords: videoCat?.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${
          videoCat.seoTitle ? videoCat.seoTitle : videoCat.title + " | ماشین3"
        }`,
        description: videoCat.seoDescription
          ? videoCat.seoDescription
          : "فیلم های تست و بررسی خودرو",
      },
      other: {
        seoHeadTags: videoCat?.headTags,
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
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = param.slug[0];
  const page = Number(searchParam.page);
  const term = String(searchParam.term);

  let videos: Items[] = [];
  try {
    videos = await getItem({
      TypeId: 1028,
      langCode: "fa",
      CategoryIdArray: id,
      PageIndex: page || 1,
      ...(term && term !== "undefined" && { Term: term }),
      PageSize: 10,
    });
  } catch (err) {
    return <VideoNotFound />;
  }

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
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

  const videoCat: ItemsCategoryId = await getCategoryId(Number(id));

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
