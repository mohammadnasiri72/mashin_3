import { getComment } from "@/services/Comment/Comment";
import { getItemId } from "@/services/Item/ItemId";
import React from "react";
import MotorHeroSection from "./components/HeroSection";
import { getAttachment } from "@/services/Attachment/Attachment";
import MotorDetails from "./components/MotorDetails";
import FeaturesSectionMotor from "./components/FeaturesSectionMotor";
import { getItemByIds } from "@/services/Item/ItemByIds";
import ContentTabsMotor from "./components/ContentTabsMotor";

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
        (e) => e.propertyId === 22643
      )[0]?.value
        ? await getItemByIds(
            detailsMotorcycle.properties.filter((e) => e.propertyId === 22643)[0]?.value
          )
        : [];


  return (
    <>
    <MotorHeroSection detailsMotorcycle={detailsMotorcycle} />
    <MotorDetails Attachment={Attachment} detailsMotorcycle={detailsMotorcycle} />
    <FeaturesSectionMotor detailsMotorcycle={detailsMotorcycle} />
    <ContentTabsMotor
        Attachment={Attachment}
        detailsMotorcycle={detailsMotorcycle}
        detailsMotorcompetitor={detailsMotorcompetitor}
        comments={comments}
        id={Number(id)}
      />
    </>
  );
}

export default pageMotorcycleDainamic;
