"use client";

import { mainDomainOld } from "@/utils/mainDomain";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from 'swiper';

const CarSpecsSection = ({
  carSpecs,
  Properties,
}: {
  carSpecs: Items[];
  Properties: properties[];
}) => {
  const swiperRef = useRef<any>(null);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [swiperReady, setSwiperReady] = useState(false);

  // بعد از لود اولیه، اسکلتون رو مخفی کن
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
      // یه کمی صبر کن بعد بگو Swiper آماده است
      setTimeout(() => {
        setSwiperReady(true);
        if (swiperRef.current?.swiper) {
          swiperRef.current.swiper.update();
        }
      }, 100);
    }, 800); // 800 میلی‌ثانیه صبر کن

    return () => clearTimeout(timer);
  }, []);

  const handlePrev = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <section className="bg-white mb-5 pt-8 mt-24 shadow-sm relative" aria-labelledby="car-specs-title">
      <div className="mx-auto">
        {/* هدر بخش - همیشه نمایش داده میشه */}
        <div className="flex flex-col-reverse lg:flex-row items-start">
          {/* بخش عنوان و لوگو - سمت راست */}
          <div className="w-full lg:w-1/4 flex flex-col items-center lg:items-start lg:pr-8 order-2 lg:order-1">
            <div className="relative w-full flex justify-start lg:justify-center">
              <div className="absolute -top-20 lg:-top-24">
                <Image
                  src="/images/gallery/gear.png"
                  alt="مشخصات فنی خودرو"
                  width={160}
                  height={160}
                  className="w-52 lg:w-40 h-auto"
                  priority
                />
              </div>
            </div>

            <div className="sm:mt-0 lg:mt-32 mt-32 text-center lg:text-center w-full">
              <h2 id="car-specs-title" className="text-gray-900 text-lg">
                ماشین
                <br />
                <strong className="text-2xl font-bold">
                  و <span className="text-red-600">مشخصات فنی</span> خودرو
                </strong>
              </h2>

              {/* دکمه‌های ناوبری - فقط وقتی Swiper آماده باشه فعال میشن */}
              <div className="flex gap-2 justify-center lg:justify-center mt-6">
                <button
                  aria-label="بعدی"
                  onClick={handleNext}
                  disabled={!swiperReady}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white! transition-colors ${
                    swiperReady 
                      ? 'cursor-pointer bg-[#c2c2c2] hover:bg-[#ce1a2a]' 
                      : 'bg-gray-300 cursor-not-allowed opacity-50'
                  }`}
                >
                  <FaArrowRightLong />
                </button>
                <button
                  aria-label="قبلی"
                  onClick={handlePrev}
                  disabled={!swiperReady}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white! transition-colors ${
                    swiperReady 
                      ? 'cursor-pointer bg-[#c2c2c2] hover:bg-[#ce1a2a]' 
                      : 'bg-gray-300 cursor-not-allowed opacity-50'
                  }`}
                >
                  <FaArrowLeftLong />
                </button>
              </div>
            </div>
          </div>

          {/* بخش اسلایدر - سمت چپ */}
          <div
            dir="rtl"
            className="w-full lg:w-3/4 lg:mb-0 order-1 lg:order-2"
          >
            {showSkeleton ? (
              /* اسکلتون */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-[500px]">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-2xl p-4 animate-pulse h-[480px]">
                    <div className="bg-gray-200 rounded-xl h-52 mb-3"></div>
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="bg-gray-200 rounded-lg h-20"></div>
                      ))}
                    </div>
                    <div className="h-10 bg-gray-200 rounded-lg mt-3"></div>
                  </div>
                ))}
              </div>
            ) : (
              /* اسلایدر اصلی */
              <Swiper
                ref={swiperRef}
                modules={[Autoplay, Navigation]}
                spaceBetween={16}
                slidesPerView={1.5}
                initialSlide={0}
                breakpoints={{
                  640: {
                    slidesPerView: 1.5,
                  },
                  768: {
                    slidesPerView: 2.2,
                  },
                  1024: {
                    slidesPerView: 3.2,
                  },
                  1280: {
                    slidesPerView: 3.4,
                  },
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                className="car-specs-swiper"
                onInit={(swiper) => {
                  setTimeout(() => {
                    swiper.update();
                    setSwiperReady(true);
                  }, 100);
                }}
                observer={true}
                observeParents={true}
              >
                {carSpecs.map((car) => {
                  const propertyCar = Properties.filter(
                    (e) => e.itemId === car.id,
                  )
                    .filter((e) => e.isTechnicalProperty)
                    .slice(0, 4);
                  
                  return (
                    <SwiperSlide key={car.id}>
                      <div className="bg-gray-100 rounded-2xl p-4 h-[480px]">
                        {/* تصویر خودرو */}
                        <div className="relative rounded-xl overflow-hidden mb-3 h-52 bg-gray-100">
                          <Link href={car.url}>
                            <div className="relative w-full h-full">
                              <img
                                src={mainDomainOld + car.image}
                                alt={car.title}
                                className="object-contain w-full h-full"
                                loading="lazy"
                              />
                            </div>
                          </Link>
                          <div className="absolute bottom-2 right-2">
                            <div className="pr-3">
                              <h3 className="text-black! font-bold! inline-block relative text-xl z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 after:bg-[#ce1a2a55]">
                                {car.title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        {/* مشخصات فنی */}
                        <div className="grid grid-cols-2 gap-2">
                          {propertyCar.map((spec, index) => (
                            <div
                              key={index}
                              className="flex items-center bg-white rounded-lg p-2 h-20"
                            >
                              <div className="text-xs">
                                <div className="font-bold text-gray-900">
                                  {spec.propertyValue}
                                </div>
                                <div className="text-gray-500 text-[10px]">
                                  {spec.title}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* دکمه نمایش بیشتر */}
                        <Link
                          href={car.url}
                          className="flex items-center justify-center gap-1 text-center py-2 text-[#ce1a2a]! text-sm mt-3 rounded-lg hover:bg-[#ce1a2a] hover:text-white! transition-colors duration-300 font-medium"
                        >
                          <span>نمایش بیشتر</span>
                          <FaArrowLeftLong />
                        </Link>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .car-specs-swiper {
          padding: 10px 5px 30px 5px;
        }

        .car-specs-swiper .swiper-slide {
          direction: rtl;
          height: auto !important;
        }

        .car-specs-swiper .swiper-button-next,
        .car-specs-swiper .swiper-button-prev {
          display: none;
        }

        .car-specs-swiper .swiper-wrapper {
          align-items: stretch;
        }

        /* انیمیشن اسکلتون */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .bg-gray-100 {
          background-color: #f3f4f6;
        }
        
        .bg-gray-200 {
          background-color: #e5e7eb;
        }

        .h-52 {
          height: 13rem !important;
        }

        .h-\[480px\] {
          height: 480px !important;
        }

        .h-\[500px\] {
          height: 500px !important;
        }
      `}</style>
    </section>
  );
};

export default CarSpecsSection;