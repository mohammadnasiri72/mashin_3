"use client";

import { SearchOutlined, FilterOutlined, CloseOutlined } from "@ant-design/icons";
import { Card, Input, Table, Drawer, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import { htmlToPlainText } from "@/utils/func";
import {
  FaCar,
  FaCaretDown,
  FaCaretUp,
  FaDollarSign,
  FaStore,
  FaSortAlphaDown,
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
      title: "خودرو داخلی",
      url: "/price.html?type=internal",
      total: price.length,
      type: "internal",
    },
    {
      id: 8954,
      title: "خودرو وارداتی",
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
  const [isMobile, setIsMobile] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
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
    return [...brands].sort((a, b) => a.title.localeCompare(b.title, 'fa'));
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
    brands.forEach(brand => {
      brandMap.set(brand.id, brand.title);
    });
    
    return (brandId: number): string => {
      return brandMap.get(brandId) || `برند ${brandId}`;
    };
  }, [brands]);

  const handleResetFilters = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedBrand(null);
      setSearchText("");
      if (brandIdSearchParams) {
        const baseUrl = window.location.pathname;
        const params = new URLSearchParams(searchParams.toString());
        params.delete("brandId");
        router.push(`${baseUrl}?${params.toString()}`);
      }
      setLoading(false);
    }, 100);
  };

  const handleBrandSelect = (brandId: number) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedBrand(selectedBrand === brandId ? null : brandId);
      setShowFilterDrawer(false);
      setLoading(false);
    }, 100);
  };

  const handleCategorySelect = (categoryId: number, categoryUrl: string) => {
    setLoading(true);
    setTimeout(() => {
      router.push(categoryUrl);
      setSelectedBrand(null);
      setShowFilterDrawer(false);
      setLoading(false);
    }, 100);
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

  // ستون‌های جدول برای دسکتاپ
  const tableColumns = [
    {
      title: "مدل خودرو",
      dataIndex: "title",
      align: "center" as const,
      key: "title",
      sorter: (a: Prices, b: Prices) => a.title.localeCompare(b.title, 'fa'),
      width: 200,
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
  ];

  // دراور فیلترها
  const FilterDrawer = () => (
    <Drawer
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FilterOutlined />
            <span className="font-bold">فیلترها</span>
          </div>
          <button
            onClick={() => setShowFilterDrawer(false)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseOutlined />
          </button>
        </div>
      }
      placement="right"
      closable={false}
      onClose={() => setShowFilterDrawer(false)}
      open={showFilterDrawer}
      width={isMobile ? "100%" : 400}
      className="filter-drawer"
      styles={{
        // body: { padding: "16px" },
        // header: { padding: "16px", borderBottom: "1px solid #e5e7eb" },
      }}
      maskClosable={true}
        // این پراپرتی‌ها رو اضافه کنید
        getContainer={false}
        rootStyle={{ position: 'fixed' }}
        drawerStyle={{ direction: 'rtl' }}
    >
      <div className="">
        {/* دسته‌بندی‌های اصلی */}
        <Card
          className="shadow-sm border-0 rounded-xl"
          style={{ borderColor: PRIMARY_LIGHT }}
        >
          <div className="flex items-center justify-between mb-3!">
            <h3 className="text-base font-bold text-gray-800">دسته‌بندی‌ها</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {mainCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id, category.url)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "text-white! shadow-sm"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-[#ce1a2a]!"
                }`}
                style={{
                  backgroundColor: selectedCategory === category.id ? PRIMARY_COLOR : undefined,
                }}
              >
                <span className="font-medium text-sm whitespace-nowrap">
                  {category.title}
                </span>
                <span className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-white/20">
                  {category.total.toLocaleString("fa-IR")}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* برندها */}
        {selectedCategory && (
          <Card
            className="shadow-sm border-0 rounded-xl"
            style={{ borderColor: PRIMARY_LIGHT }}
          >
            <div className="flex items-center justify-between mb-4!">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-800">
                  برندهای{" "}
                  {mainCategories.find((cat) => cat.id === selectedCategory)?.title}
                </h3>
                
              </div>
              <span
                className="text-xs text-white! px-2 py-1 rounded"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                {filteredBrands.length.toLocaleString("fa-IR")} برند
              </span>
            </div>

            <div className=" pr-2 custom-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filteredBrands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandSelect(brand.id)}
                    className={`flex flex-col items-center justify-center rounded-lg p-3 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                      selectedBrand === brand.id
                        ? "text-white! shadow-lg"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-[#ce1a2a]! border border-gray-200"
                    }`}
                    style={{
                      backgroundColor: selectedBrand === brand.id ? PRIMARY_COLOR : undefined,
                    }}
                  >
                    <span className="font-medium text-sm text-center line-clamp-2">
                      {brand.title}
                    </span>
                    {selectedBrand === brand.id && (
                      <div className="mt-1 w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}

       
      </div>
    </Drawer>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:px-4 lg:px-8 relative">
      {loading && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
          <Spin size="large" />
        </div>
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6!">
          <h1
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-2!"
            style={{ color: PRIMARY_COLOR }}
          >
            {title ? title : "قیمت خودرو"}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            {summary || ""}
          </p>
          <p className="max-w-[800px] mx-auto text-xs text-gray-500! mt-2">
            {htmlToPlainText(body || "")}
          </p>
        </div>

        {/* Search and Filters Bar */}
        <Card
          className="shadow-md border-0 rounded-xl mb-6!"
          style={{ borderColor: PRIMARY_LIGHT }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* جستجو */}
            <div className="w-full md:flex-1">
              <Input
                placeholder="جستجو در برند و مدل خودرو..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="rounded-lg hover:border-[#ce1a2a] focus:border-[#ce1a2a] focus:shadow-sm transition-all duration-300"
                size="large"
                style={{ borderColor: "#e5e7eb" }}
                allowClear
              />
            </div>

            {/* دکمه‌های فیلتر */}
            <div className="flex gap-2 w-full md:w-auto">
              {(selectedBrand || searchText) && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-2 text-sm text-white! px-4 py-2.5 rounded-lg cursor-pointer whitespace-nowrap transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                >
                  <CloseOutlined />
                  حذف فیلترها
                </button>
              )}
              <button
                onClick={() => setShowFilterDrawer(true)}
                className="flex items-center gap-2 text-sm text-white! px-4 py-2.5 rounded-lg cursor-pointer whitespace-nowrap transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                <FilterOutlined />
                فیلترها
                {selectedBrand && (
                  <span className="bg-white/30 px-2 py-0.5 rounded-full text-xs">
                    فعال
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* نمایش وضعیت فیلترها */}
          <div className="mt-4 flex flex-wrap gap-2 items-center justify-center">
            <span className="text-gray-700">
              تعداد کل خودروها:{" "}
              <strong className="text-[#ce1a2a]">
                {filteredData.length.toLocaleString("fa-IR")}
              </strong>
            </span>
            {selectedBrand && (
              <div className="flex items-center gap-2 bg-[#fdf2f2] px-3 py-1 rounded-full">
                <span className="text-gray-700">
                  برند انتخاب شده:{" "}
                  <strong className="text-[#ce1a2a]">
                    {getBrandNameById(selectedBrand)}
                  </strong>
                </span>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <CloseOutlined className="text-xs" />
                </button>
              </div>
            )}
          </div>
        </Card>

        {/* نمایش نتایج */}
        {isMobile ? (
          // نمایش کارتی برای موبایل
          <div className="space-y-4">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <MobilePriceCard key={item.id} item={item} />
              ))
            ) : (
              <Card className="text-center py-12 animate-fadeIn">
                <div className="text-gray-400 text-4xl mb-4!">🚗</div>
                <p className="text-gray-500">خودرویی یافت نشد</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-[#ce1a2a] hover:underline transition-colors"
                >
                  پاک کردن فیلترها
                </button>
              </Card>
            )}
          </div>
        ) : (
          // نمایش جداول گروه‌بندی شده برای دسکتاپ
          <div className="space-y-8">
            {Object.keys(groupedData).length > 0 ? (
              Object.entries(groupedData).map(([brandId, items]) => {
                const brandName = getBrandNameById(parseInt(brandId));
                return (
                  <Card
                    key={brandId}
                    className="shadow-md border-0 rounded-xl overflow-hidden animate-fadeInUp"
                    style={{ borderColor: PRIMARY_LIGHT }}
                  >
                    {/* سرتیتر برند */}
                    <div
                      className="p-4 mb-4 rounded-t-xl"
                      style={{
                        backgroundColor: PRIMARY_LIGHT,
                        borderBottom: `3px solid ${PRIMARY_COLOR}`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm animate-bounce-slow">
                            <FaCar className="text-[#ce1a2a] text-xl" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">
                              {brandName}
                            </h2>
                            <p className="text-gray-600 text-sm mt-1">
                              تعداد مدل‌ها: {items.length.toLocaleString("fa-IR")}
                            </p>
                          </div>
                        </div>
                        <div
                          className="px-3 py-1 rounded-full text-white text-sm font-medium animate-pulse-slow"
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
                      size="middle"
                      className="compact-table"
                      locale={{
                        emptyText: "مدلی برای این برند یافت نشد",
                      }}
                    />
                  </Card>
                );
              })
            ) : (
              <Card className="text-center py-12 animate-fadeIn">
                <div className="text-gray-400 text-4xl mb-4!">🚗</div>
                <p className="text-gray-500">خودرویی یافت نشد</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-[#ce1a2a] hover:underline transition-colors"
                >
                  پاک کردن فیلترها
                </button>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Drawer فیلترها */}
      <FilterDrawer />

      {/* استایل‌های سفارشی */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .ant-card-body {
            padding: 16px !important;
          }
          
          .ant-drawer-content-wrapper {
            width: 100% !important;
          }
        }

        /* انیمیشن‌ها */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        /* استایل برای دراور */
        .filter-drawer .ant-drawer-content {
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1) !important;
        }

        /* استایل برای اسکرول بار */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ce1a2a;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a81421;
        }

        /* استایل برای جدول‌ها */
        .compact-table .ant-table-thead > tr > th {
          background-color: #f8fafc !important;
          font-weight: bold !important;
          color: #374151 !important;
          transition: all 0.3s ease;
        }

        .compact-table .ant-table-tbody > tr:hover > td {
          background-color: #fdf2f2 !important;
          transition: all 0.3s ease;
        }

        /* استایل برای دکمه‌ها */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default PriceCar;