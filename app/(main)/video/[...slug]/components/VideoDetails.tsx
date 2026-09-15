"use client";

import CommentsSection from "@/app/components/CommentsSection";
import MainBanner from "@/app/components/MainBanner";
import SectionTabs from "@/app/components/SectionTabs";
import { useEffect, useState } from "react";
import HeroSectionVideo from "./HeroSectionVideo";
import RelatedCarsVideos from "./RelatedCarsVideos";
import RelatedComparesVideos from "./RelatedComparesVideos";
import RelatedPodcastsVideos from "./relatedPodcastsVideos";
import RelatedVideos from "./RelatedVideos";
import SidebarVideo from "./SideBarVideo";
import VideoPlayer from "./VideoPlayer";

function VideoDetails({
  video,
  popularVideos,
  relatedVideos,
  banner,
  comments,
  id,
  relatedCars,
  relatedPodcasts,
  relatedCompares,
  attachment,
}: {
  video: ItemsId;
  popularVideos: Items[];
  relatedVideos: Items[];
  banner: Items[];
  comments: CommentResponse[];
  id: number;
  relatedCars: ItemsId[];
  relatedPodcasts: ItemsId[];
  relatedCompares: ItemsId[];
  attachment: ItemsAttachment[];
}) {
  const [isMainLonger, setIsMainLonger] = useState(true);
  const [sidebarHeight, setSidebarHeight] = useState(0);

  // مقایسه ارتفاع محتوا و سایدبار + گرفتن ارتفاع سایدبار
  useEffect(() => {
    const checkHeights = () => {
      const mainEl = document.getElementById("video-main-box");
      const sidebarEl = document.getElementById("video-sidebar-box");
      if (mainEl && sidebarEl) {
        setIsMainLonger(mainEl.offsetHeight > sidebarEl.offsetHeight);
        setSidebarHeight(sidebarEl.offsetHeight);
      }
    };

    checkHeights();
    const timer = setTimeout(checkHeights, 500);
    window.addEventListener("resize", checkHeights);

    return () => {
      window.removeEventListener("resize", checkHeights);
      clearTimeout(timer);
    };
  }, [
    video,
    relatedVideos,
    relatedCars,
    relatedPodcasts,
    relatedCompares,
    popularVideos,
    banner,
  ]);

  const tabs = [
    ...(video ? [{ id: "player", label: "پخش ویدئو" }] : []),
    ...(relatedVideos.length > 0
      ? [{ id: "related", label: "ویدئوهای مرتبط" }]
      : []),
    ...(relatedCars.length > 0
      ? [{ id: "relatedCars", label: "خودروهای مرتبط" }]
      : []),
    ...(relatedPodcasts.length > 0
      ? [{ id: "relatedPodcasts", label: "پادکست‌های مرتبط" }]
      : []),
    ...(relatedCompares.length > 0
      ? [{ id: "relatedCompares", label: "مقایسه‌های مرتبط" }]
      : []),
    { id: "comments", label: "نظرات کاربران" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {video && <HeroSectionVideo video={video} />}

      <SectionTabs tabs={tabs} />

      <div className="mx-auto pt-2 px-2">
        <div className="flex flex-wrap lg:flex-nowrap items-start gap-2 relative">
          {/* محتوای اصلی - فقط وقتی سایدبار بلندتره، min-height می‌گیره */}
          <div
            id="video-main-box"
            className="lg:w-3/4 w-full"
            style={{
              minHeight:
                !isMainLonger && sidebarHeight > 0
                  ? `${sidebarHeight}px`
                  : undefined,
            }}
          >
            <div className="space-y-2">
              {video && (
                <div id="player" className="section-anchor">
                  <VideoPlayer video={video} attachment={attachment} />
                </div>
              )}

              {relatedVideos.length > 0 && (
                <div id="related" className="section-anchor">
                  <RelatedVideos relatedVideos={relatedVideos} />
                </div>
              )}

              {relatedCars.length > 0 && (
                <div id="relatedCars" className="section-anchor">
                  <RelatedCarsVideos relatedCars={relatedCars} />
                </div>
              )}

              {relatedPodcasts.length > 0 && (
                <div id="relatedPodcasts" className="section-anchor">
                  <RelatedPodcastsVideos relatedPodcasts={relatedPodcasts} />
                </div>
              )}

              {relatedCompares.length > 0 && (
                <div id="relatedCompares" className="section-anchor">
                  <RelatedComparesVideos relatedCompares={relatedCompares} />
                </div>
              )}
            </div>
          </div>

          {/* سایدبار - فقط وقتی محتوا بلندتره، sticky می‌شه */}
          <aside
            id="video-sidebar-box"
            className={`
              lg:w-1/4 w-full transition-all duration-300
              ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <SidebarVideo popularVideos={popularVideos} banner={banner} />
          </aside>
        </div>

        <MainBanner banner={banner.filter((e) => e.categoryId === 6393)} />

        <div id="comments" className="section-anchor">
          <CommentsSection details={video} comments={comments} id={id} />
        </div>
      </div>
    </div>
  );
}

export default VideoDetails;