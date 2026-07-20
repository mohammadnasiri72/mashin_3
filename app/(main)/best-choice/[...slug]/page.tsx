import { getAttachment } from "@/services/Attachment/Attachment";
import { getComment } from "@/services/Comment/Comment";
import { getItem } from "@/services/Item/Item";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { ItemVisit } from "@/services/Item/ItemVisit";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import MainBoxBestChoice from "./components/MainBoxBestChoice";

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
      title: "بهترین انتخاب | ماشین3",
      description: "بهترین انتخاب",
    };
  }
}

async function pageBestChoice() {
  try {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname");
    const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

    const detailsBest: ItemsId | null = await getItemByUrl(decodedPathname);
    if (!detailsBest) {
      return notFound();
    }
    const id = Number(detailsBest.id);

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
      FullData: true,
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

    const lastNews: Items[] = await getItem({
      TypeId: 5,
      langCode: "fa",
      PageIndex: 1,
      PageSize: 7,
    });

    const lastCars: Items[] = await getItem({
      TypeId: 1042,
      langCode: "fa",
      PageIndex: 1,
      PageSize: 7,
    });

    try {
      await ItemVisit({
        langCode: "fa",
        id,
        ip: "",
        url: detailsBest.url,
        userAgent: "",
      });
    } catch (error) {
      console.error("Error recording visit:", error);
    }

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
            lastNews={lastNews}
            lastCars={lastCars}
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
