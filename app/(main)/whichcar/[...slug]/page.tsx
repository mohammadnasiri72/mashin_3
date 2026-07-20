import { getComment } from "@/services/Comment/Comment";
import { getItem } from "@/services/Item/Item";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { ItemVisit } from "@/services/Item/ItemVisit";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import CompareCars from "./components/CompareCars";

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
      title: "ماشین3 - مقایسه خودرو",
      description: "مقایسه تخصصی خودروها برای کمک به انتخاب بهترین گزینه خرید",
    };
  }
}

async function pageWhichcarsDainamic() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const whichcars: ItemsId | null = await getItemByUrl(decodedPathname);
  if (!whichcars) {
    return notFound();
  }
  const id = Number(whichcars.id);

  if (String(id) === "NaN") {
    return <>موجود نیست</>;
  }

  const ids = whichcars.properties.find(
    (w) => w.propertyKey === "p1045_whichcar",
  )?.propertyValue;

  const dataCompare: ItemsId[] = ids ? await getItemByIds(String(ids)) : [];

  const idsVideos = whichcars.properties.find(
    (e) => e.propertyKey === "p1045_comrelatedvideos",
  )?.propertyValue;

  const idsVoices = whichcars.properties.find(
    (e) => e.propertyKey === "p1045_whichcarpodcastfile",
  )?.propertyValue;

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
    FullData: true,
  });

  const comments: CommentResponse[] = await getComment({
    id: Number(id),
    langCode: "fa",
    type: 0,
    pageSize: 20,
    pageIndex: 1,
  });
  // ویدئوهای مرتبط
  const relatedVideos: ItemsId[] = idsVideos
    ? await getItemByIds(idsVideos)
    : [];

  // پادکست‌های مرتبط
  const relatedVoices: ItemsId[] = idsVoices
    ? await getItemByIds(idsVoices)
    : [];

  // اخبار مرتبط
  // const relatedNews: Items[] = await getItem({
  //   TypeId: 5,
  //   langCode: "fa",
  //   Term: dataCompare[1].title,
  //   PageIndex: 1,
  //   PageSize: 12,
  // });

  // محبوب ترین مقایسه ها
  const popularComparisons: Items[] = await getItem({
    TypeId: 1045,
    langCode: "fa",
    PageSize: 5,
    PageIndex: 1,
    OrderBy: 8,
  });

  // مقایسه های مرتبط
  const ralatedComparisons: Items[] = await getItem({
    TypeId: 1045,
    langCode: "fa",
    PageSize: 13,
    PageIndex: 1,
    CategoryIdArray: String(whichcars.categoryId),
  });

  try {
    await ItemVisit({
      langCode: "fa",
      id,
      ip: "",
      url: whichcars.url,
      userAgent: "",
    });
  } catch (error) {
    console.error("Error recording visit:", error);
  }

  return (
    <>
      <CompareCars
        whichcars={whichcars}
        dataCompare={dataCompare}
        popularComparisons={popularComparisons}
        ralatedComparisons={ralatedComparisons
          .filter((e) => e.id !== id)
          .slice(0, 12)}
        comments={comments}
        id={Number(id)}
        banner={banner}
        relatedVideos={relatedVideos}
        relatedVoices={relatedVoices}
      />
    </>
  );
}

export default pageWhichcarsDainamic;
