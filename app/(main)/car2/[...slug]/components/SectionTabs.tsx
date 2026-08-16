"use client";

import { useEffect, useRef, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import {
  FaCar,
  FaChartBar,
  FaCog,
  FaCommentDots,
  FaImages,
  FaNewspaper,
  FaSearch,
  FaVideo,
} from "react-icons/fa";
import { MdCompare } from "react-icons/md";

export default function SectionTabs({
  isShowRelatedVideo,
  isShowRelatedCompare,
  isShowRelatedNews,
  isShowModelShowcase,
}: {
  isShowRelatedVideo: boolean;
  isShowRelatedCompare: boolean;
  isShowRelatedNews: boolean;
  isShowModelShowcase: boolean;
}) {
  const tabs = [
    { id: "specifications", label: "مشخصات فنی", icon: FaCog },
    { id: "expert-review", label: "نقد کارشناسی", icon: FaSearch },
    { id: "images", label: "گالری تصاویر", icon: FaImages },

    ...(isShowModelShowcase
      ? [{ id: "models", label: "مدل‌ها", icon: FaCar }]
      : []),
    { id: "priceAndComparison", label: "رقبا و نمودار", icon: FaChartBar },
    ...(isShowRelatedNews
      ? [{ id: "news", label: "اخبار مرتبط", icon: FaNewspaper }]
      : []),
    ...(isShowRelatedVideo
      ? [{ id: "videos", label: "ویدئوهای مرتبط", icon: FaVideo }]
      : []),
    ...(isShowRelatedCompare
      ? [{ id: "comparisons", label: "مقایسه‌های مرتبط", icon: MdCompare }]
      : []),
    { id: "reviews", label: "نظرات", icon: FaCommentDots },
  ];

  const [active, setActive] = useState(tabs[0]?.id);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // بررسی وضعیت اسکرول برای نمایش فلش‌ها
  const checkScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft } = tabsRef.current;
      setShowLeftArrow(scrollLeft > 0);
    }
  };

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      // تشخیص تب فعال بر اساس موقعیت اسکرول
      const sections = tabs.map((tab) => document.getElementById(tab.id));
      const scrollPosition = window.scrollY + 250;

      let activeTab = tabs[0]?.id;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const offsetTop = section.offsetTop;
          if (scrollPosition >= offsetTop) {
            activeTab = tabs[i]?.id;
            break;
          }
        }
      }

      setActive(activeTab);
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 100);

    // بررسی اسکرول تب‌ها
    const currentTabsRef = tabsRef.current;
    if (currentTabsRef) {
      currentTabsRef.addEventListener("scroll", checkScroll);
      setTimeout(checkScroll, 200);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (currentTabsRef) {
        currentTabsRef.removeEventListener("scroll", checkScroll);
      }
    };
  }, [isClient]);

  const handleClick = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 200;
      const elementPosition =
        el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  // اسکرول به چپ یا راست
  const scrollTabs = (direction: "left" | "right") => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        tabsRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      tabsRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      dir="rtl"
      className={`
        sticky lg:top-16 top-29 z-1000 w-full 
        bg-slate-900
        border-b border-white/5
        transition-shadow duration-300
      `}
    >
      <div className="relative mx-auto flex max-w-7xl items-center px-2 md:px-6">
        {/* فلش چپ */}
        {showLeftArrow && (
          <button
            onClick={() => scrollTabs("left")}
            className="absolute right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/90 text-white shadow-lg backdrop-blur-sm hover:bg-slate-700 transition-all border border-white/10 cursor-pointer md:hidden"
            aria-label="اسکرول به راست"
          >
            <BiChevronRight className="text-2xl" />
          </button>
        )}

        <div
          ref={tabsRef}
          className="relative flex items-center lg:justify-center gap-1 md:gap-3 overflow-x-auto scrollbar-hide w-full py-1 md:py-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === active;
            const IconComponent = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => handleClick(tab.id)}
                className={`cursor-pointer
                  relative shrink-0 
                  px-3 md:px-3 py-2 md:py-3.5
                  transition-all duration-300 
                  rounded-xl
                  flex flex-col items-center gap-1 md:gap-2
                  min-w-16 md:min-w-22.5
                  bg-transparent
                  ${isActive ? "text-white!" : "text-white!"}
                  group
                `}
              >
                <IconComponent
                  className={`
                    text-lg md:text-2xl
                    transition-all duration-300
                    ${isActive ? "text-[#ce1a2a]" : "text-white!"}
                  `}
                />

                <span
                  className={`
                  text-[10px] md:text-xs font-medium
                  transition-all duration-300
                  whitespace-nowrap
                  ${isActive ? "text-white!" : "text-white! group-hover:text-white!"}
                `}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 md:w-8 h-0.5 bg-[#ce1a2a] rounded-full" />
                )}

                <span
                  className={`
                  absolute inset-0 rounded-xl transition-all duration-300 -z-10
                  ${isActive ? "bg-white/5" : "group-hover:bg-white/5"}
                `}
                />
              </button>
            );
          })}
        </div>

        {/* گرادیانت‌های کناری برای محو شدن */}
        <div className="absolute right-0 top-0 h-full w-8 md:w-12 bg-linear-to-l from-slate-900 to-transparent pointer-events-none md:hidden" />
        <div className="absolute left-0 top-0 h-full w-8 md:w-12 bg-linear-to-r from-slate-900 to-transparent pointer-events-none md:hidden" />
      </div>
    </nav>
  );
}
