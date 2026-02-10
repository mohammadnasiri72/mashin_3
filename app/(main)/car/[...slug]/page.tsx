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

  const dataPage: ItemsId = await getItemId(Number(id));

  if (dataPage.title) {
    let yearText = createpublishCode(dataPage.publishCode);
    const title = `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.sourceName + " " + dataPage.title + " " + yearText + " | ماشین3"}`;
    const description = dataPage.seoInfo?.seoDescription
      ? dataPage.seoInfo?.seoDescription
      : dataPage.title;
    const keywords = dataPage.seoInfo?.seoKeywords
      ? dataPage.seoInfo?.seoKeywords
      : dataPage.seoKeywords;
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
      metadataBase: new URL(mainDomainOld),
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
  // اخبار مرتبط
  const relatedNews: Items[] = await getItem({
    TypeId: 5,
    langCode: "fa",
    Term: detailsCar.sourceName + " " + detailsCar.title,
    PageIndex: 1,
    PageSize: 12,
  });

  const relatedVideos: Items[] = await getItem({
    TypeId: 1028,
    langCode: "fa",
    Term: detailsCar.sourceName,
    PageIndex: 1,
    PageSize: 12,
  });

  const relatedComparisons: Items[] = await getItem({
    TypeId: 1045,
    langCode: "fa",
    Term: detailsCar.sourceName,
    PageSize: 15,
    PageIndex: 1,
  });

  console.log(relatedComparisons);
  

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
        relatedNews={relatedNews}
        relatedVideos={relatedVideos}
        relatedComparisons={relatedComparisons}
      />
    </>
  );
}

export default page;
