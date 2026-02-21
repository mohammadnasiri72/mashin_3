"use client";

import CustomPagination from "@/app/components/CustomPagination";
import { getCategory } from "@/services/Category/Category";
import { createpublishCode, toPersianNumbers } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Button } from "@mui/material";
import { Select } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaCar } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import SideBarSearchCars from "./SideBarSearchCars";

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
  initialOrderby,
}: {
  carBrands: ItemsCategory[];
  carDetails: ItemsCategoryId[];
  carView: Items[];
  banner: Items[];
  segmentCars: Items[];
  initialtype: number;
  initialBrandId: number;
  initialModelId: number;
  initialOrderby: number;
}) {
  const [models, setModels] = useState<ItemsCategory[]>([]);
  const [isMainLonger, setIsMainLonger] = useState(true);

  const [brandId, setBrandId] = useState<number>(
    initialBrandId ? initialBrandId : 0,
  );

  const [modelId, setModelId] = useState<number>(
    initialModelId ? initialModelId : 0,
  );
  const [typeId, setTypeId] = useState<number>(initialtype ? initialtype : 0);
  const [orderBy, setOrderBy] = useState<number>(
    initialOrderby ? initialOrderby : 0,
  );

  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const typeCarTitle = segmentCars.find((e) => e.id === initialtype)?.title;
  const router = useRouter();
  const searchParams = useSearchParams();

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
  }, [carView, banner, models, brandId, modelId, typeId, orderBy]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (brandId) params.append("brandId", String(brandId));
    if (modelId) params.append("modelId", String(modelId));
    if (typeId) params.append("typeId", String(typeId));
    if (orderBy) params.append("orderby", String(orderBy));

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
          <div className="flex flex-col lg:flex-row gap-6 relative">
            {/* محتوای اصلی - 3/4 صفحه */}
            <div
              ref={mainBoxRef}
              className={`
                lg:w-3/4 w-full transition-all duration-300
                ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
              `}
            >
              {/* جستجو در مدل‌های این برند */}
              <div className="bg-white rounded-2xl py-6 shadow-sm border border-gray-100 mb-6 flex justify-center">
                <div className="flex items-center flex-wrap sm:px-4 px-1 w-full">
                  <div className="lg:w-1/5 sm:w-1/3 w-full px-1 mt-3 sm:mt-0">
                    <Select
                      aria-label="نوع خودرو..."
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
                  <div className="lg:w-1/5 sm:w-1/3 w-full px-1">
                    <Select
                      aria-label="جستجوی برند..."
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
                      aria-label="جستجوی مدل..."
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
                      aria-label="مرتب سازی..."
                      placeholder="مرتب سازی..."
                      value={orderBy}
                      onChange={(value) => setOrderBy(value)}
                      className="dropdown_main"
                      style={{ width: "100%" }}
                      size="large"
                    >
                      <Option value={0}>جدیدترین‌ها</Option>
                      <Option value={1}>محبوب ترین‌ها</Option>
                      <Option value={2}>قدیمی‌ترین‌ها</Option>
                      <Option value={8}>پربازدیدترین‌ها</Option>
                    </Select>
                  </div>

                  <div className="px-3 lg:w-1/5 sm:w-1/3 w-full">
                    <Button
                      aria-label="جستجو خودرو"
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
                      <span className="pr-2 whitespace-nowrap">
                        جستجو خودرو
                      </span>
                    </Button>
                  </div>
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
                <span className="text-gray-700 text-sm">
                  {carView.length > 0 ? toPersianNumbers(carView[0].total) : 0}{" "}
                  مدل
                </span>
              </div>

              {/* گرید مدل‌های خودرو */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {carView.map((car) => (
                  <div key={car.id} className="group block">
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
                                <span>{createpublishCode(ca.publishCode)}</span>
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
                            {car.title} {createpublishCode(car.publishCode)}
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

              {/* صفحه بندی */}
              {carView.length > 0 && (
                <CustomPagination
                  total={carView[0].total}
                  pageSize={20}
                  currentPage={Number(searchParams.get("page")) || 1}
                />
              )}
            </div>

            {/* سایدبار - 1/4 صفحه */}
            <aside
              ref={sidebarRef}
              aria-label="فیلترها و بنرهای جانبی"
              className={`
                lg:w-1/4 w-full transition-all duration-300
                ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
              `}
            >
              <SideBarSearchCars banner={banner} />
            </aside>
          </div>
        </div>

        {/* استایل‌های سفارشی */}
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
