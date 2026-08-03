"use client";

import CustomPagination from "@/app/components/CustomPagination";
import {
  formatPersianDate,
  htmlToPlainText,
  toPersianNumbers,
} from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaCalendar, FaEye } from "react-icons/fa";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SideBarNews from "./SideBarNews";

const CarNews = ({
  id,
  newsData: initialNewsData,
  popularNews,
  offerNews,
  banner,
  newsDetails,
  tabConfig,
}: {
  id: number;
  newsData: Items[];
  popularNews: Items[];
  offerNews: Items[];
  banner: Items[];
  newsDetails: ItemsCategoryId | ItemsId;
  tabConfig: { key: number; href: string; label: string }[];
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [newsData, setNewsData] = useState<Items[]>(initialNewsData || []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(
    initialNewsData?.[0]?.total || 0,
  );
  const [showPagination, setShowPagination] = useState<boolean>(false);
  const [isManualPage, setIsManualPage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loaderRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const MAX_INFINITE_PAGES = 10;

  useEffect(() => {
    if (id) {
      setActiveTab(id);
    } else {
      setActiveTab(0);
    }
  }, [id]);

  useEffect(() => {
    const hasPageParam = searchParams.has("page");
    if (hasPageParam) {
      setIsManualPage(true);
      setShowPagination(true);
      setHasMore(false);
    } else {
      setIsManualPage(false);
      setShowPagination(false);
      setHasMore(true);
    }
    setError(null);
  }, [pageFromUrl, searchParams]);

  useEffect(() => {
    setNewsData(initialNewsData || []);
    setCurrentPage(pageFromUrl);
    setTotalItems(initialNewsData?.[0]?.total || 0);
    setError(null);
  }, [initialNewsData, pageFromUrl]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || isManualPage) return;

    const nextPage = currentPage + 1;
    const pageSize = 20;
    const totalPages = Math.ceil(totalItems / pageSize);
    // اگر به صفحه ۱۰ رسیدیم یا صفحه بعدی از کل صفحات بیشتره
    if (nextPage > MAX_INFINITE_PAGES || nextPage >= totalPages) {
      setHasMore(false);
      setShowPagination(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        TypeId: "5",
        langCode: "fa",
        PageIndex: nextPage.toString(),
        PageSize: pageSize.toString(),
        FullData: "true",
      });

      if (id) {
        params.append("CategoryIdArray", String(id));
      }

      const response = await fetch(`/api/news?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`خطا در دریافت داده: ${response.status}`);
      }

      const result = await response.json();

      // بررسی اعتبار داده
      if (
        result &&
        result.data &&
        Array.isArray(result.data) &&
        result.data.length > 0
      ) {
        // فیلتر کردن آیتم‌های تکراری
        const existingIds = new Set(newsData.map((item) => item.id));
        const newItems = result.data.filter(
          (item: Items) => !existingIds.has(item.id),
        );

        if (newItems.length > 0) {
          setNewsData((prev) => [...prev, ...newItems]);
          setCurrentPage(nextPage);
        }

        if (result.data.length < pageSize || nextPage >= totalPages) {
          setHasMore(false);
          if (totalPages > MAX_INFINITE_PAGES) {
            setShowPagination(true);
          }
        }
      } else {
        // دیتا خالی یا نامعتبر
        setHasMore(false);
        if (totalPages > MAX_INFINITE_PAGES) {
          setShowPagination(true);
        }
      }
    } catch (err) {
      console.error("Error loading more news:", err);
      setError("خطا در بارگذاری اخبار. لطفاً مجدداً تلاش کنید.");
      setHasMore(false);
      setShowPagination(true);
    } finally {
      setLoading(false);
    }
  }, [currentPage, hasMore, loading, id, totalItems, isManualPage, newsData]);

  useEffect(() => {
    if (isManualPage || showPagination || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !isManualPage) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 100px 0px",
        threshold: 0.1,
      },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore, hasMore, loading, isManualPage, showPagination]);

  const handleSlideChange = () => {
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  const totalPages = Math.ceil(totalItems / 20);

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-2">
      <div className="mx-auto ">
       

        <div className="flex flex-col lg:flex-row gap-6 relative items-start">
          <div className="lg:w-3/4 w-full lg:sticky lg:top-20 lg:self-start">
            
            <div className="bg-white rounded-2xl sm:px-6 px-2 shadow-sm border border-gray-100 overflow-hidden">
          {/* نمایش اطلاعات صفحه */}
              <div className="flex items-center justify-between flex-wrap gap-2 py-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm text-gray-500">
                    صفحه {toPersianNumbers(currentPage)} از{" "}
                    {toPersianNumbers(totalPages)}
                  </span>

                  {error && (
                    <span className="text-xs text-red-500">{error}</span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {toPersianNumbers(totalItems)} خبر
                </span>
              </div>
           {/* هدر */}
        <div className="text-center mb-8!">
          <h1 className="text-3xl font-bold text-gray-900 mb-4!">
            <span className="text-red-600">
              {newsDetails?.title || "اخبار خودرو"}
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {newsDetails?.summary
              ? htmlToPlainText(newsDetails.summary)
              : "آخرین اخبار و تحلیل‌های بازار خودرو ایران"}
          </p>
        </div>
             

              {/* تب‌ها */}
              <div className="relative">
                <Swiper
                  modules={[FreeMode]}
                  slidesPerView="auto"
                  spaceBetween={8}
                  freeMode={{
                    enabled: true,
                    sticky: true,
                    momentum: true,
                    momentumBounce: true,
                  }}
                  grabCursor={true}
                  className="tabs-swiper"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onSliderMove={handleSlideChange}
                  onSlideChange={() => setIsDragging(true)}
                >
                  {tabConfig.map((tab) => (
                    <SwiperSlide key={tab.key} style={{ width: "auto" }}>
                      <Link
                        className={`whitespace-nowrap duration-300 px-4 py-2 rounded-lg text-sm font-medium transition-all block text-center ${
                          activeTab === tab.key
                            ? "text-white! bg-[#ce1a2a] shadow-md"
                            : "text-gray-700! hover:text-red-900! hover:bg-red-100 bg-gray-100"
                        }`}
                        href={tab.href}
                        onClick={(e) => {
                          if (isDragging) {
                            e.preventDefault();
                          }
                        }}
                        onMouseDown={() => setIsDragging(false)}
                        onMouseUp={() => {
                          setTimeout(() => setIsDragging(false), 100);
                        }}
                      >
                        {tab.label}
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* لیست اخبار */}
              {newsData.length > 0 ? (
                <>
                  <div className="space-y-6 mt-6">
                    {newsData.map((news, index) => (
                      <article
                        key={`${news.id}-${index}`}
                        className="py-6! border-b! border-gray-200 last:border-b-0 last:pb-0 group"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="md:w-48 w-full h-32 shrink-0">
                            <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden relative">
                              <Link
                                href={news.url || "#"}
                                className="rounded-lg!"
                              >
                                <img
                                  src={mainDomain + news.image}
                                  alt={news.title}
                                  className="object-cover w-full h-full hover:scale-105 rounded-lg! transition-transform duration-300"
                                />
                              </Link>
                            </div>
                          </div>

                          <div className="flex-1">
                            <Link href={news.url || "#"}>
                              <h2 className="text-xl font-bold text-gray-900 mb-2! text-justify hover:text-[#ce1a2a]! duration-300 transition-colors cursor-pointer">
                                {news.title}
                              </h2>
                            </Link>
                            {news.body && (
                              <div className="text-gray-600 mb-3! leading-relaxed text-justify line-clamp-3 text-sm">
                                {htmlToPlainText(news.body)}
                              </div>
                            )}

                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mt-2">
                              <div className="flex items-center gap-1">
                                <FaCalendar />
                                <span>
                                  {formatPersianDate(
                                    news.modified
                                      ? news.modified
                                      : news.created,
                                  )}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <FaEye className="w-3 h-3" />
                                <span>
                                  {toPersianNumbers(news.visit)} بازدید
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* المنت observer */}
                  {!isManualPage && !showPagination && hasMore && (
                    <div
                      ref={loaderRef}
                      className="flex justify-center items-center py-8"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-gray-600 text-sm">
                            در حال بارگذاری...
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          برای بارگذاری بیشتر اسکرول کنید
                        </span>
                      )}
                    </div>
                  )}

                  {/* پیجینیشن */}
                  {totalPages > 1 && (
                    <CustomPagination
                      total={totalItems}
                      pageSize={20}
                      currentPage={currentPage}
                      showPagination={showPagination}
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm mt-6">
                  <FaCalendar className="text-4xl text-gray-400 mx-auto mb-4!" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2!">
                    هیچ خبری یافت نشد
                  </h3>
                  <p className="text-gray-500">
                    با تغییر دسته‌بندی مجدداً تلاش کنید
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* سایدبار */}
          <aside className="lg:w-1/4 w-full lg:sticky lg:top-20 lg:self-start">
            <SideBarNews
              banner={banner}
              offerNews={offerNews}
              popularNews={popularNews}
            />
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .tabs-swiper {
          overflow: visible !important;
          padding: 4px 0;
        }
        .tabs-swiper .swiper-slide {
          width: auto !important;
          flex-shrink: 0;
        }
        .tabs-swiper .swiper-slide a {
          user-select: none;
          -webkit-user-select: none;
        }
        .tabs-swiper .swiper-wrapper {
          transition-timing-function: ease-out;
        }
        @media (max-width: 1023px) {
          .lg\\:sticky {
            position: relative !important;
            top: auto !important;
            align-self: auto !important;
          }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CarNews;
