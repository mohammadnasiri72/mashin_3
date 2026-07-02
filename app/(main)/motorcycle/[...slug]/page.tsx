import { getAttachment } from "@/services/Attachment/Attachment";
import { getComment } from "@/services/Comment/Comment";
import { getItemId } from "@/services/Item/ItemId";
import { getPollId } from "@/services/Poll/pollId";
import { mainDomainOld } from "@/utils/mainDomain";
import { Suspense } from "react";
import CarDetails from "../../car/components/CarDetails";
import ContentTabsSSR from "../../car/components/ContentTabsSSR";
import FeaturesSection from "../../car/components/FeaturesSection";
import HeroSection from "../../car/components/HeroSection";
import NvbarCar from "../../car/components/NvbarCar";
import { ItemVisit } from "@/services/Item/ItemVisit";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const id = Number(searchParam.id);
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
      title: "ماشین3 - جزئیات موتورسیکلت",
      description: "جزئیات موتورسیکلت",
    };
  }
}

async function pageMotorcycleDainamic({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const id = Number(searchParam.id);

  const [Attachment, detailsMotorcycle, comments, pollData] = await Promise.all(
    [
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
    ],
  );

   try {
                      await ItemVisit({
                        langCode: "fa",
                        id,
                        ip: "",
                        url: detailsMotorcycle.url,
                        userAgent:''
                      });
                    } catch (error) {
                      console.error("Error recording visit:", error);
                    }

  return (
    <>
      {/* <MotorHeroSection detailsMotorcycle={detailsMotorcycle} />
      <MotorDetails
        Attachment={Attachment}
        detailsMotorcycle={detailsMotorcycle}
        initialPollData={pollData}
      />
      {(advantages.length !== 0 || disadvantages.length !== 0) && (
        <FeaturesSectionMotor detailsMotorcycle={detailsMotorcycle} />
      )}
      <ContentTabsMotor
        Attachment={Attachment}
        detailsMotorcycle={detailsMotorcycle}
        detailsMotorcompetitor={detailsMotorcompetitor}
        comments={comments}
        id={Number(id)}
        motorcyclesModel={motorcyclesModel}
        motorcyclesModel2={motorcyclesModel2}
        lastNews={lastNews}
        lastVideos={lastVideos}
      /> */}

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
        />
      </Suspense>
      <ContentTabsSSR
        Attachment={Attachment}
        detailsCar={detailsMotorcycle}
        comments={comments}
        id={id}
        vehicle={'motor'}
      />
    </>
  );
}

export default pageMotorcycleDainamic;
