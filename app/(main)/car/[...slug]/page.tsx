import { getAttachment } from "@/services/Attachment/Attachment";
import { getComment } from "@/services/Comment/Comment";
import { getItemId } from "@/services/Item/ItemId";
import { getPollId } from "@/services/Poll/pollId";
import { createpublishCode } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Suspense } from "react";
import CarDetails from "../components/CarDetails";
import ContentTabsSSR from "../components/ContentTabsSSR";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";

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
  const id = Number(searchParam.id);

  const [Attachment, detailsCar, comments, pollData] = await Promise.all([
    getAttachment(id),
    getItemId(id),
    getComment({
      id,
      langCode: "fa",
      type: 0,
      pageSize: 10,
      pageIndex: 1,
    }),
    getPollId(id),
  ]);

  return (
    <>
      <HeroSection detailsCar={detailsCar} />
      <CarDetails
        Attachment={Attachment.filter((e) => e.tabId === 1 || e.tabId === 3)}
        detailsCar={detailsCar}
        initialPollData={pollData}
      />
      <Suspense fallback={<div className="h-40 animate-pulse bg-gray-200" />}>
        <FeaturesSection
          detailsCar={detailsCar}
          Attachment={Attachment.filter((e) => e.tabId === 4)}
        />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-gray-200" />}>
        <ContentTabsSSR
          Attachment={Attachment}
          detailsCar={detailsCar}
          comments={comments}
          id={id}
        />
      </Suspense>
    </>
  );
}

export default page;
