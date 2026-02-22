"use client";

import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const MotorcycleBrandsSection = ({ brands }: { brands: ItemsCategory[] }) => {
  const [currentGroup, setCurrentGroup] = useState<number>(0);
  const [currentSlidesPerView, setCurrentSlidesPerView] = useState<number>(5);
  const [totalGroups, setTotalGroups] = useState<number>(0);
  const swiperRef = useRef<any>(null);

  // محاسبه totalGroups بر اساس slidesPerView فعلی
  useEffect(() => {
    if (brands.length > 0 && currentSlidesPerView > 0) {
      // در حالت loop، از طول اصلی برندها استفاده می‌کنیم
      const actualBrandsCount = brands.length;
      const groups = Math.ceil(actualBrandsCount / currentSlidesPerView);
      setTotalGroups(groups);
    }
  }, [brands.length, currentSlidesPerView]);

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
    const actualBrandsCount = brands.length;
    const newTotalGroups = Math.ceil(actualBrandsCount / slidesPerView);

    if (newTotalGroups > 0) {
      const newGroup = Math.floor(realIndex / slidesPerView) % newTotalGroups;
      setCurrentGroup(newGroup);
      setTotalGroups(newTotalGroups);
    }
  };

  // مقداردهی اولیه
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const initialSlidesPerView =
        swiperRef.current.swiper.params.slidesPerView;
      setCurrentSlidesPerView(initialSlidesPerView);

      const actualBrandsCount = brands.length;
      const initialTotalGroups = Math.ceil(
        actualBrandsCount / initialSlidesPerView
      );
      setTotalGroups(initialTotalGroups);
    }
  }, [brands.length]);

  return (
    <section aria-label="برندهای موتورسیکلت">
      <div className="mx-auto px-4 pb-5">
        {/* هدر بخش */}
        <div className="flex justify-between items-center">
          <div className="mb-2! sm:w-auto w-full p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
            <h3 className="pb-0! mb-0! text-[#292929]! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
              موتورسیکلت
            </h3>
          </div>

          {/* Pagination گروهی پویا - فقط زمانی نمایش داده شود که بیش از یک گروه وجود دارد */}
          {totalGroups > 1 && (
            <div className="lg:flex! hidden justify-end gap-2">
              {Array.from({ length: totalGroups }, (_, index) => (
                <button
                  key={index}
                  className={`custom-group-bullet ${
                    currentGroup === index ? "custom-group-bullet-active" : ""
                  }`}
                  onClick={() => handleGroupClick(index)}
                  aria-label={`گروه ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-center ">
          <div className="w-full lg:w-1/3 flex items-center justify-center pt-5  h-72">
            <img
              src="/images/gallery/motorcycle.png"
              alt="موتورسیکلت"
              className="w-80"
              loading="lazy"
            />
          </div>
          <div className="w-full lg:w-2/3">
            {/* اسلایدر برندهای موتورسیکلت */}
            <div className="relative">
              {/* Pagination گروهی پویا برای موبایل - فقط زمانی نمایش داده شود که بیش از یک گروه وجود دارد */}
              <div className="h-8">
                {totalGroups > 1 && (
                  <div className="lg:hidden flex justify-end gap-2 pb-4 ">
                    {Array.from({ length: totalGroups }, (_, index) => (
                      <button
                        key={index}
                        className={`custom-group-bullet ${
                          currentGroup === index
                            ? "custom-group-bullet-active"
                            : ""
                        }`}
                        onClick={() => handleGroupClick(index)}
                        aria-label={`گروه ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="h-56">
                <Swiper
                  ref={swiperRef}
                  modules={[Autoplay]}
                  spaceBetween={16}
                  slidesPerView={2}
                  breakpoints={{
                    320: {
                      slidesPerView: 2,
                      spaceBetween: 16,
                    },
                    480: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                    },
                    1024: {
                      slidesPerView: 5,
                      spaceBetween: 28,
                    },
                  }}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  onSlideChange={handleSlideChange}
                  onBreakpoint={handleBreakpointChange}
                  className="motorcycle-brands-swiper"
                  dir="rtl"
                >
                  {brands.map((brand) => (
                    <SwiperSlide key={brand.id}>
                      <Link
                        href={brand.url}
                        className={`brand-box flex flex-col items-center justify-between text-center p-5 h-52! border border-gray-200 rounded-2xl relative bg-white cursor-pointer transition-all duration-300 hover:shadow-md hover:border-gray-300 `}
                      >
                        <div className="w-full h-28 flex items-start justify-center">
                          <div className="h-20 flex items-center justify-center">
                            <img
                              src={mainDomainOld + brand.image}
                              alt={brand.title}
                              className="max-w-full max-h-full object-contain"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <h4
                          className={`text-sm font-bold absolute bottom-5 left-0 right-0 text-center text-[#656565]! `}
                        >
                          {brand.title}
                        </h4>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .motorcycle-brands-swiper {
          padding: 0px 0px;
          margin: 0 5px;
        }

        .motorcycle-brands-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .motorcycle-brands-swiper .swiper-slide {
          height: auto;
        }

        .brand-box {
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .brand-box:hover {
          transform: translateY(-4px);
        }

        /* استایل‌های سفارشی برای Pagination گروهی */
        .custom-group-bullet {
          width: 8px;
          height: 8px;
          background-color: #e0e0e0;
          border-radius: 2px;
          cursor: pointer;
          transition: all 300ms ease;
          border: none;
          outline: none;
        }

        .custom-group-bullet-active {
          background-color: #ce1a2a;
          width: 40px;
          border-radius: 2px;
        }

        .custom-group-bullet:hover {
          background-color: #ce1a2a;
          opacity: 0.7;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .motorcycle-brands-swiper {
            padding: 0px;
          }

          .custom-group-bullet {
            width: 6px;
            height: 6px;
          }

          .custom-group-bullet-active {
            width: 18px;
          }
        }

        @media (max-width: 480px) {
          .custom-group-bullet {
            width: 4px;
            height: 4px;
          }

          .custom-group-bullet-active {
            width: 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default MotorcycleBrandsSection;
