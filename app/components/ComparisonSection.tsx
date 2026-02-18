"use client";

import React from "react";
import { formatPersianDate } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";
import { FaCalendar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

function ComparisonSection({
  news,
  compare,
  bestChoices,
}: {
  news: Items[];
  compare: Items[];
  bestChoices: Items[];
}) {
  return (
    <div className="mb-12 px-4">
      <div className="flex flex-wrap -mx-3">
        {/* اسلایدر سمت راست - News با عرض 1/2 */}
        <div className="lg:w-1/2 w-full px-3">
          <div className="mb-2! p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
            <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
              لینک‌های اینستاگرام
            </h3>
          </div>

          <div className="mt-3 h-full">
            {news.length > 0 ? (
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                speed={1000}
                fadeEffect={{
                  crossFade: true,
                }}
                className="news-fade-swiper h-full"
              >
                {news.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Link href={item.url}>
                      <Card
                        hoverable
                        className="rounded-3xl! h-[300px] overflow-hidden border-none shadow-sm group"
                        cover={
                          <div className="relative h-[300px] overflow-hidden">
                            <img
                              src={mainDomainOld + item.image}
                              alt={item.title}
                              className="object-cover w-full h-full group-hover:scale-110 duration-700"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                            <div className="absolute font-bold! bottom-0 right-0 left-0 p-6">
                              <span className="text-white! inline-block relative text-xl lg:text-2xl mb-2 line-clamp-2! z-10">
                                {item.title}
                              </span>
                              <div className="flex items-center gap-4 text-white/80 text-sm">
                                <div className="flex items-center gap-1">
                                  <FaCalendar />
                                  {formatPersianDate(item.created)}
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-3xl">
                <p className="text-gray-500">موردی برای نمایش وجود ندارد</p>
              </div>
            )}
          </div>
        </div>

        {/* اسلایدرهای سمت چپ - Compare و BestChoices با عرض 1/4 هر کدام */}
        <div className="lg:w-1/2 w-full px-3 lg:mt-0 mt-8">
          <div className="flex flex-wrap -mx-3">
            {/* اسلایدر Compare */}
            <div className="md:w-1/2 w-full px-3">
              <div className="mb-2! p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
                <Link href={"/whichcars.html"}>
                  <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
                    مقایسه ها
                  </h3>
                </Link>
              </div>

              <div className="mt-3">
                {compare.length > 0 ? (
                  <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      delay: 3500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    speed={1000}
                    fadeEffect={{
                      crossFade: true,
                    }}
                    className="compare-fade-swiper"
                  >
                    {compare.map((item) => (
                      <SwiperSlide key={item.id}>
                        <Link href={item.url}>
                          <Card
                            hoverable
                            className="rounded-3xl! h-[300px] overflow-hidden border-none shadow-sm group"
                            cover={
                              <div className="relative h-[300px] overflow-hidden">
                                <img
                                  src={mainDomainOld + item.image}
                                  alt={item.title}
                                  className="object-cover w-full h-full group-hover:scale-110 duration-700"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                                <div className="absolute font-bold! bottom-0 right-0 left-0 p-4">
                                  <span className="text-white! inline-block relative text-base lg:text-lg mb-1 line-clamp-2! z-10">
                                    {item.title}
                                  </span>
                                  <div className="flex items-center gap-2 text-white/80 text-xs">
                                    <FaCalendar />
                                    {formatPersianDate(item.created)}
                                  </div>
                                </div>
                              </div>
                            }
                          />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-3xl">
                    <p className="text-gray-500">موردی برای نمایش وجود ندارد</p>
                  </div>
                )}
              </div>
            </div>

            {/* اسلایدر Best Choices */}
            <div className="md:w-1/2 w-full px-3 md:mt-0 mt-8">
              <div className="mb-2! p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
                <Link href={"/best-choices.html"}>
                  <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
                    بهترین انتخاب ها
                  </h3>
                </Link>
              </div>

              <div className="mt-3">
                {bestChoices.length > 0 ? (
                  <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    speed={1000}
                    fadeEffect={{
                      crossFade: true,
                    }}
                    className="best-fade-swiper"
                  >
                    {bestChoices.map((item) => (
                      <SwiperSlide key={item.id}>
                        <Link href={item.url}>
                          <Card
                            hoverable
                            className="rounded-3xl! h-[300px] overflow-hidden border-none shadow-sm group"
                            cover={
                              <div className="relative h-[300px] overflow-hidden">
                                <img
                                  src={mainDomainOld + item.image}
                                  alt={item.title}
                                  className="object-cover w-full h-full group-hover:scale-110 duration-700"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                                <div className="absolute font-bold! bottom-0 right-0 left-0 p-4">
                                  <span className="text-white! inline-block relative text-base lg:text-lg mb-1 line-clamp-2! z-10">
                                    {item.title}
                                  </span>
                                  <div className="flex items-center gap-2 text-white/80 text-xs">
                                    <FaCalendar />
                                    {formatPersianDate(item.created)}
                                  </div>
                                </div>
                              </div>
                            }
                          />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-3xl">
                    <p className="text-gray-500">موردی برای نمایش وجود ندارد</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* استایل‌های سفارشی */}
      <style jsx global>{`
        /* استایل‌های مشترک برای همه اسلایدرها */
        .news-fade-swiper,
        .compare-fade-swiper,
        .best-fade-swiper {
          width: 100%;
          height: 100%;
          border-radius: 1.5rem;
        }

        /* تنظیمات افکت fade */
        .swiper-fade .swiper-slide {
          transition-property: opacity;
        }

        .swiper-fade .swiper-slide-active {
          opacity: 1;
        }

        /* حذف navigation و pagination */
        .news-fade-swiper .swiper-button-next,
        .news-fade-swiper .swiper-button-prev,
        .news-fade-swiper .swiper-pagination,
        .compare-fade-swiper .swiper-button-next,
        .compare-fade-swiper .swiper-button-prev,
        .compare-fade-swiper .swiper-pagination,
        .best-fade-swiper .swiper-button-next,
        .best-fade-swiper .swiper-button-prev,
        .best-fade-swiper .swiper-pagination {
          display: none !important;
        }

        /* تنظیمات ارتفاع یکسان برای همه اسلایدرها */
        .news-fade-swiper .swiper-slide > a > div,
        .news-fade-swiper .swiper-slide > a > div > div,
        .compare-fade-swiper .swiper-slide > a > div,
        .compare-fade-swiper .swiper-slide > a > div > div,
        .best-fade-swiper .swiper-slide > a > div,
        .best-fade-swiper .swiper-slide > a > div > div {
          height: 300px !important;
        }

        /* تنظیمات ریسپانسیو برای موبایل */
        @media (max-width: 768px) {
          .news-fade-swiper .swiper-slide > a > div,
          .news-fade-swiper .swiper-slide > a > div > div,
          .compare-fade-swiper .swiper-slide > a > div,
          .compare-fade-swiper .swiper-slide > a > div > div,
          .best-fade-swiper .swiper-slide > a > div,
          .best-fade-swiper .swiper-slide > a > div > div {
            height: 250px !important;
          }
        }

        @media (max-width: 640px) {
          .news-fade-swiper .swiper-slide > a > div,
          .news-fade-swiper .swiper-slide > a > div > div,
          .compare-fade-swiper .swiper-slide > a > div,
          .compare-fade-swiper .swiper-slide > a > div > div,
          .best-fade-swiper .swiper-slide > a > div,
          .best-fade-swiper .swiper-slide > a > div > div {
            height: 220px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ComparisonSection;
