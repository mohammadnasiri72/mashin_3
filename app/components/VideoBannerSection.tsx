"use client";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

const VideoBannerSection = ({ video }: { video: Items[] }) => {
  return (
    <>
      <div className="mx-auto px-4">
        <div className="flex sm:flex-row flex-col justify-between items-center mb-4">
          <div className=" sm:w-auto w-full px-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
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
            >
              {video.map((v) => (
                <SwiperSlide key={v.id}>
                  <div className="w-full relative overflow-hidden rounded-2xl shadow-lg h-80 cursor-pointer group">
                    <Link href={v.url} className="h-full w-full block">
                      <div className="relative h-full w-full">
                        <img
                          src={mainDomainOld + v.image}
                          alt={v.title}
                          className="object-cover h-full w-full bg-slate-300 transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-black/70 text-white p-4 rounded-full text-2xl group-hover:bg-[#ce1a2a] transition-colors duration-300">
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
          ) : (
            <div className="flex items-center justify-center h-80 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">ویدیویی برای نمایش وجود ندارد</p>
            </div>
          )}
        </div>
      </div>

      {/* استایل‌های سفارشی */}
      <style jsx global>{`
        .video-swiper {
          padding: 10px 5px 5px 5px !important;
        }
        
        .video-swiper .swiper-slide {
          transition: opacity 0.3s ease;
        }
        
        .video-swiper .swiper-slide:hover {
          opacity: 1;
        }
        
        /* حذف navigation و pagination */
        .video-swiper .swiper-button-next,
        .video-swiper .swiper-button-prev,
        .video-swiper .swiper-pagination {
          display: none !important;
        }
        
        /* تنظیمات ریسپانسیو برای ارتفاع */
        @media (max-width: 640px) {
          .video-swiper .swiper-slide > div {
            height: 280px;
          }
        }
      `}</style>
    </>
  );
};

export default VideoBannerSection;