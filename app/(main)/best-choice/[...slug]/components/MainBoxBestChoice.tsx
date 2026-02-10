"use client";

import type { TabsProps } from "antd";
import { Card, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import HeroSectionBestChoice from "./HeroSectionBestChoice";
import DescBestChoice from "./DescBestChoice";
import GalleryBestChoice from "./GalleryBestChoice";
import CompetitorsBestChoice from "./CompetitorsBestChoice";
import SidebarBestChoice from "./SidebarBestChoice";
import CommentsBestChoice from "./CommentsBestChoice";
// import CommentsAutoService from "./CommentsAutoService";
// import ContactUsAutoService from "./ContactUsAutoService";
// import HeroSectionAutoService from "./HeroSectionAutoService";
// import RatingAutoService from "./RatingAutoService";
// import SidebarAutoService from "./SidebarAutoService";

function MainBoxBestChoice({
  detailsBest,
  comments,
  id,
  banner,
  Attachment,
  competitorsCar,
  popularBestChoices
}: {
  detailsBest: ItemsId;
  comments: CommentResponse[];
  id: number;
  banner: Items[];
  Attachment: ItemsAttachment[];
  competitorsCar: ItemsId[];
  popularBestChoices:Items[]
}) {
  const title = detailsBest.properties.find(
    (e) => e.propertyKey === "p1043_carname",
  )?.propertyValue;

  const [activeKey, setActiveKey] = useState("1");
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // رفرنس‌های مربوط به هر بخش
  const commentsRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const competitorsRef = useRef<HTMLDivElement>(null);

  // هندل کردن اسکرول و sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        setIsSticky(window.scrollY > navbarTop);
      }

      const sections = [
        { key: "1", ref: descRef },
        { key: "2", ref: galleryRef },
        { key: "3", ref: competitorsRef },
        { key: "4", ref: commentsRef },
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

      // if (
      //   window.innerHeight + window.scrollY >=
      //   document.body.offsetHeight - 200
      // ) {
      //   currentActiveKey = "5";
      // }

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
      "1": descRef,
      "2": galleryRef,
      "3": competitorsRef,
      "4": commentsRef,
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
        top: offsetPosition - 50,
        behavior: "smooth",
      });
    }
  };

  const labelR: string = title ? `رقبای ${title}` : "رقبا";

  const items: TabsProps["items"] = [
    ...(detailsBest
      ? [
          {
            key: "1",
            label: "محتوای اصلی ",
          },
        ]
      : []),
    ...(Attachment.length > 0
      ? [
          {
            key: "2",
            label: "گالری تصاویر",
          },
        ]
      : []),
    ...(competitorsCar.length > 0
      ? [
          {
            key: "3",
            label: `${labelR}`,
          },
        ]
      : []),

    {
      key: "4",
      label: "نظرات کاربران",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* هدر صفحه */}
      <HeroSectionBestChoice detailsBest={detailsBest} />
      {/* باکس تب ها */}
      <div ref={navbarRef} className="navbar-tabs sticky w-full px-2 z-10000!">
        <Card
          style={{ padding: 0, margin: 0 }}
          className="rounded-xl shadow-lg z-1000000!"
        >
          <Tabs
            activeKey={activeKey}
            onChange={handleTabClick}
            type="card"
            items={items}
            className="autoService-tabs p-0! m-0!"
          />
        </Card>
      </div>
      <div>
        <div className="flex flex-wrap items-start py-3">
          {/* محتوای اصلی */}

          <div className="lg:w-3/4 w-full px-2">
            <div className="space-y-8">
              {/* بخش محتوا اصلی */}
              <div id="desc" className="section-anchor" ref={descRef}>
                <DescBestChoice detailsBest={detailsBest} title={title}/>
              </div>

              {/* بخش گالری تصاویر */}
              {Attachment.length > 0 && (
                <div id="gallery" className="section-anchor" ref={galleryRef}>
                  <GalleryBestChoice
                    detailsBest={detailsBest}
                    Attachment={Attachment}
                    title={title}
                  />
                </div>
              )}

              {/* بخش رقبا */}
              {competitorsCar.length > 0 && (
                <div
                  id="competitors"
                  className="section-anchor"
                  ref={competitorsRef}
                >
                  <CompetitorsBestChoice
                    competitorsCar={competitorsCar}
                    title={title}
                  />
                </div>
              )}
            </div>
          </div>

          {/* سایدبار */}
          <aside className="lg:w-1/4 w-full mt-6 lg:mt-0">
            <SidebarBestChoice banner={banner} popularBestChoices={popularBestChoices}/>
          </aside>
        </div>
        {/* بخش نظرات */}
        <div id="comments" className="section-anchor" ref={commentsRef}>
          <CommentsBestChoice
            detailsBest={detailsBest}
            comments={comments}
            id={id}
          />
        </div>
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
        .autoService-tabs .ant-tabs-nav {
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

        .autoService-tabs .ant-tabs-tab {
          padding: 12px 24px;
          font-weight: 600;
          height: 50px !important;
        }

        .autoService-tabs .ant-tabs-tab-active {
          background: #ce1a2a !important;
          border-color: #ce1a2a !important;
        }

        .autoService-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: white !important;
        }

        .autoService-tabs .ant-tabs-ink-bar {
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

export default MainBoxBestChoice;
