"use client";

import { formatPersianDate } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";
import { FaCalendar } from "react-icons/fa";
import OptimizedImage from "./OptimizedImage";
import { Autoplay, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState, useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";

export default function NewsSection({
  news,
  saleNews,
}: {
  news: Items[];
  saleNews: Items[];
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);

  // گرفتن عرض صفحه
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // تعیین تعداد اسکلتون برای بخش اخبار براساس عرض صفحه
  const getNewsSkeletonCount = () => {
    if (windowWidth >= 1024) return 3;
    if (windowWidth >= 640) return 2;
    return 1;
  };

  // بعد از لود اولیه، اسکلتون رو مخفی کن
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
      if (swiperRef.current) {
        setTimeout(() => {
          swiperRef.current?.update();
        }, 100);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    if (swiperRef.current) {
      setTimeout(() => {
        swiperRef.current?.update();
      }, 50);
    }
  };

  const newsSkeletonCount = getNewsSkeletonCount();

  return (
    <section className="" aria-labelledby="news-section-title">
      <div className="mx-auto px-4">
        <div className="flex flex-wrap">
          {/* بخش اصلی اخبار */}
          <article className="lg:w-3/4 w-full h-[400px]">
            <div className="p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
              <div className="pr-3">
                <Link href={"/fa/news/اخبار-خودرو.html"}>
                  <h2
                    id="news-section-title"
                    className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]"
                  >
                    آخرین اخبار
                  </h2>
                </Link>
              </div>
            </div>

            {/* اسلایدر Swiper برای اخبار */}
            <div className="lg:pl-2">
              {showSkeleton ? (
                // اسکلتون ریسپانسیو
                <div 
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${newsSkeletonCount}, minmax(0, 1fr))`
                  }}
                >
                  {Array.from({ length: newsSkeletonCount }).map((_, index) => (
                    <div
                      key={index}
                      className="h-72 bg-gray-200 rounded-3xl animate-pulse"
                    />
                  ))}
                </div>
              ) : (
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
                  observer={true}
                  observeParents={true}
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onInit={(swiper) => {
                    setTimeout(() => swiper.update(), 100);
                  }}
                >
                  {news.map((item) => (
                    <SwiperSlide key={item.id}>
                      <Link href={item.url} className="block">
                        <Card
                          hoverable
                          className="rounded-3xl! h-72 overflow-hidden border-none shadow-sm group"
                          cover={
                            <div className="relative h-72 overflow-hidden bg-gray-100">
                              <OptimizedImage
                                src={mainDomainOld + item.image}
                                alt={item.title}
                                className="object-cover group-hover:brightness-75 duration-300"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                loading="lazy"
                                onLoad={handleImageLoad}
                              />
                              <div className="absolute font-bold! bottom-0 right-0 left-0 bg-linear-to-t from-black/70 to-transparent p-4">
                                <span className="text-white! inline-block relative pl-2.5 text-[16px] line-clamp-2! z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 after:bg-[#292929]">
                                  {item.title}
                                </span>
                              </div>
                              <div className="absolute top-3 left-3">
                                <div className="text-white! flex items-center gap-1 text-[10px] bg-black/30 px-2 py-1 rounded-full">
                                  <FaCalendar className="text-[10px]" />
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
              )}
            </div>
          </article>

          {/* بخش شرایط فروش و پیش فروش */}
          <aside
            className="lg:w-1/4 w-full h-[400px]"
            aria-label="شرایط فروش و پیش فروش"
          >
            <div className="mb-2! p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
              <Link href={`/fa/news/${saleNews[0]?.categoryId || ""}`}>
                <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
                  شرایط فروش و پیش فروش
                </h3>
              </Link>
            </div>

            {/* اسلایدر عمودی */}
            {showSkeleton ? (
              <div className="flex flex-col gap-2">
                {[1, 2, 3, 4].map((e) => (
                  <div
                    key={e}
                    className="h-16 bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : (
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
                    observer={true}
                    observeParents={true}
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
            )}
          </aside>
        </div>
      </div>

      <style>{`
        .news-swiper {
          padding: 10px 5px 5px 5px !important;
        }

        .vertical-swiper-container {
          width: 100%;
          height: 292px;
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
          height: 73px !important;
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

        .vertical-sale-swiper .swiper-pagination {
          display: none !important;
        }

        .vertical-sale-swiper {
          overflow: hidden !important;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .news-swiper img {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}