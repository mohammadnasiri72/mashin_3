import React from "react";
import SidebarVideo from "./SidebarVideo";
import BoxVideo from "./BoxVideo";

function Video({popularVideos, videos , banner}: {popularVideos:Items[], videos: Items[] , banner:Items[] }) {
  return (
    <>
      <div className="flex flex-wrap ">
        <div className="lg:w-3/4 w-full">
          <BoxVideo videos={videos} />
        </div>
        <div className="lg:w-1/4 w-full">
          <SidebarVideo popularVideos={popularVideos} banner={banner}/>
        </div>
      </div>
    </>
  );
}

export default Video;
