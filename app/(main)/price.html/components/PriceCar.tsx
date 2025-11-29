"use client";

import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Types
interface Category {
  id: number;
  title: string;
  url: string;
  total: number;
}

interface PriceBrands {
  id: number;
  categoryKey: string;
  title: string;
  parentId: number;
  parentTitle: string;
}

interface Price {
  id: number;
  title: string;
  brandId: number;
  brandTitle: string;
  price1: number; // قیمت بازار
  price2: number; // قیمت نمایندگی
  modified: string;
}

// رنگ اصلی
const PRIMARY_COLOR = "#ce1a2a";
const PRIMARY_LIGHT = "#fdf2f2";

// دسته‌بندی‌های اصلی
const mainCategories: Category[] = [
  {
    id: 8955,
    title: "قیمت خودرو داخلی",
    url: "/price.html?type=internal",
    total: 50,
  },
  {
    id: 8954,
    title: "قیمت خودرو وارداتی",
    url: "/price.html?type=import",
    total: 30,
  },
];

function PriceCar({
  brands,
  price,
}: {
  brands: PriceBrands[];
  price: Price[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState<Price[]>(price);

  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();

  // محاسبه تغییر قیمت
  const calculatePriceChange = (marketPrice: number, dealershipPrice: number): number => {
    if (!marketPrice || !dealershipPrice) return 0;
    return ((marketPrice - dealershipPrice) / dealershipPrice) * 100;
  };

  // Table columns
  const columns: ColumnsType<Price> = [
    {
      title: "برند",
      dataIndex: "brandTitle",
      key: "brandTitle",
      sorter: (a, b) => a.brandTitle.localeCompare(b.brandTitle),
      width: 120,
    },
    {
      title: "مدل خودرو",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      width: 150,
    },
    {
      title: "قیمت بازار (تومان)",
      dataIndex: "price1",
      key: "price1",
      sorter: (a, b) => (a.price1 || 0) - (b.price1 || 0),
      render: (price: number) => (
        <span className="font-bold text-green-600">
          {price ? price.toLocaleString("fa-IR") : "---"}
        </span>
      ),
      width: 160,
    },
    {
      title: "قیمت نمایندگی (تومان)",
      dataIndex: "price2",
      key: "price2",
      sorter: (a, b) => (a.price2 || 0) - (b.price2 || 0),
      render: (price: number) => (
        <span className="font-bold text-blue-600">
          {price ? price.toLocaleString("fa-IR") : "---"}
        </span>
      ),
      width: 160,
    },
    {
      title: "تغییر قیمت",
      key: "priceChange",
      sorter: (a, b) => 
        calculatePriceChange(a.price1, a.price2) - 
        calculatePriceChange(b.price1, b.price2),
      render: (_, record) => {
        const change = calculatePriceChange(record.price1, record.price2);
        return (
          <Tag
            color={change >= 0 ? PRIMARY_COLOR : "#1890ff"}
            className="font-bold min-w-20 text-center border-0"
          >
            {change >= 0 ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
          </Tag>
        );
      },
      width: 120,
    },
    {
      title: "آخرین بروزرسانی",
      dataIndex: "modified",
      key: "modified",
      render: (date: string) => (
        <span className="text-xs text-gray-500">
          {new Date(date).toLocaleDateString('fa-IR')}
        </span>
      ),
      width: 120,
    },
  ];

  // فیلتر کردن برندها بر اساس دسته‌بندی انتخاب شده
  const filteredBrands = selectedCategory 
    ? brands.filter(brand => brand.parentId === selectedCategory)
    : brands;

  // اعمال فیلترها
  useEffect(() => {
    let filtered = price;

    // فیلتر بر اساس برند انتخاب شده
    if (selectedBrand) {
      filtered = filtered.filter(item => item.brandTitle === selectedBrand);
    }

    // فیلتر بر اساس جستجو
    if (searchText) {
      filtered = filtered.filter(item =>
        item.brandTitle.includes(searchText) || 
        item.title.includes(searchText)
      );
    }

    setFilteredData(filtered);
  }, [selectedBrand, searchText, price]);

  // تنظیم دسته‌بندی بر اساس URL
  useEffect(() => {
    if (type === 'internal') {
      setSelectedCategory(8955);
    } else if (type === 'import') {
      setSelectedCategory(8954);
    } else {
      setSelectedCategory(null);
    }
  }, [type]);

  const handleResetFilters = () => {
    setSelectedBrand(null);
    setSearchText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold text-gray-900 mb-3"
            style={{ color: PRIMARY_COLOR }}
          >
            قیمت خودرو
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            بررسی و مقایسه قیمت خودروهای مختلف در بازار و نمایندگی‌ها
          </p>
        </div>

        {/* Main Categories Swiper */}
        <Card
          className="mb-6 shadow-md border-0 rounded-xl"
          style={{ borderColor: PRIMARY_LIGHT }}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4 text-center">
            دسته‌بندی‌های قیمت خودرو
          </h2>

          <Swiper
            modules={[Navigation, Mousewheel]}
            spaceBetween={12}
            slidesPerView={"auto"}
            centeredSlides={false}
            mousewheel={{ forceToAxis: true }}
            navigation={true}
            className="category-swiper"
            dir="rtl"
          >
            {mainCategories.map((category) => (
              <SwiperSlide key={category.id} className="w-auto! max-w-none!">
                <div
                  onClick={() => {
                    router.push(category.url);
                  }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 border-2 min-w-[140px] ${
                    selectedCategory === category.id
                      ? "border-[#ce1a2a] shadow-sm"
                      : "border-gray-200 hover:border-[#ce1a2a] hover:bg-red-50"
                  }`}
                  style={{
                    background:
                      selectedCategory === category.id
                        ? `linear-gradient(135deg, ${PRIMARY_LIGHT}, white)`
                        : "linear-gradient(135deg, #f9fafb, white)",
                  }}
                >
                  <span
                    className={`font-medium text-sm whitespace-nowrap ${
                      selectedCategory === category.id
                        ? "text-[#ce1a2a]"
                        : "text-gray-700"
                    }`}
                  >
                    {category.title}
                  </span>
                  <span
                    className="text-xs font-medium px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: selectedCategory === category.id ? PRIMARY_COLOR : '#e5e7eb',
                      color: selectedCategory === category.id ? 'white' : '#6b7280'
                    }}
                  >
                    {category.total}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Card>

        {/* Brands Swiper */}
        {selectedCategory && (
          <Card
            className="mb-6 shadow-md border-0 rounded-xl"
            style={{ borderColor: PRIMARY_LIGHT }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-800">
                برندهای{" "}
                {
                  mainCategories.find((cat) => cat.id === selectedCategory)
                    ?.title
                }
              </h3>
              <span
                className="text-xs text-white px-2 py-1 rounded"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                {filteredBrands.length} برند
              </span>
            </div>

            <Swiper
              modules={[Navigation, Mousewheel]}
              spaceBetween={8}
              slidesPerView={"auto"}
              centeredSlides={false}
              mousewheel={{ forceToAxis: true }}
              navigation={true}
              className="brands-swiper"
              dir="rtl"
            >
              {filteredBrands.map((brand) => (
                <SwiperSlide key={brand.id} className="w-auto! max-w-none!">
                  <div
                    onClick={() =>
                      setSelectedBrand(
                        selectedBrand === brand.title ? null : brand.title
                      )
                    }
                    className={`inline-flex items-center rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 border min-w-[100px] justify-center ${
                      selectedBrand === brand.title
                        ? "text-white shadow-sm"
                        : "bg-white border-gray-300 text-gray-700 hover:border-[#ce1a2a] hover:text-[#ce1a2a]"
                    }`}
                    style={{
                      backgroundColor:
                        selectedBrand === brand.title ? PRIMARY_COLOR : "white",
                      borderColor:
                        selectedBrand === brand.title
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
        )}

        {/* Search and Filters */}
        <Card
          className="mb-6 shadow-md border-0 rounded-xl"
          style={{ borderColor: PRIMARY_LIGHT }}
        >
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="flex-1 w-full">
              <Input
                placeholder="جستجو در برند و مدل خودرو..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                prefix={<SearchOutlined className="text-gray-400" />}
                className="rounded-lg hover:border-[#ce1a2a] focus:border-[#ce1a2a] focus:shadow-sm"
                size="middle"
                style={{ borderColor: "#e5e7eb" }}
              />
            </div>

            <Button
              onClick={handleResetFilters}
              icon={<ReloadOutlined />}
              size="middle"
              className="rounded-lg whitespace-nowrap border-0 font-medium"
              style={{
                backgroundColor: PRIMARY_COLOR,
                color: "white",
              }}
            >
              بازنشانی فیلترها
            </Button>
          </div>
        </Card>

        {/* Results Table */}
        <Card
          className="shadow-md border-0 rounded-xl overflow-hidden"
          style={{ borderColor: PRIMARY_LIGHT }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">
              لیست قیمت خودروها
            </h3>
            <span
              className="text-sm text-white px-3 py-1 rounded"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              {filteredData.length} مورد
            </span>
          </div>

          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `نمایش ${range[0]}-${range[1]} از ${total} مورد`,
            }}
            scroll={{ x: 800 }}
            size="middle"
            className="compact-table"
          />
        </Card>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .category-swiper,
        .brands-swiper {
          padding: 8px 4px;
          margin: -8px -4px;
        }

        .category-swiper .swiper-slide,
        .brands-swiper .swiper-slide {
          width: auto !important;
        }

        .category-swiper .swiper-button-next,
        .category-swiper .swiper-button-prev,
        .brands-swiper .swiper-button-next,
        .brands-swiper .swiper-button-prev {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          top: 50%;
          transform: translateY(-50%);
          margin-top: 0;
        }

        .category-swiper .swiper-button-next:after,
        .category-swiper .swiper-button-prev:after,
        .brands-swiper .swiper-button-next:after,
        .brands-swiper .swiper-button-prev:after {
          font-size: 12px;
          color: #374151;
          font-weight: bold;
        }

        .category-swiper .swiper-button-next:hover,
        .category-swiper .swiper-button-prev:hover,
        .brands-swiper .swiper-button-next:hover,
        .brands-swiper .swiper-button-prev:hover {
          background: #ce1a2a;
          border-color: #ce1a2a;
        }

        .category-swiper .swiper-button-next:hover:after,
        .category-swiper .swiper-button-prev:hover:after,
        .brands-swiper .swiper-button-next:hover:after,
        .brands-swiper .swiper-button-prev:hover:after {
          color: white;
        }

        .category-swiper .swiper-button-prev {
          left: 0;
          right: auto;
        }

        .category-swiper .swiper-button-next {
          right: 0;
          left: auto;
        }

        /* RTL support for table */
        .ant-table-thead > tr > th {
          text-align: right;
          background: #f8fafc;
          font-weight: bold;
          color: #374151;
          font-size: 13px;
          border-bottom: 2px solid #ce1a2a;
        }

        .ant-table-tbody > tr > td {
          text-align: right;
          font-size: 13px;
          padding: 12px 8px;
        }

        .ant-table-tbody > tr:hover > td {
          background: #fdf2f2 !important;
        }

        .compact-table .ant-table-pagination {
          margin: 16px 0 0 0;
          padding: 0 16px;
        }

        .compact-table .ant-pagination-item-active {
          border-color: #ce1a2a;
        }

        .compact-table .ant-pagination-item-active a {
          color: #ce1a2a;
        }

        .compact-table .ant-pagination-item:hover {
          border-color: #ce1a2a;
        }

        .compact-table .ant-pagination-item:hover a {
          color: #ce1a2a;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .category-swiper .swiper-button-next,
          .category-swiper .swiper-button-prev,
          .brands-swiper .swiper-button-next,
          .brands-swiper .swiper-button-prev {
            display: none;
          }

          .ant-table-thead > tr > th,
          .ant-table-tbody > tr > td {
            font-size: 12px;
            padding: 8px 6px;
          }
        }

        @media (max-width: 640px) {
          .category-swiper .swiper-slide:first-child {
            margin-right: 16px;
          }

          .category-swiper .swiper-slide:last-child {
            margin-left: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default PriceCar;