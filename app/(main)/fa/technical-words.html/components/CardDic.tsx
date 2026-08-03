"use client";

import CustomPagination from "@/app/components/CustomPagination";
import { htmlToPlainText, toPersianNumbers } from "@/utils/func";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { FaArrowLeft, FaTag } from "react-icons/fa";
import SearchBoxDic from "./SearchBoxDic";
import SideBarTechnicalWords from "./SideBarTechnicalWords";

function CardDic({
  title,
  summary,
  tabConfig,
  dic: initialDic,
  banner,
}: {
  title: string;
  summary: string;
  tabConfig: { key: number; href: string; label: string }[];
  dic: Items[];
  banner: Items[];
}) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isMainLonger, setIsMainLonger] = useState(true);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("term");
  const router = useRouter();
  const pathname = usePathname();

  // State برای infinite scroll
  const [dic, setDic] = useState<Items[]>(initialDic || []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(
    initialDic?.[0]?.total || 0,
  );
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(
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

  // تشخیص تب فعال از pathname
  useEffect(() => {
    const key = Number(pathname.split("/")[2]);
    if (isNaN(key)) {
      setActiveTab(0);
    } else {
      setActiveTab(key);
    }
  }, [pathname]);

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
    setDic(initialDic || []);
    setCurrentPage(pageFromUrl);
    setTotalItems(initialDic?.[0]?.total || 0);
    setCurrentSearchTerm(searchParams.get("term") || "");
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
  }, [initialDic, searchParams, pageFromUrl]);

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
  }, [dic, banner, searchTerm]);

  // تابع بارگذاری صفحه بعد
  const loadMore = useCallback(async () => {
    if (loading || !hasMore || isManualPage) return;

    const nextPage = currentPage + 1;
    const pageSize = 20;
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
        TypeId: "1046",
        langCode: "fa",
        PageIndex: nextPage.toString(),
        PageSize: pageSize.toString(),
      });

      if (currentSearchTerm && currentSearchTerm !== "undefined") {
        params.append("Term", currentSearchTerm);
      }

      const response = await fetch(`/api/technical-words?${params.toString()}`);

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
        const existingIds = new Set(dic.map((item: Items) => item.id));
        const newItems = result.data.filter(
          (item: Items) => !existingIds.has(item.id),
        );

        if (newItems.length > 0) {
          setDic((prev) => [...prev, ...newItems]);
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
      console.error("Error loading more technical words:", err);
      setError("خطا در بارگذاری واژگان. لطفاً مجدداً تلاش کنید.");
      setHasMore(false);
      setShowPagination(true);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    hasMore,
    loading,
    currentSearchTerm,
    totalItems,
    isManualPage,
    dic,
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

  const totalPages = Math.ceil(totalItems / 20);

  return (
    <>
      <div className="min-h-screen bg-[#f4f4f4]!">
        <div className="p-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 relative">
            {/* محتوای اصلی - 3/4 صفحه */}
            <div
              ref={mainBoxRef}
              className={`
                lg:w-3/4 w-full transition-all duration-300
                ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
              `}
            >
              <div className="bg-white rounded-2xl px-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                {/* نمایش اطلاعات صفحه */}
                <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
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
                    {toPersianNumbers(totalItems)} واژه
                  </span>
                </div>
                {/* هدر صفحه */}
                <div className="mb-4! text-center">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4!">
                    <span className="text-red-600">{title}</span>
                  </h1>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {summary && htmlToPlainText(summary)}
                  </p>
                </div>

                {/* تب‌های واژگان فنی */}
                <div className="mb-6! flex items-center flex-wrap gap-2">
                  {tabConfig.map((tab) => (
                    <Link
                      key={tab.key}
                      className={`hover:text-white! duration-300 px-3 py-1 rounded-lg ${
                        activeTab === tab.key
                          ? "text-white! bg-[#ce1a2a]"
                          : "text-black! hover:bg-[#ce1a2a]"
                      }`}
                      href={tab.href}
                    >
                      {tab.label}
                    </Link>
                  ))}
                </div>

                {/* سرچ باکس */}
                <SearchBoxDic />

                {/* نمایش عبارت جستجو */}
                {searchTerm && (
                  <div className="mb-4! p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-700">
                    نتایج جستجو برای:{" "}
                    <span className="font-bold">"{searchTerm}"</span>
                    <button
                      onClick={() => {
                        const params = new URLSearchParams(
                          searchParams.toString(),
                        );
                        params.delete("term");
                        router.push(`${pathname}?${params.toString()}`);
                      }}
                      className="mr-2 text-blue-500 hover:text-blue-700 underline text-sm"
                    >
                      پاک کردن
                    </button>
                  </div>
                )}

                {/* لیست واژگان */}
                {dic.length > 0 ? (
                  <>
                    <div className="space-y-4">
                      {dic.map((d, index) => (
                        <Link href={d.url || "#"} key={`${d.id}-${index}`}>
                          <div className="group bg-gray-50 rounded-xl mt-3! p-5 hover:bg-linear-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-300 border border-gray-200 hover:border-red-200 shadow-sm hover:shadow-md">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                <FaTag className="text-red-500 group-hover:rotate-12 transition-transform" />
                              </div>
                              <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-800 mb-2! group-hover:text-red-700 transition-colors">
                                  {d.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                  {htmlToPlainText(d.body)}
                                </p>
                              </div>
                              <FaArrowLeft className="text-gray-400 group-hover:text-red-500 group-hover:-translate-x-1 transition-all" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* عنصر observer */}
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
                    <p className="text-gray-500 text-lg">
                      هیچ واژه‌ای یافت نشد
                    </p>
                  </div>
                )}
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
              <SideBarTechnicalWords banner={banner} />
            </aside>
          </div>
        </div>
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

export default CardDic;
