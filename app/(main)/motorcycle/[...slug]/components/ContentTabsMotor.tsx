"use client";

import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
// import FAQSection from "./FAQSection";
import GallerySection from "./GallerySection";
import ReviewSection from "./ReviewSection";
import Sidebar from "./Sidebar";
import TechnicalSection from "./TechnicalSection";
import CommentsSection from "@/app/components/CommentsSection";

interface SectionRefs {
  [key: string]: React.RefObject<HTMLDivElement | null>;
}

const ContentTabsMotor = ({
  detailsMotorcycle,
  Attachment,
  detailsMotorcompetitor,
  comments,
  id,
  motorcyclesModel,
  motorcyclesModel2,
  lastNews,
  lastVideos,
}: {
  detailsMotorcycle: ItemsId;
  Attachment: ItemsAttachment[];
  detailsMotorcompetitor: ItemsId[];
  comments: CommentResponse[];
  id: number;
  motorcyclesModel: Items[];
  motorcyclesModel2: Items[];
  lastNews: Items[];
  lastVideos: Items[];
}) => {
  const [activeKey, setActiveKey] = useState("review");
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [isMainLonger, setIsMainLonger] = useState(true);

  const navbarRef = useRef<HTMLDivElement>(null);
  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // رفرنس‌های مربوط به هر بخش
  const reviewRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  // const faqRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const Criticism = detailsMotorcycle.properties.filter(
    (e) => e.propertyId === 22642,
  );

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
  }, [detailsMotorcycle, Attachment, detailsMotorcompetitor, motorcyclesModel]);

  // هندل کردن اسکرول و sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      // بررسی sticky بودن navbar
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        setIsNavbarSticky(window.scrollY > navbarTop);
      }

      // بررسی موقعیت اسکرول برای تغییر تب فعال
      const sections = [
        { key: "review", ref: reviewRef },
        { key: "technical", ref: technicalRef },
        { key: "images", ref: imagesRef },
        // { key: "faq", ref: faqRef },
        { key: "comments", ref: commentsRef },
      ];

      // پیدا کردن بخش فعال با استفاده از getBoundingClientRect
      let currentActiveKey = "";

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;

          // اگر بخش در viewport قرار دارد
          if (sectionTop <= 200 && sectionBottom >= 200) {
            currentActiveKey = section.key;
            break;
          }

          // اگر از بخش رد شده‌ایم اما به بخش بعدی نرسیده‌ایم
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

      if (currentActiveKey !== "" && currentActiveKey !== activeKey) {
        setActiveKey(currentActiveKey);
      }
    };

    // استفاده از throttle برای بهینه‌سازی performance
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

    // فراخوانی اولیه برای تنظیم تب صحیح
    handleScroll();

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [activeKey]);

  // هندل کلیک روی تب - اسکرول به بخش مربوطه
  const handleTabClick = (key: string) => {
    const sectionRefs: SectionRefs = {
      review: reviewRef,
      technical: technicalRef,
      images: imagesRef,
      // faq: faqRef,
      comments: commentsRef,
    };

    const targetRef = sectionRefs[key];
    if (targetRef?.current) {
      // محاسبه موقعیت با تابع recursive برای دقت بیشتر
      const getAbsoluteOffsetTop = (element: HTMLElement): number => {
        let offsetTop = 0;
        let currentElement: HTMLElement | null = element;

        while (currentElement) {
          offsetTop += currentElement.offsetTop;
          currentElement = currentElement.offsetParent as HTMLElement;
        }

        return offsetTop - 50;
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

  const specifications = detailsMotorcycle.properties.filter(
    (e) => e.isTechnicalProperty,
  );

  // آیتم‌های تب
  const tabItems: TabsProps["items"] = [
    ...(Criticism[0]?.value
      ? [
          {
            key: "review",
            label: "نقد کارشناسی",
          },
        ]
      : []),
    ...(specifications.length > 0
      ? [
          {
            key: "technical",
            label: "فنی",
          },
        ]
      : []),
    ...(Attachment.length > 0
      ? [
          {
            key: "images",
            label: "تصاویر",
          },
        ]
      : []),
    {
      key: "comments",
      label: "نظرات",
    },
  ];

  return (
    <div className="content-tabs-container">
      {/* نوار تب‌ها - با position: sticky */}
      <div
        ref={navbarRef}
        className="navbar-tabs p-0! m-0!"
        style={{
          position: "sticky",
          top: isNavbarSticky ? "112px" : "auto",
          left: 0,
          right: 0,
          background: isNavbarSticky ? "white" : "white",
          boxShadow: isNavbarSticky
            ? "0 4px 12px rgba(0,0,0,0.15)"
            : "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: isNavbarSticky ? "0 0 12px 12px" : "12px",
          padding: isNavbarSticky ? "0.75rem 1rem" : "1rem",
          transition: "all 0.3s ease",
          zIndex: 1000,
        }}
      >
        <Tabs
          activeKey={activeKey}
          onChange={handleTabClick}
          items={tabItems}
          className="custom-tabs"
        />
      </div>

      <div className="flex lg:flex-row-reverse gap-3 lg:flex-nowrap flex-wrap mx-auto px-2">
        {/* سایدبار */}
        <aside
          ref={sidebarRef}
          className={`
            lg:w-1/4 w-full mt-6 transition-all duration-300
            ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
          `}
        >
          <Sidebar
            detailsMotorcompetitor={detailsMotorcompetitor}
            detailsMotorcycle={detailsMotorcycle}
            motorcyclesModel={motorcyclesModel}
            motorcyclesModel2={motorcyclesModel2}
            lastNews={lastNews}
            lastVideos={lastVideos}
          />
        </aside>

        {/* محتوای اصلی */}
        <div
          ref={mainBoxRef}
          className={`
            lg:w-3/4 w-full transition-all duration-300
            ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
          `}
        >
          <div className="flex items-start gap-6 lg:flex-nowrap flex-wrap-reverse mt-6">
            {/* Main Content */}
            <div className="w-full">
              <div className="space-y-6">
                {Criticism[0]?.value && (
                  <div id="review" className="section-anchor" ref={reviewRef}>
                    <ReviewSection detailsMotorcycle={detailsMotorcycle} />
                  </div>
                )}
                {specifications.length > 0 && (
                  <div
                    id="technical"
                    className="section-anchor"
                    ref={technicalRef}
                  >
                    <TechnicalSection detailsMotorcycle={detailsMotorcycle} />
                  </div>
                )}
                {Attachment.length > 0 && (
                  <div id="images" className="section-anchor" ref={imagesRef}>
                    <GallerySection
                      Attachment={Attachment}
                      detailsMotorcycle={detailsMotorcycle}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* بخش نظرات */}
      <div
        id="comments"
        className="section-anchor py-5 container mx-auto px-2"
        ref={commentsRef}
      >
        <CommentsSection
          details={detailsMotorcycle}
          comments={comments}
          id={id}
        />
      </div>

      <style jsx global>{`
        .content-tabs-container {
          position: relative;
        }

        .custom-tabs .ant-tabs-nav {
          margin: 0;
        }

        .custom-tabs .ant-tabs-tab {
          padding: 8px 16px;
          font-weight: 600;
          height: 50px !important;
          transition: all 0.2s;
        }

        .custom-tabs .ant-tabs-tab:hover {
          color: #ce1a2a;
        }

        .custom-tabs .ant-tabs-tab-active {
          color: #fff !important;
          background: #ce1a2a;
        }

        .custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #fff !important;
        }

        .custom-tabs .ant-tabs-ink-bar {
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

        .container {
          max-width: 1200px;
          margin: 0 auto;
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

        /* Responsive */
        @media (max-width: 768px) {
          .custom-tabs .ant-tabs-tab {
            padding: 8px 12px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ContentTabsMotor;
