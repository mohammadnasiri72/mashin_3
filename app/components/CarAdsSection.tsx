"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaLocationDot } from "react-icons/fa6";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CarAdItem {
  id: number;
  image: string;
  alt: string;
  title: string;
  link: string;
  year: string;
  mileage: string;
  transmission: string;
  price: string;
  location: string;
}

interface CarAdsSectionProps {
  ads?: CarAdItem[];
}

const CarAdsSection = ({
  ads = [
    {
      id: 1,
      image: "/images/gallery/auto-7.jpg",
      alt: "شورولت کامارو",
      title: "شورولت کامارو",
      link: "#",
      year: "۲۰۱۶",
      mileage: "۶۵,۰۰۰ km",
      transmission: "دنده ای",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      location: "آمل",
    },
    {
      id: 2,
      image: "/images/gallery/auto-8.jpg",
      alt: "BMW XM",
      title: "BMW XM",
      link: "#",
      year: "۲۰۱۶",
      mileage: "۶۵,۰۰۰ km",
      transmission: "دنده ای",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      location: "آمل",
    },
    {
      id: 3,
      image: "/images/gallery/auto-9.jpg",
      alt: "پژو 405 GLX",
      title: "پژو 405 GLX",
      link: "#",
      year: "۲۰۱۶",
      mileage: "۶۵,۰۰۰ km",
      transmission: "دنده ای",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      location: "آمل",
    },
    {
      id: 4,
      image: "/images/gallery/auto-10.jpg",
      alt: "L90",
      title: "L90",
      link: "#",
      year: "۲۰۱۶",
      mileage: "۶۵,۰۰۰ km",
      transmission: "دنده ای",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      location: "آمل",
    },
    {
      id: 5,
      image: "/images/gallery/auto-9.jpg",
      alt: "پژو 405 GLX",
      title: "پژو 405 GLX",
      link: "#",
      year: "۲۰۱۶",
      mileage: "۶۵,۰۰۰ km",
      transmission: "دنده ای",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      location: "آمل",
    },
  ],
}: CarAdsSectionProps) => {
  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState<number>(4);
  const [totalGroups, setTotalGroups] = useState<number>(0);
  const swiperRef = useRef<any>(null);

  // محاسبه totalGroups بر اساس slidesPerView فعلی
  useEffect(() => {
    if (ads.length > 0 && currentSlidesPerView > 0) {
      // در حالت loop، از طول اصلی آگهی‌ها استفاده می‌کنیم
      const actualAdsCount = ads.length;
      const groups = Math.ceil(actualAdsCount / currentSlidesPerView);
      setTotalGroups(groups);
    }
  }, [ads.length, currentSlidesPerView]);

  const handleGroupClick = (groupIndex: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const targetSlide = groupIndex * currentSlidesPerView;
      swiperRef.current.swiper.slideTo(targetSlide);
      setCurrentGroup(groupIndex);
    }
  };

  const handleSlideChange = (swiper: any) => {
    // استفاده از realIndex برای حالت loop
    const realIndex = swiper.realIndex ?? swiper.activeIndex;
    
    if (currentSlidesPerView > 0 && totalGroups > 0) {
      const newGroup = Math.floor(realIndex / currentSlidesPerView);
      setCurrentGroup(newGroup % totalGroups); // برای اطمینان از محدوده معتبر
    }
  };

  const handleBreakpointChange = (swiper: any) => {
    const slidesPerView = swiper.params.slidesPerView;
    setCurrentSlidesPerView(slidesPerView);

    // محاسبه مجدد گروه فعلی پس از تغییر breakpoint
    const realIndex = swiper.realIndex ?? swiper.activeIndex;
    const actualAdsCount = ads.length;
    const newTotalGroups = Math.ceil(actualAdsCount / slidesPerView);
    
    if (newTotalGroups > 0) {
      const newGroup = Math.floor(realIndex / slidesPerView) % newTotalGroups;
      setCurrentGroup(newGroup);
      setTotalGroups(newTotalGroups);
    }
  };

  // مقداردهی اولیه
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const initialSlidesPerView = swiperRef.current.swiper.params.slidesPerView;
      setCurrentSlidesPerView(initialSlidesPerView);
      
      const actualAdsCount = ads.length;
      const initialTotalGroups = Math.ceil(actualAdsCount / initialSlidesPerView);
      setTotalGroups(initialTotalGroups);
    }
  }, [ads.length]);

  return (
    <div className="mb-5 bg-white pt-5 pb-5">
      <div className="mx-auto px-4">
        {/* هدر بخش */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-4">
          <div className="sm:w-auto w-full p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
            <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
              آگهی فروش خودرو
            </h3>
          </div>

          <Link
            href="#"
            className="text-[#ce1a2a]! text-sm font-medium flex items-center gap-2"
          >
            نمایش بیشتر
            <FaArrowLeft className="text-xs" />
          </Link>
        </div>

        {/* اسلایدر آگهی‌ها */}
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          onSlideChange={handleSlideChange}
          onBreakpoint={handleBreakpointChange}
          className="agahi-swiper"
          dir="rtl"
        >
          {ads.map((ad) => (
            <SwiperSlide key={ad.id}>
              <div className="agahi-box bg-gray-50 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
                {/* بخش تصویر */}
                <div className="img-box mb-3 relative overflow-hidden rounded-xl">
                  <Link href={ad.link}>
                    <div className="relative aspect-5/3 w-full">
                      <Image
                        src={ad.image}
                        alt={ad.alt}
                        width={300}
                        height={225}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  {/* آیکون ماشین */}
                  <span className="absolute top-0 left-3 w-6 h-7">
                    <Image
                      src="/images/icons/mashin3-icon.png"
                      alt="car icon"
                      width={24}
                      height={28}
                      className="w-full h-full object-contain"
                    />
                  </span>
                </div>

                {/* عنوان خودرو */}
                <h3 className="mb-2">
                  <Link
                    href={ad.link}
                    className="text-gray-900 font-bold text-base hover:text-[#ce1a2a] transition-colors"
                  >
                    {ad.title}
                  </Link>
                </h3>

                {/* مشخصات خودرو */}
                <div className="dt-ag mb-3 flex gap-4 text-xs text-gray-700 font-semibold">
                  <div className="relative">
                    {ad.year}
                    <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-[8px]">
                      ■
                    </span>
                  </div>
                  <div className="relative">
                    {ad.mileage}
                    <span className="absolute -left-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-[8px]">
                      ■
                    </span>
                  </div>
                  <div>{ad.transmission}</div>
                </div>

                {/* قیمت و موقعیت */}
                <div className="mr-ag flex justify-between items-center">
                  <div className="price-ag flex items-center gap-1 text-gray-900 font-bold text-sm">
                    <Image
                      src="/images/icons/toman.png"
                      alt="تومان"
                      width={12}
                      height={8}
                      className="w-3 h-2"
                    />
                    {ad.price}
                  </div>
                  <div className="loc-ag flex items-center gap-1 text-gray-600 text-xs font-semibold">
                    <FaLocationDot className="text-gray-400 text-[10px]" />
                    {ad.location}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination زیر اسلایدر - فقط زمانی نمایش داده شود که بیش از یک گروه وجود دارد */}
        {totalGroups > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalGroups }, (_, index) => (
              <button
                key={index}
                className={`custom-pagination-bullet ${
                  currentGroup === index ? "custom-pagination-bullet-active" : ""
                }`}
                onClick={() => handleGroupClick(index)}
                aria-label={`صفحه ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .agahi-swiper {
          padding: 10px 5px 10px 5px;
        }

        .agahi-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .agahi-box {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* استایل برای جداکننده‌های مشخصات */
        .dt-ag > div:first-child::before {
          display: none;
        }

        .dt-ag > div:not(:first-child)::before {
          content: "■";
          color: #747474;
          font-size: 8px;
          margin-left: 8px;
          margin-right: 8px;
        }

        /* استایل‌های سفارشی برای Pagination */
        .custom-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: #e0e0e0;
          border-radius: 2px;
          cursor: pointer;
          transition: all 300ms ease;
          border: none;
          outline: none;
        }

        .custom-pagination-bullet-active {
          background-color: #ce1a2a;
          width: 24px;
          border-radius: 2px;
        }

        .custom-pagination-bullet:hover {
          background-color: #ce1a2a;
          opacity: 0.7;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .agahi-swiper {
            padding: 5px;
          }

          .dt-ag {
            gap: 12px;
          }

          .dt-ag > div:not(:first-child)::before {
            margin-left: 6px;
            margin-right: 6px;
          }

          .custom-pagination-bullet {
            width: 6px;
            height: 6px;
          }

          .custom-pagination-bullet-active {
            width: 18px;
          }
        }

        @media (max-width: 480px) {
          .mr-ag {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }

          .loc-ag {
            align-self: flex-end;
          }

          .custom-pagination-bullet {
            width: 4px;
            height: 4px;
          }

          .custom-pagination-bullet-active {
            width: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default CarAdsSection;