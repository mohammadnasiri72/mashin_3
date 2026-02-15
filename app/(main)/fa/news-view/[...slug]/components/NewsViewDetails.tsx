"use client";

import { Card, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import CommentsSectionNews from "./CommentsSectionNews";
import NewsContentSection from "./NewsContentSection";
import NewsGallerySection from "./NewsGallerySection";
import NewsRelatedSection from "./NewsRelatedSection";
import SidebarNewsView from "./SidebarNewsView";
import HeroSectionNews from "./HeroSectionNews";
import CarsRelatedSection from "./CarsRelatedSection";
import VideosRelatedSection from "./VideosRelatedSection";
import VoicesRelatedSection from "./VoicesRelatedSection";

function NewsViewDetails({
  detailsNews,
  popularNews,
  Attachment,
  comments,
  id,
  banner,
  relatedNews,
  relatedCars,
  relatedVideos,
  relatedVoices,
}: {
  detailsNews: ItemsId;
  popularNews: Items[];
  Attachment: ItemsAttachment[];
  comments: CommentResponse[];
  id: number;
  banner: Items[];
  relatedNews: Items[];
  relatedCars: ItemsId[];
  relatedVideos: ItemsId[];
  relatedVoices: ItemsId[];
}) {
  const [activeKey, setActiveKey] = useState("1");
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // رفرنس‌های مربوط به هر بخش
  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const relatedCarRef = useRef<HTMLDivElement>(null);
  const relatedVideosRef = useRef<HTMLDivElement>(null);
  const relatedVoicesRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  // هندل کردن اسکرول و sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        setIsSticky(window.scrollY > navbarTop);
      }

      const sections = [
        { key: "1", ref: contentRef },
        { key: "2", ref: galleryRef },
        { key: "3", ref: relatedRef },
        { key: "4", ref: relatedCarRef },
        { key: "5", ref: relatedVideosRef },
        { key: "6", ref: relatedVoicesRef },
        { key: "7", ref: commentsRef },
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
      "2": galleryRef,
      "3": relatedRef,
      "4": relatedCarRef,
      "5": relatedVideosRef,
      "6": relatedVoicesRef,
      "7": commentsRef,
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

  const items = [
    ...(detailsNews
      ? [
          {
            key: "1",
            label: "متن خبر",
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
    ...(relatedNews.length > 0
      ? [
          {
            key: "3",
            label: "اخبار مرتبط",
          },
        ]
      : []),
    ...(relatedCars.length > 0
      ? [
          {
            key: "4",
            label: "خودروهای مرتبط",
          },
        ]
      : []),
    ...(relatedVideos.length > 0
      ? [
          {
            key: "5",
            label: "ویدئوهای مرتبط",
          },
        ]
      : []),
    ...(relatedVoices.length > 0
      ? [
          {
            key: "6",
            label: "پادکست‌های مرتبط",
          },
        ]
      : []),
    {
      key: "7",
      label: "نظرات کاربران",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* هدر صفحه */}
      <HeroSectionNews detailsNews={detailsNews} />

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
            className="news-details-tabs p-0! m-0!"
          />
        </Card>
      </div>

      <div className="py-8 ">
        <div className="flex flex-wrap items-start ">
          {/* محتوای اصلی */}
          <div className="lg:w-3/4 w-full">
            <div className="space-y-8">
              {/* بخش محتوای اصلی خبر */}
              {detailsNews && (
                <div id="content" className="section-anchor" ref={contentRef}>
                  <NewsContentSection detailsNews={detailsNews} />
                </div>
              )}

              {/* بخش گالری تصاویر */}
              {Attachment.length > 0 && (
                <div id="gallery" className="section-anchor" ref={galleryRef}>
                  <NewsGallerySection
                    Attachment={Attachment}
                    detailsNews={detailsNews}
                  />
                </div>
              )}

              {/* بخش اخبار مرتبط */}
              {relatedNews.length > 0 && (
                <div
                  id="related"
                  className="section-anchor px-4"
                  ref={relatedRef}
                >
                  <NewsRelatedSection relatedNews={relatedNews} />
                </div>
              )}
              {/* بخش خودروهای مرتبط */}
              {relatedCars.length > 0 && (
                <div
                  id="relatedCars"
                  className="section-anchor px-4"
                  ref={relatedCarRef}
                >
                  <CarsRelatedSection relatedCars={relatedCars} />
                </div>
              )}
              {/* بخش ویدئوهای مرتبط */}
              {relatedVideos.length > 0 && (
                <div
                  id="relatedVideos"
                  className="section-anchor px-4"
                  ref={relatedVideosRef}
                >
                  <VideosRelatedSection relatedVideos={relatedVideos} />
                </div>
              )}
              {/* بخش پادکست‌های مرتبط */}
              {relatedVoices.length > 0 && (
                <div
                  id="relatedVoices"
                  className="section-anchor px-4"
                  ref={relatedVoicesRef}
                >
                  <VoicesRelatedSection relatedVoices={relatedVoices} />
                </div>
              )}
            </div>
          </div>

          {/* سایدبار */}
          <aside className="lg:w-1/4 w-full ">
            <SidebarNewsView popularNews={popularNews} banner={banner} />
          </aside>
        </div>

        {/* بخش نظرات */}
        <div id="comments" className="section-anchor mt-8" ref={commentsRef}>
          <CommentsSectionNews
            detailsNews={detailsNews}
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
        .news-details-tabs .ant-tabs-nav {
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

        .news-details-tabs .ant-tabs-tab {
          padding: 12px 24px;
          font-weight: 600;
          font-size: 14px;
          height: 50px !important;
        }

        .news-details-tabs .ant-tabs-tab-active {
          background: #ce1a2a !important;
          border-color: #ce1a2a !important;
        }

        .news-details-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: white !important;
        }

        .news-details-tabs .ant-tabs-ink-bar {
          background: #ce1a2a;
        }

        .section-anchor {
          scroll-margin-top: 140px;
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
            top: 60px !important;
          }
          .section-anchor {
            scroll-margin-top: 100px;
          }
        }

        @media (max-width: 768px) {
          .news-details-tabs .ant-tabs-tab {
            padding: 8px 16px;
            font-size: 12px;
          }
          .section-anchor {
            scroll-margin-top: 110px;
          }
        }
      `}</style>
    </div>
  );
}

export default NewsViewDetails;
