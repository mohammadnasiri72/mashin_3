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

  const detailsAuto: ItemsId = await getItemId(Number(id));
  const seoUrl = `${mainDomainOld}${detailsAuto?.seoUrl}`;

  if (detailsAuto.title) {
    return {
      title: `${detailsAuto.seoInfo?.seoTitle ? detailsAuto?.seoInfo?.seoTitle : detailsAuto.title + " | ماشین3"}`,
      description: detailsAuto.seoInfo?.seoDescription ? detailsAuto.seoInfo?.seoDescription : "مراکز و نمایندگی های خدمات خودرو",
      keywords: detailsAuto.seoInfo?.seoKeywords
        ? detailsAuto.seoInfo?.seoKeywords
        : detailsAuto.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${detailsAuto.seoInfo?.seoTitle ? detailsAuto?.seoInfo?.seoTitle : detailsAuto.title + " | ماشین3"}`,
        description: detailsAuto.seoInfo?.seoDescription ? detailsAuto.seoInfo?.seoDescription : "مراکز و نمایندگی های خدمات خودرو",
      },
      other: {
        seoHeadTags: detailsAuto?.seoInfo?.seoHeadTags,
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
