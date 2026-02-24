"use client";

import { Card, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import NewsContentSection from "./NewsContentSection";
import NewsGallerySection from "./NewsGallerySection";
import NewsRelatedSection from "./NewsRelatedSection";
import SidebarNewsView from "./SidebarNewsView";
import HeroSectionNews from "./HeroSectionNews";
import CarsRelatedSection from "./CarsRelatedSection";
import VideosRelatedSection from "./VideosRelatedSection";
import VoicesRelatedSection from "./VoicesRelatedSection";
import CommentsSection from "@/app/components/CommentsSection";

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






   // ذخیره در localStorage
    useEffect(() => {
      try {
        // دریافت لیست قبلی
        const recentViews = JSON.parse(
          localStorage.getItem("recentCarViews") || "[]",
        );
  
        // ساخت آیتم جدید
        const newView = {
          id: detailsNews.id,
          title: detailsNews.title,
          sourceName: detailsNews.sourceName,
          publishCode: detailsNews.publishCode,
          image: detailsNews.image,
          timestamp: Date.now(),
          url: detailsNews.url,
          type: 'اخبار'
        };
  
        // حذف اگر قبلا بود
        const filteredViews = recentViews.filter(
          (item: any) => item.id !== detailsNews.id,
        );
  
        // اضافه به اول لیست و نگه داشتن حداکثر ۱۰ مورد
        const updatedViews = [newView, ...filteredViews].slice(0, 10);
  
        // ذخیره
        localStorage.setItem("recentCarViews", JSON.stringify(updatedViews));
      } catch (error) {
        console.error("خطا در ذخیره بازدید:", error);
      }
    }, [detailsNews.id]); // فقط وقتی id تغییر کند اجرا شود
  











  const [activeKey, setActiveKey] = useState("1");
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [isMainLonger, setIsMainLonger] = useState(true);

  const navbarRef = useRef<HTMLDivElement>(null);
  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // رفرنس‌های مربوط به هر بخش
  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);
  const relatedCarRef = useRef<HTMLDivElement>(null);
  const relatedVideosRef = useRef<HTMLDivElement>(null);
  const relatedVoicesRef = useRef<HTMLDivElement>(null);
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
  }, [
    detailsNews,
    Attachment,
    relatedNews,
    relatedCars,
    relatedVideos,
    relatedVoices,
    popularNews,
    banner,
  ]);

  // هندل کردن اسکرول و sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        setIsNavbarSticky(window.scrollY > navbarTop);
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
    <article className="min-h-screen bg-gray-50 w-full">
      {/* هدر صفحه */}
      <header>
        <HeroSectionNews detailsNews={detailsNews} />
      </header>

      {/* باکس تب ها - با position: sticky */}
      <div
        ref={navbarRef}
        className="navbar-tabs w-full px-2 mt-4"
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
          zIndex: 1000,
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
            className="news-details-tabs p-0! m-0!"
          />
        </Card>
      </div>

      <div className="mx-auto px-2 py-8">
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
                <div id="related" className="section-anchor" ref={relatedRef}>
                  <NewsRelatedSection relatedNews={relatedNews} />
                </div>
              )}

              {/* بخش خودروهای مرتبط */}
              {relatedCars.length > 0 && (
                <div
                  id="relatedCars"
                  className="section-anchor"
                  ref={relatedCarRef}
                >
                  <CarsRelatedSection relatedCars={relatedCars} />
                </div>
              )}

              {/* بخش ویدئوهای مرتبط */}
              {relatedVideos.length > 0 && (
                <div
                  id="relatedVideos"
                  className="section-anchor"
                  ref={relatedVideosRef}
                >
                  <VideosRelatedSection relatedVideos={relatedVideos} />
                </div>
              )}

              {/* بخش پادکست‌های مرتبط */}
              {relatedVoices.length > 0 && (
                <div
                  id="relatedVoices"
                  className="section-anchor"
                  ref={relatedVoicesRef}
                >
                  <VoicesRelatedSection relatedVoices={relatedVoices} />
                </div>
              )}
            </div>
          </div>

          {/* سایدبار */}
          <aside
            ref={sidebarRef}
            aria-label="اخبار پربازدید و بنرهای جانبی"
            className={`
              lg:w-1/4 w-full transition-all duration-300
              ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <SidebarNewsView popularNews={popularNews} banner={banner} />
          </aside>
        </div>

        {/* بخش نظرات */}
        <div id="comments" className="section-anchor mt-8" ref={commentsRef}>
          <CommentsSection details={detailsNews} comments={comments} id={id} />
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

        .news-details-tabs .ant-tabs-nav {
          margin: 0 !important;
        }

        .news-details-tabs .ant-tabs-tab {
          padding: 8px 16px;
          font-weight: 600;
          font-size: 14px;
          height: 50px !important;
          transition: all 0.2s;
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

        @media (max-width: 768px) {
          .news-details-tabs .ant-tabs-tab {
            padding: 8px 12px;
            font-size: 12px;
          }
          .section-anchor {
            scroll-margin-top: 140px;
          }
        }
      `}</style>
    </article>
  );
}

export default NewsViewDetails;
