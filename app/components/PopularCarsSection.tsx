"use client";

import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const PopularCarsSection = ({ carView }: { carView: Items[] }) => {
  return (
    <div className="mb-5">
      <div className="mx-auto px-4">
        {/* هدر بخش */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div className="mb-2! sm:w-auto w-full p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
            <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
              پربازدید ترین خودرو ها
            </h3>
          </div>

          <Link
            href="#"
            className="text-[#ce1a2a]! text-sm flex justify-center items-center gap-1 sm:w-auto w-full"
          >
            نمایش بیشتر
            <FaArrowLeftLong />
          </Link>
        </div>

        <div className="h-48">
          {/* اسلایدر خودروها */}
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1.5}
            centeredSlides={true}
            breakpoints={{
              640: {
                slidesPerView: 3,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 4,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 5,
                centeredSlides: false,
              },
              1280: {
                slidesPerView: 6,
                centeredSlides: false,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="popular-cars-swiper"
            dir="rtl"
          >
            {carView.map((car) => (
              <SwiperSlide key={car.id}>
                <Link href={car.url}>
                  <div className="overflow-hidden rounded-2xl group h-40 relative">
                    <div className="relative aspect-4/3 w-full h-full">
                      <img
                        src={mainDomainOld + car.image}
                        alt={car.title}
                        className="object-contain w-full h-full"
                      />
                    </div>

                    {/* Shadow Overlay */}
                    <div className="absolute bottom-0 right-0 w-full h-1/2 bg-linear-to-t from-black to-transparent opacity-100 group-hover:h-full duration-300" />

                    {/* عنوان خودرو */}
                    <h4 className="absolute flex justify-end pl-3.5 group-hover:pl-6 duration-300 w-full bottom-10 left-0 text-white! font-bold text-sm">
                      {car.title}
                    </h4>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .popular-cars-swiper {
          padding: 10px 5px 30px 5px;
        }

        .popular-cars-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .auto-box {
          transition: all 0.3s ease;
        }

        .auto-box:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
};

export default PopularCarsSection;
