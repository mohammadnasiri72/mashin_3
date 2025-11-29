import React from "react";
import Video from "./components/Video";
import { getItem } from "@/services/Item/Item";
import { getCategory } from "@/services/Category/Category";
import BoxCatVideos from "./components/BoxCatVideos";

async function pageVideo({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page);
  const term = String(searchParam.term);

  const videos: Items[] = await getItem({
    TypeId: 1028,
    langCode: "fa",
    PageIndex: page || 1,
    ...(term && term !== "undefined" && { Term: term }),
    PageSize: 10,
  });
  const videosCat: ItemsCategory[] = await getCategory({
    TypeId: 1028,
    LangCode: "fa",
    PageIndex: 1,
    PageSize: 200,
  });

  return (
    <>
      <div className="bg-[#f4f4f4]">
        <Video videos={videos} />
        <BoxCatVideos videosCat={videosCat} />
      </div>
    </>
  );
}

export default pageVideo;
