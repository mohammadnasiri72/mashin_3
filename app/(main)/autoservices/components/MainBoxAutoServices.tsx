"use client";

import CustomPagination from "@/app/components/CustomPagination";
import { htmlToPlainText, toPersianNumbers } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import { Card, Select } from "antd";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { FaCar, FaClock, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import SidebarAutoServices from "./SidebarAutoServices";

const { Option } = Select;

function MainBoxAutoServices({
  AutoServiceData: initialAutoServiceData,
  brands,
  id,
  propertyItems: initialPropertyItems,
  banner,
  title,
  summary,
  lastNews,
  lastCars,
  provinces,
}: {
  AutoServiceData: Items[];
  brands: ItemsCategory[];
  id: string;
  propertyItems: ItemsId[];
  banner: Items[];
  title: string;
  summary: string;
  lastNews: Items[];
  lastCars: Items[];
  provinces: Items[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const provinceId = searchParams.get("provinceid");

  // تشخیص صفحه اصلی یا جزئیات
  const isMainPage = pathname === "/autoservices.html";

  // State برای infinite scroll
  const [autoServiceData, setAutoServiceData] = useState<Items[]>(
    initialAutoServiceData || [],
  );
  const [propertyItems, setPropertyItems] = useState<ItemsId[]>(
    initialPropertyItems || [],
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(
    initialAutoServiceData?.[0]?.total || 0,
  );
  const [showPagination, setShowPagination] = useState<boolean>(false);
  const [isManualPage, setIsManualPage] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedBrand] = useState<number | null>(
    !isMainPage ? Number(brands.find((e) => e.id === Number(id))?.id) || 0 : 0,
  );
  const [selectedProvince, setSelectedProvince] = useState<number>(
    !provinceId ? 0 : Number(provinceId),
  );
  const [isMainLonger, setIsMainLonger] = useState(true);

  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const MAX_INFINITE_PAGES = 10;

  useEffect(() => {
    setSelectedProvince(!provinceId ? 0 : Number(provinceId));
  }, [provinceId]);

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
    setAutoServiceData(initialAutoServiceData || []);
    setPropertyItems(initialPropertyItems || []);
    setCurrentPage(pageFromUrl);
    setTotalItems(initialAutoServiceData?.[0]?.total || 0);
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
  }, [initialAutoServiceData, initialPropertyItems, pageFromUrl]);

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
    autoServiceData,
    banner,
    lastNews,
    lastCars,
    selectedBrand,
    selectedProvince,
  ]);

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
        TypeId: "1050",
        langCode: "fa",
        PageIndex: nextPage.toString(),
        PageSize: pageSize.toString(),
      });

      if (!isMainPage && id && id !== "0") {
        params.append("CategoryIdArray", id);
      }

      if (selectedProvince > 0) {
        params.append("FilterProps", `23207=${selectedProvince}`);
      }

      if (isMainPage) {
        params.append("OrderBy", "8");
      }

      const response = await fetch(`/api/auto-services?${params.toString()}`);

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
        const existingIds = new Set(
          autoServiceData.map((item: Items) => item.id),
        );
        const newItems = result.data.filter(
          (item: Items) => !existingIds.has(item.id),
        );

        if (newItems.length > 0) {
          setAutoServiceData((prev) => [...prev, ...newItems]);

          // دریافت propertyItems برای آیتم‌های جدید
          const newIds = newItems.map((item: Items) => item.id).join(",");
          if (newIds) {
            const propertyResponse = await fetch(
              `/api/items-by-ids?ids=${newIds}`,
            );
            const propertyResult = await propertyResponse.json();
            if (propertyResult.data) {
              setPropertyItems((prev) => [...prev, ...propertyResult.data]);
            }
          }

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
      console.error("Error loading more auto services:", err);
      setError("خطا در بارگذاری نمایندگی‌ها. لطفاً مجدداً تلاش کنید.");
      setHasMore(false);
      setShowPagination(true);
    } finally {
      setLoading(false);
    }
  }, [
    currentPage,
    hasMore,
    loading,
    id,
    selectedProvince,
    totalItems,
    isMainPage,
    isManualPage,
    autoServiceData,
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

  const clearFilters = () => {
    router.push("/autoservices.html", {
      scroll: false,
    });
  };

  const handleNavigation = (Latitude: string, Longitude: string) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${Latitude},${Longitude}`;

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
      const iosMapsUrl = `maps://maps.google.com/maps?daddr=${Latitude},${Longitude}`;
      window.location.href = iosMapsUrl;

      setTimeout(() => {
        if (!document.hidden) {
          window.open(mapsUrl, "_blank");
        }
      }, 500);
    } else if (isAndroid) {
      const geoUrl = `geo:${Latitude},${Longitude}?q=${Latitude},${Longitude}`;
      window.location.href = geoUrl;

      setTimeout(() => {
        if (!document.hidden) {
          window.open(mapsUrl, "_blank");
        }
      }, 500);
    } else {
      window.open(mapsUrl, "_blank");
    }
  };

  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap gap-6 relative mx-auto bg-[#f4f4f4] pt-3">
        {/* محتوای اصلی */}
        <div
          ref={mainBoxRef}
          className={`
            lg:w-3/4 w-full transition-all duration-300 bg-white! rounded-2xl
            ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
          `}
        >
         
          <div className="min-h-screen ">
            <div className="p-4">
              {/* نمایش اطلاعات صفحه */}
              <div className="flex items-center justify-between  flex-wrap gap-2">
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
                  {toPersianNumbers(totalItems)} نمایندگی
                </span>
              </div>
 {/* هدر */}
          <div className="text-center mb-4!">
            <h1 className="text-2xl font-bold text-[#ce1a2a]!">{title}</h1>
            {summary && (
              <p className="text-gray-600 max-w-2xl mx-auto text-justify pt-2">
                {htmlToPlainText(summary)}
              </p>
            )}
          </div>
              {/* فیلترها */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8!">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
                  <div className="flex flex-col lg:flex-row gap-4 w-full">
                    {/* فیلتر برند - فقط در صفحه جزئیات */}
                    {
                      <div className="flex flex-wrap items-center gap-2 lg:w-1/2 w-full">
                        <label className="block whitespace-nowrap text-sm font-medium text-gray-700">
                          <FaCar className="inline ml-1" />
                          برند خودرو
                        </label>
                        <Select
                          aria-label="انتخاب برند..."
                          value={selectedBrand}
                          onChange={(value: number | null) => {
                            if (
                              value &&
                              brands.find((e) => e.id === value)?.url
                            ) {
                              const url = brands.find(
                                (e) => e.id === value,
                              )?.url;
                              if (url) {
                                const params = new URLSearchParams();
                                if (selectedProvince > 0) {
                                  params.set(
                                    "provinceid",
                                    selectedProvince.toString(),
                                  );
                                }
                                const queryString = params.toString();
                                router.push(
                                  `${url}${queryString ? `?${queryString}` : ""}`,
                                );
                              }
                            } else {
                              const params = new URLSearchParams();
                              if (selectedProvince > 0) {
                                params.set(
                                  "provinceid",
                                  selectedProvince.toString(),
                                );
                              }
                              const queryString = params.toString();
                              router.push(
                                `/autoservices.html${queryString ? `?${queryString}` : ""}`,
                              );
                            }
                          }}
                          placeholder="انتخاب برند..."
                          allowClear
                          showSearch
                          optionFilterProp="label"
                          filterOption={(input, option) => {
                            if (!option) return false;
                            const label = String(
                              option.label || "",
                            ).toLowerCase();
                            return label.includes(input.toLowerCase());
                          }}
                          className="w-full"
                          size="large"
                        >
                          <Option value={0} label="همه نمایندگی‌ها">
                            <div className="text-gray-800! w-full! block! cursor-pointer">
                              همه نمایندگی‌ها
                            </div>
                          </Option>
                          {brands.map((brand) => (
                            <Option
                              key={brand.id}
                              value={brand.id}
                              label={brand.title}
                            >
                              <div className="text-gray-800! w-full! block!">
                                {brand.title}
                              </div>
                            </Option>
                          ))}
                        </Select>
                      </div>
                    }

                    {/* فیلتر استان */}
                    <div
                      className={`flex flex-wrap items-center gap-2 ${!isMainPage ? "lg:w-1/2" : "lg:w-1/2"} w-full`}
                    >
                      <label className="block text-sm font-medium text-gray-700">
                        <FaMapMarkerAlt className="inline ml-1" />
                        استان
                      </label>
                      <Select
                        aria-label="جستجوی استان..."
                        value={selectedProvince}
                        onChange={(value: number) => {
                          if (value) {
                            const params = new URLSearchParams(
                              searchParams.toString(),
                            );
                            params.set(
                              "provinceid",
                              value ? value.toString() : "",
                            );
                            params.delete("page");
                            router.push(`${pathname}?${params.toString()}`);
                          } else {
                            const params = new URLSearchParams(
                              searchParams.toString(),
                            );
                            params.delete("provinceid");
                            params.delete("page");
                            router.push(`${pathname}?${params.toString()}`);
                          }
                        }}
                        placeholder="جستجوی استان..."
                        allowClear
                        showSearch
                        filterOption={(input, option) => {
                          if (!option || !option.children) return false;
                          return option.children
                            .toString()
                            .toLowerCase()
                            .includes(input.toLowerCase());
                        }}
                        className="w-full!"
                        size="large"
                      >
                        <Option value={0}>همه استان‌ها</Option>
                        {provinces.map((province) => (
                          <Option key={province.id} value={province.id}>
                            {province.title}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  {/* دکمه پاک کردن فیلترها */}
                  {!(pathname === "/autoservices.html" && !provinceId) && (
                    <button
                      aria-label="پاک کردن فیلترها"
                      onClick={clearFilters}
                      className="bg-gray-500 cursor-pointer text-white! px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors whitespace-nowrap mt-6 lg:mt-0"
                    >
                      پاک کردن فیلترها
                    </button>
                  )}
                </div>
              </div>

              {/* لیست گریدی نمایندگی‌ها */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8!">
                {autoServiceData.map((service, index) => {
                  const propertyItem = propertyItems.find(
                    (e) => e.id === service.id,
                  );

                  const loc = propertyItem?.properties.find(
                    (e) => e.propertyKey === "p1050_serviceaddress",
                  )?.propertyValue;
                  const time = propertyItem?.properties.find(
                    (e) => e.propertyKey === "p1050_servicetime",
                  )?.propertyValue;
                  const tel = propertyItem?.properties.find(
                    (e) => e.propertyKey === "p1050_servicetel",
                  )?.propertyValue;
                  const Latitude = propertyItem?.properties.find(
                    (e) => e.propertyKey === "p1050_latitude",
                  )?.propertyValue;
                  const Longitude = propertyItem?.properties.find(
                    (e) => e.propertyKey === "p1050_longitude",
                  )?.propertyValue;

                  const numbers = tel
                    ? tel
                        .split(/[\r\n,;]+/)
                        .map((num) => num.trim())
                        .filter(
                          (num) => num.length > 0 && /^0\d{10}$/.test(num),
                        )
                    : "";

                  return (
                    <Card
                      key={`${service.id}-${index}`}
                      className="rounded-xl! border! border-gray-200! hover:shadow-lg! transition-all! duration-300! hover:border-[#ce1a2a]! overflow-hidden!"
                      styles={{
                        body: {
                          padding: 0,
                        },
                      }}
                    >
                      <div className="flex flex-col h-full">
                        {/* تصویر */}
                        <div className="h-48 overflow-hidden bg-white">
                          <Link href={service.url || "#"}>
                            <img
                              src={mainDomain + service.image}
                              alt={service.title}
                              className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
                            />
                          </Link>
                        </div>

                        {/* اطلاعات */}
                        <div className="flex-1 p-5">
                          <div className="mb-3!">
                            <div className="flex flex-wrap gap-2 mb-3!">
                              <span className="bg-[#ce1a2a] text-white! px-2 py-1 rounded-full text-xs! font-medium">
                                {service.categoryTitle}
                              </span>
                            </div>
                            <Link href={service.url || "#"}>
                              <h2 className="font-bold text-gray-800 text-[16px] mb-2! hover:text-[#ce1a2a]! transition-colors line-clamp-2">
                                {service.title}
                              </h2>
                            </Link>
                          </div>

                          {/* اطلاعات تماس و آدرس */}
                          <div className="space-y-3 mb-4!">
                            <div className="flex items-start text-gray-600">
                              <FaMapMarkerAlt className="text-[#ce1a2a] ml-2 mt-1 shrink-0" />
                              <span className="text-xs line-clamp-2">
                                {loc ? loc : "ثبت نشده"}
                              </span>
                            </div>

                            <div className="flex items-center text-gray-600">
                              <FaClock className="text-[#ce1a2a] ml-2 shrink-0" />
                              <span className="text-xs line-clamp-1">
                                {time ? time : "ثبت نشده"}
                              </span>
                            </div>

                            <div className="flex items-center text-gray-600">
                              <FaPhone className="text-[#ce1a2a] ml-2 shrink-0" />
                              <span
                                className={`text-sm line-clamp-1 ${tel ? "font-bold" : ""}`}
                              >
                                {tel
                                  ? tel?.replace(/\r\n/g, " - ")
                                  : "ثبت نشده"}
                              </span>
                            </div>
                          </div>

                          {/* دکمه‌های اقدام */}
                          <div className="flex gap-2 mt-auto pt-2">
                            {numbers.length > 0 && (
                              <a href={`tel:${numbers[0]}`} className="flex-1">
                                <button
                                  aria-label="تماس"
                                  className="w-full bg-[#ce1a2a] font-bold! cursor-pointer text-white! py-2 px-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center text-sm"
                                >
                                  <FaPhone className="ml-2 text-xs" />
                                  <span>تماس</span>
                                </button>
                              </a>
                            )}

                            {Latitude && Longitude && (
                              <Link
                                href={`https://www.google.com/maps/dir/?api=1&destination=${Latitude},${Longitude}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavigation(Latitude, Longitude);
                                }}
                                className="flex-1 bg-gray-100! font-bold! cursor-pointer text-[#ce1a2a]! py-2 px-3 rounded-lg hover:bg-[#ce1a2a]! hover:text-white! duration-300 flex items-center justify-center text-sm"
                              >
                                <FaMapMarkerAlt className="ml-2 text-xs" />
                                مسیریابی
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
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
                  pageSize={15}
                  currentPage={currentPage}
                  showPagination={showPagination}
                />
              )}

              {/* پیام عدم وجود داده */}
              {autoServiceData.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <FaCar className="text-4xl text-gray-400 mx-auto mb-4!" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2!">
                    هیچ نمایندگی یافت نشد
                  </h3>
                  <p className="text-gray-500 mb-4!">
                    با تغییر فیلترها مجدداً تلاش کنید
                  </p>
                  <button
                    aria-label="نمایش همه نمایندگی‌ها"
                    onClick={clearFilters}
                    className="bg-[#ce1a2a] text-white! cursor-pointer px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  >
                    نمایش همه نمایندگی‌ها
                  </button>
                </div>
              )}
            </div>
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
          <SidebarAutoServices
            banner={banner}
            lastNews={lastNews}
            lastCars={lastCars}
          />
        </aside>
      </div>

      <style jsx global>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .lg\\:sticky {
          position: sticky;
          bottom: 0;
          align-self: flex-end;
        }

        .ant-select-focused .ant-select-selector,
        .ant-select-selector:hover {
          border-color: #ce1a2a !important;
          box-shadow: 0 0 0 2px rgba(206, 26, 42, 0.2) !important;
        }

        @media (max-width: 1023px) {
          .lg\\:sticky {
            position: relative !important;
            bottom: auto !important;
            align-self: auto !important;
          }
        }
      `}</style>
    </>
  );
}

export default MainBoxAutoServices;
