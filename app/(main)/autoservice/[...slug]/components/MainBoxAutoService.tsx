"use client";

import CommentsSection from "@/app/components/CommentsSection";
import type { TabsProps } from "antd";
import { Card, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
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
}: {
  detailsAuto: ItemsId;
  comments: CommentResponse[];
  id: number;
  banner: Items[];
  pollData: PollData;
}) {
  const [activeKey, setActiveKey] = useState("1");
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [isMainLonger, setIsMainLonger] = useState(true);

  const navbarRef = useRef<HTMLDivElement>(null);
  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // رفرنس‌های مربوط به هر بخش
  const commentsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

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
  }, []);

  // هندل کردن اسکرول و sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        setIsNavbarSticky(window.scrollY > navbarTop);
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

      {/* باکس تب ها - با position: sticky */}
      <div
        ref={navbarRef}
        className="navbar-tabs w-full px-2 z-10000"
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
            className="autoService-tabs"
          />
        </Card>
      </div>

      <div className=" mx-auto">
        <div className="flex flex-wrap lg:flex-nowrap items-start py-3 relative">
          {/* محتوای اصلی */}
          <div
            ref={mainBoxRef}
            className={`
              lg:w-3/4 w-full px-2 transition-all duration-300
              ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <div className="space-y-8">
              {/* بخش مشخصات نمایندگی */}
              <div id="contact" className="section-anchor" ref={contactRef}>
                <ContactUsAutoService detailsAuto={detailsAuto} />
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
          <aside
            ref={sidebarRef}
            className={`
              lg:w-1/4 w-full mt-6 lg:mt-0 px-2 transition-all duration-300
              ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <SidebarAutoService banner={banner} />
          </aside>
        </div>

        {/* بخش نظرات */}
        <div id="comments" className="section-anchor px-2" ref={commentsRef}>
          <CommentsSection details={detailsAuto} comments={comments} id={id} />
        </div>
      </div>

      <style jsx global>{`
        .navbar-tabs {
          transition: all 0.3s ease;
          z-index: 10000;
        }

        .navbar-tabs .ant-card-body {
          padding: 0 !important;
          margin: 0 !important;
        }

        .autoService-tabs .ant-tabs-nav {
          margin: 0 !important;
        }

        .autoService-tabs .ant-tabs-tab {
          padding: 8px 16px;
          font-weight: 600;
          transition: all 0.2s;
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
          scroll-margin-top: 180px;
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
      `}</style>
    </div>
  );
}

export default MainBoxAutoService;
