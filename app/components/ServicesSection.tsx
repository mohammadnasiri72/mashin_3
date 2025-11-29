"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ServiceItem {
  id: number;
  image: string;
  alt: string;
  title: string;
  step: number;
}

interface ServicesSectionProps {
  services?: ServiceItem[];
}

const ServicesSection = ({
  services = [
    {
      id: 1,
      image: "/images/gallery/service-1.jpg",
      alt: "کارواش در محل",
      title: "کارواش در محل",
      step: 1,
    },
    {
      id: 2,
      image: "/images/gallery/service-2.jpg",
      alt: "تعویض روغن",
      title: "تعویض روغن",
      step: 2,
    },
    {
      id: 3,
      image: "/images/gallery/service-3.jpg",
      alt: "شرکت های خودرویی",
      title: "شرکت های خودرویی",
      step: 3,
    },
    {
      id: 4,
      image: "/images/gallery/service-4.jpg",
      alt: "اپلیکیشن خودرو",
      title: "اپلیکیشن خودرو",
      step: 4,
    },
    {
      id: 5,
      image: "/images/gallery/service-1.jpg",
      alt: "کارواش در محل",
      title: "کارواش در محل",
      step: 1,
    },
  ],
}: ServicesSectionProps) => {
  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState<number>(4);
  const [totalGroups, setTotalGroups] = useState<number>(0);
  const swiperRef = useRef<any>(null);

  // محاسبه totalGroups بر اساس slidesPerView فعلی
  useEffect(() => {
    if (services.length > 0 && currentSlidesPerView > 0) {
      // در حالت loop، Swiper اسلایدها را duplicate می‌کند، بنابراین از طول اصلی استفاده می‌کنیم
      const actualSlidesCount = services.length;
      const groups = Math.ceil(actualSlidesCount / currentSlidesPerView);
      setTotalGroups(groups);
    }
  }, [services.length, currentSlidesPerView]);

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
    
    if (currentSlidesPerView > 0) {
      const newGroup = Math.floor(realIndex / currentSlidesPerView);
      setCurrentGroup(newGroup % totalGroups); // برای اطمینان از محدوده معتبر
    }
  };

  const handleBreakpointChange = (swiper: any) => {
    const slidesPerView = swiper.params.slidesPerView;
    setCurrentSlidesPerView(slidesPerView);

    // محاسبه مجدد گروه فعلی پس از تغییر breakpoint
    const realIndex = swiper.realIndex ?? swiper.activeIndex;
    const actualSlidesCount = services.length;
    const newTotalGroups = Math.ceil(actualSlidesCount / slidesPerView);
    
    if (newTotalGroups > 0) {
      const newGroup = Math.floor(realIndex / slidesPerView) % newTotalGroups;
      setCurrentGroup(newGroup);
    }
  };

  // مقداردهی اولیه
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const initialSlidesPerView = swiperRef.current.swiper.params.slidesPerView;
      setCurrentSlidesPerView(initialSlidesPerView);
      
      const actualSlidesCount = services.length;
      const initialTotalGroups = Math.ceil(actualSlidesCount / initialSlidesPerView);
      setTotalGroups(initialTotalGroups);
    }
  }, [services.length]);

  return (
    <div className="mb-5 pt-3 pb-3">
      <div className="mx-auto px-4">
        {/* هدر بخش */}
        <div className="flex sm:flex-row flex-col justify-between items-center mb-5 gap-4">
          <div className="sm:w-auto w-full p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
            <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
              خدمات  <span className="text-[#ce1a2a]"> ماشین3 </span>
            </h3>
          </div>
          
          {/* Pagination - فقط زمانی نمایش داده شود که بیش از یک گروه وجود دارد */}
          {totalGroups > 1 && (
            <div className="flex justify-end gap-2 w-full sm:w-auto">
              {Array.from({ length: totalGroups }, (_, index) => (
                <button
                  key={index}
                  className={`custom-pagination-bullet ${
                    currentGroup === index
                      ? "custom-pagination-bullet-active"
                      : ""
                  }`}
                  onClick={() => handleGroupClick(index)}
                  aria-label={`صفحه ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* اسلایدر خدمات */}
        <Swiper
          ref={swiperRef}
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 4 },
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          onSlideChange={handleSlideChange}
          onBreakpoint={handleBreakpointChange}
          className="services-swiper"
          dir="rtl"
        >
          {services.map((service) => (
            <SwiperSlide key={service.id}>
              <div className="service-box overflow-hidden rounded-2xl h-64! rounded-br-none relative group cursor-pointer bg-amber-400">
                {/* بخش تصویر */}
                <div className="img-box relative overflow-hidden h-64!">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    className="w-full h-64! object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Shadow Overlay */}
                  <div className="absolute bottom-0 right-0 w-full h-1/2 bg-linear-to-t from-black/80 to-transparent" />
                </div>

                {/* عنوان خدمت */}
                <h3 className="absolute bottom-10! right-16! text-white! text-xl font-black z-10">
                  {service.title}
                </h3>

                {/* شماره مرحله */}
                <div className="absolute! bottom-0! right-0! bg-gray-100 p-3 rounded-tl-2xl">
                  <span className="w-8! h-8! bg-[#ce1a2a] text-white! rounded-full flex! items-center! justify-center! text-sm font-semibold">
                    {service.step}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .services-swiper {
          padding: 10px 5px 10px 5px;
        }

        .services-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .service-box {
          height: 100%;
          transition: all 0.3s ease;
        }

        .service-box:hover {
          transform: translateY(-4px);
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
          width: 40px;
          border-radius: 2px;
        }

        .custom-pagination-bullet:hover {
          background-color: #ce1a2a;
          opacity: 0.7;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .services-swiper {
            padding: 5px;
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

export default ServicesSection;