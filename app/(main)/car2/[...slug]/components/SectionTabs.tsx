"use client";

import { RootState } from "@/redux/store";
import { useEffect, useRef, useState } from "react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
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
import { useSelector } from "react-redux";

export default function SectionTabs({
  isShowRelatedVideo,
  isShowRelatedCompare,
  isShowRelatedNews,
}: {
  isShowRelatedVideo: boolean;
  isShowRelatedCompare: boolean;
  isShowRelatedNews: boolean;
}) {
  const isShowModelShowcase = useSelector(
    (state: RootState) => state.isModelCar.isModelCar,
  );
  const tabs = [
    { id: "specifications", label: "مشخصات فنی", icon: FaCog },
    { id: "expert-review", label: "نقد کارشناسی", icon: FaSearch },
    { id: "images", label: "گالری تصاویر", icon: FaImages },
    { id: "models", label: "مدل‌ها", icon: FaCar },
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
  const navRef = useRef<HTMLElement>(null);
  const [isClient, setIsClient] = useState(false);

  // مدیریت فلش‌های چپ و راست
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // آیا نوار sticky شده؟
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // بررسی وضعیت اسکرول برای نمایش فلش‌ها
  const checkScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      const isAtStart = Math.abs(scrollLeft) < 5;
      const isAtEnd =
        Math.abs(scrollLeft) + clientWidth >= scrollWidth - 5;

      setShowRightArrow(!isAtStart);
      setShowLeftArrow(!isAtEnd);
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

      // تشخیص sticky شدن نوار
      if (navRef.current) {
        const navTop = navRef.current.getBoundingClientRect().top;
        // در موبایل top-29 و در دسکتاپ top-16 هست
        // اگه فاصله نوار از بالا کمتر یا مساوی مقدار sticky شد، یعنی چسبیده
        const isMobile = window.innerWidth < 1024;
        const stickyThreshold = isMobile ? 116 : 64; // top-29=116px, top-16=64px
        setIsSticky(navTop <= stickyThreshold + 5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 100);

    const currentTabsRef = tabsRef.current;
    if (currentTabsRef) {
      currentTabsRef.addEventListener("scroll", checkScroll);
      setTimeout(checkScroll, 200);
      window.addEventListener("resize", checkScroll);
      window.addEventListener("resize", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScroll);
      window.removeEventListener("resize", handleScroll);
      if (currentTabsRef) {
        currentTabsRef.removeEventListener("scroll", checkScroll);
      }
    };
  }, [isClient, isShowModelShowcase]);

  const handleClick = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = isSticky ? 160 : 200;
      const elementPosition =
        el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

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
      ref={navRef}
      dir="rtl"
      className={`
        sticky lg:top-16 top-29 z-1000 w-full 
        bg-slate-900
        border-b border-white/5
        transition-all duration-300
      `}
    >
      <div className="relative mx-auto flex max-w-7xl items-center px-2 md:px-6">
        {/* فلش راست */}
        {showRightArrow && (
          <button
            onClick={() => scrollTabs("right")}
            className="absolute right-0 z-20 flex h-9 w-9 md:hidden items-center justify-center rounded-full bg-transparent text-white shadow-lg backdrop-blur-sm hover:bg-slate-700 transition-all border border-red-600/20 cursor-pointer"
            aria-label="اسکرول به راست"
          >
            <BiChevronRight className="text-2xl text-red-600" />
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
                  transition-all duration-300 
                  rounded-xl
                  group
                  ${
                    isSticky
                      ? // حالت sticky: آیکون و متن کنار هم (افقی)
                        "flex-row flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 md:py-2.5"
                      : // حالت عادی: آیکون بالا، متن پایین (عمودی)
                        "flex-col flex flex-col items-center gap-1 md:gap-2 px-3 py-2 md:py-3.5 min-w-16 md:min-w-22.5"
                  }
                `}
              >
                <IconComponent
                  className={`
                    transition-all duration-300
                    ${
                      isSticky
                        ? "text-base md:text-lg"
                        : "text-lg md:text-3xl"
                    }
                    ${isActive ? "text-[#ce1a2a]" : "text-white!"}
                  `}
                />

                <span
                  className={`
                    font-medium
                    transition-all duration-300
                    whitespace-nowrap
                    ${
                      isSticky
                        ? "text-[10px] md:text-xs"
                        : "text-[10px] md:text-xs"
                    }
                    ${isActive ? "text-white!" : "text-white! group-hover:text-white!"}
                  `}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <span
                    className={`absolute bg-[#ce1a2a] rounded-full transition-all duration-300 ${
                      isSticky
                        ? "bottom-0 left-1/2 -translate-x-1/2 w-6 md:w-8 h-0.5"
                        : "bottom-0 left-1/2 -translate-x-1/2 w-6 md:w-8 h-0.5"
                    }`}
                  />
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

        {/* فلش چپ */}
        {showLeftArrow && (
          <button
            onClick={() => scrollTabs("left")}
            className="absolute left-0 z-20 flex h-9 w-9 md:hidden items-center justify-center rounded-full bg-transparent text-white shadow-lg backdrop-blur-sm hover:bg-slate-700 transition-all border border-red-600/20 cursor-pointer"
            aria-label="اسکرول به چپ"
          >
            <BiChevronLeft className="text-2xl text-red-600" />
          </button>
        )}

        {/* گرادیانت‌های کناری */}
        <div
          className={`absolute right-0 top-0 h-full w-10 md:w-12 bg-linear-to-l from-slate-900 to-transparent pointer-events-none md:hidden transition-opacity duration-300 ${
            showRightArrow ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute left-0 top-0 h-full w-10 md:w-12 bg-linear-to-r from-slate-900 to-transparent pointer-events-none md:hidden transition-opacity duration-300 ${
            showLeftArrow ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.9;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
}