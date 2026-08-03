"use client";

import CustomPagination from "@/app/components/CustomPagination";
import { toPersianNumbers } from "@/utils/func";
import React, { useEffect, useRef, useState, useCallback } from "react";
import BoxPodcasts from "./BoxPodcasts";
import SidebarPodcasts from "./SidebarPodcasts";
import BoxCatPodcasts from "./BoxCatPodcasts";
import { useSearchParams } from "next/navigation";

function Podcast({
  podcasts: initialPodcasts,
  podcastsCat,
  banner,
  popularNews,
  titleCategory,
}: {
  podcasts: Items[];
  podcastsCat: ItemsCategory[];
  banner: Items[];
  popularNews: Items[];
  titleCategory: string;
}) {
  const [isMainLonger, setIsMainLonger] = useState(true);
  const searchParams = useSearchParams();

  // State برای infinite scroll
  const [podcasts, setPodcasts] = useState<Items[]>(initialPodcasts || []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(
    initialPodcasts?.[0]?.total || 0,
  );
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("term") || "",
  );
  const [showPagination, setShowPagination] = useState<boolean>(false);
  const [isManualPage, setIsManualPage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const MAX_INFINITE_PAGES = 10;

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
    setPodcasts(initialPodcasts || []);
    setCurrentPage(pageFromUrl);
    setTotalItems(initialPodcasts?.[0]?.total || 0);
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
  }, [initialPodcasts, pageFromUrl]);

  // گوش دادن به تغییرات searchParams برای آپدیت searchTerm
  useEffect(() => {
    const term = searchParams.get("term") || "";
    setSearchTerm(term);
  }, [searchParams]);

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
  }, [podcasts, podcastsCat, banner, popularNews]);

  // تابع بارگذاری صفحه بعد
  const loadMore = useCallback(async () => {
    if (loading || !hasMore || isManualPage) return;

    const nextPage = currentPage + 1;
    const pageSize = 15;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (nextPage > MAX_INFINITE_PAGES || nextPage >= totalPages) {
      setHasMore(false);
      setShowPagination(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        TypeId: "1047",
        langCode: "fa",
        PageIndex: nextPage.toString(),
        PageSize: pageSize.toString(),
      });

      if (searchTerm && searchTerm !== "undefined") {
        params.append("Term", searchTerm);
      }

      const response = await fetch(`/api/podcasts?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`خطا در دریافت داده: ${response.status}`);
      }

      const result = await response.json();

      if (
        result &&
        result.data &&
        Array.isArray(result.data) &&
        result.data.length > 0
      ) {
        const existingIds = new Set(podcasts.map((item: Items) => item.id));
        const newItems = result.data.filter(
          (item: Items) => !existingIds.has(item.id),
        );

        if (newItems.length > 0) {
          setPodcasts((prev) => [...prev, ...newItems]);
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
      console.error("Error loading more podcasts:", err);
      setError("خطا در بارگذاری پادکست‌ها. لطفاً مجدداً تلاش کنید.");
      setHasMore(false);
      setShowPagination(true);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    hasMore,
    loading,
    searchTerm,
    totalItems,
    isManualPage,
    podcasts,
  ]);

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

  const totalPages = Math.ceil(totalItems / 15);

  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap relative mx-auto py-2 bg-[#f4f4f4] gap-2">
        {/* محتوای اصلی */}
        <div
          ref={mainBoxRef}
          className={`
            lg:w-3/4 w-full transition-all duration-300
            ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
          `}
        >
          <div className="bg-white rounded-2xl px-4 shadow-lg border border-gray-100">
            {/* نمایش اطلاعات صفحه */}
            <div className="flex items-center justify-between flex-wrap gap-2 p-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-gray-500">
                  صفحه {toPersianNumbers(currentPage)} از{" "}
                  {toPersianNumbers(totalPages)}
                </span>
                {error && <span className="text-xs text-red-500">{error}</span>}
              </div>
              <span className="text-sm text-gray-500">
                {toPersianNumbers(totalItems)} پادکست
              </span>
            </div>
            {/* هدر صفحه */}
            <div className="mb-4! text-center">
              <h2 className="whitespace-nowrap text-[#ce1a2a]! text-xl">
                {titleCategory
                  ? `پادکست های ${titleCategory}`
                  : " پادکست های بررسی خودرو"}
              </h2>
            </div>
            <BoxCatPodcasts podcastsCat={podcastsCat} />
            {/* کامپوننت BoxPodcasts با props اضافی */}
            <BoxPodcasts
              podcasts={podcasts}
              titleCategory={titleCategory}
              hasMore={hasMore}
              loading={loading}
              loaderRef={loaderRef}
              isManualPage={isManualPage}
              showPagination={showPagination}
            />

            {/* پیجینیشن */}
            {totalPages > 1 && (
              <CustomPagination
                total={totalItems}
                pageSize={15}
                currentPage={currentPage}
                showPagination={showPagination}
              />
            )}
          </div>
        </div>

        {/* سایدبار */}
        <aside
          ref={sidebarRef}
          className={`
            lg:w-1/4 w-full transition-all duration-300
            ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
          `}
        >
          <SidebarPodcasts popularNews={popularNews} banner={banner} />
        </aside>
      </div>

      <style jsx global>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
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
    </>
  );
}

export default Podcast;
