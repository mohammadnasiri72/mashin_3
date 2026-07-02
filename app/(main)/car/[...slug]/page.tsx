// app/car/page.tsx
import { getAttachment } from "@/services/Attachment/Attachment";
import { getComment } from "@/services/Comment/Comment";
import { getItemId, getItemSeoId } from "@/services/Item/ItemId";
import { getPollId } from "@/services/Poll/pollId";
import { mainDomainOld } from "@/utils/mainDomain";
import { Suspense } from "react";
import CarDetails from "../components/CarDetails";
import ContentTabsSSR from "../components/ContentTabsSSR";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import NvbarCar from "../components/NvbarCar";
import { decodeHtmlServer } from "@/utils/func";
import { ItemVisit } from "@/services/Item/ItemVisit";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const id = searchParam.id;

  const dataPage = await getItemSeoId(Number(id));

  if (dataPage.title) {
    const title = decodeHtmlServer(
      `${dataPage.seoTitle ? dataPage?.seoTitle : dataPage.title}`,
    );
    const description = decodeHtmlServer(
      dataPage.seoDescription ? dataPage.seoDescription : dataPage.title,
    );
    const keywords = decodeHtmlServer(dataPage.seoKeywords || "");
    const seoUrl = decodeHtmlServer(
      dataPage?.seoUrl
        ? `${mainDomainOld}${dataPage?.seoUrl}`
        : dataPage?.url
          ? `${mainDomainOld}${dataPage?.url}`
          : `${mainDomainOld}`,
    );

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
        seoHeadTags: dataPage?.seoHeadTags,
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
      pageSize: 20,
      pageIndex: 1,
    }),
    getPollId(id),
  ]);


  try {
    await ItemVisit({
      langCode: "fa",
      id,
      ip: "",
      url: detailsCar.url,
      userAgent:''
    });
  } catch (error) {
    console.error("Error recording visit:", error);
  }

  return (
    <>
      <HeroSection detailsCar={detailsCar} />
      <NvbarCar
        pollData={pollData}
        totalComment={comments.length > 0 ? comments[0]?.total : 0}
      />
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
      <ContentTabsSSR
        Attachment={Attachment}
        detailsCar={detailsCar}
        comments={comments}
        id={id}
        vehicle={"car"}
      />
    </>
  );
}

export default page;
