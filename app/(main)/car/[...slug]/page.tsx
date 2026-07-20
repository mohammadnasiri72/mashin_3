// app/car/page.tsx
import { getAttachment } from "@/services/Attachment/Attachment";
import { getComment } from "@/services/Comment/Comment";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { ItemVisit } from "@/services/Item/ItemVisit";
import { getPollId } from "@/services/Poll/pollId";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CarDetails from "../components/CarDetails";
import ContentTabsSSR from "../components/ContentTabsSSR";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import NvbarCar from "../components/NvbarCar";

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
      title: "ماشین3 - جزئیات خودرو",
      description: "جزئیات خودرو",
    };
  }
}

async function page() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const detailsCar: ItemsId | null = await getItemByUrl(decodedPathname);
  if (!detailsCar) {
    return notFound();
  }
console.log(detailsCar);

  const id = Number(detailsCar.id);

  const [Attachment, comments, pollData] = await Promise.all([
    getAttachment(id),
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
      userAgent: "",
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
          vehicle={"car"}
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
