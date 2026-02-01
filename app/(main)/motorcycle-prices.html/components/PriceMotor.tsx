"use client";

import { SearchOutlined } from "@ant-design/icons";
import { Card, Input, Table } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { htmlToPlainText } from "@/utils/func";
import {
  FaCar,
  FaCaretDown,
  FaCaretUp,
  FaDollarSign,
  FaStore,
} from "react-icons/fa";
import { MdPriceChange } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Types
interface Category {
  id: number;
  title: string;
  url: string;
  total: number;
  type: string;
}

interface PriceBrands {
  id: number;
  categoryKey: string;
  title: string;
  parentId: number;
  parentTitle: string;
}

// رنگ اصلی
const PRIMARY_COLOR = "#ce1a2a";
const PRIMARY_LIGHT = "#fdf2f2";

function PriceMotor({
  brands,
  price,
  title,
  summary,
  body,
  brandIdSearchParams,
}: {
  brands: PriceBrands[];
  price: Prices[];
  title: string;
  summary: string;
  body: string;
  brandIdSearchParams: number;
}) {
  // دسته‌بندی‌های اصلی
  const mainCategories: Category[] = [
    // {
    //   id: 0,
    //   title: "همه دسته‌بندی‌ها",
    //   url: "/motorcycle-prices.html?type=all",
    //   total: price.length,
    //   type: "all",
    // },
  ];

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(
    brandIdSearchParams || null,
  );
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<Prices[]>(price);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const router = useRouter();

  // تشخیص دستگاه موبایل
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // فیلتر کردن برندها بر اساس دسته‌بندی انتخاب شده
  const filteredBrands = selectedCategory
    ? brands.filter((brand) => brand.parentId === selectedCategory)
    : brands;

  // اعمال فیلترها
  useEffect(() => {
    let filtered = price;

    // فیلتر بر اساس برند انتخاب شده
    if (selectedBrand) {
      filtered = filtered.filter((item) => item.brandId === selectedBrand);
    }

    // فیلتر بر اساس جستجو
    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.brandTitle.includes(searchText) ||
          item.title.includes(searchText),
      );
    }

    setFilteredData(filtered);
  }, [selectedBrand, searchText, price]);

  // تنظیم دسته‌بندی بر اساس URL
  useEffect(() => {
    if (type === "all") {
      setSelectedCategory(0);
    } else {
      setSelectedCategory(null);
    }
  }, [type]);

  const handleResetFilters = () => {
    setSelectedBrand(null);
    setSearchText("");
  };

  // کامپوننت MobilePriceCard با آیکون
  const MobilePriceCard = ({ item }: { item: Prices }) => {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-2 mb-4! shadow-sm hover:shadow-md transition-all">
        {/* هدر با نام برند و مدل */}
        <div className="flex items-center gap-3 mb-2! pb-1 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-[#fdf2f2] flex items-center justify-center">
            <FaCar className="text-[#ce1a2a] text-xl" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
            <p className="text-gray-600 text-xs mt-1">{item.brandTitle}</p>
          </div>
        </div>

        {/* اطلاعات قیمت */}
        <div className="space-y-3">
          {/* قیمت بازار */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaDollarSign className="text-gray-700 text-sm" />
              <span className="text-gray-700 text-sm">قیمت بازار</span>
            </div>
            <span className="font-bold text-gray-700">
              {item.price1 ? item.price1.toLocaleString("fa-IR") : "---"}
            </span>
          </div>

          {/* قیمت نمایندگی */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaStore className="text-gray-700 text-sm" />
              <span className="text-gray-700 text-sm">قیمت نمایندگی</span>
            </div>
            <span className="font-bold text-gray-700">
              {item.price2 ? item.price2.toLocaleString("fa-IR") : "---"}
            </span>
          </div>

          {/* تغییر قیمت */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MdPriceChange className="text-gray-700 text-sm" />
              <span className="text-gray-700 text-sm">تغییر قیمت</span>
            </div>
            <div
              className={`font-bold flex items-center ${
                item.change > 0
                  ? "text-green-600"
                  : item.change < 0
                    ? "text-red-600"
                    : "text-gray-400"
              }`}
            >
              {item.change > 0 ? (
                <>
                  <FaCaretUp className="ml-1" />
                  {item.change.toLocaleString("fa-IR")}
                </>
              ) : item.change < 0 ? (
                <>
                  <FaCaretDown className="ml-1" />
                  {Math.abs(item.change).toLocaleString("fa-IR")}
                </>
              ) : (
                "---"
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6!">
          <h1
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-2!"
            style={{ color: PRIMARY_COLOR }}
          >
            {title ? title : "قیمت موتورسیکلت"}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            {summary || ""}
          </p>
          <p className="max-w-[800px] mx-auto text-xs text-gray-500! mt-2">
            {htmlToPlainText(body || "")}
          </p>
        </div>

        {/* Results - موبایل: کارت‌ها، دسکتاپ: جدول */}
        <Card
          className="shadow-md border-0 rounded-xl overflow-hidden"
          style={{ borderColor: PRIMARY_LIGHT }}
        >
          <div
            className={` flex-col sm:flex-row gap-3 items-center w-full mb-4! ${
              isMobile ? "flex" : "hidden"
            }`}
          >
            <div className="flex-1 w-full">
              <Input
                placeholder="جستجو در برند و مدل موتور..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="rounded-lg hover:border-[#ce1a2a] focus:border-[#ce1a2a] focus:shadow-sm"
                size="large"
                style={{ borderColor: "#e5e7eb" }}
              />
            </div>
          </div>
          <div
            className={`flex justify-between items-center mb-4! ${
              isMobile ? "flex-wrap" : "flex-nowrap"
            }`}
          >
            <h3 className="text-lg font-bold text-gray-800 whitespace-nowrap">
              لیست قیمت موتورها ({filteredData.length} مورد)
            </h3>

            {/* Search and Filters for Desktop */}
            <div
              className={` flex-col sm:flex-row gap-3 items-center w-full px-5 ${
                isMobile ? "hidden" : "flex"
              }`}
            >
              <div className="flex-1 w-full">
                <Input
                  placeholder="جستجو در برند و مدل موتور..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  prefix={<SearchOutlined className="text-gray-400" />}
                  className="rounded-lg hover:border-[#ce1a2a] focus:border-[#ce1a2a] focus:shadow-sm"
                  size="large"
                  style={{ borderColor: "#e5e7eb" }}
                />
              </div>
            </div>
            {selectedBrand && (
              <span
                onClick={() => {
                  setSelectedBrand(null);
                  if (brandIdSearchParams) {
                    const baseUrl = window.location.pathname;
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("brandId");
                    router.push(`${baseUrl}?${params.toString()}`);
                  }
                }}
                className="text-sm text-white! px-3 py-1 rounded cursor-pointer whitespace-nowrap ml-3"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                حذف فیلترها
              </span>
            )}
            {!brandIdSearchParams && (
              <span
                onClick={() => {
                  setShowFilter(true);
                }}
                className="text-sm text-white! px-3 py-1 rounded cursor-pointer whitespace-nowrap"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                نمایش فیلترها
              </span>
            )}
          </div>
          <div
            className={`fixed bottom-0 left-0 right-0 duration-300 bg-white z-50 overflow-hidden ${
              showFilter ? "max-h-96" : "max-h-0"
            }`}
          >
            {/* برای دسکتاپ: سوایپر دسته‌بندی */}
            {/* <div className="">
              <Card
                className="mb-6! shadow-md border-0 rounded-xl"
                style={{ borderColor: PRIMARY_LIGHT }}
              >
                <h2 className="text-lg font-bold text-gray-800 mb-4! text-center">
                  دسته‌بندی‌های قیمت موتور
                </h2>

                <Swiper
                  modules={[Navigation, Mousewheel]}
                  spaceBetween={12}
                  slidesPerView={"auto"}
                  centeredSlides={false}
                  mousewheel={{ forceToAxis: true }}
                  navigation={false}
                  className="category-swiper"
                  dir="rtl"
                >
                  {mainCategories.map((category) => (
                    <SwiperSlide
                      key={category.id}
                      className="w-auto! max-w-none!"
                    >
                      <div
                        onClick={() => {
                          router.push(category.url);
                          setSelectedBrand(null);
                        }}
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer transition-all duration-300 ${
                          selectedCategory === category.id
                            ? "bg-slate-700 text-white!"
                            : "bg-slate-200 hover:bg-slate-300 hover:text-[#ce1a2a]!"
                        }`}
                      >
                        <span
                          className={`font-medium text-sm whitespace-nowrap ${
                            selectedCategory === category.id
                              ? "text-white!"
                              : "text-gray-700"
                          }`}
                        >
                          {category.title}
                        </span>
                        {searchParams.get("type") === category.type && (
                          <span
                            className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor:
                                selectedCategory === category.id
                                  ? PRIMARY_COLOR
                                  : "#e5e7eb",
                              color:
                                selectedCategory === category.id
                                  ? "white"
                                  : "#6b7280",
                            }}
                          >
                            {category.total}
                          </span>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Card>
            </div> */}

            {/* برای موبایل: بخش فیلتر */}
            <>
              {
                //   (selectedCategory || selectedCategory === 0) &&
                <Card
                  className="mb-6! shadow-md border-0 rounded-xl"
                  style={{ borderColor: PRIMARY_LIGHT }}
                >
                  <div className="flex items-center justify-between mb-4!">
                    <h2 className="text-lg font-bold text-gray-800 mb-4! text-center">
                      برندهای موتور سیکلت
                    </h2>
                    <span
                      className="text-xs text-white! px-2 py-1 rounded"
                      style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                      {filteredBrands.length} برند
                    </span>
                  </div>

                  <Swiper
                    modules={[Mousewheel]}
                    spaceBetween={8}
                    slidesPerView={"auto"}
                    centeredSlides={false}
                    mousewheel={{ forceToAxis: true }}
                    navigation={false}
                    dir="rtl"
                  >
                    {filteredBrands.map((brand) => (
                      <SwiperSlide
                        key={brand.id}
                        className="w-auto! max-w-none!"
                      >
                        <div
                          onClick={() => {
                            setSelectedBrand(
                              selectedBrand === brand.id ? null : brand.id,
                            );
                            setShowFilter(false);
                          }}
                          className={`inline-flex items-center rounded-lg px-3 py-2 cursor-pointer transition-all duration-300 min-w-[100px] justify-center ${
                            selectedBrand === brand.id
                              ? "text-white! shadow-sm"
                              : "bg-slate-200! hover:bg-slate-300!  text-gray-700 hover:text-[#ce1a2a]!"
                          }`}
                          style={{
                            backgroundColor:
                              selectedBrand === brand.id
                                ? PRIMARY_COLOR
                                : "white",
                            borderColor:
                              selectedBrand === brand.id
                                ? PRIMARY_COLOR
                                : "#d1d5db",
                          }}
                        >
                          <span className="font-medium text-sm whitespace-nowrap">
                            {brand.title}
                          </span>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Card>
              }
            </>
          </div>
          {showFilter && (
            <div
              onClick={() => {
                setShowFilter(false);
              }}
              className="fixed inset-0 bg-[#0008] z-40"
            />
          )}

          {isMobile ? (
            // نمایش کارتی برای موبایل
            <div className="space-y-4">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <MobilePriceCard key={item.id} item={item} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-4xl mb-4!">🚗</div>
                  <p className="text-gray-500">موتوریی یافت نشد</p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-4 text-[#ce1a2a] hover:underline"
                  >
                    پاک کردن فیلترها
                  </button>
                </div>
              )}
            </div>
          ) : (
            // نمایش جدول برای دسکتاپ
            <Table
              columns={[
                {
                  title: "برند",
                  dataIndex: "brandTitle",
                  align: "center",
                  key: "brandTitle",
                  sorter: (a, b) => a.brandTitle.localeCompare(b.brandTitle),
                  width: 120,
                  defaultSortOrder: "ascend",
                },
                {
                  title: "مدل موتور",
                  dataIndex: "title",
                  align: "center",
                  key: "title",
                  sorter: (a, b) => a.title.localeCompare(b.title),
                  width: 150,
                },

                {
                  title: "قیمت نمایندگی (تومان)",
                  dataIndex: "price2",
                  align: "center",
                  key: "price2",
                  sorter: (a, b) => (a.price2 || 0) - (b.price2 || 0),
                  render: (price: number) => (
                    <span className="font-bold">
                      {price ? price.toLocaleString("fa-IR") : "---"}
                    </span>
                  ),
                  width: 160,
                },
                {
                  title: "تغییر قیمت",
                  key: "priceChange",
                  align: "center",
                  sorter: (a, b) => (a.change || 0) - (b.change || 0),
                  render: (_, record) => {
                    const change = record.change;
                    return (
                      <span
                        className={`font-bold min-w-20 text-center border-0 flex items-center justify-center ${
                          change > 0
                            ? "text-green-600"
                            : change < 0
                              ? "text-red-600"
                              : ""
                        }`}
                      >
                        {change}
                        {change > 0 ? (
                          <FaCaretUp className="text-xl" />
                        ) : change < 0 ? (
                          <FaCaretDown className="text-xl" />
                        ) : (
                          ""
                        )}
                      </span>
                    );
                  },
                  width: 120,
                },
              ]}
              dataSource={filteredData}
              rowKey="id"
              pagination={false}
              scroll={{ x: 800 }}
              size="middle"
              className="compact-table"
            />
          )}
        </Card>
      </div>

      {/* استایل‌های سفارشی */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .ant-card-body {
            padding: 16px !important;
          }
        }

        /* انیمیشن برای کارت‌های موبایل */
        .mobile-card-enter {
          opacity: 0;
          transform: translateY(10px);
        }

        .mobile-card-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition:
            opacity 300ms,
            transform 300ms;
        }
      `}</style>
    </div>
  );
}

export default PriceMotor;
