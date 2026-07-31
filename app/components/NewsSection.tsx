"use client";

import { formatPersianDate } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCalendar, FaCircle } from "react-icons/fa";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import OptimizedImage from "./OptimizedImage";

// Import Swiper styles
import "swiper/css";
import NewsListSection from "./NewsListSection";

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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    <section className="" aria-labelledby="news-section-title ">
      <div className="mx-auto px-4 ">
        <div className="flex flex-wrap">
          {/* بخش اصلی اخبار */}
          <article className="lg:w-3/4 w-full">
            <NewsListSection news={news} />
          </article>

          {/* بخش شرایط فروش و پیش فروش */}
          <aside
            className="lg:w-1/4 w-full"
            aria-label="شرایط فروش و پیش فروش"
          >
            <div className="mb-2! p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
              <Link href={`/fa/news/${saleNews[0]?.categoryId || "6593"}/شرایط-فروش-و-پیش-فروش-خودرو.html`}>
                <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
                  شرایط فروش و پیش فروش
                </h3>
              </Link>
            </div>

            {/* اسلایدر عمودی */}
            {showSkeleton ? (
              <div className="flex flex-col gap-2">
                {[1, 2, 3, 4, 5].map((e) => (
                  <div
                    key={e}
                    className="h-14 bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="vertical-swiper-container ">
                {saleNews.length > 0 ? (
                  <Swiper
                    modules={[Autoplay, Mousewheel]}
                    direction="vertical"
                    slidesPerView={5}
                    spaceBetween={0}
                    slidesPerGroup={1}
                    loop={true}
                    autoplay={{
                      delay: 3000,
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
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    onInit={(swiper) => {
                      setTimeout(() => swiper.update(), 100);
                    }}
                  >
                    {saleNews.map((sale, index) => (
                      <SwiperSlide key={sale.id} className="border-b border-[#ce1a2a]">
                        <div
                          className={`px-3  rounded-sm group transition-all cursor-pointer bg-white hover:bg-[#ce1a2a] hover:text-white! border-r-2 duration-300 sale-item ${
                            index === 0
                              ? " border-transparent"
                              : " border-transparent"
                          }`}
                        >
                          <Link
                            href={sale.url}
                            className="text-[#292929]! duration-300 group-hover:text-white! font-medium flex items-start gap-1 text-sm"
                          >
                            <span className="text-[#ce1a2a] group-hover:text-white! text-[8px] animate-pulse mt-1 shrink-0">
                              <FaCircle />
                            </span>
                            <span>{sale.title}</span>
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
          height: 485px;
          overflow: hidden;
          border-radius: 0.5rem;
        }

        .vertical-sale-swiper {
          width: 100%;
          height: 100% !important;
        }

        .vertical-sale-swiper .swiper-wrapper {
          height: 100% !important;
          transition-timing-function: ease-in-out !important;
        }

        .vertical-sale-swiper .swiper-slide {
          height: calc(100% / 5) !important;
          opacity: 0.9;
          transition: opacity 0.3s ease;
          overflow: hidden;
        }

        .sale-item {
          height: 100%;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          border-radius: 6px;
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

        /* ریسپانسیو */
        @media (max-width: 640px) {
          .vertical-swiper-container {
            height: 250px;
          }
          
          .vertical-sale-swiper .swiper-slide {
            height: calc(100% / 4) !important;
          }
        }
      `}</style>
    </section>
  );
}