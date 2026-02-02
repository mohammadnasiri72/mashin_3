import { getAttachment } from "@/services/Attachment/Attachment";
import { getItemId } from "@/services/Item/ItemId";
import NewsViewDetails from "./components/NewsViewDetails";
import { getItem } from "@/services/Item/Item";
import { getComment } from "@/services/Comment/Comment";
import { mainDomainOld } from "@/utils/mainDomain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);

  const newsDetails: ItemsId = await getItemId(id);
  const seoUrl = `${mainDomainOld}${newsDetails?.seoUrl}`;

  if (newsDetails.title) {
    return {
      title: `${newsDetails.seoInfo?.seoTitle ? newsDetails?.seoInfo?.seoTitle : newsDetails.title + " | ماشین3"}`,
      description: newsDetails.seoInfo?.seoDescription,
      keywords: newsDetails.seoInfo?.seoKeywords
        ? newsDetails.seoInfo?.seoKeywords
        : newsDetails.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${newsDetails.seoInfo?.seoTitle ? newsDetails?.seoInfo?.seoTitle : newsDetails.title + " | ماشین3"}`,
        description: newsDetails.seoInfo?.seoDescription,
      },
      other: {
        seoHeadTags: newsDetails?.seoInfo?.seoHeadTags,
      },
    };
  } else {
    return {
      title: "ماشین3 - اخبار خودرو",
      description: "آخرین اخبار و تحلیل‌های بازار خودرو ایران",
    };
  }
}

async function pageNewsViewDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);
  const detailsNews: ItemsId = await getItemId(Number(id));

  let relatedNews: Items[] = [];

  if (detailsNews.categoryId) {
    relatedNews = await getItem({
      TypeId: 5,
      langCode: "fa",
      PageIndex: 1,
      PageSize: 15,
      CategoryIdArray: String(detailsNews.categoryId),
    });
  }

  const popularNews: Items[] = await getItem({
    TypeId: 5,
    langCode: "fa",
    OrderBy: 8,
    PageIndex: 1,
    PageSize: 5,
  });
  const Attachment: ItemsAttachment[] = await getAttachment(id);

  const comments: CommentResponse[] = await getComment({
    id: Number(id),
    langCode: "fa",
    type: 0,
    pageSize: 20,
    pageIndex: 1,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  return (
    <NewsViewDetails
      detailsNews={detailsNews}
      Attachment={Attachment}
      popularNews={popularNews}
      comments={comments}
      id={Number(id)}
      banner={banner}
      relatedNews={relatedNews}
    />
  );
}

export default pageNewsViewDetails;
