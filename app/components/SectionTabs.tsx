"use client";

import { useEffect, useRef, useState } from "react";

type TabItem = {
  id: string;
  label: string;
};

export default function SectionTabsNews({ tabs }: { tabs: TabItem[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // بررسی وضعیت اسکرول افقی تب‌ها برای نمایش فلش
  const checkScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft } = tabsRef.current;
      setShowLeftArrow(scrollLeft > 0);
    }
  };

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const detectionLine = 230;

      let activeTab = tabs[0]?.id;

      for (let i = tabs.length - 1; i >= 0; i--) {
        const section = document.getElementById(tabs[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= detectionLine) {
            activeTab = tabs[i].id;
            break;
          }
        }
      }

      setActive(activeTab);
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(handleScroll, 100);

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
  }, [isClient, tabs]);

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

  // اسکرول افقی تب‌ها
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
    <nav dir="rtl" className="sticky lg:top-16 top-29 z-1000 w-full px-2 ">
      <div className="relative mx-auto flex items-center bg-white rounded-b-lg border-gray-200 shadow-sm transition-shadow duration-300">
        <div
          ref={tabsRef}
          className="relative flex items-stretch gap-2 overflow-x-auto scrollbar-hide w-full"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === active;

            return (
              <button
                key={tab.id}
                onClick={() => handleClick(tab.id)}
                className={`
                  cursor-pointer relative shrink-0
                  px-4 md:px-5 py-3 md:py-3.5
                  text-[11px] md:text-sm font-semibold
                  transition-all duration-300
                  whitespace-nowrap
                  border-0 rounded-lg
                  ${
                    isActive
                      ? "bg-[#ce1a2a] text-white!"
                      : "bg-slate-50 text-gray-700! hover:text-[#ce1a2a]! hover:bg-slate-100!"
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
