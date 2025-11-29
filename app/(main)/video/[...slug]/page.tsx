import { getItem } from "@/services/Item/Item";
import { getItemId } from "@/services/Item/ItemId";
import VideoDetails from "./components/VideoDetails";

async function pageVideo({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = Number(searchParam.id);
  const id2 = Number(param.slug[0]);
  const video: ItemsId = await getItemId(id || id2);
  const videos: Items[] = await getItem({
    TypeId: 1028,
    langCode: "fa",
    PageSize: 10,
  });

  return (
    <>
      <VideoDetails video={video} videos={videos} />
    </>
  );
}

export default pageVideo;
