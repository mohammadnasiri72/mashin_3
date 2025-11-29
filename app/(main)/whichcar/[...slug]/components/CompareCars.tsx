"use client";

import { Card, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
// import RelatedVideos from "./RelatedVideos";
import CompareContent from "./CompareContent";
import RelatedCompare from "./RelatedCompare";
import SideBarCompareCars from "./SideBarCompareCars";
import WhichcarsComments from "./WhichcarsComments";

function CompareCars({
  whichcars,
  dataCompare,
  popularComparisons,
}: {
  whichcars: ItemsId;
  dataCompare: ItemsId[];
  popularComparisons: Items[];
}) {

  const [activeKey, setActiveKey] = useState("1");
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // رفرنس‌های مربوط به هر بخش
  const contentRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        setIsSticky(window.scrollY > navbarTop);
      }

      const sections = [
        { key: "1", ref: contentRef },
        { key: "2", ref: relatedRef },
        { key: "3", ref: commentsRef },
      ];

      let currentActiveKey = activeKey;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;

          if (sectionTop <= 150 && sectionBottom >= 150) {
            currentActiveKey = section.key;
            break;
          }

          if (i < sections.length - 1) {
            const nextSection = sections[i + 1];
            if (nextSection.ref.current) {
              const nextRect = nextSection.ref.current.getBoundingClientRect();
              if (sectionBottom < 150 && nextRect.top > 150) {
                currentActiveKey = section.key;
                break;
              }
            }
          }
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        currentActiveKey = "3";
      }

      if (currentActiveKey !== activeKey) {
        setActiveKey(currentActiveKey);
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [activeKey]);

  // هندل کلیک روی تب - اسکرول به بخش مربوطه
  const handleTabClick = (key: string) => {
    const sectionRefs: {
      [key: string]: React.RefObject<HTMLDivElement | null>;
    } = {
      "1": contentRef,
      "2": relatedRef,
      "3": commentsRef,
    };

    const targetRef = sectionRefs[key];
    if (targetRef?.current) {
      const getAbsoluteOffsetTop = (element: HTMLElement): number => {
        let offsetTop = 0;
        let currentElement: HTMLElement | null = element;
        while (currentElement) {
          offsetTop += currentElement.offsetTop;
          currentElement = currentElement.offsetParent as HTMLElement;
        }
        return offsetTop;
      };

      const navbarHeight = isSticky
        ? (navbarRef.current?.offsetHeight || 0) + 20
        : 100;
      const absoluteOffsetTop = getAbsoluteOffsetTop(targetRef.current);
      const offsetPosition = absoluteOffsetTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const items = [
    {
      key: "1",
      label: "مقایسه تخصصی",
    },
    {
      key: "2",
      label: "مقایسه‌های مرتبط",
    },
    {
      key: "3",
      label: "نظرات کاربران",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* هدر صفحه */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                {whichcars?.title || "مقایسه خودروها"}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>
                  دسته‌بندی: {whichcars?.categoryTitle || "مقایسه خودرو"}
                </span>
                <span>•</span>
                <span>تعداد بازدید: {whichcars?.visit || 0}</span>
                <span>•</span>
                <span>
                  تاریخ انتشار:{" "}
                  {whichcars?.created
                    ? new Date(whichcars.created).toLocaleDateString("fa-IR")
                    : new Date().toLocaleDateString("fa-IR")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-[#ce1a2a] cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                اشتراک گذاری
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* باکس تب ها */}
      <div ref={navbarRef} className="navbar-tabs sticky w-full px-2 mt-4">
        <Card
          style={{ padding: 0, margin: 0 }}
          className="rounded-xl shadow-lg"
        >
          <Tabs
            activeKey={activeKey}
            onChange={handleTabClick}
            type="card"
            items={items}
            className="compare-cars-tabs p-0! m-0!"
          />
        </Card>
      </div>

      <div className="flex flex-wrap items-start">
        <div className="lg:w-3/4 w-full">
          <div className="space-y-8">
            {/* بخش محتوای اصلی مقایسه */}
            
              <div id="content" className="section-anchor" ref={contentRef}>
                <CompareContent
                  whichcars={whichcars}
                  dataCompare={dataCompare}
                />
              </div>
         

            {/* بخش مقایسه های مرتبط */}
            <div id="related" className="section-anchor" ref={relatedRef}>
              <RelatedCompare popularComparisons={popularComparisons} />
            </div>
          </div>
        </div>
        {/* سایدبار */}
        <div className="lg:w-1/4 w-full">
          <SideBarCompareCars popularComparisons={popularComparisons} />
        </div>
      </div>

      {/* بخش نظرات */}
      <div id="comments" className="section-anchor" ref={commentsRef}>
        {whichcars && <WhichcarsComments whichcars={whichcars} />}
      </div>

      <style jsx global>{`
        .navbar-tabs {
          background: transparent;
          transition: all 0.3s ease;
          z-index: 100;
        }
        .navbar-tabs .ant-card-body {
          padding: 0 !important;
          margin: 0 !important;
        }
        .compare-cars-tabs .ant-tabs-nav {
          padding: 0 !important;
          margin: 0 !important;
        }

        .navbar-tabs.sticky {
          position: sticky;
          top: 120px;
          left: 0;
          right: 0;
          z-index: 1000;
          animation: slideDown 0.3s ease;
        }

        .compare-cars-tabs .ant-tabs-tab {
          padding: 12px 24px;
          font-weight: 600;
        }

        .compare-cars-tabs .ant-tabs-tab-active {
          background: #ce1a2a !important;
          border-color: #ce1a2a !important;
        }

        .compare-cars-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: white !important;
        }

        .compare-cars-tabs .ant-tabs-ink-bar {
          background: #ce1a2a;
        }

        .section-anchor {
          scroll-margin-top: 120px;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (min-width: 1024px) {
          .navbar-tabs.sticky {
            top: 65px;
          }
        }
      `}</style>
    </div>
  );
}

export default CompareCars;
