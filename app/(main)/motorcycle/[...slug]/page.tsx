import { getAttachment } from "@/services/Attachment/Attachment";
import { getComment } from "@/services/Comment/Comment";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { ItemVisit } from "@/services/Item/ItemVisit";
import { getPollId } from "@/services/Poll/pollId";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CarDetails from "../../car/components/CarDetails";
import ContentTabsSSR from "../../car/components/ContentTabsSSR";
import FeaturesSection from "../../car/components/FeaturesSection";
import HeroSection from "../../car/components/HeroSection";
import NvbarCar from "../../car/components/NvbarCar";

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
      title: "ماشین3 - جزئیات موتورسیکلت",
      description: "جزئیات موتورسیکلت",
    };
  }
}

async function pageMotorcycleDainamic() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const detailsMotorcycle: ItemsId | ItemsCategoryId | null =
    await getItemByUrl(decodedPathname);
  if (!detailsMotorcycle) {
    return notFound();
  }

  const id = Number(detailsMotorcycle.id);

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
      url: detailsMotorcycle.url,
      userAgent: "",
    });
  } catch (error) {
    console.error("Error recording visit:", error);
  }

  return (
    <>
      <HeroSection detailsCar={detailsMotorcycle} />
      <NvbarCar
        pollData={pollData}
        totalComment={comments.length > 0 ? comments[0]?.total : 0}
      />
      <CarDetails
        Attachment={Attachment.filter((e) => e.tabId === 1 || e.tabId === 3)}
        detailsCar={detailsMotorcycle}
        initialPollData={pollData}
      />
      <Suspense fallback={<div className="h-40 animate-pulse bg-gray-200" />}>
        <FeaturesSection
          detailsCar={detailsMotorcycle}
          Attachment={Attachment.filter((e) => e.tabId === 4)}
          vehicle={"motor"}
        />
      </Suspense>
      <ContentTabsSSR
        Attachment={Attachment}
        detailsCar={detailsMotorcycle}
        comments={comments}
        id={id}
        vehicle={"motor"}
      />
    </>
  );
}

export default pageMotorcycleDainamic;
