"use client";

import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import "swiper/css";

const VideoBannerSection = ({ video }: { video: Items[] }) => {
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

  // تعیین تعداد اسکلتون براساس عرض صفحه
  const getSkeletonCount = () => {
    if (windowWidth >= 1024) return 4;
    if (windowWidth >= 768) return 3;
    if (windowWidth >= 640) return 2;
    return 1;
  };

  // بعد از لود اولیه، اسکلتون رو مخفی کن
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
      // آپدیت Swiper بعد از مخفی شدن اسکلتون
      if (swiperRef.current) {
        setTimeout(() => {
          swiperRef.current?.update();
        }, 100);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const skeletonCount = getSkeletonCount();

  return (
    <section className="mx-auto" aria-label="فیلم‌های تست و بررسی خودرو">
      <div className="mx-auto px-4">
        <div className="flex sm:flex-row flex-col justify-between items-center mb-4">
          <div className="sm:w-auto w-full px-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
            <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
              فیلم های تست و بررسی خودرو
            </h3>
          </div>

          <Link
            href="/videos.html"
            className="text-[#ce1a2a]! text-sm flex items-center gap-1"
          >
            نمایش بیشتر
            <FaArrowLeftLong />
          </Link>
        </div>
      </div>

      <div className="mb-5 px-3">
        <div className="relative">
          {video.length > 0 ? (
            <>
              {/* اسکلتون - فقط وقتی showSkeleton=true نمایش بده */}
              {showSkeleton && (
                <div 
                  className="grid gap-4"
                  style={{
                    gridTemplateColumns: `repeat(${skeletonCount}, minmax(0, 1fr))`
                  }}
                >
                  {Array.from({ length: skeletonCount }).map((_, index) => (
                    <div key={index} className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
                  ))}
                </div>
              )}

              {/* اسلایدر اصلی - با کلاس شرطی برای مخفی شدن در زمان نمایش اسکلتون */}
              <div className={showSkeleton ? 'hidden' : 'block'}>
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={16}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  speed={800}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 16,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 16,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 16,
                    },
                  }}
                  className="video-swiper"
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  onInit={(swiper) => {
                    setTimeout(() => swiper.update(), 200);
                  }}
                  observer={true}
                  observeParents={true}
                >
                  {video.map((v) => (
                    <SwiperSlide key={v.id}>
                      <div className="w-full relative overflow-hidden rounded-2xl shadow-lg h-80 cursor-pointer group">
                        <Link href={v.url} className="h-full w-full block">
                          <div className="relative h-full w-full bg-gray-100">
                            <img
                              src={mainDomainOld + v.image}
                              alt={v.title}
                              className="object-cover h-full w-full bg-gray-100 transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-black/70 text-white! p-4 rounded-full text-2xl group-hover:bg-[#ce1a2a] transition-colors duration-300">
                              <FaPlay />
                            </div>
                          </div>
                        </Link>
                        <div className="absolute bottom-0 right-0 left-0 z-20">
                          <div className="titleBox pink_Highlight pr-3 pb-3">
                            <h3 className="text-white! font-bold! inline-block relative lg:text-2xl text-lg z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 after:bg-[#ce1a2a] line-clamp-1">
                              {v.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-80 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">ویدیویی برای نمایش وجود ندارد</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .video-swiper {
          padding: 10px 5px 5px 5px !important;
        }
        
        .video-swiper .swiper-slide {
          height: 320px !important;
        }
        
        .video-swiper .swiper-button-next,
        .video-swiper .swiper-button-prev,
        .video-swiper .swiper-pagination {
          display: none !important;
        }
        
        .video-swiper .swiper-slide > div {
          height: 320px !important;
        }
        
        .video-swiper img {
          width: 100%;
          height: 100% !important;
          object-fit: cover;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .hidden {
          display: none !important;
        }
        
        .block {
          display: block !important;
        }
        
        .grid {
          display: grid;
        }
      `}</style>
    </section>
  );
};

export default VideoBannerSection;