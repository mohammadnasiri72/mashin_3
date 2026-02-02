import { getAttachment } from "@/services/Attachment/Attachment";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getItemId } from "@/services/Item/ItemId";
import CarDetails from "../components/CarDetails";
import ContentTabs from "../components/ContentTabs";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import { getComment } from "@/services/Comment/Comment";
import { getPollId } from "@/services/Poll/pollId";
import { getItem } from "@/services/Item/Item";
import { mainDomainOld } from "@/utils/mainDomain";
import { createpublishCode } from "@/utils/func";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const id = searchParam.id;

  const detailsCar: ItemsId = await getItemId(Number(id));
  const seoUrl = `${mainDomainOld}${detailsCar?.seoUrl}`;

  if (detailsCar.title) {
    let yearText = createpublishCode(detailsCar.publishCode);

    return {
      title: `${detailsCar.seoInfo?.seoTitle ? detailsCar?.seoInfo?.seoTitle : detailsCar.sourceName + " " + detailsCar.title + " " + yearText + " | ماشین3"}`,
      description: detailsCar.seoInfo?.seoDescription,
      keywords: detailsCar.seoInfo?.seoKeywords
        ? detailsCar.seoInfo?.seoKeywords
        : detailsCar.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${detailsCar.seoInfo?.seoTitle ? detailsCar?.seoInfo?.seoTitle : detailsCar.sourceName + " " + detailsCar.title + " " + yearText + " | ماشین3"}`,
        description: detailsCar.seoInfo?.seoDescription,
      },
      other: {
        seoHeadTags: detailsCar?.seoInfo?.seoHeadTags,
      },
    };
  } else {
    return {
      title: "مشخصات خودرو",
      description: "مشخصات خودرو",
    };
  }
}

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const id = searchParam.id;
  const Attachment: ItemsAttachment[] = await getAttachment(Number(id));
  const detailsCar: ItemsId = await getItemId(Number(id));
  const detailsCarcompetitor: ItemsId[] = detailsCar.properties.filter(
    (e) => e.propertyKey === "p1042_relatedcars",
  )[0]?.value
    ? await getItemByIds(
        detailsCar.properties.filter((e) => e.propertyId === 22643)[0]?.value,
      )
    : [];

  const comments: CommentResponse[] = await getComment({
    id: Number(id),
    langCode: "fa",
    type: 0,
    pageSize: 10,
    pageIndex: 1,
  });
  const pollData: PollData = await getPollId(Number(id));

  const carsModel: Items[] = await getItem({
    TypeId: 1042,
    langCode: "fa",
    CategoryIdArray: detailsCar.sourceLink,
    PageIndex: 1,
    PageSize: 5,
  });

  return (
    <>
      <HeroSection detailsCar={detailsCar} />
      <CarDetails
        Attachment={Attachment}
        detailsCar={detailsCar}
        initialPollData={pollData}
      />
      <FeaturesSection detailsCar={detailsCar} />
      <ContentTabs
        Attachment={Attachment}
        detailsCar={detailsCar}
        detailsCarcompetitor={detailsCarcompetitor}
        comments={comments}
        id={Number(id)}
        carsModel={carsModel}
      />
    </>
  );
}

export default page;
