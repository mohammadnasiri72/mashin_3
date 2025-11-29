import React from "react";
import SidebarVideo from "./SidebarVideo";
import BoxVideo from "./BoxVideo";

function Video({ videos }: { videos: Items[] }) {
  return (
    <>
      <div className="flex flex-wrap ">
        <div className="lg:w-3/4 w-full">
          <BoxVideo videos={videos} />
        </div>
        <div className="lg:w-1/4 w-full">
          <SidebarVideo videos={videos} />
        </div>
      </div>
    </>
  );
}

export default Video;
