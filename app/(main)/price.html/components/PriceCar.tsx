"use client";

import { SearchOutlined } from "@ant-design/icons";
import { Card, Input, Table, Tabs } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import { htmlToPlainText } from "@/utils/func";
import {
  FaCar,
  FaCaretDown,
  FaCaretUp,
  FaDollarSign,
  FaStore,
} from "react-icons/fa";
import { MdPriceChange } from "react-icons/md";

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

function PriceCar({
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
    {
      id: 8955,
      title: "قیمت خودرو داخلی",
      url: "/price.html?type=internal",
      total: price.length,
      type: "internal",
    },
    {
      id: 8954,
      title: " قیمت خودرو وارداتی",
      url: "/price.html?type=import",
      total: price.length,
      type: "import",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(
    brandIdSearchParams || null,
  );
  const [searchText, setSearchText] = useState("");
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();
  const swiperRef = useRef<any>(null);

  // تنظیم دسته‌بندی بر اساس URL
  useEffect(() => {
    if (type === "internal") {
      setSelectedCategory(8955);
    } else if (type === "import") {
      setSelectedCategory(8954);
    } else {
      setSelectedCategory(8955);
    }
  }, [type]);

  // سورت برندها بر اساس حروف الفبا با useMemo
  const sortedBrands = useMemo(() => {
    return [...brands].sort((a, b) => a.title.localeCompare(b.title, "fa"));
  }, [brands]);

  // فیلتر کردن برندها بر اساس دسته‌بندی انتخاب شده
  const filteredBrands = useMemo(() => {
    if (!selectedCategory) return sortedBrands;
    return sortedBrands.filter((brand) => brand.parentId === selectedCategory);
  }, [sortedBrands, selectedCategory]);

  // اعمال فیلترها با useMemo
  const filteredData = useMemo(() => {
    let filtered = price;

    // فیلتر بر اساس برند انتخاب شده
    if (selectedBrand) {
      filtered = filtered.filter((item) => item.brandId === selectedBrand);
    }

    // فیلتر بر اساس جستجو
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.brandTitle?.toLowerCase().includes(searchLower) ||
          item.title?.toLowerCase().includes(searchLower),
      );
    }

    return filtered;
  }, [price, selectedBrand, searchText]);

  // گروه‌بندی داده‌ها بر اساس برند
  const groupedData = useMemo(() => {
    const grouped: Record<number, Prices[]> = {};

    filteredData.forEach((item) => {
      if (!grouped[item.brandId]) {
        grouped[item.brandId] = [];
      }
      grouped[item.brandId].push(item);
    });

    return grouped;
  }, [filteredData]);

  // پیدا کردن نام برند بر اساس ID - با حافظه‌سازی
  const getBrandNameById = useMemo(() => {
    const brandMap = new Map<number, string>();
    brands.forEach((brand) => {
      brandMap.set(brand.id, brand.title);
    });

    return (brandId: number): string => {
      return brandMap.get(brandId) || `برند ${brandId}`;
    };
  }, [brands]);

  const handleResetFilters = () => {
    setSelectedBrand(null);
    setSearchText("");
    if (brandIdSearchParams) {
      const baseUrl = window.location.pathname;
      const params = new URLSearchParams(searchParams.toString());
      params.delete("brandId");
      router.push(`${baseUrl}?${params.toString()}`);
    }
  };

  const handleBrandSelect = (brandId: number) => {
    setSelectedBrand(selectedBrand === brandId ? null : brandId);
  };

  const handleTabChange = (activeKey: string) => {
    const category = mainCategories.find((cat) => cat.type === activeKey);
    if (category) {
      setSelectedBrand(null);
      router.push(category.url);
    }
  };

  // ساخت آیتم‌های تب‌ها
  const tabItems = mainCategories.map((category) => ({
    key: category.type,
    label: (
      <div className="px-2 py-1">
        <span className="font-medium text-sm">{category.title}</span>
      </div>
    ),
  }));

  // کامپوننت MobilePriceCard با آیکون
  const MobilePriceCard = ({ item }: { item: Prices }) => {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-2 mb-4 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center gap-3 mb-2 pb-1 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-[#fdf2f2] flex items-center justify-center">
            <FaCar className="text-[#ce1a2a] text-xl" />
          </div>
          <div className="flex-1">
            <span className="font-bold text-gray-900 text-sm">
              {item.title}
            </span>
            <p className="text-gray-600 text-xs mt-1">{item.brandTitle}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaDollarSign className="text-gray-700 text-sm" />
              <span className="text-gray-700 text-sm">قیمت بازار</span>
            </div>
            <span className="font-bold text-gray-700">
              {item.price1 ? item.price1.toLocaleString("fa-IR") : "---"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaStore className="text-gray-700 text-sm" />
              <span className="text-gray-700 text-sm">قیمت نمایندگی</span>
            </div>
            <span className="font-bold text-gray-700">
              {item.price2 ? item.price2.toLocaleString("fa-IR") : "---"}
            </span>
          </div>

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

  // ستون‌های جدول برای دسکتاپ
  const tableColumns = [
    {
      title: "مدل خودرو",
      dataIndex: "title",
      align: "center" as const,
      key: "title",
      sorter: (a: Prices, b: Prices) => a.title.localeCompare(b.title, "fa"),
      width: 200,
      defaultSortOrder: "ascend" as const,
    },
    {
      title: "قیمت بازار (تومان)",
      dataIndex: "price1",
      align: "center" as const,
      key: "price1",
      sorter: (a: Prices, b: Prices) => (a.price1 || 0) - (b.price1 || 0),
      render: (price: number) => (
        <span className="font-bold">
          {price ? price.toLocaleString("fa-IR") : "---"}
        </span>
      ),
      width: 180,
    },
    {
      title: "قیمت نمایندگی (تومان)",
      dataIndex: "price2",
      align: "center" as const,
      key: "price2",
      sorter: (a: Prices, b: Prices) => (a.price2 || 0) - (b.price2 || 0),
      render: (price: number) => (
        <span className="font-bold ">
          {price ? price.toLocaleString("fa-IR") : "---"}
        </span>
      ),
      width: 180,
    },
    {
      title: "تغییر قیمت",
      key: "priceChange",
      align: "center" as const,
      sorter: (a: Prices, b: Prices) => (a.change || 0) - (b.change || 0),
      render: (_: any, record: Prices) => {
        const change = record.change;
        return (
          <span
            className={`font-bold min-w-20 text-center border-0 flex items-center justify-center ${
              change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : ""
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
  ];

  return (
    <div
      className="min-h-screen bg-gray-50 py-3 px-3 sm:px-4 lg:px-6 relative"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-5">
          <span
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5!"
            style={{ color: PRIMARY_COLOR }}
          >
            {title ? title : "قیمت خودرو"}
          </span>
          <p className="text-gray-600 text-xs max-w-2xl mx-auto">
            {summary || ""}
          </p>
          <p className="max-w-[800px] mx-auto text-xs text-gray-500 mt-1.5">
            {htmlToPlainText(body || "")}
          </p>
        </div>

        {/* Tab برای دسته‌بندی‌ها */}
        <div className="mb-4">
          <Tabs
            activeKey={selectedCategory === 8955 ? "internal" : "import"}
            onChange={handleTabChange}
            centered
            className="custom-tabs"
            tabBarStyle={{
              margin: 0,
              padding: 0,
              border: "none",
              borderBottom: "none",
            }}
            size="small"
            items={tabItems}
          />
        </div>

        {/* جستجو */}
        <div className="mb-4 max-w-2xl mx-auto">
          <Input
            placeholder="جستجو در برند و مدل خودرو..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<SearchOutlined className="text-gray-400" />}
            className="rounded-lg hover:border-[#ce1a2a] focus:border-[#ce1a2a] focus:shadow-sm transition-all duration-300 shadow-sm"
            size="large"
            style={{
              borderColor: "#e5e7eb",
              backgroundColor: "white",
            }}
            allowClear
          />
        </div>

        {/* Swiper برای برندها */}
        {selectedCategory && filteredBrands.length > 0 && (
          <div className="mb-5 px-1">
            <Swiper
              spaceBetween={6}
              slidesPerView={3.5}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              dir="rtl"
              loop={false}
              className="carType_slider"
              breakpoints={{
                320: {
                  slidesPerView: 3.5,
                  spaceBetween: 6,
                },
                480: {
                  slidesPerView: 6.5,
                  spaceBetween: 6,
                },
                640: {
                  slidesPerView: 8.5,
                  spaceBetween: 8,
                },
                768: {
                  slidesPerView: 12.5,
                  spaceBetween: 8,
                },
                1024: {
                  slidesPerView: 14.5,
                  spaceBetween: 10,
                },
              }}
            >
              {filteredBrands.map((brand) => (
                <SwiperSlide key={brand.id}>
                  <button
                    aria-label={brand.title}
                    onClick={() => handleBrandSelect(brand.id)}
                    className={`flex flex-col items-center justify-center rounded-lg p-1.5 cursor-pointer transition-all duration-200 min-w-[70px] ${
                      selectedBrand === brand.id
                        ? "text-white shadow scale-105"
                        : "bg-white hover:bg-gray-50 text-gray-700 hover:text-[#ce1a2a] border border-gray-200 hover:border-[#ce1a2a] hover:shadow-sm"
                    }`}
                    style={{
                      backgroundColor:
                        selectedBrand === brand.id ? PRIMARY_COLOR : undefined,
                      borderColor:
                        selectedBrand === brand.id ? PRIMARY_COLOR : undefined,
                    }}
                  >
                    <span className="font-medium text-xs text-center line-clamp-1">
                      {brand.title}
                    </span>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* نمایش نتایج */}
        <div className="space-y-6">
          {Object.keys(groupedData).length > 0 ? (
            Object.entries(groupedData)
              .sort(([brandIdA], [brandIdB]) => {
                const brandNameA = getBrandNameById(parseInt(brandIdA));
                const brandNameB = getBrandNameById(parseInt(brandIdB));
                return brandNameA.localeCompare(brandNameB, "fa");
              })
              .map(([brandId, items]) => {
                const brandName = getBrandNameById(parseInt(brandId));
                return (
                  <Card
                    key={brandId}
                    className="shadow-sm border-0 rounded-lg overflow-hidden animate-fadeInUp"
                    style={{ borderColor: PRIMARY_LIGHT }}
                  >
                    {/* سرتیتر برند */}
                    <div
                      className="p-2.5 mb-3 rounded-lg"
                      style={{
                        backgroundColor: PRIMARY_LIGHT,
                        borderBottom: `2px solid ${PRIMARY_COLOR}`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <FaCar className="text-[#ce1a2a] text-base" />
                          </div>
                          <div>
                            <span className="text-base font-bold text-gray-900">
                              قیمت خودرو {brandName}
                            </span>
                          </div>
                        </div>
                        <div
                          className="px-2 py-0.5 rounded-full text-white text-xs font-medium"
                          style={{ backgroundColor: PRIMARY_COLOR }}
                        >
                          {items.length.toLocaleString("fa-IR")} مدل
                        </div>
                      </div>
                    </div>

                    {/* جدول برند */}
                    <Table
                      columns={tableColumns}
                      dataSource={items}
                      rowKey="id"
                      pagination={false}
                      scroll={{ x: 800 }}
                      size="small"
                      className="compact-table"
                      locale={{
                        emptyText: "مدلی برای این برند یافت نشد",
                      }}
                    />
                  </Card>
                );
              })
          ) : (
            <Card
              className="text-center py-8 animate-fadeIn border-0 shadow-sm"
              bodyStyle={{ padding: "32px 12px" }}
            >
              <div className="text-gray-400 text-3xl mb-3">🚗</div>
              <p className="text-gray-500 mb-1.5">خودرویی یافت نشد</p>
              {(selectedBrand || searchText) && (
                <button
                  aria-label="پاک کردن فیلترها"
                  onClick={handleResetFilters}
                  className="text-[#ce1a2a] hover:underline transition-colors text-xs"
                >
                  پاک کردن فیلترها
                </button>
              )}
            </Card>
          )}
        </div>
      </div>

      {/* استایل‌های سفارشی */}
      <style jsx global>{`
        /* استایل برای Tab */
        .custom-tabs .ant-tabs-nav-wrap {
          border: none !important;
          border-bottom: none !important;
        }
        .custom-tabs .ant-tabs-nav,
        .custom-tabs .ant-tabs-nav-wrap,
        .custom-tabs .ant-tabs-nav-list,
        .custom-tabs .ant-tabs-ink-bar {
          border: none !important;
        }

        .custom-tabs .ant-tabs-nav::before {
          border-bottom: none !important;
        }
        .custom-tabs .ant-tabs-nav {
          border: none !important;
          border-bottom: none !important;
        }
        .custom-tabs .ant-tabs-nav-list {
          border: none !important;
          border-bottom: none !important;
        }

        .custom-tabs .ant-tabs-tab {
          margin: 0 4px !important;
          padding: 0 !important;
          border-radius: 6px !important;
          transition: all 0.3s ease !important;
          background-color: #e5e7eb !important;
        }

        .custom-tabs .ant-tabs-tab:hover {
          background-color: #e5e7eb !important;
        }

        .custom-tabs .ant-tabs-tab.ant-tabs-tab-active {
          background-color: ${PRIMARY_COLOR} !important;
        }

        .custom-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: white !important;
        }

        .custom-tabs .ant-tabs-tab.ant-tabs-tab-active .bg-gray-100 {
          background-color: rgba(255, 255, 255, 0.3) !important;
          color: white !important;
        }

        .custom-tabs .ant-tabs-ink-bar {
          height: 0px !important;
        }

        /* استایل برای Swiper */

        /* انیمیشن‌ها */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.2s ease-out;
        }

        /* استایل برای جدول‌ها */
        .compact-table .ant-table-thead > tr > th {
          background-color: #f8fafc !important;
          font-weight: 600 !important;
          color: #374151 !important;
          font-size: 12px !important;
          padding: 10px 6px !important;
        }

        .compact-table .ant-table-tbody > tr > td {
          padding: 10px 6px !important;
          font-size: 12px !important;
        }

        .compact-table .ant-table-tbody > tr:hover > td {
          background-color: #fdf2f2 !important;
        }

        /* خط‌بندی متن */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* کاهش padding‌ها */
        .ant-card-body {
          padding: 12px !important;
        }

        /* بهبود نمایش در حالت موبایل */
        @media (max-width: 640px) {
          h1 {
            font-size: 18px !important;
          }

          .custom-tabs .ant-tabs-nav {
            width: 100% !important;
          }

          .custom-tabs .ant-tabs-tab {
            margin: 0 2px !important;
          }

          .compact-table .ant-table-thead > tr > th,
          .compact-table .ant-table-tbody > tr > td {
            padding: 8px 4px !important;
            font-size: 11px !important;
          }

          /* Tab کوچک‌تر در موبایل */
          .ant-tabs-tab {
            font-size: 13px !important;
          }

          .ant-tabs-tab .bg-gray-100 {
            font-size: 10px !important;
            padding: 1px 3px !important;
          }
        }

        /* کاهش فاصله‌ها در تبلت */
        @media (max-width: 768px) {
          .py-3 {
            padding-top: 12px !important;
            padding-bottom: 12px !important;
          }

          .px-3 {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }

          .mb-5 {
            margin-bottom: 20px !important;
          }

          .mb-4 {
            margin-bottom: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default PriceCar;
