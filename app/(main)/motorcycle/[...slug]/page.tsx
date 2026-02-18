import { getComment } from "@/services/Comment/Comment";
import { getItemId } from "@/services/Item/ItemId";
import React from "react";
import MotorHeroSection from "./components/HeroSection";
import { getAttachment } from "@/services/Attachment/Attachment";
import MotorDetails from "./components/MotorDetails";
import FeaturesSectionMotor from "./components/FeaturesSectionMotor";
import { getItemByIds } from "@/services/Item/ItemByIds";
import ContentTabsMotor from "./components/ContentTabsMotor";
import { getItem } from "@/services/Item/Item";
import { getPollId } from "@/services/Poll/pollId";
import { mainDomainOld } from "@/utils/mainDomain";

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
  const detailsMotorcycle: ItemsId = await getItemId(Number(id));
  const Attachment: ItemsAttachment[] = await getAttachment(Number(id));
  const comments: CommentResponse[] = await getComment({
    id: Number(id),
    langCode: "fa",
    type: 0,
    pageSize: 20,
    pageIndex: 1,
  });

  const detailsMotorcompetitor: ItemsId[] = detailsMotorcycle.properties.filter(
    (e) => e.propertyId === 22643,
  )[0]?.value
    ? await getItemByIds(
        detailsMotorcycle.properties.filter((e) => e.propertyId === 22643)[0]
          ?.value,
      )
    : [];

  const advantages = detailsMotorcycle.properties.filter(
    (e) => e.propertyId === 22639,
  );

  const disadvantages = detailsMotorcycle.properties.filter(
    (e) => e.propertyId === 22640,
  );

  const motorcyclesModel: Items[] = await getItem({
    TypeId: 1052,
    langCode: "fa",
    CategoryIdArray: detailsMotorcycle.sourceLink,
    PageIndex: 1,
    PageSize: 5,
  });
  const motorcyclesModel2: Items[] = await getItem({
    TypeId: 1052,
    langCode: "fa",
    CategoryIdArray: String(detailsMotorcycle.categoryId),
    PageIndex: 1,
    PageSize: 5,
  });

  const pollData: PollData = await getPollId(Number(id));

  // آخرین اخبار
  const lastNews: Items[] = await getItem({
    TypeId: 5,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 7,
  });

  // آخرین ویدئوها
  const lastVideos: Items[] = await getItem({
    TypeId: 1028,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 5,
  });

  return (
    <>
      <MotorHeroSection detailsMotorcycle={detailsMotorcycle} />
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
      />
    </>
  );
}

export default pageMotorcycleDainamic;
