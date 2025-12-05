import { getAttachment } from "@/services/Attachment/Attachment";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getItemId } from "@/services/Item/ItemId";
import CarDetails from "../components/CarDetails";
import ContentTabs from "../components/ContentTabs";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import { getComment } from "@/services/Comment/Comment";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = searchParam.id;
  const Attachment: ItemsAttachment[] = await getAttachment(Number(id));
  const detailsCar: ItemsId = await getItemId(Number(id));

  const detailsCarcompetitor: ItemsId[] = detailsCar.properties.filter(
    (e) => e.propertyId === 22643
  )[0]?.value
    ? await getItemByIds(
        detailsCar.properties.filter((e) => e.propertyId === 22643)[0]?.value
      )
    : [];

  const comments: CommentResponse[] = await getComment({
    id: Number(id),
    langCode: "fa",
    type: 0,
    pageSize: 20,
    pageIndex: 1,
  });


  return (
    <>
      <HeroSection detailsCar={detailsCar} />
      <CarDetails Attachment={Attachment} detailsCar={detailsCar} />
      <FeaturesSection detailsCar={detailsCar} />
      <ContentTabs
        Attachment={Attachment}
        detailsCar={detailsCar}
        detailsCarcompetitor={detailsCarcompetitor}
        comments={comments}
        id={Number(id)}
      />
    </>
  );
}

export default page;
