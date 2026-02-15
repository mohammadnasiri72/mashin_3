"use client";

import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { useEffect, useRef, useState } from "react";

// کامپوننت‌های فرزند
import CommentsSection from "./CommentsSection";
// import FAQSection from "./FAQSection";
import GallerySection from "./GallerySection";
import ReviewSection from "./ReviewSection";
import Sidebar from "./Sidebar";
import TechnicalSection from "./TechnicalSection";
import RelatedNewsSection from "./RelatedNewsSection";
import RelatedVideosSection from "./RelatedVideosSection";
import RelatedComparisons from "./RelatedComparisons";

interface SectionRefs {
  [key: string]: React.RefObject<HTMLDivElement | null>;
}

const ContentTabs = ({
  detailsCar,
  Attachment,
  detailsCarcompetitor,
  comments,
  id,
  carsModel,
  relatedNews,
  relatedVideos,
  relatedCompares,
}: {
  detailsCar: ItemsId;
  Attachment: ItemsAttachment[];
  detailsCarcompetitor: ItemsId[];
  comments: CommentResponse[];
  id: number;
  carsModel: Items[];
  relatedNews: Items[];
  relatedVideos: Items[];
  relatedCompares: ItemsId[];
}) => {
  const [activeKey, setActiveKey] = useState("review");
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // رفرنس‌های مربوط به هر بخش
  const reviewRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const ComparisonsRef = useRef<HTMLDivElement>(null);
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
        { key: "news", ref: newsRef },
        { key: "video", ref: videoRef },
        { key: "Comparisons", ref: ComparisonsRef },
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

      if (currentActiveKey !== "") {
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
  }, []);

  const handleTabClick = (key: string) => {
    const sectionRefs: SectionRefs = {
      review: reviewRef,
      technical: technicalRef,
      images: imagesRef,
      news: newsRef,
      video: videoRef,
      Comparisons: ComparisonsRef,
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
        top: offsetPosition - 50,
        behavior: "smooth",
      });
    }
  };

  const Criticism = detailsCar.properties.filter((e) => e.propertyKey === "p1042_naghd");
  const specifications = detailsCar.properties.filter(
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
            label: "مشخصات فنی",
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
    ...(relatedNews.length > 0
      ? [
          {
            key: "news",
            label: "اخبار مرتبط",
          },
        ]
      : []),
    ...(relatedVideos.length > 0
      ? [
          {
            key: "video",
            label: "ویدئوهای مرتبط",
          },
        ]
      : []),
    ...(relatedCompares.length > 0
      ? [
          {
            key: "Comparisons",
            label: "مقایسه‌های مرتبط",
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
      <div
        ref={navbarRef}
        className={`navbar-tabs p-0! m-0! ${isSticky ? "sticky" : ""}`}
      >
        <Tabs
          activeKey={activeKey}
          onChange={handleTabClick}
          items={tabItems}
          className="custom-tabs"
        />
      </div>
      <div className=" flex lg:flex-row-reverse gap-3 lg:flex-nowrap flex-wrap">
        <aside className="lg:w-1/4 w-full mt-6">
          <Sidebar
            detailsCarcompetitor={detailsCarcompetitor}
            detailsCar={detailsCar}
            carsModel={carsModel}
          />
        </aside>
        <div className="lg:w-3/4 w-full ">
          {/* Navigation Tabs */}

          {/* Content Area */}
          <div className="flex items-start gap-6 lg:flex-nowrap flex-wrap-reverse mt-6">
            {/* Main Content */}
            <div className="w-full">
              <div className="space-y-6">
                {Criticism[0]?.value && (
                  <div id="review" className="section-anchor" ref={reviewRef}>
                    <ReviewSection detailsCar={detailsCar} />
                  </div>
                )}
                {specifications.length > 0 && (
                  <div
                    id="technical"
                    className="section-anchor"
                    ref={technicalRef}
                  >
                    <TechnicalSection detailsCar={detailsCar} />
                  </div>
                )}
                {Attachment.length > 0 && (
                  <div id="images" className="section-anchor" ref={imagesRef}>
                    <GallerySection
                      Attachment={Attachment}
                      detailsCar={detailsCar}
                    />
                  </div>
                )}
                {relatedNews.length > 0 && (
                  <div id="news" className="section-anchor" ref={newsRef}>
                    <RelatedNewsSection
                      relatedNews={relatedNews}
                      detailsCar={detailsCar}
                    />
                  </div>
                )}
                {relatedVideos.length > 0 && (
                  <div id="video" className="section-anchor" ref={videoRef}>
                    <RelatedVideosSection
                      relatedVideos={relatedVideos}
                      detailsCar={detailsCar}
                    />
                  </div>
                )}
                {relatedCompares.length > 0 && (
                  <div
                    id="Comparisons"
                    className="section-anchor"
                    ref={ComparisonsRef}
                  >
                    <RelatedComparisons
                      relatedCompares={relatedCompares}
                      detailsCar={detailsCar}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="comments" className="section-anchor py-5" ref={commentsRef}>
        <CommentsSection detailsCar={detailsCar} comments={comments} id={id} />
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
          top: 112px;
          left: 0;
          right: 0;
          z-index: 1000;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: slideDown 0.3s ease;
        }
        @media (min-width: 1024px) {
          .navbar-tabs.sticky {
            top: 60px;
          }
        }

        .custom-tabs .ant-tabs-nav {
          margin: 0;
        }

        .custom-tabs .ant-tabs-tab {
          padding: 12px 20px;
          font-weight: 600;
          color: #6b7280 !important;
          transition: all 0.3s ease;
          cursor: pointer;
          height: 50px !important;
        }

        .custom-tabs .ant-tabs-tab:hover {
          color: #ce1a2a;
        }

        .custom-tabs .ant-tabs-tab-active {
          color: #fff !important;
          background: #ce1a2a;
        }
        .custom-tabs .ant-tabs-tab .ant-tabs-tab-btn {
          color: #222 !important;
        }
        .custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #fff !important;
        }

        .custom-tabs .ant-tabs-ink-bar {
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
