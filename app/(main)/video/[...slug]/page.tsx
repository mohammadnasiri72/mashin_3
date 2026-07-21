import { getAttachment } from "@/services/Attachment/Attachment";
import { getComment } from "@/services/Comment/Comment";
import { getItem } from "@/services/Item/Item";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { ItemVisit } from "@/services/Item/ItemVisit";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import VideoDetails from "./components/VideoDetails";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const dataPage: ItemsId | ItemsCategoryId | null =
    await getItemByUrl(decodedPathname);

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
      title: "ماشین3 - جزئیات ویدئو",
      description: "جزئیات ویدئو",
    };
  }
}

async function pageVideo() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const video: ItemsId | ItemsCategoryId | null =
    await getItemByUrl(decodedPathname);
  if (!video) {
    return notFound();
  }

  const id = Number(video.id);
  const attachment: ItemsAttachment[] = await getAttachment(id);

  const idsCars = video.properties.find(
    (e) => e.propertyKey === "p1027_relatedcar",
  )?.propertyValue;
  const idsPodcasts = video.properties.find(
    (e) => e.propertyKey === "p1027_videopodcastfile",
  )?.propertyValue;
  const idsCompares = video.properties.find(
    (e) => e.propertyKey === "p1027_vidrelatedcompare",
  )?.propertyValue;

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
    FullData: true,
  });

  // کامنت ها
  const comments: CommentResponse[] = await getComment({
    id: Number(id),
    langCode: "fa",
    type: 0,
    pageSize: 20,
    pageIndex: 1,
  });

  // محبوبترین ویدئوها
  const popularVideos: Items[] = await getItem({
    TypeId: 1028,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 5,
    OrderBy: 8,
  });

  // ویدئوهای مرتبط
  const relatedVideos: Items[] = await getItem({
    TypeId: 1028,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 13,
    CategoryIdArray: String(video.categoryId),
  });

  // خودروهای مرتبط
  const relatedCars: ItemsId[] = idsCars ? await getItemByIds(idsCars) : [];

  // پادکست های مرتبط
  const relatedPodcasts: ItemsId[] = idsPodcasts
    ? await getItemByIds(idsPodcasts)
    : [];

  // مقایسه های مرتبط
  const relatedCompares: ItemsId[] = idsCompares
    ? await getItemByIds(idsCompares)
    : [];

  try {
    await ItemVisit({
      langCode: "fa",
      id,
      ip: "",
      url: video.url,
      userAgent: "",
    });
  } catch (error) {
    console.error("Error recording visit:", error);
  }

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
        id={id}
        relatedCars={relatedCars}
        relatedPodcasts={relatedPodcasts}
        relatedCompares={relatedCompares}
        attachment={attachment}
      />
    </>
  );
}

export default pageVideo;
