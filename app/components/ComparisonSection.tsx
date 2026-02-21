"use client";

import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import { useEffect, useRef, useState } from "react";

function ComparisonSection({
  news,
  compare,
  bestChoices,
}: {
  news: Items[];
  compare: Items[];
  bestChoices: Items[];
}) {
  const compareCardRef = useRef<HTMLDivElement>(null);
  const bestChoicesCardRef = useRef<HTMLDivElement>(null);
  const [cardsHeight, setCardsHeight] = useState<number>(300);

  useEffect(() => {
    const calculateHeight = () => {
      if (window.innerWidth >= 1024) {
        // فقط در دسکتاپ
        const compareHeight = compareCardRef.current?.offsetHeight || 0;
        
        // ارتفاع مجموع دو کارت به همراه فاصله بین آنها (16px = mt-8)
        const totalHeight =  compareHeight ;
        setCardsHeight(totalHeight);
      } else {
        // در موبایل ارتفاع ثابت
        setCardsHeight(300);
      }
    };

    // کمی صبر می‌کنیم تا کارت‌ها کاملاً رندر بشن
    setTimeout(calculateHeight, 100);
    
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, [compare.length, bestChoices.length]);

  return (
    <section>
      <section className="mb-12 px-4" aria-label="مقایسه و بهترین انتخاب‌ها">
        <div className="flex flex-wrap ">
          {/* اسلایدر سمت راست - News */}
          <div className="lg:w-5/12 w-full px-2">
            <div className="mb-2! p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
              <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
                لینک‌های اینستاگرام
              </h3>
            </div>

            <div 
              className="mt-3"
              style={{ height: `${cardsHeight}px` }}
            >
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
                          className="rounded-3xl! overflow-hidden border-none shadow-sm group h-full"
                          cover={
                            <div className="relative w-full h-full overflow-hidden">
                              {/* پس زمینه بلور شده */}
                              <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                  backgroundImage: `url('${mainDomainOld + item.image}')`,
                                  filter: "blur(8px)",
                                  transform: "scale(1.1)",
                                }}
                              />
                              {/* تصویر اصلی با object-cover برای پر کردن کامل فضا */}
                              <img
                                src={mainDomainOld + item.image}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-contain group-hover:scale-110 duration-700"
                              />
                              {/* گرادینت روی تصویر */}
                              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                              {/* عنوان */}
                              <div className="absolute font-bold! bottom-0 right-0 left-0 p-4 lg:p-6 z-10">
                                <span className="text-white! inline-block relative text-lg lg:text-xl mb-2 line-clamp-2!">
                                  {item.title}
                                </span>
                              </div>
                            </div>
                          }
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-50 rounded-3xl">
                  <p className="text-gray-500">موردی برای نمایش وجود ندارد</p>
                </div>
              )}
            </div>
          </div>

          {/* اسلایدرهای سمت چپ - Compare و BestChoices */}
          <div className="lg:w-7/12 w-full lg:mt-0 mt-8">
            <div className="flex flex-wrap">
              {/* اسلایدر Compare */}
              <div className="md:w-1/2 w-full px-2">
                <div className="mb-2! p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
                  <Link href={"/whichcars.html"}>
                    <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
                      مقایسه ها
                    </h3>
                  </Link>
                </div>

                <div className="mt-3" ref={compareCardRef}>
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
                              className="rounded-3xl! overflow-hidden border-none shadow-sm group aspect-8/6"
                              cover={
                                <div className="relative w-full h-full overflow-hidden">
                                  {/* پس زمینه بلور شده */}
                                  <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                      backgroundImage: `url('${mainDomainOld + item.image}')`,
                                      filter: "blur(8px)",
                                      transform: "scale(1.1)",
                                    }}
                                  />
                                  {/* تصویر اصلی با object-contain */}
                                  <img
                                    src={mainDomainOld + item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-contain group-hover:scale-110 duration-700 z-10"
                                  />
                                  {/* گرادینت روی تصویر */}
                                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-20"></div>
                                  {/* عنوان */}
                                  <div className="absolute font-bold! bottom-0 right-0 left-0 p-4 z-30">
                                    <span className="text-white! inline-block relative text-base lg:text-lg mb-1 line-clamp-2!">
                                      {item.title}
                                    </span>
                                  </div>
                                </div>
                              }
                            />
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="flex items-center justify-center aspect-8/6 bg-gray-50 rounded-3xl">
                      <p className="text-gray-500">
                        موردی برای نمایش وجود ندارد
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* اسلایدر Best Choices */}
              <div className="md:w-1/2 w-full md:mt-0 mt-8 px-2">
                <div className="mb-2! p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
                  <Link href={"/best-choices.html"}>
                    <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
                      بهترین انتخاب ها
                    </h3>
                  </Link>
                </div>

                <div className="mt-3" ref={bestChoicesCardRef}>
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
                              className="rounded-3xl! overflow-hidden border-none shadow-sm group aspect-8/6"
                              cover={
                                <div className="relative w-full h-full overflow-hidden">
                                  {/* پس زمینه بلور شده */}
                                  <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                      backgroundImage: `url('${mainDomainOld + item.image}')`,
                                      filter: "blur(8px)",
                                      transform: "scale(1.1)",
                                    }}
                                  />
                                  {/* تصویر اصلی با object-contain */}
                                  <img
                                    src={mainDomainOld + item.image}
                                    alt={item.title}
                                    className="absolute inset-0 w-full h-full object-contain group-hover:scale-110 duration-700 z-10"
                                  />
                                  {/* گرادینت روی تصویر */}
                                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-20"></div>
                                  {/* عنوان */}
                                  <div className="absolute font-bold! bottom-0 right-0 left-0 p-4 z-30">
                                    <span className="text-white! inline-block relative text-base lg:text-lg mb-1 line-clamp-2!">
                                      {item.title}
                                    </span>
                                  </div>
                                </div>
                              }
                            />
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="flex items-center justify-center aspect-8/6 bg-gray-50 rounded-3xl">
                      <p className="text-gray-500">
                        موردی برای نمایش وجود ندارد
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

        /* تنظیمات برای Card و cover */
        .ant-card-cover {
          height: 100% !important;
        }
        
        .ant-card-body {
          display: none !important;
        }

        /* اطمینان از aspect ratio */
        .aspect-8\/6 {
          aspect-ratio: 8/6 !important;
        }
      `}</style>
    </section>
  );
}

export default ComparisonSection;