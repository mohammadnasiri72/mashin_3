"use client";

import CustomPagination from "@/app/components/CustomPagination";
import {
  estimateReadTime,
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
import SideBarEducation from "./SideBarEducation";

const EducationCar = ({
  education: initialEducation,
  educationPopular,
  educationCat,
  id,
  banner,
}: {
  education: Items[];
  educationPopular: Items[];
  educationCat: ItemsCategory[];
  id: number;
  banner: Items[];
}) => {
  const searchParams = useSearchParams();
  const [isMainLonger, setIsMainLonger] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // State برای infinite scroll
  const [education, setEducation] = useState<Items[]>(initialEducation || []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(
    initialEducation?.[0]?.total || 0,
  );
  const [showPagination, setShowPagination] = useState<boolean>(false);
  const [isManualPage, setIsManualPage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const MAX_INFINITE_PAGES = 10;

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
  }, [education, educationPopular, banner]);

  // بررسی اینکه آیا کاربر دستی صفحه رو وارد کرده
  useEffect(() => {
    const hasPageParam = searchParams.has("page");
    if (hasPageParam && pageFromUrl > 1) {
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

  // تنظیم مجدد داده‌ها وقتی تب عوض می‌شه یا id تغییر کنه
  useEffect(() => {
    setEducation(initialEducation || []);
    setCurrentPage(pageFromUrl);
    setTotalItems(initialEducation?.[0]?.total || 0);
    setError(null);

    if (pageFromUrl > 1) {
      setShowPagination(true);
      setHasMore(false);
      setIsManualPage(true);
    } else {
      setShowPagination(false);
      setHasMore(true);
      setIsManualPage(false);
    }
  }, [initialEducation, id, pageFromUrl]);

  // تابع بارگذاری صفحه بعد
  const loadMore = useCallback(async () => {
    if (loading || !hasMore || isManualPage) return;

    const nextPage = currentPage + 1;
    const pageSize = 20;
    const totalPages = Math.ceil(totalItems / pageSize);

    // اگر به صفحه ۱۰ رسیدیم یا صفحه بعدی از کل صفحات بیشتره
    if (nextPage > MAX_INFINITE_PAGES || nextPage > totalPages) {
      setHasMore(false);
      if (totalPages > MAX_INFINITE_PAGES) {
        setShowPagination(true);
      }
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        TypeId: "3",
        langCode: "fa",
        PageIndex: nextPage.toString(),
        PageSize: pageSize.toString(),
        FullData: "true",
      });

      if (id > 0) {
        params.append("CategoryIdArray", String(id));
      }

      const response = await fetch(`/api/education?${params.toString()}`);

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
        const existingIds = new Set(education.map((item: Items) => item.id));
        const newItems = result.data.filter(
          (item: Items) => !existingIds.has(item.id),
        );

        if (newItems.length > 0) {
          setEducation((prev) => [...prev, ...newItems]);
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
      console.error("Error loading more education:", err);
      setError("خطا در بارگذاری مطالب آموزشی. لطفاً مجدداً تلاش کنید.");
      setHasMore(false);
      setShowPagination(true);
    } finally {
      setLoading(false);
    }
  }, [currentPage, hasMore, loading, id, totalItems, isManualPage, education]);

  // تنظیم Intersection Observer
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
    <div className="min-h-screen bg-[#f4f4f4]">
      <div className="mx-auto py-2">
        <div className="flex flex-col lg:flex-row gap-3 relative">
          {/* محتوای اصلی - 3/4 صفحه */}
          <div
            ref={mainBoxRef}
            className={`
              lg:w-3/4 w-full transition-all duration-300 overflow-hidden
              ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <div className="bg-white rounded-2xl px-6 py-2 shadow-sm border border-gray-100">
              {/* نمایش اطلاعات صفحه */}
              <div className="flex items-center justify-between flex-wrap gap-2">
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
                  {toPersianNumbers(totalItems)} مطلب
                </span>
              </div>
              {/* هدر صفحه */}
              <div className="mb-8! text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4!">
                  <span className="text-[#ce1a2a]">آموزش و نکات فنی</span>
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  جامع‌ترین منبع آموزشی برای نگهداری، تعمیر و رانندگی حرفه‌ای با
                  خودرو و موتورسیکلت
                </p>
              </div>

              {/* تب‌های آموزشی - با Swiper */}
              <div className="mb-6! relative">
                <Swiper
                  ref={swiperRef}
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
                  <SwiperSlide style={{ width: "auto" }}>
                    <Link
                      className={`whitespace-nowrap duration-300 px-4 py-2 rounded-lg text-sm font-medium transition-all block text-center ${
                        id === 0
                          ? "text-white! bg-[#ce1a2a] shadow-md"
                          : "text-gray-700! hover:text-red-900! hover:bg-red-100 bg-gray-100"
                      }`}
                      href={"/fa/EducationTips/نکات-آموزشی.html"}
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
                      همه نکات آموزشی
                    </Link>
                  </SwiperSlide>
                  {educationCat.length > 0 &&
                    educationCat.map((ed) => (
                      <SwiperSlide key={ed.id} style={{ width: "auto" }}>
                        <Link
                          className={`whitespace-nowrap duration-300 px-4 py-2 rounded-lg text-sm font-medium transition-all block text-center ${
                            ed.id === id
                              ? "text-white! bg-[#ce1a2a] shadow-md"
                              : "text-gray-700! hover:text-red-900! hover:bg-red-100 bg-gray-100"
                          }`}
                          href={ed.url}
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
                          {ed.title}
                        </Link>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>

              {/* لیست مطالب آموزشی */}
              <div className="space-y-6 mt-6">
                {education.length > 0 ? (
                  <>
                    {education.map((item, index) => (
                      <div key={`${item.id}-${index}`}>
                        <article className="py-6! border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col md:flex-row gap-4 ">
                            {/* تصویر مطلب */}
                            <div className="md:w-48 w-full h-32 shrink-0">
                              <Link href={item.url || "#"}>
                                <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden relative">
                                  <img
                                    src={mainDomain + item.image}
                                    alt={item.title}
                                    className="object-contain hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                              </Link>
                            </div>

                            {/* محتوای مطلب */}
                            <div className="flex-1 ">
                              <Link href={item.url || "#"}>
                                <h2 className="text-xl font-bold text-gray-900 mb-2! hover:text-[#ce1a2a]! transition-colors cursor-pointer">
                                  {item.title}
                                </h2>
                              </Link>

                              <div className="text-gray-600 leading-relaxed text-justify mb-3! line-clamp-2">
                                {htmlToPlainText(item.body)}
                              </div>

                              {/* متا اطلاعات */}
                              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700 mt-2">
                                <div className="flex items-center gap-1">
                                  <FaCalendar />
                                  <span>
                                    {formatPersianDate(
                                      item.modified
                                        ? item.modified
                                        : item.created,
                                    )}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <FaEye className="w-3 h-3" />
                                  <span>
                                    {toPersianNumbers(item.visit)} بازدید
                                  </span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <span>
                                    زمان مطالعه:{" "}
                                    {estimateReadTime(item.body || "")}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <span className="text-[#ce1a2a] font-medium">
                                    {item.categoryTitle}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                    ))}

                    {/* عنصر observer برای تشخیص اسکرول */}
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
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4!">📚</div>
                    <h3 className="text-xl font-bold text-gray-600 mb-2!">
                      آموزشی یافت نشد
                    </h3>
                    <p className="text-gray-500">
                      در این دسته‌بندی هیچ مطلب آموزشی وجود ندارد.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* سایدبار - 1/4 صفحه */}
          <aside
            ref={sidebarRef}
            className={`
              lg:w-1/4 w-full transition-all duration-300
              ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <SideBarEducation
              educationPopular={educationPopular}
              banner={banner}
            />
          </aside>
        </div>
      </div>

      {/* استایل‌های سفارشی */}
      <style jsx global>{`
        .container {
          max-width: 1200px;
        }

        /* استایل Swiper */
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

        .custom-education-tabs .ant-tabs-nav {
          margin-bottom: 1rem;
        }
        .custom-education-tabs .ant-tabs-tab {
          padding: 0.4rem;
          user-select: none !important;
        }

        .custom-education-tabs .ant-tabs-ink-bar {
          background: transparent;
        }

        .custom-education-tabs .ant-tabs-tab-active {
          background: #ce1a2a;
          user-select: none !important;
        }
        .custom-education-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #fff !important;
          user-select: none !important;
          font-weight: 600;
        }

        .custom-education-tabs .ant-tabs-tab:hover {
          color: #fff !important;
          background: #ce1a2a;
          user-select: none !important;
          transition: 0.4s;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* استایل‌های sticky */
        .lg\\:sticky {
          position: sticky;
          bottom: 0;
          align-self: flex-end;
        }

        /* غیرفعال کردن sticky در موبایل */
        @media (max-width: 1023px) {
          .lg\\:sticky {
            position: relative !important;
            bottom: auto !important;
            align-self: auto !important;
          }
        }

        @media (max-width: 1024px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EducationCar;
