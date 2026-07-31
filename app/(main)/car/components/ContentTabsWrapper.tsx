// components/ContentTabsWrapper.tsx
"use client";

import { getItem } from "@/services/Item/Item";
import { getItemByIds } from "@/services/Item/ItemByIds";
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import dynamic from "next/dynamic";
import React from "react";
import { Suspense, useEffect, useRef, useState, useCallback } from "react";

// ✅ Lazy Load برای کامپوننت‌های سنگین
const Sidebar = dynamic(() => import("./Sidebar"), {
  loading: () => <SidebarSkeleton />,
  ssr: false,
});

const RelatedNewsSection = dynamic(() => import("./RelatedNewsSection"), {
  loading: () => <NewsSkeleton />,
});

const RelatedVideosSection = dynamic(() => import("./RelatedVideosSection"), {
  loading: () => <VideosSkeleton />,
});

const RelatedComparisons = dynamic(() => import("./RelatedComparisons"), {
  loading: () => <ComparisonsSkeleton />,
});

// Skeleton Components
const SidebarSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4!"></div>
      <div className="space-y-4">
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

const NewsSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-48 mb-4!"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4 space-y-2">
            <div className="h-5 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const VideosSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-48 mb-4!"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4 space-y-2">
            <div className="h-5 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ComparisonsSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-48 mb-4!"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4 space-y-2">
            <div className="h-5 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface ContentTabsWrapperProps {
  children: React.ReactNode;
  tabItems?: TabsProps["items"];
  detailsCar: ItemsId;
  commentsContent: React.ReactNode;
}

// تعریف type برای child با id
interface ChildWithId extends React.ReactElement {
  props: {
    id?: string;
    children?: React.ReactNode;
  };
}

const ContentTabsWrapper = ({
  children,
  tabItems = [],
  detailsCar,
  commentsContent,
}: ContentTabsWrapperProps) => {
  const [activeKey, setActiveKey] = useState<string>("review");
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [isMainLonger, setIsMainLonger] = useState(true);

  const navbarRef = useRef<HTMLDivElement>(null);
  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // رفرنس‌های مربوط به هر بخش
  const reviewRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const comparisonsRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const [loadingRelatedNews, setLoadingRelatedNews] = useState(true);
  const [relatedNews, setRelatedNews] = useState<Items[]>([]);
  const isFetchedRelatedNews = useRef(false);

  useEffect(() => {
    if (isFetchedRelatedNews.current) return;
    isFetchedRelatedNews.current = true;

    const fetchData = async () => {
      try {
        setLoadingRelatedNews(true);
        const searchTerm = detailsCar.sourceName + " " + detailsCar.title;

        const response = await getItem({
          TypeId: 5,
          langCode: "fa",
          Term: searchTerm,
          PageIndex: 1,
          PageSize: 6,
        });

        setRelatedNews(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("❌ [RelatedNews] Error fetching data:", error);
        setRelatedNews([]);
      } finally {
        setLoadingRelatedNews(false);
      }
    };

    fetchData();
  }, [detailsCar]);

  const [loadingRelatedVideos, setLoadingRelatedVideos] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState<Items[]>([]);
  const isFetchedRelatedVideos = useRef(false);

  useEffect(() => {
    if (isFetchedRelatedVideos.current) return;
    isFetchedRelatedVideos.current = true;

    const fetchData = async () => {
      try {
        setLoadingRelatedVideos(true);
        const searchTerm = detailsCar.sourceName + " " + detailsCar.title;

        const response = await getItem({
          TypeId: 1028,
          langCode: "fa",
          Term: searchTerm,
          PageIndex: 1,
          PageSize: 6,
        });

        setRelatedVideos(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("❌ [RelatedVideos] Error fetching data:", error);
        setRelatedVideos([]);
      } finally {
        setLoadingRelatedVideos(false);
      }
    };

    fetchData();
  }, [detailsCar]);

  const [loadingRelatedCompares, setLoadingRelatedCompares] = useState(true);
  const [relatedCompares, setRelatedCompares] = useState<ItemsId[]>([]);
  const isFetchedRelatedCompares = useRef(false);

  useEffect(() => {
    if (isFetchedRelatedCompares.current) return;
    isFetchedRelatedCompares.current = true;

    const fetchData = async () => {
      try {
        setLoadingRelatedCompares(true);

        const idsCompares = detailsCar.properties.find(
          (e) => e.propertyKey === "p1042_vidrelatedcompare",
        )?.propertyValue;

        if (!idsCompares) {
          setRelatedCompares([]);
          setLoadingRelatedCompares(false);
          return;
        }

        const response = await getItemByIds(idsCompares);
        setRelatedCompares(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("❌ [RelatedComparisons] Error fetching data:", error);
        setRelatedCompares([]);
      } finally {
        setLoadingRelatedCompares(false);
      }
    };

    fetchData();
  }, [detailsCar]);

  // =============== ساخت تب‌ها ===============
  const allTabItems: TabsProps["items"] = [
    ...tabItems,
    ...(relatedNews.length > 0 ? [{ key: "news", label: "اخبار مرتبط" }] : []),
    ...(relatedVideos.length > 0
      ? [{ key: "video", label: "ویدئوهای مرتبط" }]
      : []),
    ...(relatedCompares.length > 0
      ? [{ key: "Comparisons", label: "مقایسه‌های مرتبط" }]
      : []),
    { key: "comments", label: "نظرات" },
  ];

  // =============== ✅ استفاده از ResizeObserver ===============
  useEffect(() => {
    if (!mainBoxRef.current || !sidebarRef.current) return;

    const updateHeights = () => {
      if (mainBoxRef.current && sidebarRef.current) {
        const mainHeight = mainBoxRef.current.offsetHeight;
        const sidebarHeight = sidebarRef.current.offsetHeight;
        setIsMainLonger((prev) => {
          const newValue = mainHeight > sidebarHeight;
          return prev !== newValue ? newValue : prev;
        });
      }
    };

    let rafId: number | null = null;
    const observer = new ResizeObserver(() => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateHeights();
        rafId = null;
      });
    });

    observer.observe(mainBoxRef.current);
    observer.observe(sidebarRef.current);
    resizeObserverRef.current = observer;

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // =============== هندل کردن اسکرول و sticky navbar ===============
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        setIsNavbarSticky(window.scrollY > navbarTop);
      }

      // تعیین بخش فعال بر اساس اسکرول
      const sections = [
        { key: "review", ref: reviewRef },
        { key: "technical", ref: technicalRef },
        { key: "images", ref: imagesRef },
        { key: "news", ref: newsRef },
        { key: "video", ref: videoRef },
        { key: "Comparisons", ref: comparisonsRef },
        { key: "comments", ref: commentsRef },
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

  // =============== اسکرول به بخش ===============
  const scrollToElement = useCallback(
    (elementId: string) => {
      const sectionRefs: {
        [key: string]: React.RefObject<HTMLDivElement | null>;
      } = {
        review: reviewRef,
        technical: technicalRef,
        images: imagesRef,
        news: newsRef,
        video: videoRef,
        Comparisons: comparisonsRef,
        comments: commentsRef,
      };

      const targetRef = sectionRefs[elementId];
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
          top: offsetPosition - 30,
          behavior: "smooth",
        });
      }
    },
    [isNavbarSticky],
  );

  const handleTabClick = useCallback(
    (key: string) => {
      setActiveKey(key);
      scrollToElement(key);
    },
    [scrollToElement],
  );

  // =============== تخصیص ref به بخش‌های SSR با cloneElement ===============
  const childrenWithRef = React.Children.map(children, (child) => {
    // ✅ بررسی اینکه child وجود دارد و React element است
    if (!child || !React.isValidElement(child)) {
      return child;
    }

    const childElement = child as ChildWithId;
    const childId = childElement.props?.id;

    if (childId === "review") {
      return React.cloneElement(childElement, {
        ref: reviewRef,
      } as any);
    } else if (childId === "technical") {
      return React.cloneElement(childElement, {
        ref: technicalRef,
      } as any);
    } else if (childId === "images") {
      return React.cloneElement(childElement, {
        ref: imagesRef,
      } as any);
    }
    return child;
  });

  return (
    <div className="content-tabs-container">
      {/* نوار تب‌ها */}
      {allTabItems.length > 0 && (
        <div
          ref={navbarRef}
          className="navbar-tabs p-0! m-0! "
          style={{
            position: "sticky",
            top: isNavbarSticky ? "112px" : "auto",
            left: 0,
            right: 0,
            background: "white",
            boxShadow: isNavbarSticky
              ? "0 4px 12px rgba(0,0,0,0.15)"
              : "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: isNavbarSticky ? "0 0 12px 12px" : "12px",
            padding: "1rem",
            transition: "all 0.3s ease",
            zIndex: 1000,
          }}
        >
          <Tabs
            activeKey={activeKey}
            onChange={handleTabClick}
            items={allTabItems}
            className="custom-tabs"
          />
        </div>
      )}

      <div className="flex lg:flex-row-reverse gap-3 lg:flex-nowrap flex-wrap mx-auto px-2">
        {/* سایدبار - دسکتاپ */}
        <aside
          ref={sidebarRef}
          className={`
            lg:w-1/4 w-full mt-6 transition-all duration-300 lg:block hidden
            ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
          `}
        >
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar detailsCar={detailsCar} />
          </Suspense>
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
            <div className="w-full">
              <div className="space-y-6">
                {/* بخش‌های SSR */}
                {childrenWithRef}
                {/* بخش‌های کلاینت با Lazy Loading */}
                {relatedNews.length > 0 && (
                  <div id="news" className="section-anchor" ref={newsRef}>
                    <Suspense fallback={<NewsSkeleton />}>
                      <RelatedNewsSection
                        detailsCar={detailsCar}
                        relatedNews={relatedNews}
                        loading={loadingRelatedNews}
                      />
                    </Suspense>
                  </div>
                )}
                {relatedVideos.length > 0 && (
                  <div id="video" className="section-anchor" ref={videoRef}>
                    <Suspense fallback={<VideosSkeleton />}>
                      <RelatedVideosSection
                        detailsCar={detailsCar}
                        loading={loadingRelatedVideos}
                        relatedVideos={relatedVideos}
                      />
                    </Suspense>
                  </div>
                )}
                {relatedCompares.length > 0 && (
                  <div
                    id="Comparisons"
                    className="section-anchor"
                    ref={comparisonsRef}
                  >
                    <Suspense fallback={<ComparisonsSkeleton />}>
                      <RelatedComparisons
                        detailsCar={detailsCar}
                        loading={loadingRelatedCompares}
                        relatedCompares={relatedCompares}
                      />
                    </Suspense>
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
        ref={commentsRef}
        className="section-anchor py-5 mx-auto px-2"
      >
        {commentsContent}
      </div>

      {/* سایدبار موبایل */}
      <aside className="lg:w-1/4 w-full mt-6 transition-all duration-300 lg:hidden block">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar detailsCar={detailsCar} />
        </Suspense>
      </aside>

      <style jsx global>{`
        .content-tabs-container {
          position: relative;
        }
        .custom-tabs .ant-tabs-nav {
          margin: 0 !important;
          padding: 0 !important;
        }
        .custom-tabs .ant-tabs-tab {
          padding: 8px 16px !important;
          font-weight: 600 !important;
          color: #6b7280 !important;
          transition: all 0.3s ease !important;
          cursor: pointer !important;
          height: 50px !important;
          margin: 0 !important;
        }
        .custom-tabs .ant-tabs-tab:hover {
          color: #ce1a2a;
        }
        .custom-tabs .ant-tabs-tab-active {
          color: #fff !important;
          background: #ce1a2a !important;
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
          scroll-margin-top: 180px;
        }
        @media (min-width: 1024px) {
          .navbar-tabs[style*="position: sticky"] {
            top: 60px !important;
          }
          .section-anchor {
            scroll-margin-top: 120px;
          }
        }
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
          .custom-tabs .ant-tabs-tab {
            padding: 0px 10px !important;
            font-size: 12px !important;
            height: 40px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ContentTabsWrapper;
