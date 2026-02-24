"use client";

import { Card, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
// import RelatedVideos from "./RelatedVideos";
import CommentsSection from "@/app/components/CommentsSection";
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
  const [activeKey, setActiveKey] = useState("1");
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [isMainLonger, setIsMainLonger] = useState(true);

  const navbarRef = useRef<HTMLDivElement>(null);
  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // رفرنس‌های مربوط به هر بخش
  const contentRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const relatedVideosRef = useRef<HTMLDivElement>(null);
  const relatedVoicesRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  // مقایسه ارتفاع باکس‌ها
  useEffect(() => {
    const checkHeights = () => {
      if (mainBoxRef.current && sidebarRef.current) {
        const mainHeight = mainBoxRef.current.offsetHeight;
        const sidebarHeight = sidebarRef.current.offsetHeight;
        setIsMainLonger(mainHeight > sidebarHeight);
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

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        setIsNavbarSticky(window.scrollY > navbarTop);
      }

      const sections = [
        { key: "1", ref: contentRef },
        { key: "2", ref: relatedRef },
        { key: "3", ref: relatedVideosRef },
        { key: "4", ref: relatedVoicesRef },
        { key: "5", ref: commentsRef },
      ];

      let currentActiveKey = activeKey;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;

          if (sectionTop <= 200 && sectionBottom >= 200) {
            currentActiveKey = section.key;
            break;
          }

          if (i < sections.length - 1) {
            const nextSection = sections[i + 1];
            if (nextSection.ref.current) {
              const nextRect = nextSection.ref.current.getBoundingClientRect();
              if (sectionBottom < 200 && nextRect.top > 200) {
                currentActiveKey = section.key;
                break;
              }
            }
          }
        }
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
      "3": relatedVideosRef,
      "4": relatedVoicesRef,
      "5": commentsRef,
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

      const navbarHeight = isNavbarSticky
        ? (navbarRef.current?.offsetHeight || 0) + 20
        : 100;
      const absoluteOffsetTop = getAbsoluteOffsetTop(targetRef.current);
      const offsetPosition = absoluteOffsetTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition - 50,
        behavior: "smooth",
      });
    }
  };

  const items = [
    ...(whichcars && dataCompare
      ? [
          {
            key: "1",
            label: "مقایسه تخصصی",
          },
        ]
      : []),
    ...(ralatedComparisons.length > 0
      ? [
          {
            key: "2",
            label: "مقایسه‌های مرتبط",
          },
        ]
      : []),
    ...(relatedVideos.length > 0
      ? [
          {
            key: "3",
            label: "ویدئوهای مرتبط",
          },
        ]
      : []),
    ...(relatedVoices.length > 0
      ? [
          {
            key: "4",
            label: "پادکست‌های مرتبط",
          },
        ]
      : []),
    {
      key: "5",
      label: "نظرات کاربران",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <HeroSectionWhichcars whichcars={whichcars} />

      {/* باکس تب ها - با position: sticky */}
      <div
        ref={navbarRef}
        className="navbar-tabs w-full px-2 mt-4 mb-8"
        style={{
          position: "sticky",
          top: isNavbarSticky ? "112px" : "auto",
          left: 0,
          right: 0,
          background: isNavbarSticky ? "white" : "transparent",
          boxShadow: isNavbarSticky ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
          paddingTop: isNavbarSticky ? "8px" : "0",
          paddingBottom: isNavbarSticky ? "8px" : "0",
          transition: "all 0.3s ease",
          zIndex: 1000,
        }}
      >
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

      <div className=" mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* محتوای اصلی */}
          <div
            ref={mainBoxRef}
            className={`
              lg:w-3/4 w-full transition-all duration-300
              ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <div className="space-y-8">
              {/* بخش محتوای اصلی مقایسه */}
              <div id="content" className="section-anchor" ref={contentRef}>
                <CompareContent
                  whichcars={whichcars}
                  dataCompare={dataCompare}
                />
              </div>

              {/* بخش مقایسه های مرتبط */}
              {ralatedComparisons.length > 0 && (
                <div id="related" className="section-anchor" ref={relatedRef}>
                  <RelatedCompare ralatedComparisons={ralatedComparisons} />
                </div>
              )}

              {/* بخش ویدئو های مرتبط */}
              {relatedVideos.length > 0 && (
                <div
                  id="relatedVideos"
                  className="section-anchor"
                  ref={relatedVideosRef}
                >
                  <RelatedVideosCompare relatedVideos={relatedVideos} />
                </div>
              )}

              {/* بخش پادکست های مرتبط */}
              {relatedVoices.length > 0 && (
                <div
                  id="relatedVoices"
                  className="section-anchor"
                  ref={relatedVoicesRef}
                >
                  <RelatedVoicesCompare relatedVoices={relatedVoices} />
                </div>
              )}
            </div>
          </div>

          {/* سایدبار */}
          <aside
            ref={sidebarRef}
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

        {/* بخش نظرات */}
        <div id="comments" className="section-anchor" ref={commentsRef}>
          {whichcars && (
            <CommentsSection details={whichcars} comments={comments} id={id} />
          )}
        </div>
      </div>

      <style jsx global>{`
        .navbar-tabs {
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .navbar-tabs .ant-card-body {
          padding: 0 !important;
          margin: 0 !important;
        }

        .compare-cars-tabs .ant-tabs-nav {
          margin: 0 !important;
        }

        .compare-cars-tabs .ant-tabs-tab {
          padding: 8px 16px;
          font-weight: 600;
          height: 50px !important;
          transition: all 0.2s;
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
          scroll-margin-top: 180px;
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

        /* دسکتاپ */
        @media (min-width: 1024px) {
          .navbar-tabs[style*="position: sticky"] {
            top: 60px !important;
          }
          .section-anchor {
            scroll-margin-top: 120px;
          }
        }

        /* غیرفعال کردن sticky در موبایل */
        @media (max-width: 1023px) {
          .lg\\:sticky {
            position: relative !important;
            bottom: auto !important;
            align-self: auto !important;
          }

          .navbar-tabs[style*="position: sticky"] {
            position: sticky !important;
            top: 115px !important;
          }
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

export default CompareCars;
