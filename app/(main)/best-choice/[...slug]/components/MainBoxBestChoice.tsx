"use client";

import CommentsSection from "@/app/components/CommentsSection";
import MainBanner from "@/app/components/MainBanner";
import SectionTabs from "@/app/components/SectionTabs";
import { useEffect, useState } from "react";
import CompetitorsBestChoice from "./CompetitorsBestChoice";
import DescBestChoice from "./DescBestChoice";
import GalleryBestChoice from "./GalleryBestChoice";
import HeroSectionBestChoice from "./HeroSectionBestChoice";
import SidebarBestChoice from "./SidebarBestChoice";

function MainBoxBestChoice({
  detailsBest,
  comments,
  id,
  banner,
  Attachment,
  competitorsCar,
  popularBestChoices,
  lastNews,
  lastCars,
}: {
  detailsBest: ItemsId;
  comments: CommentResponse[];
  id: number;
  banner: Items[];
  Attachment: ItemsAttachment[];
  competitorsCar: ItemsId[];
  popularBestChoices: Items[];
  lastNews: Items[];
  lastCars: Items[];
}) {
  const title = detailsBest.properties.find(
    (e) => e.propertyKey === "p1043_carname",
  )?.propertyValue;

  const [isMainLonger, setIsMainLonger] = useState(true);
  const [sidebarHeight, setSidebarHeight] = useState(0);

  // مقایسه ارتفاع محتوا و سایدبار + گرفتن ارتفاع سایدبار
  useEffect(() => {
    const checkHeights = () => {
      const mainEl = document.getElementById("best-main-box");
      const sidebarEl = document.getElementById("best-sidebar-box");
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
  }, [detailsBest, Attachment, competitorsCar]);

  const labelR: string = title ? `رقبای ${title}` : "رقبا";

  // لیست تب‌ها - id هر تب دقیقاً همون id بخش توی JSX هست
  const tabs = [
    ...(detailsBest ? [{ id: "desc", label: "محتوای اصلی" }] : []),
    ...(Attachment.length > 0
      ? [{ id: "gallery", label: "گالری تصاویر" }]
      : []),
    ...(competitorsCar.length > 0
      ? [{ id: "competitors", label: labelR }]
      : []),
    { id: "comments", label: "نظرات کاربران" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* هدر صفحه */}
      <HeroSectionBestChoice detailsBest={detailsBest} />

      {/* تب‌ها */}
      <SectionTabs tabs={tabs} />

      <div className="mx-auto">
        <div className="flex flex-wrap lg:flex-nowrap items-start gap-2 px-2 pt-2 relative">
          {/* محتوای اصلی - فقط وقتی سایدبار بلندتره، min-height می‌گیره */}
          <div
            id="best-main-box"
            className="lg:w-3/4 w-full"
            style={{
              minHeight:
                !isMainLonger && sidebarHeight > 0
                  ? `${sidebarHeight}px`
                  : undefined,
            }}
          >
            <div className="space-y-2">
              {/* بخش محتوا اصلی */}
              <div id="desc" className="section-anchor">
                <DescBestChoice detailsBest={detailsBest} title={title} />
              </div>

              {/* بخش گالری تصاویر */}
              {Attachment.length > 0 && (
                <div id="gallery" className="section-anchor">
                  <GalleryBestChoice
                    Attachment={Attachment}
                    title={title}
                  />
                </div>
              )}

              {/* بخش رقبا */}
              {competitorsCar.length > 0 && (
                <div id="competitors" className="section-anchor">
                  <CompetitorsBestChoice
                    competitorsCar={competitorsCar}
                    title={title}
                  />
                </div>
              )}
            </div>
          </div>

          {/* سایدبار - فقط وقتی محتوا بلندتره، sticky می‌شه */}
          <aside
            id="best-sidebar-box"
            className={`
              lg:w-1/4 w-full mt-6 lg:mt-0 transition-all duration-300
              ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <SidebarBestChoice
              banner={banner}
              popularBestChoices={popularBestChoices}
              lastNews={lastNews}
              lastCars={lastCars}
            />
          </aside>
        </div>

        <MainBanner banner={banner.filter((e) => e.categoryId === 6393)} />

        {/* بخش نظرات */}
        <div id="comments" className="section-anchor px-2 pb-2">
          <CommentsSection details={detailsBest} comments={comments} id={id} />
        </div>
      </div>
    </div>
  );
}

export default MainBoxBestChoice;