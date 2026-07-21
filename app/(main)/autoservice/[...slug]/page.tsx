import { getComment } from "@/services/Comment/Comment";
import { getItem } from "@/services/Item/Item";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { ItemVisit } from "@/services/Item/ItemVisit";
import { getPollId } from "@/services/Poll/pollId";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import MainBoxAutoService from "./components/MainBoxAutoService";

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
      title: "مراکز و نمایندگی های خدمات خودرو",
      description: "مراکز و نمایندگی های خدمات خودرو",
    };
  }
}

async function pageAutoservicesDetails() {
  try {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname");
    const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

    const detailsAuto: ItemsId | ItemsCategoryId | null =
      await getItemByUrl(decodedPathname);
    if (!detailsAuto) {
      return notFound();
    }
    const id = Number(detailsAuto.id);

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

    const pollData: PollData = await getPollId(Number(id));

    try {
      await ItemVisit({
        langCode: "fa",
        id,
        ip: "",
        url: detailsAuto.url,
        userAgent: "",
      });
    } catch (error) {
      console.error("Error recording visit:", error);
    }

    return (
      <>
        <div className="flex flex-wrap bg-gray-50">
          <MainBoxAutoService
            detailsAuto={detailsAuto}
            comments={comments}
            id={id}
            banner={banner}
            pollData={pollData}
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

export default pageAutoservicesDetails;
