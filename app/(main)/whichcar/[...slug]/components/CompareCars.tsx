"use client";

import CommentsSection from "@/app/components/CommentsSection";
import MainBanner from "@/app/components/MainBanner";
import SectionTabs from "@/app/components/SectionTabs";
import { useEffect, useState } from "react";
import CompareContent from "./CompareContent";
import HeroSectionWhichcars from "./HeroSectionWhichcars";
import RelatedCompare from "./RelatedCompare";
import RelatedVideosCompare from "./RelatedVideosCompare";
import RelatedVoicesCompare from "./RelatedVoicesCompare";
import SideBarCompareCars from "./SideBarCompareCars";

function CompareCars({
  whichcars,
  dataCompare,
  popularComparisons,
  ralatedComparisons,
  comments,
  id,
  banner,
  relatedVideos,
  relatedVoices,
}: {
  whichcars: ItemsId;
  dataCompare: ItemsId[];
  popularComparisons: Items[];
  ralatedComparisons: Items[];
  comments: CommentResponse[];
  id: number;
  banner: Items[];
  relatedVideos: ItemsId[];
  relatedVoices: ItemsId[];
}) {
  const [isMainLonger, setIsMainLonger] = useState(true);
  const [sidebarHeight, setSidebarHeight] = useState(0);

  // مقایسه ارتفاع محتوا و سایدبار + گرفتن ارتفاع سایدبار
  useEffect(() => {
    const checkHeights = () => {
      const mainEl = document.getElementById("compare-main-box");
      const sidebarEl = document.getElementById("compare-sidebar-box");
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
    whichcars,
    dataCompare,
    ralatedComparisons,
    relatedVideos,
    relatedVoices,
    popularComparisons,
    banner,
  ]);

  // لیست تب‌ها - id هر تب دقیقاً همون id بخش توی JSX هست
  const tabs = [
    ...(whichcars && dataCompare
      ? [{ id: "content", label: "مقایسه تخصصی" }]
      : []),
    ...(ralatedComparisons.length > 0
      ? [{ id: "related", label: "مقایسه‌های مرتبط" }]
      : []),
    ...(relatedVideos.length > 0
      ? [{ id: "relatedVideos", label: "ویدئوهای مرتبط" }]
      : []),
    ...(relatedVoices.length > 0
      ? [{ id: "relatedVoices", label: "پادکست‌های مرتبط" }]
      : []),
    { id: "comments", label: "نظرات کاربران" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <HeroSectionWhichcars whichcars={whichcars} />

      <SectionTabs tabs={tabs} />

      <div className="mx-auto pt-2">
        <div className="flex flex-col lg:flex-row px-2 gap-2 relative">
          {/* محتوای اصلی - فقط وقتی سایدبار بلندتره، min-height می‌گیره */}
          <div
            id="compare-main-box"
            className="lg:w-3/4 w-full"
            style={{
              minHeight:
                !isMainLonger && sidebarHeight > 0
                  ? `${sidebarHeight}px`
                  : undefined,
            }}
          >
            <div className="space-y-0">
              {/* بخش محتوای اصلی مقایسه */}
              <div id="content" className="section-anchor">
                <CompareContent
                  whichcars={whichcars}
                  dataCompare={dataCompare}
                />
              </div>

              {/* بخش مقایسه های مرتبط */}
              {ralatedComparisons.length > 0 && (
                <div id="related" className="section-anchor">
                  <RelatedCompare ralatedComparisons={ralatedComparisons} />
                </div>
              )}

              {/* بخش ویدئو های مرتبط */}
              {relatedVideos.length > 0 && (
                <div id="relatedVideos" className="section-anchor">
                  <RelatedVideosCompare relatedVideos={relatedVideos} />
                </div>
              )}

              {/* بخش پادکست های مرتبط */}
              {relatedVoices.length > 0 && (
                <div id="relatedVoices" className="section-anchor">
                  <RelatedVoicesCompare relatedVoices={relatedVoices} />
                </div>
              )}
            </div>
          </div>

          {/* سایدبار - فقط وقتی محتوا بلندتره، sticky می‌شه */}
          <aside
            id="compare-sidebar-box"
            className={`
              lg:w-1/4 w-full transition-all duration-300
              ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <SideBarCompareCars
              popularComparisons={popularComparisons}
              banner={banner}
            />
          </aside>
        </div>

        <MainBanner banner={banner.filter((e) => e.categoryId === 6393)} />

        {/* بخش نظرات */}
        <div id="comments" className="section-anchor px-2 pb-2">
          {whichcars && (
            <CommentsSection details={whichcars} comments={comments} id={id} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CompareCars;