"use client";

import { toPersianNumbers } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";
import { FaClock, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { MdOutlineElectricCar } from "react-icons/md";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function CreativeCategoriesSection({
  brandsAuto,
  carView,
  propertyItems,
}: {
  brandsAuto: Items[];
  carView: ItemsCategory[];
  propertyItems: ItemsId[];
}) {
  if (!brandsAuto?.length && !carView?.length) {
    return (
      <section className="mb-20 px-4 mx-auto max-w-7xl">
        <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
          <div className="text-6xl mb-4">🚗</div>
          <p className="text-gray-500 text-lg font-medium">
            هیچ داده‌ای برای نمایش وجود ندارد
          </p>
          <p className="text-gray-400 text-sm mt-2">
            به زودی خدمات جدید اضافه خواهند شد
          </p>
        </div>
      </section>
    );
  }

  const remainingCars = carView;

  const handleNavigation = (lat: string, lng: string) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank",
    );
  };

  return (
    <section className="mb-20 md:px-6">
      <div className="">
        <div className="flex sm:flex-row flex-col justify-between items-center mb-4!">
          <div className="sm:w-auto w-full px-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
            <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
              مراکز خدمات خودرو
            </h3>
          </div>

          <Link
            href="/autoservices.html"
            className="text-[#ce1a2a]! text-sm flex items-center gap-1"
          >
            نمایش بیشتر
            <FaArrowLeftLong />
          </Link>
        </div>
      </div>
      <div className="space-y-8">
        {/* Main Flex Container */}
        <div className="flex flex-col lg:flex-row-reverse gap-6 relative ">
          {/* Main Content - Swiper (70% عرض) */}
          <div className="w-full lg:w-[70%] relative z-0 overflow-hidden! ">
            {brandsAuto?.length > 0 && (
              <div className="relative group h-full">
                <div className="relative h-full">
                  <Swiper
                    modules={[Autoplay]}
                    spaceBetween={16}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                      640: { slidesPerView: 1 },
                      768: { slidesPerView: 2 },
                      1024: { slidesPerView: 2 },
                      1280: { slidesPerView: 3 },
                    }}
                    className="brands-swiper h-full "
                  >
                    {brandsAuto.map((brand) => {
                      const propertyItem = propertyItems.find(
                        (e) => e.id === brand.id,
                      );
                      console.log(brand);

                      const loc = propertyItem?.properties.find(
                        (e) => e.propertyKey === "p1050_serviceaddress",
                      )?.propertyValue;
                      const time = propertyItem?.properties.find(
                        (e) => e.propertyKey === "p1050_servicetime",
                      )?.propertyValue;
                      const tel = propertyItem?.properties.find(
                        (e) => e.propertyKey === "p1050_servicetel",
                      )?.propertyValue;
                      const Latitude = propertyItem?.properties.find(
                        (e) => e.propertyKey === "p1050_latitude",
                      )?.propertyValue;
                      const Longitude = propertyItem?.properties.find(
                        (e) => e.propertyKey === "p1050_longitude",
                      )?.propertyValue;

                      const numbers = tel
                        ? tel
                            .split(/[\r\n,;]+/)
                            .map((num) => num.trim())
                            .filter(
                              (num) => num.length > 0 && /^0\d{10}$/.test(num),
                            )
                        : [];

                        console.log(tel);
                        

                      return (
                        <SwiperSlide key={brand.id} className="h-full!">
                          <div className="p-0 h-full ">
                            <Card
                              className="group/card relative overflow-hidden rounded-2xl border-0 shadow-sm hover:shadow-lg transition-all duration-500 bg-white hover:-translate-y-1 h-full flex flex-col"
                              styles={{
                                body: { padding: 0, height: "100%" },
                              }}
                            >
                              
                              {/* Image Container */}
                              <Link href={brand.url} className="block shrink-0">
                                <div className="relative h-44 overflow-hidden bg-white!">
                                  <img
                                    src={mainDomain + brand.image}
                                    alt={brand.title}
                                    className="w-full h-full object-contain p-3 group-hover/card:scale-110 transition-transform duration-700 ease-out"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
                                </div>
                              </Link>

                              {/* Content - flex grow */}
                              <div className="flex-1 py-4 space-y-2.5 flex flex-col pb-8!">
                                {/* Category Tag */}
                                <div className="flex items-center gap-2 px-4">
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#ce1a2a]/10 text-[#ce1a2a] text-[10px] font-semibold rounded-full">
                                    <MdOutlineElectricCar className="text-xs" />
                                    {brand.categoryTitle}
                                  </span>
                                </div>

                                {/* Title */}
                                <Link href={brand.url} className="px-4">
                                  <h2 className="font-bold text-gray-800 text-sm hover:text-[#ce1a2a] transition-colors duration-300 line-clamp-2">
                                    {brand.title}
                                  </h2>
                                </Link>

                                {/* Info Items - flex grow */}
                                <div className="space-y-1.5 flex-1 px-4">
                                  <div className="flex items-start gap-2 text-gray-600">
                                    <div className="p-1 bg-[#ce1a2a]/5 rounded-lg shrink-0 mt-0.5">
                                      <FaMapMarkerAlt className="text-[#ce1a2a] text-[10px]" />
                                    </div>
                                    <span className="text-[10px] leading-relaxed line-clamp-2">
                                      {loc || "ثبت نشده"}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 text-gray-600">
                                    <div className="p-1 bg-[#ce1a2a]/5 rounded-lg shrink-0">
                                      <FaClock className="text-[#ce1a2a] text-[10px]" />
                                    </div>
                                    <span className="text-[10px] line-clamp-1">
                                      {time || "ثبت نشده"}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 text-gray-600">
                                    <div className="p-1 bg-[#ce1a2a]/5 rounded-lg shrink-0">
                                      <FaPhone className="text-[#ce1a2a] text-[10px]" />
                                    </div>
                                    <span
                                      className={`text-[10px] line-clamp-1 ${
                                        tel ? "font-semibold text-gray-800" : ""
                                      }`}
                                    >
                                      {tel
                                        ? toPersianNumbers(tel.replace(/\r\n/g, " - "))
                                        : "ثبت نشده"}
                                    </span>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 mt-auto pt-2 ">
                           

                            {Latitude && Longitude && (
                             <div className="absolute bottom-2 w-full! px-4">
                               <Link
                                href={`https://www.google.com/maps/dir/?api=1&destination=${Latitude},${Longitude}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavigation(Latitude, Longitude);
                                }}
                                className="flex-1  bg-gray-100! font-bold! cursor-pointer text-[#ce1a2a]! py-2 px-3 rounded-lg hover:bg-[#ce1a2a]! hover:text-white! duration-300 flex items-center justify-center text-sm"
                              >
                                <FaMapMarkerAlt className="ml-2 text-xs" />
                                مسیریابی
                              </Link>
                             </div>
                            )}
                          </div>
                              </div>
                            </Card>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Premium Cars Grid (30% عرض) - با z-index بالا */}
        <div className="w-full lg:w-[30%] relative z-10 px-3 pb-6 pt-3">
  <div className="bg-gradient-to-br from-gray-50/80 to-white rounded-2xl p-5 border border-gray-100/50 shadow-lg backdrop-blur-sm h-full relative z-20">
    <div className="flex items-center gap-2.5 mb-5">
      <div className="p-2.5 bg-[#ce1a2a]/10 rounded-xl">
        <MdOutlineElectricCar className="text-[#ce1a2a] text-xl" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-800">
          برندهای برتر
        </h4>
      </div>
    </div>

    {remainingCars.length > 0 && (
      <Swiper
        modules={[Autoplay]}
        spaceBetween={12}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={remainingCars.length > 4}
        className="sidebar-swiper"
      >
        {Array.from({
          length: Math.ceil(remainingCars.length / 4),
        }).map((_, pageIndex) => (
          <SwiperSlide key={pageIndex}>
            <div className="grid grid-cols-2 gap-3">
              {remainingCars
                .slice(pageIndex * 4, pageIndex * 4 + 4)
                .map((car) => (
                  <Link
                    key={car.id}
                    href={car.url}
                    className="group/item relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100/50 hover:border-[#ce1a2a]/30"
                  >
                    <div className="flex items-center justify-center p-3 bg-white">
                      <img
                        src={mainDomain + car.image}
                        alt={car.title}
                        className="w-32 h-32 object-contain group-hover/item:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-2.5 transform translate-y-full group-hover/item:translate-y-0 transition-transform duration-500">
                      <h4 className="text-white font-bold text-center text-[11px] leading-tight line-clamp-2 drop-shadow-lg">
                        {car.title}
                      </h4>
                    </div>
                  </Link>
                ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )}
  </div>
</div>
        </div>
      </div>

      <style jsx global>{`
        .brands-swiper {
          width: 100% !important;
          overflow: visible !important;
          height: 100% !important;
          position: relative !important;
          z-index: 1 !important;
        }

        .brands-swiper .swiper-slide {
          height: auto !important;
        }

        .brands-swiper .swiper-wrapper {
          padding: 4px 0 !important;
          align-items: stretch !important;
        }

        .brands-swiper .swiper-button-prev,
        .brands-swiper .swiper-button-next {
          color: #ce1a2a !important;
          background: white !important;
          width: 36px !important;
          height: 36px !important;
          border-radius: 50% !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
          transition: all 0.3s ease !important;
          z-index: 10 !important;
        }

        .brands-swiper .swiper-button-prev:hover,
        .brands-swiper .swiper-button-next:hover {
          background: #ce1a2a !important;
          color: white !important;
          transform: scale(1.05) !important;
        }

        .brands-swiper .swiper-button-prev::after,
        .brands-swiper .swiper-button-next::after {
          font-size: 14px !important;
          font-weight: bold !important;
        }

        .brands-swiper .swiper-pagination-bullet {
          background: #ce1a2a !important;
          opacity: 0.3 !important;
          transition: all 0.3s ease !important;
        }

        .brands-swiper .swiper-pagination-bullet-active {
          opacity: 1 !important;
          width: 20px !important;
          border-radius: 4px !important;
        }

        /* مهم: جلوگیری از overflow سوییپر */
        .brands-swiper .swiper {
          overflow: visible !important;
        }

        /* اطمینان از اینکه سایدبار روی سوییپر نیفتد */
        .lg\\:w-\\[30\\%\\] {
          z-index: 10 !important;
          position: relative !important;
        }

        @media (max-width: 1024px) {
          .brands-swiper .swiper-button-prev,
          .brands-swiper .swiper-button-next {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default CreativeCategoriesSection;
