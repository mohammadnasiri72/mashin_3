"use client";

import MarketStats from "@/app/components/MarketStats";
import { getCategory } from "@/services/Category/Category";
import { toPersianNumbers } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Button } from "@mui/material";
import { Select } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCar, FaSearch } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import PaginationSearchCars from "./PaginationSearchCars";

const { Option } = Select;

function SearchCarsDetails({
  carBrands,
  carDetails,
  carView,
  banner,
  segmentCars,
  initialtype,
  initialBrandId,
  initialModelId,
}: {
  carBrands: ItemsCategory[];
  carDetails: ItemsCategoryId[];
  carView: Items[];
  banner: Items[];
  segmentCars: Items[];
  initialtype: number;
  initialBrandId: number;
  initialModelId: number;
}) {
  const [models, setModels] = useState<ItemsCategory[]>([]);

  const [brandId, setBrandId] = useState<number>(
    initialBrandId ? initialBrandId : 0,
  );

  const [modelId, setModelId] = useState<number>(
    initialModelId ? initialModelId : 0,
  );
  const [typeId, setTypeId] = useState<number>(initialtype ? initialtype : 0);

  const typeCarTitle = segmentCars.find((e) => e.id === initialtype)?.title;
  const router = useRouter();

  const fetchModelCars = async (id: number) => {
    try {
      const modelsCarResponse: ItemsCategory[] = await getCategory({
        TypeId: 1042,
        LangCode: "fa",
        ParentIdArray: id,
        PageIndex: 1,
        PageSize: 200,
      });
      setModels(modelsCarResponse);
    } catch (err) {}
  };

  useEffect(() => {
    if (!isNaN(initialModelId)) {
      fetchModelCars(initialModelId);
    } else if (!isNaN(initialBrandId)) {
      fetchModelCars(initialBrandId);
    }
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brandId) params.append("brandId", String(brandId));
    if (modelId) params.append("modelId", String(modelId));
    if (typeId) params.append("typeId", String(typeId));

    const queryString = params.toString();

    if (queryString) {
      router.push(`/searchcars?${queryString}`);
    } else {
      router.push("/searchcars");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#f4f4f4] py-8">
        <div className="mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* محتوای اصلی - 3/4 صفحه */}
            <div className="lg:w-3/4 w-full">
              {/* جستجو در مدل‌های این برند */}
              <div className="bg-white rounded-2xl py-6  shadow-sm border border-gray-100 mb-6 flex justify-between">
                <div className="flex items-center flex-wrap sm:px-4 px-1 w-full">
                  <div className="lg:w-1/5 sm:w-1/3 w-full px-1">
                    <Select
                      placeholder="جستجوی برند..."
                      value={brandId}
                      onChange={(value) => {
                        setBrandId(value);
                        setModelId(0);
                        fetchModelCars(value);
                      }}
                      className="dropdown_main"
                      style={{ width: "100%" }}
                      size="large"
                    >
                      <Option value={0}>همه برندها</Option>
                      {carBrands.length > 0 &&
                        carBrands.map((e) => (
                          <Option key={e.id} value={e.id}>
                            {e.title}
                          </Option>
                        ))}
                    </Select>
                  </div>
                  <div className="lg:w-1/5 sm:w-1/3 w-full px-1 mt-3 sm:mt-0">
                    <Select
                      disabled={!brandId}
                      placeholder="جستجوی مدل..."
                      value={modelId}
                      onChange={(value) => setModelId(value)}
                      className="dropdown_main"
                      style={{ width: "100%" }}
                      size="large"
                    >
                      <Option value={0}>همه مدل‌ها</Option>
                      {models.length > 0 &&
                        models.map((e) => (
                          <Option key={e.id} value={e.id}>
                            {e.title}
                          </Option>
                        ))}
                    </Select>
                  </div>
                  <div className="lg:w-1/5 sm:w-1/3 w-full px-1 mt-3 sm:mt-0">
                    <Select
                      placeholder="نوع خودرو..."
                      value={typeId}
                      onChange={(value) => setTypeId(value)}
                      className="dropdown_main"
                      style={{ width: "100%" }}
                      size="large"
                    >
                      <Option value={0}>همه نوع ها</Option>
                      {segmentCars.length > 0 &&
                        segmentCars.map((e) => (
                          <Option key={e.id} value={e.id}>
                            {e.title}
                          </Option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="px-3">
                  <Button
                    variant="contained"
                    className="searchCar_bt button button-wave-1 sm:w-auto w-full"
                    onClick={handleSearch}
                    sx={{
                      backgroundColor: "#fff",
                      color: "#ce1a2a",
                      borderRadius: "4px",
                      padding: "8px 16px",
                      fontSize: "13px",
                      fontWeight: 600,
                      position: "relative",
                      overflow: "hidden",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "5px",
                        height: "5px",
                        backgroundColor: "#ce1a2a",
                        opacity: 0,
                        borderRadius: "50%",
                        transform: "scale(0, 0) translate(-50%)",
                        transformOrigin: "50% 50%",
                      },
                      "&:hover::after": {
                        animation: "wave-1 0.6s ease-out",
                      },
                      "@keyframes wave-1": {
                        "0%": {
                          transform: "scale(0, 0)",
                          opacity: 0.5,
                        },
                        "100%": {
                          transform: "scale(20, 20)",
                          opacity: 0,
                        },
                      },
                    }}
                  >
                    <span>
                      <IoSearch />
                    </span>
                    <span className="pr-2 whitespace-nowrap">جستجو خودرو</span>
                  </Button>
                </div>
              </div>

              {/* عنوان بخش مدل‌ها */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  {carDetails.length > 0 && (
                    <img
                      src={mainDomainOld + carDetails[0].image}
                      alt={carDetails[0].title}
                      className="object-contain w-20 h-20"
                    />
                  )}
                  {carDetails.length > 0 && (
                    <h2 className="text-2xl font-bold text-gray-900">
                      مدل‌های{" "}
                      <span className="text-red-600">
                        {carDetails[0].title}
                      </span>{" "}
                      <span className="text-red-600">{typeCarTitle}</span>{" "}
                    </h2>
                  )}
                  {carDetails.length === 0 && (
                    <h2 className="text-2xl font-bold text-gray-900">
                      <span className="text-red-600">
                        همه برند های خودرو {typeCarTitle}
                      </span>
                    </h2>
                  )}
                </div>
                <span className="text-gray-500 text-sm">
                  {carView.length > 0 ? toPersianNumbers(carView[0].total) : 0}{" "}
                  مدل
                </span>
              </div>

              {/* گرید مدل‌های خودرو */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {carView.map((car) => (
                  <div
                    key={car.id}
                    //   href={car.url + `?id=${car.id}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden pb-2 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200 h-full flex flex-col">
                      {/* تصویر خودرو */}
                      <div className="w-full h-40 overflow-hidden rounded-lg mb-4 bg-gray-50 flex items-center justify-center relative">
                        <Link href={car?.url || "#"}>
                          <img
                            src={mainDomainOld + car.image}
                            alt={car.title}
                            className="object-contain w-full h-full p-2 hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                      </div>

                      <div className="sm:hidden flex flex-col gap-1 py-4 duration-300">
                        {carView
                          .filter((c) => c.categoryId === car.id)
                          .map((ca) => (
                            <Link
                              href={ca.url}
                              key={ca.id}
                              className="bg-[#ce1a2a] rounded-lg px-2 py-1 text-white! hover:bg-red-800 duration-300"
                            >
                              <div className="flex flex-wrap justify-between items-center gap-2">
                                <div className="flex flex-wrap items-center gap-1">
                                  <span> {ca.sourceName} </span>{" "}
                                  <span>{ca.title}</span>
                                </div>{" "}
                                <span>{ca.publishCode}</span>
                              </div>
                            </Link>
                          ))}
                      </div>

                      {/* اطلاعات خودرو */}
                      <div className="flex-1">
                        <Link
                          href={
                            carView.filter((c) => c.categoryId === car.id)[0]
                              ?.url || ""
                          }
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <h3 className="font-bold text-gray-900 text-lg mb-2 text-center hover:text-[#ce1a2a]! transition-colors">
                            {car.title} {car.publishCode}
                          </h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* پیام زمانی که مدلی وجود ندارد */}
              {carView.length === 0 && (
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                  <FaCar className="text-gray-400 text-4xl mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    مدلی یافت نشد
                  </h3>
                  <p className="text-gray-600">
                    با فیلترهای انتخاب شده مدلی یافت نشد.
                  </p>
                </div>
              )}
            </div>

            {/* سایدبار - 1/4 صفحه */}
            <div className="lg:w-1/4 w-full">
              <div className="space-y-6">
                {banner.length > 0 &&
                  banner.map((ban) => (
                    <div className="w-full" key={ban.id}>
                      <img
                        className="w-full"
                        src={mainDomainOld + ban.image}
                        alt={ban.title}
                      />
                    </div>
                  ))}

                {/* آمار بازار */}
                <MarketStats />
              </div>
            </div>
          </div>
        </div>

        {/* صفحه بندی */}
        <PaginationSearchCars carView={carView} />

        {/* استایل‌های سفارشی */}
        <style jsx global>{`
          .container {
            max-width: 1200px;
          }

          @media (max-width: 1024px) {
            .container {
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .custom-market-tabs .ant-tabs-nav {
            margin: 0;
          }

          .custom-market-tabs .ant-tabs-tab {
            padding: 8px 4px !important;
            margin: 0 2px !important;
          }

          .custom-market-tabs .ant-tabs-tab-btn {
            font-size: 12px;
            padding: 0 8px;
          }

          .custom-market-tabs .ant-tabs-ink-bar {
            background: #ce1a2a;
          }

          .custom-market-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
            color: #ce1a2a !important;
            font-weight: 600;
          }

          .custom-market-tabs .ant-tabs-tab:hover {
            color: #ce1a2a !important;
          }

          /* اسکرول بار سفارشی */
          .overflow-y-auto::-webkit-scrollbar {
            width: 4px;
          }

          .overflow-y-auto::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 10px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #a1a1a1;
          }
        `}</style>
      </div>
    </>
  );
}

export default SearchCarsDetails;
