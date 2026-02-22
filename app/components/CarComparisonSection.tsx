"use client";

import { getItem } from "@/services/Item/Item";
import { createpublishCode } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Select } from "antd";
import OptimizedImage from "./OptimizedImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

const { Option } = Select;

const CarComparisonSection = ({
  brandsCar,
  whichCars,
}: {
  brandsCar: ItemsCategory[];
  whichCars: Items[];
}) => {
  const [firstCarBrand, setFirstCarBrand] = useState<number>(0);
  const [firstModelsCarList, setFirstModelsCarList] = useState<Items[]>([]);
  const [firstCarModel, setFirstCarModel] = useState<number>(0);
  const [secCarBrand, setSecCarBrand] = useState<number>(0);
  const [secModelsCarList, setSecModelsCarList] = useState<Items[]>([]);
  const [secCarModel, setSecCarModel] = useState<number>(0);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const swiperRef = useRef<any>(null);
  const router = useRouter();

  // تعداد کل تصاویر
  const totalImages = whichCars.length;

  // تعیین تعداد ستون براساس عرض صفحه
  const getColumnsCount = () => {
    if (windowWidth >= 1280) return 4;
    if (windowWidth >= 1024) return 3;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  // گرفتن عرض صفحه
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // بعد از لود همه تصاویر
  useEffect(() => {
    if (loadedCount === totalImages && totalImages > 0) {
      setTimeout(() => {
        setShowSkeleton(false);
        if (swiperRef.current?.swiper) {
          swiperRef.current.swiper.update();
        }
      }, 100);
    }
  }, [loadedCount, totalImages]);

  // تایمر fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
      if (swiperRef.current?.swiper) {
        swiperRef.current.swiper.update();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  const handleImageError = () => {
    setLoadedCount((prev) => prev + 1);
  };

  const handleCompare = () => {
    router.push(`/compare/${firstCarModel},${secCarModel}?type=car`);
  };

  const fetchModelCars = async () => {
    try {
      const modelsCarResponse: Items[] = await getItem({
        TypeId: 1042,
        langCode: "fa",
        CategoryIdArray: String(firstCarBrand),
        PageIndex: 1,
        PageSize: 200,
      });
      setFirstModelsCarList(modelsCarResponse);
    } catch (err) {}
  };

  const fetchModelCars2 = async () => {
    try {
      const modelsCarResponse: Items[] = await getItem({
        TypeId: 1042,
        langCode: "fa",
        CategoryIdArray: String(secCarBrand),
        PageIndex: 1,
        PageSize: 200,
      });
      setSecModelsCarList(modelsCarResponse);
    } catch (err) {}
  };

  useEffect(() => {
    if (firstCarBrand > 0) {
      fetchModelCars();
    }
  }, [firstCarBrand]);

  useEffect(() => {
    if (secCarBrand > 0) {
      fetchModelCars2();
    }
  }, [secCarBrand]);

  const columnsCount = getColumnsCount();

  return (
    <section className="py-3" aria-label="مقایسه خودرو">
      <div className="mx-auto">
        {/* عنوان اصلی */}
        <h3 className="text-center text-xl text-[#292929]! font-bold! mb-4!">
          مقایسه خودروهای بازار
        </h3>

        {/* بخش انتخاب خودروها */}
        <div className="sm:px-0 px-5">
          <div className="w-full md:w-10/12 bg-[#ce1a2a] px-6 pt-6 pb-[350px] mx-auto rounded-2xl mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* خودرو اول - کد قبلی همونطور هست */}
              <div className="w-full lg:w-2/5">
                <h4 className="text-white! text-sm font-medium pb-4 w-full">
                  خودرو اول
                </h4>

                <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
                  <Select
                    aria-label="select brand car1"
                    value={firstCarBrand ? firstCarBrand : null}
                    onChange={(value) => {
                      setFirstCarBrand(value);
                      setFirstCarModel(0);
                    }}
                    className="w-full custom-ant-select"
                    size="large"
                    placeholder="جستجوی برند..."
                    showSearch
                    filterOption={(input, option) => {
                      if (!option || !option.children) return false;
                      return option.children
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                  >
                    {brandsCar.length > 0 &&
                      brandsCar.map((e) => (
                        <Option key={e.id} value={e.id}>
                          {e.title}
                        </Option>
                      ))}
                  </Select>

                  <Select
                    aria-label="select model car1"
                    disabled={firstCarBrand === 0}
                    value={firstCarModel ? firstCarModel : null}
                    onChange={(value) => setFirstCarModel(value)}
                    className="w-full custom-ant-select"
                    size="large"
                    placeholder="جستجوی مدل..."
                    showSearch
                    filterOption={(input, option) => {
                      if (!option || !option.children) return false;
                      return option.children
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                  >
                    {firstModelsCarList.length > 0 &&
                      firstModelsCarList.map((e) => (
                        <Option key={e.id} value={e.id}>
                          {e.title} {createpublishCode(e.publishCode)}
                        </Option>
                      ))}
                  </Select>
                </div>
              </div>

              {/* خودرو دوم */}
              <div className="w-full lg:w-2/5">
                <h4 className="text-white! text-sm font-medium pb-4 w-full">
                  خودرو دوم
                </h4>

                <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
                  <Select
                    aria-label="select brand car2"
                    value={secCarBrand ? secCarBrand : null}
                    onChange={(value) => {
                      setSecCarBrand(value);
                      setSecCarModel(0);
                    }}
                    className="w-full custom-ant-select"
                    size="large"
                    placeholder="جستجوی برند..."
                    showSearch
                    filterOption={(input, option) => {
                      if (!option || !option.children) return false;
                      return option.children
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                  >
                    {brandsCar.length > 0 &&
                      brandsCar.map((e) => (
                        <Option key={e.id} value={e.id}>
                          {e.title}
                        </Option>
                      ))}
                  </Select>

                  <Select
                    aria-label="select model car2"
                    disabled={secCarBrand === 0}
                    value={secCarModel ? secCarModel : null}
                    onChange={(value) => setSecCarModel(value)}
                    className="w-full custom-ant-select"
                    size="large"
                    placeholder="جستجوی مدل..."
                    showSearch
                    filterOption={(input, option) => {
                      if (!option || !option.children) return false;
                      return option.children
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                  >
                    {secModelsCarList.length > 0 &&
                      secModelsCarList.map((e) => (
                        <Option key={e.id} value={e.id}>
                          {e.title} {createpublishCode(e.publishCode)}
                        </Option>
                      ))}
                  </Select>
                </div>
              </div>

              {/* دکمه مقایسه */}
              <div className="w-full lg:w-1/6">
                <h4 className="text-white! invisible opacity-0 cursor-default select-none text-sm font-medium pb-4 w-full">
                  مقایسه
                </h4>
                <button
                  aria-label="مقایسه"
                  onClick={handleCompare}
                  className="w-full bg-white cursor-pointer button-wave-1 text-[#ce1a2a]! font-semibold py-3 rounded-xl transition-colors duration-300 relative overflow-hidden"
                >
                  مقایسه
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* بخش اسلایدر */}
        <div className="max-h-[800px]">
          {showSkeleton ? (
            /* اسکلتون ساده با تعداد ستون متغیر */
            <div
              className="grid gap-4 -mt-[350px]"
              style={{
                gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: columnsCount }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse"
                >
                  <div className="relative w-full pt-[75%] bg-gray-200"></div>
                  <div className="p-4 text-center">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* اسلایدر اصلی */
            <Swiper
              ref={swiperRef}
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop={true}
              className="comparison-swiper -mt-[350px]"
              dir="rtl"
              onInit={(swiper) => {
                setTimeout(() => swiper.update(), 100);
              }}
              observer={true}
              observeParents={true}
            >
              {whichCars.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="bg-white overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                    <Link href={item.url}>
                      <div className="relative w-full pt-[75%] bg-gray-100 ">
                        <OptimizedImage
                          src={mainDomainOld + item.image}
                          alt={item.title}
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 25vw"
                          loading="lazy"
                          onLoad={handleImageLoad}
                          onError={handleImageError}
                        />
                      </div>
                    </Link>

                    <div className="p-4 text-center">
                      <h3 className="text-sm text-[#202020]! font-medium">
                        <Link
                          href={item.url}
                          className="hover:text-[#ce1a2a]! text-black! font-bold! transition-colors duration-200 line-clamp-2"
                        >
                          {item.title}
                        </Link>
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      <style>{`
        .comparison-swiper {
          padding: 10px 5px 30px 5px;
        }

        .comparison-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .comparison-swiper .swiper-slide {
          height: auto !important;
        }

        .comparison-swiper .swiper-slide > div {
          height: 100%;
        }

        .custom-ant-select .ant-select-selector {
          background-color: transparent !important;
          border: 1px solid #d1d5db !important;
          border-radius: 12px !important;
          height: 48px !important;
          color: white !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          padding: 12px !important;
        }
        
        .custom-ant-select .ant-select-selection-placeholder {
          color: white !important;
        }

        .custom-ant-select .ant-select-selection-item {
          color: white !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          display: flex !important;
          align-items: center !important;
        }

        .custom-ant-select .ant-select-arrow {
          color: white !important;
          padding-top: 12px !important;
          padding-bottom: 12px !important;
        }

        .custom-ant-select.ant-select-focused .ant-select-selector {
          border-color: white !important;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2) !important;
          outline: none !important;
        }

        .ant-select-dropdown {
          background-color: white !important;
          border-radius: 8px !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
        }

        .ant-select-item {
          color: #374151 !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          padding: 8px 12px !important;
        }

        .ant-select-item-option-selected {
          background-color: #f3f4f6 !important;
        }

        .ant-select-item-option-active {
          background-color: #e5e7eb !important;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .pt-\[75\%\] {
          padding-top: 75%;
        }

        .object-contain {
          object-fit: contain;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default CarComparisonSection;
