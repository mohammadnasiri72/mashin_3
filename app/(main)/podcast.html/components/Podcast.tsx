import React from "react";
import BoxPodcasts from "./BoxPodcasts";
import SidebarPodcasts from "./SidebarPodcasts";
import BoxCatPodcasts from "./BoxCatPodcasts";

function Podcast({
  podcasts,
  podcastsCat,
  banner,
  popularNews,
  titleCategory,
}: {
  podcasts: Items[];
  podcastsCat: ItemsCategory[];
  banner: Items[];
  popularNews: Items[];
  titleCategory: string;
}) {
  return (
    <>
      <div className="flex flex-wrap ">
        <div className="lg:w-3/4 w-full">
          <BoxCatPodcasts podcastsCat={podcastsCat} />
          <BoxPodcasts podcasts={podcasts} titleCategory={titleCategory}/>
        </div>
        <div className="lg:w-1/4 w-full">
          <SidebarPodcasts popularNews={popularNews} banner={banner} />
        </div>
      </div>
    </>
  );
}

export default Podcast;
