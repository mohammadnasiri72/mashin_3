import React from "react";
import BoxPodcasts from "./BoxPodcasts";
import SidebarPodcasts from "./SidebarPodcasts";
import BoxCatPodcasts from "./BoxCatPodcasts";

function Podcast({
  podcasts,
  podcastsCat,
}: {
  podcasts: Items[];
  podcastsCat: ItemsCategory[];
}) {
  return (
    <>
      <div className="flex flex-wrap ">
        <div className="lg:w-3/4 w-full">
          <BoxCatPodcasts podcastsCat={podcastsCat} />
          <BoxPodcasts podcasts={podcasts} />
        </div>
        <div className="lg:w-1/4 w-full">
          <SidebarPodcasts podcasts={podcasts} />
        </div>
      </div>
    </>
  );
}

export default Podcast;
