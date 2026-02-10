import { getItemId } from "@/services/Item/ItemId";
import MainBoxAutoService from "./components/MainBoxAutoService";
import { redirect } from "next/navigation";
import { getComment } from "@/services/Comment/Comment";
import { getItem } from "@/services/Item/Item";
import { getPollId } from "@/services/Poll/pollId";
import { mainDomainOld } from "@/utils/mainDomain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = param.slug[0];

  const dataPage: ItemsId = await getItemId(Number(id));

  if (dataPage.title) {
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

async function pageAutoservicesDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const param = await params;
    const id = Number(param.slug[0]);
    const detailsAuto: ItemsId = await getItemId(id);

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

    const pollData: PollData = await getPollId(Number(id));
    const Latitude = detailsAuto.properties.find(
      (e) => e.propertyKey === "p1050_latitude",
    )?.propertyValue;
    const Longitude = detailsAuto.properties.find(
      (e) => e.propertyKey === "p1050_longitude",
    )?.propertyValue;

    return (
      <>
        <div className="flex flex-wrap bg-gray-50">
          <MainBoxAutoService
            detailsAuto={detailsAuto}
            comments={comments}
            id={id}
            banner={banner}
            pollData={pollData}
            Latitude={Latitude ? Latitude : ""}
            Longitude={Longitude ? Longitude : ""}
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
