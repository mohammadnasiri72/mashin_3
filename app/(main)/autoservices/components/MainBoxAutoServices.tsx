"use client";

import { mainDomainOld } from "@/utils/mainDomain";
import { Card, Pagination, Select } from "antd";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  FaCar,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
} from "react-icons/fa";

const { Option } = Select;

function MainBoxAutoServices({
  AutoServiceData,
  brands,
  id,
}: {
  AutoServiceData: Items[];
  brands: ItemsCategory[];
  id: string;
}) {
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState<number | null>(
    Number(brands.find((e) => e.id === Number(id))?.id) || null
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
    setSelectedBrand(null);
    setSelectedProvince(null);
    router.push("/autoservices.html", {
      scroll: false,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        {/* هدر */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            مراکز و نمایندگی های خدمات خودرو
            <span className="text-[#ce1a2a]!">{titleBrandSelected}</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            پیدا کردن نزدیک‌ترین نمایندگی رسمی برای خدمات پس از فروش و تعمیرات
            خودروی شما
          </p>
        </div>

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
                    value={selectedBrand}
                    onChange={(value: number | null) => {
                      if (value) {
                        setSelectedBrand(value);
                      } else {
                        setSelectedBrand(null);
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
            {AutoServiceData.map((service) => (
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
                          <h3 className="font-bold text-gray-800 text-xl mb-2! hover:text-[#ce1a2a]! transition-colors">
                            {service.title}
                          </h3>
                        </Link>

                        <div className="flex flex-wrap gap-2 mb-3 items-start">
                          <span className="bg-[#ce1a2a] text-white! px-2 py-1 rounded-full text-xs! font-medium">
                            {service.categoryTitle}
                          </span>
                          <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                            <FaStar className="text-yellow-500 ml-1" />
                            <span className="text-xs font-medium text-gray-800">
                              ۴.۲
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* اطلاعات تماس و آدرس */}
                    <div className="flex items-start justify-between mb-3!">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <FaMapMarkerAlt className="text-[#ce1a2a] ml-2" />
                          <span className="text-xs">
                            {service.title.includes("تهران")
                              ? "تهران"
                              : service.title.includes("کرج")
                              ? "کرج"
                              : service.title.includes("دماوند")
                              ? "دماوند"
                              : service.title.includes("قزوین")
                              ? "قزوین"
                              : "تهران"}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaClock className="text-[#ce1a2a] ml-2" />
                          <span className="text-xs">۸:۰۰ صبح - ۱۷:۰۰ عصر</span>
                        </div>
                      </div>
                    </div>

                    {/* دکمه‌های اقدام */}
                    <div className="flex gap-3 items-start text-xs!">
                      <button className="bg-[#ce1a2a] font-bold! cursor-pointer text-white! py-2 px-3 rounded-lg hover:bg-red-700 transition-colors flex items-center">
                        <FaPhone className="ml-2" />
                        تماس
                      </button>
                      <button className="bg-gray-100 font-bold! cursor-pointer text-[#ce1a2a] py-2 px-3 rounded-lg hover:bg-[#ce1a2a] hover:text-white! transition-colors flex items-center">
                        <FaMapMarkerAlt className="ml-2" />
                        مسیریابی
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* صفحه‌بندی */}
          {AutoServiceData.length > 0 && (
            <div className="p-3 flex justify-center items-center">
              <Pagination
                onChange={(page) => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("page", page.toString());
                  router.push(`${pathname}?${params.toString()}`, {
                    scroll: false,
                  });
                }}
                total={AutoServiceData[0].total}
                showSizeChanger={false}
                defaultPageSize={15}
                current={Number(searchParams.get("page")) || 1}
              />
              <span>{AutoServiceData[0].total} مورد</span>
            </div>
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
    </>
  );
}

export default MainBoxAutoServices;
