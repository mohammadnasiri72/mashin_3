import { getComment } from "@/services/Comment/Comment";
import { getItem } from "@/services/Item/Item";
import { getItemId } from "@/services/Item/ItemId";
import { mainDomainOld } from "@/utils/mainDomain";
import { redirect } from "next/navigation";
import React from "react";
import MainBoxBestChoice from "./components/MainBoxBestChoice";
import { getAttachment } from "@/services/Attachment/Attachment";
import { getItemByIds } from "@/services/Item/ItemByIds";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = param.slug[0];

  const detailsBest: ItemsId = await getItemId(Number(id));
  const seoUrl = `${mainDomainOld}${detailsBest?.seoUrl}`;

  if (detailsBest.title) {
    return {
      title: `${detailsBest.seoInfo?.seoTitle ? detailsBest?.seoInfo?.seoTitle : detailsBest.title + " | ماشین3"}`,
      description: detailsBest.seoInfo?.seoDescription
        ? detailsBest.seoInfo?.seoDescription
        : "بهترین انتخاب",
      keywords: detailsBest.seoInfo?.seoKeywords
        ? detailsBest.seoInfo?.seoKeywords
        : detailsBest.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${detailsBest.seoInfo?.seoTitle ? detailsBest?.seoInfo?.seoTitle : detailsBest.title + " | ماشین3"}`,
        description: detailsBest.seoInfo?.seoDescription
          ? detailsBest.seoInfo?.seoDescription
          : "بهترین انتخاب",
      },
      other: {
        seoHeadTags: detailsBest?.seoInfo?.seoHeadTags,
      },
    };
  } else {
    return {
      title: "بهترین انتخاب | ماشین3",
      description: "بهترین انتخاب",
    };
  }
}

async function pageBestChoice({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const param = await params;
    const id = Number(param.slug[0]);
    const detailsBest: ItemsId = await getItemId(id);

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
    const Attachment: ItemsAttachment[] = await getAttachment(id);

    const ids = detailsBest.properties.find(
      (e) => e.propertyKey === "p1043_relatedcars",
    )?.propertyValue;

    let competitorsCar: ItemsId[] = [];
    if (ids) {
      competitorsCar = await getItemByIds(ids);
    }

    const popularBestChoices: Items[] = await getItem({
      TypeId: 1043,
      langCode: "fa",
      PageSize: 5,
      PageIndex: 1,
      OrderBy: 8,
    });

    return (
      <>
        <div className="flex flex-wrap bg-gray-50">
          <MainBoxBestChoice
            detailsBest={detailsBest}
            comments={comments}
            id={id}
            banner={banner}
            Attachment={Attachment}
            competitorsCar={competitorsCar}
            popularBestChoices={popularBestChoices}
          />
        </div>
      </>
    );
  } catch (error: any) {
    // استخراج status code از خطا
    const status = error.response?.status || error.status || 500;

    // ریدایرکت مستقیم به صفحه خطا
    redirect(`/error?status=${status}`);
  }
}

export default pageBestChoice;
