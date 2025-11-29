import { getAttachment } from "@/services/Attachment/Attachment";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getItemId } from "@/services/Item/ItemId";
import CarDetails from "../../car/components/CarDetails";
import ContentTabs from "../../car/components/ContentTabs";
import FeaturesSection from "../../car/components/FeaturesSection";
import HeroSection from "../../car/components/HeroSection";

async function pageMotorcycleDainamic({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = Number(searchParam.id);
  const AttachmentMotor: ItemsAttachment[] = await getAttachment(Number(id));
  const detailsMotor: ItemsId = await getItemId(Number(id));
  const detailsMotorcompetitor: ItemsId[] = detailsMotor.properties.filter(
    (e) => e.propertyId === 22643
  )[0]?.value
    ? await getItemByIds(
        detailsMotor.properties.filter((e) => e.propertyId === 22643)[0]?.value
      )
    : [];

  return (
    <>
      <HeroSection />
      <CarDetails Attachment={AttachmentMotor} detailsCar={detailsMotor} />
      <FeaturesSection detailsCar={detailsMotor} />
      <ContentTabs
        Attachment={AttachmentMotor}
        detailsCar={detailsMotor}
        detailsCarcompetitor={detailsMotorcompetitor}
      />
    </>
  );
}

export default pageMotorcycleDainamic;
