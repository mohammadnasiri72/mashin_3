"use client";

import CommentsSection from "@/app/components/CommentsSection";
import MainBanner from "@/app/components/MainBanner";
import { getItem } from "@/services/Item/Item";
import { useEffect, useState } from "react";
import EducationContent from "./EducationContent";
import HeroSectionEdu from "./HeroSectionEdu";
import RelatedEducation from "./RelatedEducation";
import SidebarEducation from "./SidebarEducation";
import SectionTabs from "@/app/components/SectionTabs";

function EducationView({
  education,
  relatedEducations,
  id,
  comments,
}: {
  education: ItemsId;
  relatedEducations: ItemsRalatedNews[];
  id: number;
  comments: CommentResponse[];
}) {
  const [isMainLonger, setIsMainLonger] = useState(true);
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const [popularEducations, setPopularEducations] = useState<Items[]>([]);
  const [banner, setBanner] = useState<Items[]>([]);
  const [loading, setLoading] = useState(true);

  // مقایسه ارتفاع محتوا و سایدبار + گرفتن ارتفاع سایدبار
  useEffect(() => {
    const checkHeights = () => {
      const mainEl = document.getElementById("edu-main-box");
      const sidebarEl = document.getElementById("edu-sidebar-box");
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
  }, [education, relatedEducations, banner]);

  // دریافت داده‌های سایدبار
  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        setLoading(true);

        const popularData = await getItem({
          TypeId: 3,
          langCode: "fa",
          CategoryIdArray: String(education.categoryId || ""),
          PageIndex: 1,
          PageSize: 10,
          OrderBy: 8,
        });

        const bannerData = await getItem({
          TypeId: 1051,
          langCode: "fa",
          FullData: false,
        });

        setPopularEducations(
          popularData.filter((e: Items) => e.id !== education.id),
        );
        setBanner(bannerData);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (education.categoryId) {
      fetchSidebarData();
    }
  }, [education.categoryId, education.id]);

  // لیست تب‌ها - id هر تب دقیقاً همون id بخش توی JSX هست
  const tabs = [
    ...(education ? [{ id: "content", label: "محتوا و توضیحات" }] : []),
    ...(relatedEducations.length > 0
      ? [{ id: "related", label: "مطالب مرتبط" }]
      : []),
    { id: "comments", label: "نظرات کاربران" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <HeroSectionEdu education={education} />

      <SectionTabs tabs={tabs} />

      <div className="mx-auto pt-2">
        <div className="flex flex-wrap lg:flex-nowrap items-start gap-2 relative px-2">
          {/* محتوای اصلی - فقط وقتی سایدبار بلندتره، min-height می‌گیره */}
          <div
            id="edu-main-box"
            className="lg:w-3/4 w-full"
            style={{
              minHeight:
                !isMainLonger && sidebarHeight > 0
                  ? `${sidebarHeight}px`
                  : undefined,
            }}
          >
            <div className="space-y-2">
              {/* بخش محتوا و توضیحات */}
              {education && (
                <div id="content" className="section-anchor">
                  <EducationContent education={education} />
                </div>
              )}

              {/* بخش مطالب مرتبط */}
              {relatedEducations.length > 0 && (
                <div id="related" className="section-anchor">
                  <RelatedEducation relatedEducations={relatedEducations} />
                </div>
              )}
            </div>
          </div>

          {/* سایدبار - فقط وقتی محتوا بلندتره، sticky می‌شه */}
          <aside
            id="edu-sidebar-box"
            className={`
              lg:w-1/4 w-full transition-all duration-300
              ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <SidebarEducation
              popularEducations={popularEducations}
              banner={banner}
              loading={loading}
            />
          </aside>
        </div>

        <MainBanner banner={banner.filter((e) => e.categoryId === 6393)} />

        {/* بخش نظرات */}
        <div id="comments" className="section-anchor px-2 pb-2">
          <CommentsSection details={education} id={id} comments={comments} />
        </div>
      </div>
    </div>
  );
}

export default EducationView;