"use client";

import { getItem } from "@/services/Item/Item";
import { mainDomainOld } from "@/utils/mainDomain";
import { Select } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
  const [dataCompare, setDataCompare] = useState<ItemsId[]>([]);

  const router = useRouter();

  const handleCompare = () => {
    router.push(`/compare/${firstCarModel},${secCarModel}`);
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

  return (
    <div className="py-3">
      <div className="mx-auto">
        {/* عنوان اصلی */}
        <h3 className="text-center text-xl text-[#292929]! font-bold! mb-4!">
          مقایسه خودروهای بازار
        </h3>

        {/* بخش انتخاب خودروها */}
        <div className="sm:px-0 px-5">
          <div className="w-full md:w-10/12 bg-[#ce1a2a] px-6 pt-6 pb-[350px] mx-auto rounded-2xl mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* خودرو اول */}
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
                          {e.title}
                        </Option>
                      ))}
                  </Select>
                </div>
              </div>

              {/* خودرو دوم */}
              <div className="w-full lg:w-2/5 ">
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
                          {e.title}
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
                  onClick={handleCompare}
                  className="w-full bg-white cursor-pointer button-wave-1 text-[#ce1a2a]!  font-semibold py-3 rounded-xl transition-colors duration-300 relative overflow-hidden"
                >
                  مقایسه
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-72">
          {/* اسلایدر مقایسه‌ها */}
          <Swiper
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
            }}
            loop={true}
            className="comparison-swiper -mt-[350px]"
            dir="rtl"
          >
            {whichCars.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="overflow-hidden">
                    <Link href={item.url}>
                      <div className="h-48 relative">
                        <img
                          src={mainDomainOld + item.image}
                          alt={item.title}
                          className="object-contain w-full"
                        />
                      </div>
                    </Link>
                  </div>

                  <div className="p-4 text-center w-full">
                    <h3 className="text-sm text-[#202020]! font-medium">
                      <Link
                        href={item.url}
                        className="hover:text-[#ce1a2a]! text-black! font-semibold! transition-colors duration-200"
                      >
                        {item.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .comparison-swiper {
          padding: 10px 5px 30px 5px;
        }

        .comparison-swiper .swiper-wrapper {
          align-items: stretch;
        }

        /* استایل برای select ها در حالت hover */
        select:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }

        /* استایل برای options */
        select option {
          background-color: white;
          color: #374151;
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

        /* برای حالت focus */
        .custom-ant-select.ant-select-focused .ant-select-selector {
          border-color: white !important;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2) !important;
          outline: none !important;
        }

        /* برای dropdown */
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
      `}</style>
    </div>
  );
};

export default CarComparisonSection;
