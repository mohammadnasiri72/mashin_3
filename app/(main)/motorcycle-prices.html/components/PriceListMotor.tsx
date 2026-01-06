"use client";
import {
  CarOutlined,
  DollarOutlined,
  FilterOutlined,
  InfoCircleOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { Button, Card, Input, Rate, Space, Tag } from "antd";
import { useState } from "react";
import { FaHashtag, FaMotorcycle, FaSearch, FaStar } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import SidebarMotorPrice from "./SidebarMotorPrice";

const { Search } = Input;

// داده‌های نمونه برای محصولات هر برند
const sampleProductsByBrand = [
  {
    brandId: 8854,
    brandName: "زونتس",
    totalProducts: 8,
    rating: 4.4,
    products: [
      {
        id: 1,
        name: "Zontes 350X Adventure",
        price: "۱۵۸,۰۰۰,۰۰۰ تومان",
        year: "۱۴۰۲",
        cc: "۳۵۰",
      },
      {
        id: 2,
        name: "Zontes 310T Touring",
        price: "۱۴۵,۰۰۰,۰۰۰ تومان",
        year: "۱۴۰۲",
        cc: "۳۱۰",
      },
      {
        id: 3,
        name: "Zontes 125 Sport",
        price: "۸۵,۰۰۰,۰۰۰ تومان",
        year: "۱۴۰۲",
        cc: "۱۲۵",
      },
      {
        id: 4,
        name: "Zontes 500R",
        price: "۱۹۰,۰۰۰,۰۰۰ تومان",
        year: "۱۴۰۲",
        cc: "۵۰۰",
      },
    ],
  },
  {
    brandId: 8843,
    brandName: "هاسکوارنا",
    totalProducts: 5,
    rating: 4.7,
    products: [
      {
        id: 5,
        name: "Husqvarna 401 Vitpilen",
        price: "۲۸۰,۰۰۰,۰۰۰ تومان",
        year: "۱۴۰۲",
        cc: "۴۰۱",
      },
      {
        id: 6,
        name: "Husqvarna 701 Supermoto",
        price: "۳۵۰,۰۰۰,۰۰۰ تومان",
        year: "۱۴۰۲",
        cc: "۷۰۱",
      },
      {
        id: 7,
        name: "Husqvarna 250 Enduro",
        price: "۲۲۰,۰۰۰,۰۰۰ تومان",
        year: "۱۴۰۲",
        cc: "۲۵۰",
      },
    ],
  },
  {
    brandId: 8838,
    brandName: "لیفان موتور",
    totalProducts: 6,
    rating: 3.8,
    products: [
      {
        id: 8,
        name: "Lifan KPR 200",
        price: "۹۸,۰۰۰,۰۰۰ تومان",
        year: "۱۴۰۲",
        cc: "۲۰۰",
      },
      {
        id: 9,
        name: "Lifan KP 150",
        price: "۷۵,۰۰۰,۰۰۰ تومان",
        year: "۱۴۰۲",
        cc: "۱۵۰",
      },
      {
        id: 10,
        name: "Lifan V16 Cruiser",
        price: "۱۲۰,۰۰۰,۰۰۰ تومان",
        year: "۱۴۰۲",
        cc: "۲۵۰",
      },
      {
        id: 11,
        name: "Lifan Cargo 110",
        price: "۶۵,۰۰۰,۰۰۰ تومان",
        year: "۱۴۰۲",
        cc: "۱۱۰",
      },
    ],
  },
];

function PriceListMotor({ brand }: { brand: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [brandSearchTerms, setBrandSearchTerms] = useState<{
    [key: number]: string;
  }>({});

  const filteredBrands = sampleProductsByBrand.filter((brandItem) => {
    if (!searchTerm) return true;
    const brandMatches = brandItem.brandName.includes(searchTerm);
    const productMatches = brandItem.products.some((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return brandMatches || productMatches;
  });

  const getFilteredProducts = (brandId: number, products: any[]) => {
    const brandSearchTerm = brandSearchTerms[brandId] || "";
    if (!brandSearchTerm) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(brandSearchTerm.toLowerCase())
    );
  };

  const handleBrandSearch = (brandId: number, term: string) => {
    setBrandSearchTerms((prev) => ({
      ...prev,
      [brandId]: term,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="px-3">
        {/* هدر و جستجوی سراسری */}
        <Card
          className="mb-6 border-none shadow-sm rounded-xl"
          styles={{
            body: { padding: "24px" },
          }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#ce1a2a] p-3 rounded-xl">
                <FaMotorcycle className="text-white! text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#ce1a2a] whitespace-nowrap">
                  لیست قیمت موتورسیکلت
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  بررسی و مقایسه قیمت انواع موتورسیکلت
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <Space.Compact className="w-full">
                <Input
                  placeholder="جستجوی بین تمام برندها و محصولات..."
                  size="large"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-l-lg rounded-r-none"
                  prefix={<SearchOutlined className="text-gray-400" />}
                />
                <Button
                  type="primary"
                  size="large"
                  className="bg-[#ce1a2a] border-[#ce1a2a] hover:bg-[#b31524] hover:border-[#b31524] rounded-l-none rounded-r-lg"
                  icon={<FilterOutlined />}
                >
                  فیلتر
                </Button>
              </Space.Compact>
            </div>
          </div>
        </Card>

        <div className="flex flex-col lg:flex-row items-start gap-6">
          {/* محتوای اصلی */}
          <div className="lg:w-3/4 w-full">
            {/* لیست برندها */}
            <div className="space-y-4">
              {filteredBrands.map((brandItem) => {
                const filteredProducts = getFilteredProducts(
                  brandItem.brandId,
                  brandItem.products
                );

                return (
                  <Card
                    key={brandItem.brandId}
                    className="rounded-xl shadow-sm border-0 overflow-hidden"
                    styles={{
                      body: { padding: 0 },
                    }}
                  >
                    {/* هدر برند */}
                    <div className="bg-linear-to-r from-[#ce1a2a] to-[#e63e4d] px-6 py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-white/20 p-3 rounded-xl border border-white/30">
                            <GiSteeringWheel className="text-white! text-xl" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-white! mb-1">
                              {brandItem.brandName}
                            </h2>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Rate
                                  disabled
                                  defaultValue={brandItem.rating}
                                  className="text-amber-300 text-sm"
                                  character={<FaStar />}
                                />
                                <span className="text-white! font-medium text-sm">
                                  ({brandItem.rating})
                                </span>
                              </div>
                              <Tag
                                color="default"
                                className="bg-white/20 border-0 text-white"
                              >
                                {brandItem.totalProducts} مدل
                              </Tag>
                            </div>
                          </div>
                        </div>

                        {/* جستجوی داخلی برند */}
                        <div className="min-w-[250px]">
                          <Input
                            placeholder={`جستجو در ${brandItem.brandName}...`}
                            value={brandSearchTerms[brandItem.brandId] || ""}
                            onChange={(e) =>
                              handleBrandSearch(
                                brandItem.brandId,
                                e.target.value
                              )
                            }
                            prefix={<FaSearch className="text-gray-400" />}
                            className="rounded-lg bg-white/20 border-white/30 placeholder-white/70"
                            style={{ color: "white" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* لیست محصولات */}
                    <div className="p-4">
                      {filteredProducts.length > 0 ? (
                        <div className="space-y-3">
                          {filteredProducts.map((product, index) => (
                            <Card
                              key={product.id}
                              className="rounded-lg border border-gray-200 hover:border-[#ce1a2a] hover:shadow-md transition-all duration-300"
                              styles={{
                                body: { padding: "16px" },
                              }}
                            >
                              <div className="flex items-center gap-4">
                                {/* شماره ردیف */}
                                <div className="shrink-0">
                                  <Tag
                                    color="#ce1a2a"
                                    className="w-8 h-8 flex items-center justify-center rounded-full p-0 m-0"
                                  >
                                    <FaHashtag className="text-xs" />
                                    {index + 1}
                                  </Tag>
                                </div>

                                {/* اطلاعات محصول */}
                                <div className="grow flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="bg-gray-100 p-3 rounded-lg">
                                      <CarOutlined className="text-gray-600 text-lg" />
                                    </div>
                                    <div>
                                      <h3 className="font-semibold text-gray-800 text-base mb-1">
                                        {product.name}
                                      </h3>
                                      <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span>{product.year}</span>
                                        <span>•</span>
                                        <span>{product.cc} سی‌سی</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-4">
                                    <div className="text-left">
                                      <div className="flex items-center gap-1 mb-1">
                                        <DollarOutlined className="text-green-600" />
                                        <span className="text-lg font-bold text-green-600">
                                          {product.price}
                                        </span>
                                      </div>
                                    </div>

                                    <Button
                                      type="primary"
                                      className="bg-[#ce1a2a] border-[#ce1a2a] hover:bg-[#b31524] hover:border-[#b31524]"
                                      icon={<InfoCircleOutlined />}
                                      size="middle"
                                    >
                                      جزئیات
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <SearchOutlined className="text-4xl text-gray-300 mb-3" />
                          <p className="text-gray-500 text-lg">
                            محصولی با مشخصات جستجو شده یافت نشد
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* پیغام زمانی که برندی یافت نشد */}
            {filteredBrands.length === 0 && (
              <Card
                className="text-center py-12 rounded-xl border-0 shadow-sm"
                styles={{
                  body: { padding: "48px 24px" },
                }}
              >
                <SearchOutlined className="text-5xl text-[#ce1a2a] mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  موردی یافت نشد
                </h3>
                <p className="text-gray-500">
                  هیچ برند یا محصولی با مشخصات جستجو شده مطابقت ندارد.
                </p>
              </Card>
            )}
          </div>

          {/* سایدبار */}
          <div className="lg:w-1/4 w-full">
            <SidebarMotorPrice />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceListMotor;
