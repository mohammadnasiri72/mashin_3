"use client";

import { Card, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import CommentsSectionNews from "./CommentsSectionNews";
import NewsContentSection from "./NewsContentSection";
import NewsGallerySection from "./NewsGallerySection";
import NewsRelatedSection from "./NewsRelatedSection";
import SidebarNewsView from "./SidebarNewsView";

function NewsViewDetails({
  detailsNews,
  popularNews,
  Attachment,
  comments,
  id
}: {
  detailsNews: ItemsId;
  popularNews: Items[];
  Attachment: ItemsAttachment[];
  comments:CommentResponse[]
  id:number
}) {
  const [activeKey, setActiveKey] = useState("1");
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // رفرنس‌های مربوط به هر بخش
  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
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
        { key: "4", ref: commentsRef },
      ];

      let currentActiveKey = activeKey;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;

          if (sectionTop <= 150 && sectionBottom >= 150) {
            currentActiveKey = section.key;
            break;
          }

          if (i < sections.length - 1) {
            const nextSection = sections[i + 1];
            if (nextSection.ref.current) {
              const nextRect = nextSection.ref.current.getBoundingClientRect();
              if (sectionBottom < 150 && nextRect.top > 150) {
                currentActiveKey = section.key;
                break;
              }
            }
          }
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        currentActiveKey = "4";
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
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const items = [
    {
      key: "1",
      label: "متن خبر",
    },
    {
      key: "2",
      label: "گالری تصاویر",
    },
    {
      key: "3",
      label: "اخبار مشابه",
    },
    {
      key: "4",
      label: "نظرات کاربران",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* هدر صفحه */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                {detailsNews.title}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 flex-wrap">
                <span>دسته‌بندی: {detailsNews.categoryTitle}</span>
                <span>•</span>
                <span>تعداد بازدید: {detailsNews.visit}</span>
                <span>•</span>
                <span>
                  تاریخ انتشار:{" "}
                  {new Date(detailsNews.created).toLocaleDateString("fa-IR")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-[#ce1a2a] cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                اشتراک گذاری
              </button>
            </div>
          </div>
        </div>
      </div>

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

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-start">
          {/* محتوای اصلی */}
          <div className="lg:w-3/4 w-full">
            <div className="space-y-8">
              {/* بخش محتوای اصلی خبر */}
              <div id="content" className="section-anchor" ref={contentRef}>
                <NewsContentSection detailsNews={detailsNews} />
              </div>

              {/* بخش گالری تصاویر */}
              <div id="gallery" className="section-anchor" ref={galleryRef}>
                <NewsGallerySection
                  Attachment={Attachment}
                  detailsNews={detailsNews}
                />
              </div>

              {/* بخش اخبار مشابه */}
              <div id="related" className="section-anchor" ref={relatedRef}>
                <NewsRelatedSection relatedNews={popularNews} />
              </div>
            </div>
          </div>

          {/* سایدبار */}
          <div className="lg:w-1/4 w-full">
            <SidebarNewsView popularNews={popularNews} />
          </div>
        </div>

        {/* بخش نظرات */}
        <div id="comments" className="section-anchor mt-8" ref={commentsRef}>
          <CommentsSectionNews detailsNews={detailsNews} comments={comments} id={id}/>
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
          top: 120px;
          left: 0;
          right: 0;
          z-index: 1000;
          animation: slideDown 0.3s ease;
        }

        .news-details-tabs .ant-tabs-tab {
          padding: 12px 24px;
          font-weight: 600;
          font-size: 14px;
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
            top: 65px;
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
            scroll-margin-top: 120px;
          }
        }
      `}</style>
    </div>
  );
}

export default NewsViewDetails;