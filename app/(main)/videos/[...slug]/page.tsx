import { getItem } from "@/services/Item/Item";
import Video from "../../videos.html/components/Video";
import VideoNotFound from "./VideoNotFound";

async function pageVideosDainamic({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = Number(param.slug[0]);
  const page = Number(searchParam.page);
  const term = String(searchParam.term);
  if (String(id) === "NaN") {
    return <VideoNotFound />;
  }
  let videos: Items[] = [];
  try {
    videos = await getItem({
      TypeId: 1028,
      langCode: "fa",
      CategoryIdArray: String(id),
      PageIndex: page || 1,
      ...(term && term !== "undefined" && { Term: term }),
      PageSize: 10,
    });
  } catch (err) {
    return <VideoNotFound />;
  }

   const banner: Items[] = await getItem({
      TypeId: 1051,
      langCode: "fa",
      CategoryIdArray: "6415",
    });
 const popularVideos: Items[] = await getItem({
    TypeId: 1028,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 10,
    OrderBy: 8,
  });
  return (
    <>
      <div className="bg-[#f4f4f4]">
        <Video popularVideos={popularVideos} videos={videos} banner={banner}/>
      </div>
    </>
  );
}

export default pageVideosDainamic;
