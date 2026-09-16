"use client";

import CommentsSection from "@/app/components/CommentsSection";
import MainBanner from "@/app/components/MainBanner";
import { getItem } from "@/services/Item/Item";
import { useEffect, useState } from "react";
import CarsRelatedSection from "./CarsRelatedSection";
import HeroSectionNews from "./HeroSectionNews";
import NewsContentSection from "./NewsContentSection";
import NewsGallerySection from "./NewsGallerySection";
import NewsRelatedSection from "./NewsRelatedSection";
import SidebarNewsView from "./SidebarNewsView";
import VideosRelatedSection from "./VideosRelatedSection";
import VoicesRelatedSection from "./VoicesRelatedSection";
import SectionTabs from "@/app/components/SectionTabs";

function NewsViewDetails({
  detailsNews,
  Attachment,
  comments,
  id,
  relatedNews,
  relatedCars,
  relatedVideos,
  relatedVoices,
}: {
  detailsNews: ItemsId;
  Attachment: ItemsAttachment[];
  comments: CommentResponse[];
  id: number;
  relatedNews: ItemsRalatedNews[];
  relatedCars: ItemsId[];
  relatedVideos: ItemsId[];
  relatedVoices: ItemsId[];
}) {
  // ذخیره در localStorage
  useEffect(() => {
    try {
      const recentViews = JSON.parse(
        localStorage.getItem("recentCarViews") || "[]",
      );

      const newView = {
        id: detailsNews.id,
        title: detailsNews.title,
        sourceName: detailsNews.sourceName,
        publishCode: detailsNews.publishCode,
        image: detailsNews.image,
        timestamp: Date.now(),
        url: detailsNews.url,
        type: "اخبار",
      };

      const filteredViews = recentViews.filter(
        (item: any) => item.id !== detailsNews.id,
      );

      const updatedViews = [newView, ...filteredViews].slice(0, 10);
      localStorage.setItem("recentCarViews", JSON.stringify(updatedViews));
    } catch (error) {
      console.error("خطا در ذخیره بازدید:", error);
    }
  }, [detailsNews.id]);

  const [isMainLonger, setIsMainLonger] = useState(true);
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const [popularNews, setPopularNews] = useState<Items[]>([]);
  const [newNews, setNewNews] = useState<Items[]>([]);
  const [banner, setBanner] = useState<Items[]>([]);
  const [loading, setLoading] = useState(true);

  // مقایسه ارتفاع محتوا و سایدبار + گرفتن ارتفاع سایدبار
  useEffect(() => {
    const checkHeights = () => {
      const mainEl = document.getElementById("news-main-box");
      const sidebarEl = document.getElementById("news-sidebar-box");
      if (mainEl && sidebarEl) {
        setIsMainLonger(mainEl.offsetHeight > sidebarEl.offsetHeight);
        setSidebarHeight(sidebarEl.offsetHeight);
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
    banner,
  ]);

  // دریافت داده‌های سایدبار
  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        setLoading(true);

        const popularData = await getItem({
          TypeId: 5,
          langCode: "fa",
          OrderBy: 8,
          PageIndex: 1,
          PageSize: 5,
        });

        const newNewsData = await getItem({
          TypeId: 5,
          langCode: "fa",
          PageIndex: 1,
          PageSize: 5,
        });

        const bannerData = await getItem({
          TypeId: 1051,
          langCode: "fa",
          FullData: false,
        });

        setPopularNews(popularData);
        setNewNews(newNewsData);
        setBanner(bannerData);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarData();
  }, []);

  // لیست تب‌ها - id هر تب دقیقاً همون id بخش توی JSX هست
  const tabs = [
    ...(detailsNews ? [{ id: "content", label: "متن خبر" }] : []),
    ...(Attachment.length > 0
      ? [{ id: "gallery", label: "گالری تصاویر" }]
      : []),
    ...(relatedVideos.length > 0
      ? [{ id: "relatedVideos", label: "ویدئوهای مرتبط" }]
      : []),
    ...(relatedCars.length > 0
      ? [{ id: "relatedCars", label: "خودروهای مرتبط" }]
      : []),
    ...(relatedNews.length > 0
      ? [{ id: "relatedNews", label: "اخبار مرتبط" }]
      : []),
    ...(relatedVoices.length > 0
      ? [{ id: "relatedVoices", label: "پادکست‌های مرتبط" }]
      : []),
    { id: "comments", label: "نظرات کاربران" },
  ];

  return (
    <article className="min-h-screen bg-gray-50 w-full">
      <header>
        <HeroSectionNews detailsNews={detailsNews} />
      </header>

      <SectionTabs tabs={tabs} />

      <div className="mx-auto pt-2">
        <div className="flex flex-wrap lg:flex-nowrap items-start gap-2 relative px-2">
          {/* محتوای اصلی - فقط وقتی سایدبار بلندتره، min-height می‌گیره */}
          <div
            id="news-main-box"
            className="lg:w-3/4 w-full"
            style={{
              minHeight:
                !isMainLonger && sidebarHeight > 0
                  ? `${sidebarHeight}px`
                  : undefined,
            }}
          >
            <div className="space-y-2">
              {/* متن خبر */}
              {detailsNews && (
                <div id="content" className="section-anchor">
                  <NewsContentSection detailsNews={detailsNews} />
                </div>
              )}

              {/* گالری تصاویر */}
              {Attachment.length > 0 && (
                <div id="gallery" className="section-anchor">
                  <NewsGallerySection
                    Attachment={Attachment}
                    detailsNews={detailsNews}
                  />
                </div>
              )}

              {/* ویدئوهای مرتبط */}
              {relatedVideos.length > 0 && (
                <div id="relatedVideos" className="section-anchor">
                  <VideosRelatedSection relatedVideos={relatedVideos} />
                </div>
              )}

              {/* خودروهای مرتبط */}
              {relatedCars.length > 0 && (
                <div id="relatedCars" className="section-anchor">
                  <CarsRelatedSection relatedCars={relatedCars} />
                </div>
              )}

              {/* اخبار مرتبط */}
              {relatedNews.length > 0 && (
                <div id="relatedNews" className="section-anchor">
                  <NewsRelatedSection relatedNews={relatedNews} />
                </div>
              )}

              {/* پادکست‌های مرتبط */}
              {relatedVoices.length > 0 && (
                <div id="relatedVoices" className="section-anchor">
                  <VoicesRelatedSection relatedVoices={relatedVoices} />
                </div>
              )}
            </div>
          </div>

          {/* سایدبار - فقط وقتی محتوا بلندتره، sticky می‌شه */}
          <aside
            id="news-sidebar-box"
            aria-label="اخبار پربازدید و بنرهای جانبی"
            className={`
              lg:w-1/4 w-full transition-all duration-300
              ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <SidebarNewsView
              popularNews={popularNews}
              newNews={newNews}
              banner={banner}
              loading={loading}
            />
          </aside>
        </div>

        <MainBanner banner={banner.filter((e) => e.categoryId === 6393)} />

        {/* نظرات */}
        <div id="comments" className="section-anchor px-2 pb-2">
          <CommentsSection details={detailsNews} comments={comments} id={id} />
        </div>
      </div>
    </article>
  );
}

export default NewsViewDetails;