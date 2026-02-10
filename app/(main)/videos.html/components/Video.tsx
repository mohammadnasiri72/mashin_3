import React from "react";
import SidebarVideo from "./SidebarVideo";
import BoxVideo from "./BoxVideo";

function Video({
  popularVideos,
  videos,
  banner,
  titleCat,
}: {
  popularVideos: Items[];
  videos: Items[];
  banner: Items[];
  titleCat: string;
}) {
  return (
    <>
      <div className="flex flex-wrap ">
        <div className="lg:w-3/4 w-full">
          <BoxVideo videos={videos} titleCat={titleCat}/>
        </div>
        <aside className="lg:w-1/4 w-full">
          <SidebarVideo popularVideos={popularVideos} banner={banner} />
        </aside>
      </div>
    </>
  );
}

export default Video;
