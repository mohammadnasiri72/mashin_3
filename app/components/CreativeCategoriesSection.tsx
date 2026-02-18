"use client";

import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import {
  FaArrowLeftLong,
  FaBuilding,
  FaCar,
  FaBook,
  FaPlay,
} from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { createpublishCode } from "@/utils/func";

function CreativeCategoriesSection({
  brandsAuto,
  carView,
  education,
}: {
  brandsAuto: ItemsCategory[];
  carView: Items[];
  education: Items[];
}) {
  return (
    <div className="mb-16 px-4 mx-auto max-w-7xl">
     

      {/* گرید اصلی سه‌ستونه */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ستون اول - مراکز خدمات خودرو (برندها) */}
        <div className="relative lg:col-span-4 bg-linear-to-br from-[#fff5f7] to-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
          {/* هدر ستون */}
          <div className="bg-[#ce1a2a] p-4 text-white relative overflow-hidden">
            <div className="absolute -left-6 -top-6 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full"></div>
            <h3 className="text-xl font-bold! relative z-10 flex items-center gap-2 text-white!">
              <FaBuilding className="text-2xl" />
              مراکز خدمات خودرو
            </h3>
          </div>

          {/* محتوای ستون */}
          <div className="px-5 pt-5 pb-20">
            {/* اولین آیتم بزرگ ثابت */}
            {brandsAuto.length > 0 && (
              <Link
                href={brandsAuto[0].url}
                className="group/item relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-500 block mb-4"
              >
                <div className="aspect-2/1 flex items-center justify-center p-4">
                  <img
                    src={mainDomainOld + brandsAuto[0].image}
                    alt={brandsAuto[0].title}
                    className="object-contain w-full h-full group-hover/item:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#333] via-transparent to-transparent opacity-0 group-hover/item:opacity-90 transition-opacity duration-500" />
                <h4 className="absolute! bottom-0! right-0! left-0! text-white! font-bold! text-center! p-2! translate-y-full! group-hover/item:-translate-y-full! transition-transform! duration-500! text-sm!">
                  {brandsAuto[0].title}
                </h4>
              </Link>
            )}

            {/* اسلایدر گروهی ۴ تایی (۲ ردیف ۲ تایی) */}
            {brandsAuto.length > 1 && (
              <div className="relative h-[280px]">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={12}
                  slidesPerView={1}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={brandsAuto.slice(1).length > 4}
                  className="brands-grid-swiper h-full"
                  dir="rtl"
                >
                  {/* هر اسلاید شامل ۴ آیتم (۲ ردیف ۲ تایی) */}
                  {Array.from({
                    length: Math.ceil((brandsAuto.length - 1) / 4),
                  }).map((_, pageIndex) => (
                    <SwiperSlide key={pageIndex}>
                      <div className="grid grid-cols-2 gap-3 h-full">
                        {brandsAuto
                          .slice(1 + pageIndex * 4, 5 + pageIndex * 4)
                          .map((brand) => (
                            <Link
                              key={brand.id}
                              href={brand.url}
                              className="group/item relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-500"
                            >
                              <div className="aspect-square flex items-center justify-center p-3">
                                <img
                                  src={mainDomainOld + brand.image}
                                  alt={brand.title}
                                  className="object-contain w-full h-full group-hover/item:scale-110 transition-transform duration-700"
                                />
                              </div>
                              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-0 group-hover/item:opacity-90 transition-opacity duration-500" />
                              <h4 className="absolute! bottom-0! right-0! left-0! text-white! font-bold! text-center! p-1! text-xs! translate-y-full! group-hover/item:-translate-y-full! transition-transform! duration-500!">
                                {brand.title}
                              </h4>
                            </Link>
                          ))}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* لینک نمایش همه */}
            <Link
              href="/autoservices.html"
              className="absolute bottom-5 left-0 flex items-center justify-center gap-2 text-[#ce1a2a]! font-medium hover:gap-3 transition-all duration-300 w-full py-2 border-t border-gray-100"
            >
              مشاهده همه برندها
              <FaArrowLeftLong className="text-sm" />
            </Link>
          </div>
        </div>

        {/* ستون دوم - پربازدیدترین خودروها */}
        <div className="relative lg:col-span-4 bg-linear-to-br from-[#f0f9ff] to-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
          {/* هدر ستون */}
          <div className="bg-[#0a5c8c] p-4 text-white relative overflow-hidden">
            <div className="absolute -left-6 -top-6 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full"></div>
            <h3 className="text-xl font-bold! text-white! relative z-10 flex items-center gap-2">
              <FaCar className="text-2xl" />
              پربازدیدترین خودروها
            </h3>
          </div>

          {/* محتوای ستون */}
          <div className="px-5 pt-5 pb-20">
            {/* اسلایدر عمودی ۶ تایی */}
            {carView.length > 0 && (
              <Swiper
                modules={[Autoplay]}
                direction="vertical"
                spaceBetween={12}
                slidesPerView={6}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={carView.length > 6}
                className="vertical-cars-swiper h-[480px]"
                dir="rtl"
              >
                {carView.map((car, index) => (
                  <SwiperSlide key={car.id}>
                    <Link
                      href={car.url}
                      className="block group/item relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-500"
                    >
                      <div className="flex items-center gap-3 p-3">
                        <div className="w-16 h-full shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                          <img
                            src={mainDomainOld + car.image}
                            alt={car.title}
                            className="object-contain w-full h-full group-hover/item:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#292929] group-hover/item:text-[#0a5c8c] transition-colors duration-300 text-sm line-clamp-2">
                            {car.title}
                          </h4>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs bg-[#0a5c8c]/10 text-[#0a5c8c] px-2 py-0.5 rounded-full">
                              {createpublishCode(car.publishCode)}
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl text-gray-300 group-hover/item:text-[#0a5c8c] transition-colors duration-300">
                          {index + 1}
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#0a5c8c] group-hover/item:w-full transition-all duration-500" />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* لینک نمایش بیشتر */}
            <Link
              href="/searchcars?orderby=8"
              className="absolute bottom-5 left-0 flex items-center justify-center gap-2 text-[#0a5c8c]! font-medium hover:gap-3 transition-all duration-300 w-full py-2 border-t border-gray-100"
            >
              نمایش بیشتر
              <FaArrowLeftLong className="text-sm" />
            </Link>
          </div>
        </div>

        {/* ستون سوم - آموزش‌ها */}
        <div className="relative lg:col-span-4 bg-linear-to-br from-[#f5f3ff] to-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
          {/* هدر ستون */}
          <div className="bg-[#ce1a2a] p-4 text-white relative overflow-hidden">
            <div className="absolute -left-6 -top-6 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full"></div>
            <h3 className="text-xl font-bold! text-white! relative z-10 flex items-center gap-2">
              <FaBook className="text-2xl" />
              آموزش‌های تخصصی
            </h3>
          </div>

          {/* محتوای ستون */}
          <div className="px-5 pt-5 lg:pb-20 pb-10">
            {/* اولین آیتم بزرگ ثابت */}

            {education.length > 0 && (
              <Link
                href={education[0].url}
                className="group/item relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-500 block mb-4"
              >
                <div className="aspect-2/1 flex items-center justify-center">
                  <img
                    src={mainDomainOld + education[0].image}
                    alt={education[0].title}
                    className="object-cover w-full h-full group-hover/item:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#333] via-transparent to-transparent opacity-90 transition-opacity duration-500" />
                <h4 className="absolute! bottom-0! right-0! left-0! text-white! font-bold! text-center! p-2! transition-transform! duration-500! text-sm!">
                  {education[0].title}
                </h4>
              </Link>
            )}

            {/* اسلایدر گروهی ۴ تایی (۲ ردیف ۲ تایی) */}
            {education.length > 1 && (
              <div className="relative h-[280px]">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={12}
                  slidesPerView={1}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={education.slice(1).length > 4}
                  className="brands-grid-swiper h-full"
                  dir="rtl"
                >
                  {/* هر اسلاید شامل ۴ آیتم (۲ ردیف ۲ تایی) */}
                  {Array.from({
                    length: Math.ceil((education.length - 1) / 4),
                  }).map((_, pageIndex) => (
                    <SwiperSlide key={pageIndex}>
                      <div className="grid grid-cols-2 gap-3 h-full">
                        {education
                          .slice(1 + pageIndex * 4, 5 + pageIndex * 4)
                          .map((brand) => (
                            <Link
                              key={brand.id}
                              href={brand.url}
                              className="group/item relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-500"
                            >
                              <div className="aspect-square flex items-center justify-center">
                                <img
                                  src={mainDomainOld + brand.image}
                                  alt={brand.title}
                                  className="object-cover w-full h-full group-hover/item:scale-110 transition-transform duration-700"
                                />
                              </div>
                              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-90 transition-opacity duration-500" />
                              <h4 className="absolute! bottom-0! right-0! left-0! text-white! font-bold! text-center! p-1! text-xs! transition-transform! duration-500!">
                                {brand.title}
                              </h4>
                            </Link>
                          ))}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            <Link
              href="/fa/educationtips/نکات-آموزشی.html"
              className="absolute bottom-5 left-0 flex items-center justify-center gap-2 text-[#ce1a2a]! font-medium hover:gap-3 transition-all duration-300 w-full py-2 border-t border-gray-100"
            >
              مشاهده همه آموزش‌ها
              <FaArrowLeftLong className="text-sm" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* استایل اسلایدر گروهی برای برندها و آموزش‌ها */
        .brands-grid-swiper,
        .education-grid-swiper {
          width: 100%;
        }

        .brands-grid-swiper .swiper-slide,
        .education-grid-swiper .swiper-slide {
          height: 100%;
        }

        /* استایل اسلایدر عمودی برای خودروها */
        .vertical-cars-swiper {
          width: 100%;
        }

        .vertical-cars-swiper .swiper-slide {
          height: auto;
          opacity: 0.9;
          transition: opacity 0.3s;
        }

        .vertical-cars-swiper .swiper-slide:hover {
          opacity: 1;
        }

        /* ریسپانسیو */
        @media (max-width: 1024px) {
          .vertical-cars-swiper {
            height: 400px;
          }

          .brands-grid-swiper,
          .education-grid-swiper {
            height: 240px;
          }
        }
      `}</style>
    </div>
  );
}

export default CreativeCategoriesSection;
