"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaCog,
  FaImages,
  FaNewspaper,
  FaVideo,
  FaChartBar,
  FaCommentDots,
} from "react-icons/fa";

const tabs = [
  { id: "expert-review", label: "نقد کارشناسی", icon: FaSearch },
  { id: "specifications", label: "مشخصات فنی", icon: FaCog },
  { id: "images", label: "گالری تصاویر", icon: FaImages },
  { id: "news", label: "اخبار مرتبط", icon: FaNewspaper },
  { id: "videos", label: "ویدئوهای مرتبط", icon: FaVideo },
  { id: "comparisons", label: "مقایسه‌های مرتبط", icon: FaChartBar },
  { id: "reviews", label: "نظرات", icon: FaCommentDots },
];

export default function SectionTabs() {
  const [active, setActive] = useState(tabs[0]?.id);
  const [isScrolled, setIsScrolled] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // تشخیص تب فعال بر اساس موقعیت اسکرول
      const sections = tabs.map(tab => document.getElementById(tab.id));
      const scrollPosition = window.scrollY + 120; // آفست برای هدر

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
    // اجرای اولیه برای تنظیم تب فعال
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  const handleClick = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      dir="rtl"
      className={`
        sticky top-6.5 z-1000 w-full 
        bg-slate-900
        border-b border-white/5
        transition-shadow duration-300
        ${isScrolled ? "shadow-2xl shadow-black/50" : ""}
      `}
    >
      <div className="relative mx-auto flex max-w-7xl items-center px-4 md:px-6">
        <div
          ref={tabsRef}
          className="relative flex items-center justify-center gap-3 overflow-x-auto scrollbar-hide w-full"
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
                  px-5 py-3.5
                  transition-all duration-300 
                  rounded-xl
                  flex flex-col items-center gap-2
                  min-w-22.5
                  bg-transparent
                  ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }
                  group
                `}
              >
                <IconComponent
                  className={`
                    text-2xl
                    transition-all duration-300
                    ${isActive ? "text-[#ce1a2a]" : "text-slate-300 group-hover:text-slate-300"}
                  `}
                />

                <span
                  className={`
                  text-xs font-medium
                  transition-all duration-300
                  ${isActive ? "text-[#ce1a2a]" : "text-slate-300 group-hover:text-white!"}
                `}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#ce1a2a] rounded-full" />
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

        <div className="absolute left-0 top-0 h-full w-12 bg-linear-to-l from-transparent to-slate-900 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-12 bg-linear-to-r from-transparent to-slate-900 pointer-events-none" />
      </div>
    </nav>
  );
}