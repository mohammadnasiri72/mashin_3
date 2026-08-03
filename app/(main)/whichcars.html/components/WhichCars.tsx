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
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { FaCalendar, FaEye, FaCar } from "react-icons/fa";
import SearchBoxWhichCars from "./SearchBoxWhichCars";
import SideBarWhichCars from "./SideBarWhichCars";

const WhichCars = ({
  whichCars: initialWhichCars,
  popularComparisons,
  banner,
  whichCarsCat,
}: {
  whichCars: Items[];
  popularComparisons: Items[];
  banner: Items[];
  whichCarsCat: ItemsId | null;
}) => {
  const searchParams = useSearchParams();

  // State برای infinite scroll
  const [whichCars, setWhichCars] = useState<Items[]>(initialWhichCars || []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(
    initialWhichCars?.[0]?.total || 0
  );
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("term") || ""
  );
  const [showPagination, setShowPagination] = useState<boolean>(false);
  const [isManualPage, setIsManualPage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loaderRef = useRef<HTMLDivElement>(null);

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const MAX_INFINITE_PAGES = 10;

  // استخراج نام خودروها از عنوان برای نمایش بهتر
  const extractCarNames = useCallback((title: string) => {
    const matches = title.match(/(?:مقایسه|مقايسه)\s+(.+?)\s+(?:با|و)\s+(.+)/);
    if (matches) {
      return {
        car1: matches[1].trim(),
        car2: matches[2].trim(),
      };
    }
    return { car1: "", car2: "" };
  }, []);

  // بررسی اینکه آیا کاربر دستی صفحه رو وارد کرده
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

  // تنظیم مجدد داده‌ها
  useEffect(() => {
    setWhichCars(initialWhichCars || []);
    setCurrentPage(pageFromUrl);
    setTotalItems(initialWhichCars?.[0]?.total || 0);
    setError(null);
  }, [initialWhichCars, pageFromUrl]);

  // گوش دادن به تغییرات searchParams برای آپدیت searchTerm
  useEffect(() => {
    const term = searchParams.get("term") || "";
    setSearchTerm(term);
  }, [searchParams]);

  // تابع بارگذاری صفحه بعد
  const loadMore = useCallback(async () => {
    if (loading || !hasMore || isManualPage) return;

    const nextPage = currentPage + 1;
    const pageSize = 15;
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
        TypeId: "1045",
        langCode: "fa",
        PageIndex: nextPage.toString(),
        PageSize: pageSize.toString(),
        FullData: "true",
      });

      if (searchTerm && searchTerm !== "undefined") {
        params.append("Term", searchTerm);
      }

      const response = await fetch(`/api/which-cars?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`خطا در دریافت داده: ${response.status}`);
      }

      const result = await response.json();

      if (result && result.data && Array.isArray(result.data) && result.data.length > 0) {
        const existingIds = new Set(whichCars.map((item: Items) => item.id));
        const newItems = result.data.filter(
          (item: Items) => !existingIds.has(item.id),
        );

        if (newItems.length > 0) {
          setWhichCars((prev) => [...prev, ...newItems]);
          setCurrentPage(nextPage);
        }

        if (result.data.length < pageSize || nextPage >= totalPages) {
          setHasMore(false);
          if (totalPages > MAX_INFINITE_PAGES) {
            setShowPagination(true);
          }
        }
      } else {
        setHasMore(false);
        if (totalPages > MAX_INFINITE_PAGES) {
          setShowPagination(true);
        }
      }
    } catch (err) {
      console.error("Error loading more comparisons:", err);
      setError("خطا در بارگذاری مقایسه‌ها. لطفاً مجدداً تلاش کنید.");
      setHasMore(false);
      setShowPagination(true);
    } finally {
      setLoading(false);
    }
  }, [currentPage, hasMore, loading, searchTerm, totalItems, isManualPage, whichCars]);

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
      }
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

  // استفاده از useMemo برای بهینه‌سازی
  const memoizedWhichCars = useMemo(() => whichCars, [whichCars]);

  const totalPages = Math.ceil(totalItems / 15);

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-8">
      <div className="mx-auto px-4">
       

        <div className="flex flex-col lg:flex-row gap-6 relative items-start">
          {/* محتوای اصلی - sticky از بالا */}
          <div className="lg:w-3/4 w-full lg:sticky lg:top-20 lg:self-start">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
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
                  {toPersianNumbers(totalItems)} مقایسه
                </span>
              </div>
               {/* هدر صفحه */}
        <div className="mb-8! text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4!">
            <span className="text-[#ce1a2a]">{whichCarsCat?.title}</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto px-3">
            {whichCarsCat?.summary}
          </p>
        </div>

              <div className="flex sm:flex-nowrap flex-wrap items-center gap-2">
                <SearchBoxWhichCars />
              </div>

              {/* لیست مقایسه‌ها */}
              {memoizedWhichCars.length > 0 ? (
                <>
                  <div className="space-y-6 mt-6">
                    {memoizedWhichCars.map((comparison, index) => {
                      const carNames = extractCarNames(comparison.title);

                      return (
                        <article
                          key={`${comparison.id}-${index}`}
                          className="py-6! border-b! border-gray-200 last:border-b-0 last:pb-0 group rounded-lg transition-colors"
                        >
                          <div className="flex flex-col md:flex-row gap-4 sm:items-start items-center">
                            {/* تصویر مقایسه */}
                            <div className="md:w-96 w-full shrink-0">
                              <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden relative">
                                <Link href={comparison.url || "#"} className="rounded-lg!">
                                  <img
                                    src={mainDomain + comparison.image}
                                    alt={comparison.title}
                                    className="object-contain w-full h-full hover:scale-105 rounded-lg! transition-transform duration-300"
                                  />
                                </Link>
                              </div>
                            </div>

                            {/* محتوای مقایسه */}
                            <div className="flex-1">
                              <Link href={comparison.url || "#"}>
                                <h2 className="text-xl font-bold text-gray-900 mb-2! hover:text-[#ce1a2a]! duration-300 transition-colors cursor-pointer">
                                  {comparison.title}
                                </h2>
                              </Link>

                              {/* نمایش نام خودروها */}
                              {carNames.car1 && carNames.car2 && (
                                <div className="flex items-center gap-4 mb-3!">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="font-medium text-green-700 whitespace-nowrap sm:text-sm text-xs">
                                      {carNames.car1}
                                    </span>
                                  </div>
                                  <div className="text-gray-700 font-bold">VS</div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="font-medium text-blue-700 whitespace-nowrap sm:text-sm text-xs">
                                      {carNames.car2}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {/* خلاصه مقایسه */}
                              <div className="text-gray-600 mb-3! leading-relaxed text-justify line-clamp-6">
                                {htmlToPlainText(comparison.body)}
                              </div>

                              {/* متا اطلاعات */}
                              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700 mt-2">
                                <div className="flex items-center gap-1">
                                  <FaCalendar />
                                  <span>
                                    {formatPersianDate(
                                      comparison.modified
                                        ? comparison.modified
                                        : comparison.created,
                                    )}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <FaEye className="w-3 h-3" />
                                  <span>
                                    {toPersianNumbers(comparison.visit)} بازدید
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
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
                      pageSize={15}
                      currentPage={currentPage}
                      showPagination={showPagination}
                    />
                  )}
                </>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 mt-6">
                  <div className="flex justify-center mb-4!">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <FaCar className="text-gray-400 text-4xl" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2!">
                    مقایسه‌ای یافت نشد
                  </h3>
                  <p className="text-gray-500 mb-4!">
                    با تغییر فیلترها مجدداً تلاش کنید
                  </p>
                  <Link
                    href={"/whichcars.html"}
                    className="bg-[#ce1a2a] text-white! cursor-pointer px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    نمایش همه مقایسه‌ها
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* سایدبار - sticky از بالا */}
          <aside className="lg:w-1/4 w-full lg:sticky lg:top-20 lg:self-start">
            <SideBarWhichCars
              popularComparisons={popularComparisons}
              banner={banner}
            />
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 1023px) {
          .lg\\:sticky {
            position: relative !important;
            top: auto !important;
            align-self: auto !important;
          }
        }

        .line-clamp-6 {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
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

export default WhichCars;