"use client";

import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { useEffect, useRef, useState } from "react";

// کامپوننت‌های فرزند
import CommentsSection from "./CommentsSection";
import FAQSection from "./FAQSection";
import GallerySection from "./GallerySection";
import ReviewSection from "./ReviewSection";
import Sidebar from "./Sidebar";
import TechnicalSection from "./TechnicalSection";

interface SectionRefs {
  [key: string]: React.RefObject<HTMLDivElement | null>;
}

const ContentTabs = ({
  detailsCar,
  Attachment,
  detailsCarcompetitor,
}: {
  detailsCar: ItemsId;
  Attachment: ItemsAttachment[];
  detailsCarcompetitor: ItemsId[];
}) => {
 

  const [activeKey, setActiveKey] = useState("review");
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // رفرنس‌های مربوط به هر بخش
  const reviewRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  // هندل کردن اسکرول و sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      // بررسی sticky بودن navbar
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        setIsSticky(window.scrollY > navbarTop);
      }

      // بررسی موقعیت اسکرول برای تغییر تب فعال
      const sections = [
        { key: "review", ref: reviewRef },
        { key: "technical", ref: technicalRef },
        { key: "images", ref: imagesRef },
        { key: "faq", ref: faqRef },
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

      // اگر به انتهای صفحه رسیده‌ایم، آخرین تب را فعال کن
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        currentActiveKey = "comments";
      }

      if (currentActiveKey !== "") {
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
  }, []);

  // هندل کلیک روی تب - اسکرول به بخش مربوطه
  const handleTabClick = (key: string) => {
    // setActiveKey(key);

    const sectionRefs: SectionRefs = {
      review: reviewRef,
      technical: technicalRef,
      images: imagesRef,
      faq: faqRef,
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

  // آیتم‌های تب
  const tabItems: TabsProps["items"] = [
    {
      key: "review",
      label: "نقد کارشناسی",
    },
    {
      key: "technical",
      label: "فنی",
    },
    {
      key: "images",
      label: "تصاویر",
    },
    {
      key: "faq",
      label: "سوالات متداول",
    },
    {
      key: "comments",
      label: "نظرات",
    },
  ];

  return (
    <div className="content-tabs-container">
      <div
        ref={navbarRef}
        className={`navbar-tabs  p-0! m-0! ${isSticky ? "sticky" : ""}`}
      >
        <Tabs
          activeKey={activeKey}
          onChange={handleTabClick}
          items={tabItems}
          className="custom-tabs "
        />
      </div>
      <div className=" flex lg:flex-row-reverse gap-3 lg:flex-nowrap flex-wrap">
        <div className="lg:w-1/4 w-full mt-6">
          <Sidebar detailsCarcompetitor={detailsCarcompetitor} detailsCar={detailsCar}/>
        </div>
        <div className="lg:w-3/4 w-full ">
          {/* Navigation Tabs */}

          {/* Content Area */}
          <div className="flex items-start gap-6 lg:flex-nowrap flex-wrap-reverse mt-6">
            {/* Main Content */}
            <div className="w-full">
              <div className="space-y-6">
                <div id="review" className="section-anchor" ref={reviewRef}>
                  <ReviewSection detailsCar={detailsCar} />
                </div>

                <div
                  id="technical"
                  className="section-anchor"
                  ref={technicalRef}
                >
                  <TechnicalSection detailsCar={detailsCar}/>
                </div>

                <div id="images" className="section-anchor" ref={imagesRef}>
                  <GallerySection Attachment={Attachment} detailsCar={detailsCar}/>
                </div>

                <div id="faq" className="section-anchor" ref={faqRef}>
                  <FAQSection />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="comments" className="section-anchor py-5" ref={commentsRef}>
        <CommentsSection detailsCar={detailsCar}/>
      </div>
      <style jsx global>{`
        .content-tabs-container {
          position: relative;
        }

        .navbar-tabs {
          background: white;
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .navbar-tabs.sticky {
          position: sticky;
          top: 120px;
          left: 0;
          right: 0;
          z-index: 1000;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: slideDown 0.3s ease;
        }
        @media (min-width: 1024px) {
          .navbar-tabs.sticky {
            top: 65px;
          }
        }

        .custom-tabs .ant-tabs-nav {
          margin: 0;
        }

        .custom-tabs .ant-tabs-tab {
          padding: 12px 20px;
          font-weight: 600;
          color: #6b7280;
          transition: all 0.3s ease;
          cursor: pointer;
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

        /* Responsive */
        @media (max-width: 768px) {
          .navbar-tabs {
            padding: 0.75rem;
          }

          .custom-tabs .ant-tabs-tab {
            padding: 8px 12px;
            font-size: 0.9rem;
          }

          .section-anchor {
            scroll-margin-top: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContentTabs;
