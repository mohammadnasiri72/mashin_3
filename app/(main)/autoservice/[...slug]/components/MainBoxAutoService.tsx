"use client";

import CommentsSection from "@/app/components/CommentsSection";
import MainBanner from "@/app/components/MainBanner";
import SectionTabs from "@/app/components/SectionTabs";
import { useEffect, useState } from "react";
import ContactUsAutoService from "./ContactUsAutoService";
import HeroSectionAutoService from "./HeroSectionAutoService";
import RatingAutoService from "./RatingAutoService";
import SidebarAutoService from "./SidebarAutoService";

function MainBoxAutoService({
  detailsAuto,
  comments,
  id,
  banner,
  pollData,
}: {
  detailsAuto: ItemsId;
  comments: CommentResponse[];
  id: number;
  banner: Items[];
  pollData: PollData;
}) {
  const [isMainLonger, setIsMainLonger] = useState(true);
  const [sidebarHeight, setSidebarHeight] = useState(0);

  // مقایسه ارتفاع محتوا و سایدبار + گرفتن ارتفاع سایدبار
  useEffect(() => {
    const checkHeights = () => {
      const mainEl = document.getElementById("auto-main-box");
      const sidebarEl = document.getElementById("auto-sidebar-box");
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
  }, [detailsAuto, banner, pollData]);

  // لیست تب‌ها - id هر تب دقیقاً همون id بخش توی JSX هست
  const tabs = [
    { id: "contact", label: "مشخصات نمایندگی" },
    { id: "services", label: "نظرسنجی" },
    { id: "comments", label: "نظرات مشتریان" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* هدر صفحه */}
      <HeroSectionAutoService detailsAuto={detailsAuto} />

      {/* تب‌ها */}
      <SectionTabs tabs={tabs} />

      <div className="mx-auto">
        <div className="flex flex-wrap lg:flex-nowrap items-start px-2 pt-2 gap-2 relative">
          {/* محتوای اصلی - فقط وقتی سایدبار بلندتره، min-height می‌گیره */}
          <div
            id="auto-main-box"
            className="lg:w-3/4 w-full"
            style={{
              minHeight:
                !isMainLonger && sidebarHeight > 0
                  ? `${sidebarHeight}px`
                  : undefined,
            }}
          >
            <div className="space-y-2">
              {/* بخش مشخصات نمایندگی */}
              <div id="contact" className="section-anchor">
                <ContactUsAutoService detailsAuto={detailsAuto} />
              </div>

              {/* بخش نظرسنجی */}
              <div id="services" className="section-anchor">
                <RatingAutoService
                  initialPollData={pollData}
                  detailsAuto={detailsAuto}
                />
              </div>
            </div>
          </div>

          {/* سایدبار - فقط وقتی محتوا بلندتره، sticky می‌شه */}
          <aside
            id="auto-sidebar-box"
            className={`
              lg:w-1/4 w-full mt-6 lg:mt-0 transition-all duration-300
              ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <SidebarAutoService banner={banner} />
          </aside>
        </div>

        <MainBanner banner={banner.filter((e) => e.categoryId === 6393)} />

        {/* بخش نظرات */}
        <div id="comments" className="section-anchor px-2 pb-2">
          <CommentsSection details={detailsAuto} comments={comments} id={id} />
        </div>
      </div>
    </div>
  );
}

export default MainBoxAutoService;