"use client";

import { htmlToPlainText } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Card, Pagination, Select } from "antd";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaCar, FaClock, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import SidebarAutoService from "../../autoservice/[...slug]/components/SidebarAutoService";
import CustomPagination from "@/app/components/CustomPagination";

const { Option } = Select;

function MainBoxAutoServices({
  AutoServiceData,
  brands,
  id,
  propertyItems,
  banner,
  title,
  summary,
}: {
  AutoServiceData: Items[];
  brands: ItemsCategory[];
  id: string;
  propertyItems: ItemsId[];
  banner: Items[];
  title: string;
  summary: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState<number | null>(
    Number(brands.find((e) => e.id === Number(id))?.id) || null,
  );
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const titleBrandSelected = brands.find((e) => e.id === selectedBrand)?.title;

  const page = searchParams.get("page");

  useEffect(() => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  }, [page]);

  // استخراج استان‌های منحصر به فرد (از عنوان استخراج می‌شود)
  const provinces = useMemo(() => {
    const provinceMap: { [key: string]: string } = {
      تهران: "تهران",
      کرج: "البرز",
      دماوند: "تهران",
      "نظام آباد": "تهران",
      "فدائيان اسلام": "تهران",
      "شهید نامجو": "تهران",
      قزوین: "قزوین",
      چیتگر: "تهران",
      آزادی: "تهران",
      کریمخان: "تهران",
      تهرانپارس: "تهران",
    };

    const extractedProvinces = AutoServiceData.map((item) => {
      for (const [keyword, province] of Object.entries(provinceMap)) {
        if (item.title.includes(keyword)) {
          return province;
        }
      }
      return "تهران"; // پیش‌فرض
    });

    return [...new Set(extractedProvinces)].sort();
  }, [AutoServiceData]);

  const handleProvinceChange = (value: string | null) => {
    setSelectedProvince(value);
  };

  const clearFilters = () => {
    // setSelectedBrand(null);
    setSelectedProvince(null);
    router.push("/autoservices.html", {
      scroll: false,
    });
  };

  const handleNavigation = (Latitude: string, Longitude: string) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${Latitude},${Longitude}`;

    // تشخیص دستگاه
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
      // برای iOS از maps خاص استفاده می‌کنیم
      const iosMapsUrl = `maps://maps.google.com/maps?daddr=${Latitude},${Longitude}`;
      window.location.href = iosMapsUrl;

      // فال‌بک بعد از 500ms اگر کار نکرد
      setTimeout(() => {
        if (!document.hidden) {
          window.open(mapsUrl, "_blank");
        }
      }, 500);
    } else if (isAndroid) {
      // برای اندروید از geo URI استفاده می‌کنیم
      const geoUrl = `geo:${Latitude},${Longitude}?q=${Latitude},${Longitude}`;
      window.location.href = geoUrl;

      // فال‌بک بعد از 500ms اگر کار نکرد
      setTimeout(() => {
        if (!document.hidden) {
          window.open(mapsUrl, "_blank");
        }
      }, 500);
    } else {
      // برای سایر دستگاه‌ها مستقیماً به گوگل مپس
      window.open(mapsUrl, "_blank");
    }
  };

  return (
    <>
      {/* هدر */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4 text-[#ce1a2a]!">{title}</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {htmlToPlainText(summary)}
        </p>
      </div>
      <div className="flex flex-wrap bg-gray-50">
        <div className="lg:w-3/4 w-full">
          <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto px-4 max-w-6xl">
              {/* فیلترها */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
                    {/* فیلتر برند */}
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="block whitespace-nowrap text-sm font-medium text-gray-700">
                        <FaCar className="inline ml-1" />
                        برند خودرو
                      </label>
                      <Select
                        aria-label="انتخاب برند..."
                        value={selectedBrand}
                        onChange={(value: number | null) => {
                          if (value) {
                            // setSelectedBrand(value);
                          } else {
                            // setSelectedBrand(null);
                            router.push("/autoservices.html", {
                              scroll: false,
                            });
                          }
                        }}
                        placeholder="انتخاب برند..."
                        allowClear
                        showSearch
                        className="w-full"
                        size="large"
                      >
                        {brands.map((brand) => (
                          <Option key={brand.id} value={brand.id}>
                            <Link className="text-gray-800!" href={brand.url}>
                              {brand.title}
                            </Link>
                          </Option>
                        ))}
                      </Select>
                    </div>

                    {/* فیلتر استان */}
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="block text-sm font-medium text-gray-700">
                        <FaMapMarkerAlt className="inline ml-1" />
                        استان
                      </label>
                      <Select
                        aria-label="جستجوی استان..."
                        value={selectedProvince}
                        onChange={handleProvinceChange}
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
                        {provinces.map((province) => (
                          <Option key={province} value={province}>
                            {province}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  {/* دکمه پاک کردن فیلترها */}
                  {pathname !== "/autoservices.html" && (
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

              {/* لیست خطی نمایندگی‌ها */}
              <div className="space-y-4 mb-8">
                {AutoServiceData.map((service) => {
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
                        .split(/[\r\n,;]+/) // جدا کردن با هر کدام از این جداکننده‌ها
                        .map((num) => num.trim()) // حذف فاصله‌های اضافه
                        .filter(
                          (num) => num.length > 0 && /^0\d{10}$/.test(num),
                        )
                    : "";

                  return (
                    <Card
                      key={service.id}
                      className="rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-[#ce1a2a] mt-3!"
                      styles={{
                        body: {
                          padding: 0,
                        },
                      }}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* تصویر */}
                        <div className="md:w-1/4 lg:w-1/5">
                          <div className="h-full overflow-hidden rounded-r-xl md:rounded-r-none md:rounded-l-xl p-3">
                            <Link href={service.url}>
                              <img
                                src={mainDomainOld + service.image}
                                alt={service.title}
                                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "/images/default-service.jpg";
                                }}
                              />
                            </Link>
                          </div>
                        </div>

                        {/* اطلاعات */}
                        <div className="flex-1 p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                            <div className="flex-1">
                              <Link href={service.url}>
                                <h2 className="font-bold text-gray-800 text-xl mb-2! hover:text-[#ce1a2a]! transition-colors">
                                  {service.title}
                                </h2>
                              </Link>

                              <div className="flex flex-wrap gap-2 mb-3 items-start">
                                <span className="bg-[#ce1a2a] text-white! px-2 py-1 rounded-full text-xs! font-medium">
                                  {service.categoryTitle}
                                </span>
                                {/* <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                              <FaStar className="text-yellow-500 ml-1" />
                              <span className="text-xs font-medium text-gray-800">
                                ۴.۲
                              </span>
                            </div> */}
                              </div>
                            </div>
                          </div>

                          {/* اطلاعات تماس و آدرس */}
                          <div className="flex items-start justify-between mb-3!">
                            <div className="space-y-2">
                              <div className="flex items-center text-gray-600">
                                <FaMapMarkerAlt className="text-[#ce1a2a] ml-2" />
                                <span className="text-xs">
                                  {loc ? loc : "ثبت نشده"}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <FaClock className="text-[#ce1a2a] ml-2" />
                                <span className="text-xs">
                                  {time ? time : "ثبت نشده"}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <FaPhone className="text-[#ce1a2a] ml-2" />
                                <span
                                  className={`text-xs  ${tel ? "font-bold" : ""}`}
                                >
                                  {tel
                                    ? tel?.replace("\r\n", " - ")
                                    : "ثبت نشده"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* دکمه‌های اقدام */}
                          <div className="flex gap-3 items-start text-xs!">
                            {numbers.length > 0 && (
                              <a href={`tel:${numbers[0]}`} className="">
                                <button
                                  aria-label="تماس"
                                  className="bg-[#ce1a2a] font-bold! cursor-pointer text-white! py-2 px-3 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                                >
                                  <FaPhone className="ml-2" />
                                  <span className="font-medium">تماس</span>
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
                                className="bg-gray-100! font-bold! cursor-pointer text-[#ce1a2a]! py-2 px-3 rounded-lg hover:bg-[#ce1a2a]! hover:text-white! duration-300 flex items-center"
                              >
                                <FaMapMarkerAlt className="ml-2" />
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

              {/* صفحه‌بندی */}
              {AutoServiceData.length > 0 && (
                <CustomPagination
                  total={AutoServiceData[0].total}
                  pageSize={15}
                  currentPage={Number(searchParams.get("page")) || 1}
                />
              )}

              {/* پیام عدم وجود داده */}
              {AutoServiceData.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <FaCar className="text-4xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2">
                    هیچ نمایندگی یافت نشد
                  </h3>
                  <p className="text-gray-500 mb-4">
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

            <style jsx global>{`
              .ant-select-focused .ant-select-selector,
              .ant-select-selector:hover {
                border-color: #ce1a2a !important;
                box-shadow: 0 0 0 2px rgba(206, 26, 42, 0.2) !important;
              }
            `}</style>
          </div>
        </div>

        <div className="lg:w-1/4 w-full">
          <SidebarAutoService banner={banner} />
        </div>
      </div>
    </>
  );
}

export default MainBoxAutoServices;
