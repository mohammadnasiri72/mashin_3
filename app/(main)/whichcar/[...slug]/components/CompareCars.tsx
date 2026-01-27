"use client";

import { Card, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
// import RelatedVideos from "./RelatedVideos";
import CompareContent from "./CompareContent";
import RelatedCompare from "./RelatedCompare";
import SideBarCompareCars from "./SideBarCompareCars";
import WhichcarsComments from "./WhichcarsComments";
import HeroSectionWhichcars from "./HeroSectionWhichcars";

function CompareCars({
  whichcars,
  dataCompare,
  popularComparisons,
  ralatedComparisons,
  comments,
  id,
  banner,
}: {
  whichcars: ItemsId;
  dataCompare: ItemsId[];
  popularComparisons: Items[];
  ralatedComparisons: Items[];
  comments: CommentResponse[];
  id: number;
  banner: Items[];
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
        top: offsetPosition-50,
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
    // ...(ralatedComparisons.length > 0
    //   ? [
    //       {
    //         key: "2",
    //         label: "مقایسه‌های مرتبط",
    //       },
    //     ]
    //   : []),
    {
      key: "3",
      label: "نظرات کاربران",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <HeroSectionWhichcars whichcars={whichcars} />
      {/* باکس تب ها */}
      <div ref={navbarRef} className="navbar-tabs sticky w-full px-2 mt-4 mb-8">
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

      <div className="flex flex-col lg:flex-row gap-6 px-4">
        <div className="lg:w-3/4 w-full">
          <div className="space-y-8">
            {/* بخش محتوای اصلی مقایسه */}

            <div id="content" className="section-anchor" ref={contentRef}>
              <CompareContent whichcars={whichcars} dataCompare={dataCompare} />
            </div>

            {/* بخش مقایسه های مرتبط */}
            {/* {ralatedComparisons.length > 0 && (
              <div id="related" className="section-anchor" ref={relatedRef}>
                <RelatedCompare ralatedComparisons={ralatedComparisons} />
              </div>
            )} */}
          </div>
        </div>
        {/* سایدبار */}
        <div className="lg:w-1/4 w-full">
          <SideBarCompareCars
            popularComparisons={popularComparisons}
            banner={banner}
          />
        </div>
      </div>

      {/* بخش نظرات */}
      <div id="comments" className="section-anchor" ref={commentsRef}>
        {whichcars && (
          <WhichcarsComments
            whichcars={whichcars}
            comments={comments}
            id={id}
          />
        )}
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
          top: 112px;
          left: 0;
          right: 0;
          z-index: 1000;
          animation: slideDown 0.3s ease;
        }

        .compare-cars-tabs .ant-tabs-tab {
          padding: 12px 24px;
          font-weight: 600;
          height: 50px !important;
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
          scroll-margin-top: 110px;
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
            top: 60px;
          }
        }
      `}</style>
    </div>
  );
}

export default CompareCars;
