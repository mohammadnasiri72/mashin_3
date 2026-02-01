"use client";

import type { TabsProps } from "antd";
import { Card, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import CommentsAutoService from "./CommentsAutoService";
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
  Latitude,
  Longitude,
}: {
  detailsAuto: ItemsId;
  comments: CommentResponse[];
  id: number;
  banner: Items[];
  pollData: PollData;
  Latitude: string;
  Longitude: string;
}) {
  const [activeKey, setActiveKey] = useState("1");
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // رفرنس‌های مربوط به هر بخش
  const commentsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // هندل کردن اسکرول و sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        setIsSticky(window.scrollY > navbarTop);
      }

      const sections = [
        { key: "1", ref: contactRef },
        { key: "2", ref: servicesRef },
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
      "1": contactRef,
      "2": servicesRef,
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
        top: offsetPosition - 50,
        behavior: "smooth",
      });
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "مشخصات نمایندگی",
    },
    {
      key: "2",
      label: "نظرسنجی",
    },
    {
      key: "3",
      label: "نظرات مشتریان",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* هدر صفحه */}
      <HeroSectionAutoService detailsAuto={detailsAuto} />
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
        <div className="flex flex-wrap items-start py-8">
          {/* محتوای اصلی */}

          <div className="lg:w-3/4 w-full px-2">
            <div className="space-y-8 mt-6">
              {/* بخش مشخصات نمایندگی */}
              <div id="contact" className="section-anchor" ref={contactRef}>
                <ContactUsAutoService
                  detailsAuto={detailsAuto}
                  Latitude={Latitude}
                  Longitude={Longitude}
                />
              </div>

              {/* بخش نظرسنجی */}
              <div id="services" className="section-anchor" ref={servicesRef}>
                <RatingAutoService
                  initialPollData={pollData}
                  detailsAuto={detailsAuto}
                />
              </div>
            </div>
          </div>

          {/* سایدبار */}
          <div className="lg:w-1/4 w-full mt-6 lg:mt-0">
            <SidebarAutoService banner={banner} />
          </div>
        </div>
        {/* بخش نظرات */}
        <div id="comments" className="section-anchor" ref={commentsRef}>
          <CommentsAutoService
            detailsAuto={detailsAuto}
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
            top: 65px;
          }
        }
      `}</style>
    </div>
  );
}

export default MainBoxAutoService;
