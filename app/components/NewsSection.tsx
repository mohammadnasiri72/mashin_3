"use client";

import { formatPersianDate } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";
import { FaCalendar } from "react-icons/fa";
import { Autoplay, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export default function NewsSection({
  news,
  saleNews,
}: {
  news: Items[];
  saleNews: Items[];
}) {
  return (
    <div className="mb-12">
      <div className="mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="lg:w-3/4 w-full">
            <div className=" p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
              <div className="pr-3">
                <Link href={"/fa/news/اخبار-خودرو.html"}>
                  <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
                    آخرین اخبار
                  </h3>
                </Link>
              </div>
            </div>
            {/* اسلایدر Swiper برای اخبار */}
            <div className="lg:pl-2">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView={1}
                loop={true}
                navigation={false}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                  },
                }}
                className="news-swiper"
              >
                {news.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Link href={item.url}>
                      <Card
                        hoverable
                        className="rounded-3xl! h-72 overflow-hidden border-none shadow-sm group"
                        cover={
                          <div className="relative h-72 overflow-hidden">
                            <img
                              src={mainDomainOld + item.image}
                              alt={item.title}
                              className="object-cover w-full h-full group-hover:brightness-75 duration-300"
                            />
                            <div className="absolute font-bold! bottom-0 right-0 left-0 bg-linear-to-t from-black/70 to-transparent p-4">
                              <span className="text-white! inline-block relative pl-2.5 text-[16px] line-clamp-2! z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 after:bg-[#292929]">
                                {item.title}
                              </span>
                            </div>
                            <div className="absolute top-3 left-3">
                              <div className="text-white! flex items-center gap-1 text-[10px]">
                                <FaCalendar className="" />
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
            </div>
          </div>

          {/* بخش شرایط فروش و پیش فروش - اسلایدر عمودی */}
          <div className="lg:w-1/4 w-full lg:mt-0 mt-8">
            <div className="mb-2! p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
              <Link href={`/fa/news/${saleNews[0].categoryId}`}>
                <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
                  شرایط فروش و پیش فروش
                </h3>
              </Link>
            </div>

            {/* اسلایدر عمودی با ارتفاع دقیق برای 4 آیتم */}
            <div className="vertical-swiper-container">
              {saleNews.length > 0 ? (
                <Swiper
                  modules={[Autoplay, Mousewheel]}
                  direction="vertical"
                  slidesPerView={4}
                  spaceBetween={0}
                  slidesPerGroup={1}
                  loop={false}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  speed={600}
                  mousewheel={{
                    sensitivity: 1,
                    forceToAxis: true,
                  }}
                  className="vertical-sale-swiper"
                >
                  {saleNews.map((sale, index) => (
                    <SwiperSlide key={sale.id}>
                      <div
                        className={`p-4 rounded-sm group transition-all cursor-pointer bg-white hover:bg-[#ce1a2a] hover:text-white! border-r-2 duration-300 sale-item ${
                          index === 0
                            ? " border-[#ce1a2a]"
                            : " border-transparent"
                        }`}
                      >
                        <Link
                          href={sale.url}
                          className="text-[#292929]! duration-300 group-hover:text-white! font-medium block line-clamp-1"
                        >
                          {sale.title}
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                  <p className="text-gray-500">موردی برای نمایش وجود ندارد</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* استایل‌های سفارشی */}
      <style jsx global>{`
        /* استایل‌های اسلایدر اخبار */
        .news-swiper {
          padding: 10px 5px 5px 5px !important;
        }

        /* استایل‌های اسلایدر عمودی - نمایش دقیق 4 آیتم */
        .vertical-swiper-container {
          width: 100%;
          height: 292px; /* ارتفاع دقیق برای 4 آیتم */
          overflow: hidden;
          border-radius: 0.5rem;
        }

        .vertical-sale-swiper {
          width: 100%;
          height: 100% !important;
        }

        .vertical-sale-swiper .swiper-wrapper {
          height: 100% !important;
        }

        .vertical-sale-swiper .swiper-slide {
          height: 73px !important; /* 292px / 4 = 73px */
          opacity: 0.9;
          transition: opacity 0.3s ease;
          overflow: hidden;
        }

        .sale-item {
          height: 73px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
        }

        .vertical-sale-swiper .swiper-slide:hover {
          opacity: 1;
        }

        .vertical-sale-swiper .swiper-slide-active {
          opacity: 1;
        }

        /* حذف کامل بولت‌ها */
        .vertical-sale-swiper .swiper-pagination {
          display: none !important;
        }

        /* مخفی کردن اسکرول بار اما حفظ قابلیت اسکرول */
        .vertical-sale-swiper {
          overflow: hidden !important;
        }

        /* تنظیمات ریسپانسیو */
        @media (max-width: 1024px) {
          .vertical-swiper-container {
            height: 292px;
          }

          .vertical-sale-swiper .swiper-slide {
            height: 73px !important;
          }

          .sale-item {
            height: 73px;
          }
        }

        @media (max-width: 768px) {
          .vertical-swiper-container {
            height: 292px;
          }

          .vertical-sale-swiper .swiper-slide {
            height: 73px !important;
          }

          .sale-item {
            height: 73px;
          }
        }

        @media (max-width: 640px) {
          .vertical-swiper-container {
            height: 292px;
          }

          .vertical-sale-swiper .swiper-slide {
            height: 73px !important;
          }

          .sale-item {
            height: 73px;
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
