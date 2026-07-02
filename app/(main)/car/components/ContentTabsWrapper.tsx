// content-tabs-wrapper.tsx
"use client";

import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import RelatedNewsSection from "./RelatedNewsSection";
import RelatedVideosSection from "./RelatedVideosSection";
import RelatedComparisons from "./RelatedComparisons";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getItem } from "@/services/Item/Item";

interface ContentTabsWrapperProps {
  children: React.ReactNode;
  tabItems?: TabsProps["items"];
  detailsCar: ItemsId;
  commentsContent: React.ReactNode;
}

interface ClientData {
  detailsCarcompetitor: ItemsId[];
  carsModel: Items[];
  carsModel2: Items[];
  lastNews: Items[];
  lastVideos: Items[];
  relatedNews: Items[];
  relatedVideos: Items[];
  relatedCompares: ItemsId[];
}

const ContentTabsWrapper = ({
  children,
  tabItems = [],
  detailsCar,
  commentsContent,
}: ContentTabsWrapperProps) => {
  // =============== STATE ===============
  const [clientData, setClientData] = useState<ClientData>({
    detailsCarcompetitor: [],
    carsModel: [],
    carsModel2: [],
    lastNews: [],
    lastVideos: [],
    relatedNews: [],
    relatedVideos: [],
    relatedCompares: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeKey, setActiveKey] = useState<string>("review");
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [isMainLonger, setIsMainLonger] = useState(true);
  const isFetched = useRef(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // =============== FETCH CLIENT DATA ===============
  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    const fetchClientData = async () => {
      try {
        setLoading(true);

        const competitorIds = detailsCar.properties.find(
          (e) => e.propertyKey === "p1042_relatedcars"
        )?.propertyValue;

        const idsCompares = detailsCar.properties.find(
          (e) => e.propertyKey === "p1042_vidrelatedcompare"
        )?.propertyValue;

        const searchTerm = detailsCar.sourceName + " " + detailsCar.title;
        const sourceLink = detailsCar.sourceLink;
        const categoryId = String(detailsCar.categoryId);

        const [
          detailsCarcompetitor,
          carsModel,
          carsModel2,
          lastNews,
          lastVideos,
          relatedNews,
          relatedVideos,
          relatedCompares,
        ] = await Promise.all([
          competitorIds ? getItemByIds(competitorIds) : Promise.resolve([]),
          sourceLink
            ? getItem({
                TypeId: 1042,
                langCode: "fa",
                CategoryIdArray: sourceLink,
                PageIndex: 1,
                PageSize: 5,
              })
            : Promise.resolve([]),
          categoryId
            ? getItem({
                TypeId: 1042,
                langCode: "fa",
                CategoryIdArray: categoryId,
                PageIndex: 1,
                PageSize: 5,
              })
            : Promise.resolve([]),
          getItem({
            TypeId: 5,
            langCode: "fa",
            PageIndex: 1,
            PageSize: 7,
          }),
          getItem({
            TypeId: 1028,
            langCode: "fa",
            PageIndex: 1,
            PageSize: 5,
          }),
          getItem({
            TypeId: 5,
            langCode: "fa",
            Term: searchTerm,
            PageIndex: 1,
            PageSize: 6,
          }),
          getItem({
            TypeId: 1028,
            langCode: "fa",
            Term: searchTerm,
            PageIndex: 1,
            PageSize: 6,
          }),
          idsCompares ? getItemByIds(idsCompares) : Promise.resolve([]),
        ]);

        setClientData({
          detailsCarcompetitor: Array.isArray(detailsCarcompetitor) ? detailsCarcompetitor : [],
          carsModel: Array.isArray(carsModel) ? carsModel : [],
          carsModel2: Array.isArray(carsModel2) ? carsModel2 : [],
          lastNews: Array.isArray(lastNews) ? lastNews : [],
          lastVideos: Array.isArray(lastVideos) ? lastVideos : [],
          relatedNews: Array.isArray(relatedNews) ? relatedNews : [],
          relatedVideos: Array.isArray(relatedVideos) ? relatedVideos : [],
          relatedCompares: Array.isArray(relatedCompares) ? relatedCompares : [],
        });

        // ✅ تنظیم تب فعال بعد از دریافت داده
        const firstKey = tabItems.length > 0 ? tabItems[0].key : "comments";
        setActiveKey(firstKey);

      } catch (error) {
        console.error("❌ [Client] Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [detailsCar, tabItems]);

  // =============== ساخت تب‌های نهایی ===============
  const allTabItems: TabsProps["items"] = [
    ...tabItems,
    ...(clientData.relatedNews.length > 0
      ? [{ key: "news", label: "اخبار مرتبط" }]
      : []),
    ...(clientData.relatedVideos.length > 0
      ? [{ key: "video", label: "ویدئوهای مرتبط" }]
      : []),
    ...(clientData.relatedCompares.length > 0
      ? [{ key: "Comparisons", label: "مقایسه‌های مرتبط" }]
      : []),
    { key: "comments", label: "نظرات" },
  ];

  // =============== CHECK HEIGHTS ===============
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;

    const checkHeights = () => {
      if (!isMounted) return;
      if (mainBoxRef.current && sidebarRef.current) {
        const mainHeight = mainBoxRef.current.offsetHeight;
        const sidebarHeight = sidebarRef.current.offsetHeight;
        setIsMainLonger(mainHeight > sidebarHeight);
      }
    };

    const initialTimer = setTimeout(checkHeights, 200);
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkHeights, 300);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      clearTimeout(initialTimer);
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [loading]);

  // =============== HANDLE SCROLL ===============
  useEffect(() => {
    let ticking = false;
    let isMounted = true;

    const handleScroll = () => {
      if (!isMounted) return;

      if (navbarRef.current) {
        setIsNavbarSticky(window.scrollY > navbarRef.current.offsetTop);
      }

      const sectionIds = ["review", "technical", "images", "news", "video", "Comparisons", "comments"];
      
      let currentActiveKey = "";
      for (let i = 0; i < sectionIds.length; i++) {
        const element = document.getElementById(sectionIds[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentActiveKey = sectionIds[i];
            break;
          }
          if (i < sectionIds.length - 1) {
            const nextElement = document.getElementById(sectionIds[i + 1]);
            if (nextElement) {
              const nextRect = nextElement.getBoundingClientRect();
              if (rect.bottom < 200 && nextRect.top > 200) {
                currentActiveKey = sectionIds[i];
                break;
              }
            }
          }
        }
      }

      if (currentActiveKey && currentActiveKey !== activeKey) {
        setActiveKey(currentActiveKey);
      }
    };

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
    setTimeout(handleScroll, 300);

    return () => {
      isMounted = false;
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [activeKey]);

  // =============== SCROLL TO ELEMENT ===============
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const navbarHeight = navbarRef.current?.offsetHeight || 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleTabClick = (key: string) => {
    setActiveKey(key);
    scrollToElement(key);
  };

  // =============== RENDER ===============
  return (
    <div className="content-tabs-container">
      {/* نوار تب‌ها */}
      {allTabItems.length > 0 && (
        <div
          ref={navbarRef}
          className="navbar-tabs p-0! m-0!"
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

      <div className="flex lg:flex-row-reverse gap-3 lg:flex-nowrap flex-wrap container mx-auto px-2">
        {/* سایدبار - دسکتاپ */}
        <aside
          ref={sidebarRef}
          className={`
            lg:w-1/4 w-full mt-6 transition-all duration-300 lg:block hidden
            ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
          `}
        >
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-32 bg-gray-200 rounded-lg"></div>
              <div className="h-32 bg-gray-200 rounded-lg"></div>
            </div>
          ) : (
            <Sidebar
              detailsCarcompetitor={clientData.detailsCarcompetitor}
              detailsCar={detailsCar}
              carsModel={clientData.carsModel}
              carsModel2={clientData.carsModel2}
              lastNews={clientData.lastNews}
              lastVideos={clientData.lastVideos}
            />
          )}
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
                {/* ✅ بخش‌های SSR (از سرور) */}
                {children}

                {/* ✅ بخش‌های کلاینت (بعد از لود) */}
                {!loading && (
                  <>
                    {clientData.relatedNews.length > 0 && (
                      <div id="news" className="section-anchor">
                        <RelatedNewsSection
                          relatedNews={clientData.relatedNews}
                          detailsCar={detailsCar}
                        />
                      </div>
                    )}

                    {clientData.relatedVideos.length > 0 && (
                      <div id="video" className="section-anchor">
                        <RelatedVideosSection
                          relatedVideos={clientData.relatedVideos}
                          detailsCar={detailsCar}
                        />
                      </div>
                    )}

                    {clientData.relatedCompares.length > 0 && (
                      <div id="Comparisons" className="section-anchor">
                        <RelatedComparisons
                          relatedCompares={clientData.relatedCompares}
                          detailsCar={detailsCar}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* بخش نظرات */}
      <div id="comments" className="section-anchor py-5 container mx-auto px-2">
        {commentsContent}
      </div>

      {/* سایدبار موبایل */}
      <aside className="lg:w-1/4 w-full mt-6 transition-all duration-300 lg:hidden block">
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        ) : (
          <Sidebar
            detailsCarcompetitor={clientData.detailsCarcompetitor}
            detailsCar={detailsCar}
            carsModel={clientData.carsModel}
            carsModel2={clientData.carsModel2}
            lastNews={clientData.lastNews}
            lastVideos={clientData.lastVideos}
          />
        )}
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