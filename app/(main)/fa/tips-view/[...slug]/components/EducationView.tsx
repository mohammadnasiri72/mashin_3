"use client";

import { Card, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import EducationComments from "./EducationComments";
import EducationContent from "./EducationContent";
import RelatedEducation from "./RelatedEducation";
import SidebarEducation from "./SidebarEducation";
import HeroSectionEdu from "./HeroSectionEdu";

function EducationView({
  education,
  popularEducations,
  relatedEducations,
  id,
  comments,
  banner,
}: {
  education: ItemsId;
  popularEducations: Items[];
  relatedEducations: Items[];
  id: number;
  comments: CommentResponse[];
  banner: Items[];
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
  }, [education, relatedEducations, popularEducations, banner]);

  // هندل کردن اسکرول و sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        setIsNavbarSticky(window.scrollY > navbarTop);
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
    ...(education
      ? [
          {
            key: "1",
            label: "محتوا و توضیحات",
          },
        ]
      : []),
    ...(relatedEducations.length > 0
      ? [
          {
            key: "2",
            label: "مطالب مرتبط",
          },
        ]
      : []),
    {
      key: "3",
      label: "نظرات کاربران",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <HeroSectionEdu education={education} />

      {/* باکس تب ها - با position: sticky */}
      <div
        ref={navbarRef}
        className="navbar-tabs w-full px-2 mt-4"
        style={{
          position: 'sticky',
          top: isNavbarSticky ? '112px' : 'auto',
          left: 0,
          right: 0,
          background: isNavbarSticky ? 'white' : 'transparent',
          boxShadow: isNavbarSticky ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
          paddingTop: isNavbarSticky ? '8px' : '0',
          paddingBottom: isNavbarSticky ? '8px' : '0',
          transition: 'all 0.3s ease',
          zIndex: 1000
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
            className="education-details-tabs p-0! m-0!"
          />
        </Card>
      </div>

      <div className="mx-auto px-4 py-8">
        <div className="flex flex-wrap lg:flex-nowrap items-start gap-6 relative">
          {/* محتوای اصلی */}
          <div
            ref={mainBoxRef}
            className={`
              lg:w-3/4 w-full transition-all duration-300
              ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <div className="space-y-8">
              {/* بخش محتوا و توضیحات */}
              {education && (
                <div id="content" className="section-anchor" ref={contentRef}>
                  <EducationContent education={education} />
                </div>
              )}

              {/* بخش مطالب مرتبط */}
              {relatedEducations.length > 0 && (
                <div id="related" className="section-anchor" ref={relatedRef}>
                  <RelatedEducation relatedEducations={relatedEducations} />
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
            <SidebarEducation
              popularEducations={popularEducations}
              banner={banner}
            />
          </aside>
        </div>

        {/* بخش نظرات */}
        <div id="comments" className="section-anchor mt-8" ref={commentsRef}>
          <EducationComments
            education={education}
            id={id}
            comments={comments}
          />
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
        
        .education-details-tabs .ant-tabs-nav {
          margin: 0 !important;
        }

        .education-details-tabs .ant-tabs-tab {
          padding: 8px 16px;
          font-weight: 600;
          height: 50px !important;
          transition: all 0.2s;
        }

        .education-details-tabs .ant-tabs-tab-active {
          background: #ce1a2a !important;
          border-color: #ce1a2a !important;
        }

        .education-details-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: white !important;
        }

        .education-details-tabs .ant-tabs-ink-bar {
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

export default EducationView;