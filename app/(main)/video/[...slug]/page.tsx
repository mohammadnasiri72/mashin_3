import { getItem } from "@/services/Item/Item";
import { getItemId } from "@/services/Item/ItemId";
import VideoDetails from "./components/VideoDetails";
import { getComment } from "@/services/Comment/Comment";
import { mainDomainOld } from "@/utils/mainDomain";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = Number(searchParam.id);
  const id2 = Number(param.slug[0]);
  const video: ItemsId = await getItemId(id || id2);
  const seoUrl = `${mainDomainOld}${video?.seoUrl}`;

  if (video.title) {
    return {
      title: `${video.seoInfo?.seoTitle ? video?.seoInfo?.seoTitle : video.title + " | ماشین3"}`,
      description: video.seoInfo?.seoDescription ? video.seoInfo?.seoDescription : "جزئیات ویدئو",
      keywords: video.seoInfo?.seoKeywords
        ? video.seoInfo?.seoKeywords
        : video.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${video.seoInfo?.seoTitle ? video?.seoInfo?.seoTitle : video.title + " | ماشین3"}`,
        description: video.seoInfo?.seoDescription ? video.seoInfo?.seoDescription : "جزئیات ویدئو",
      },
      other: {
        seoHeadTags: video?.seoInfo?.seoHeadTags,
      },
    };
  } else {
    return {
      title: "ماشین3 - جزئیات ویدئو",
      description: "جزئیات ویدئو",
    };
  }
}

async function pageVideo({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = Number(searchParam.id);
  const id2 = Number(param.slug[0]);
  const video: ItemsId = await getItemId(id || id2);
  const popularVideos: Items[] = await getItem({
    TypeId: 1028,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 5,
    OrderBy: 8,
  });
  const relatedVideos: Items[] = await getItem({
    TypeId: 1028,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 13,
    CategoryIdArray: String(video.categoryId),
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  const comments: CommentResponse[] = await getComment({
    id: Number(id),
    langCode: "fa",
    type: 0,
    pageSize: 20,
    pageIndex: 1,
  });

  return (
    <>
      <VideoDetails
        video={video}
        popularVideos={popularVideos}
        relatedVideos={relatedVideos
          .filter((e) => e.id !== video.id)
          .slice(0, 12)}
        banner={banner}
        comments={comments}
        id={id2}
      />
    </>
  );
}

export default pageVideo;
