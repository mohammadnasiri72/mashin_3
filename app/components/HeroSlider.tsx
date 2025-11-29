"use client";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { mainDomain } from "@/utils/mainDomain";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { htmlToPlainText } from "@/utils/func";

export default function HeroSlider({ slider }: { slider: Items[] }) {
  return (
    <div className="mb-8">
      <div className="mx-auto px-4">
        <div className="main-slider rounded-2xl overflow-hidden relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            speed={1000}
            grabCursor={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="rounded-2xl"
          >
            {slider.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative w-full h-full">
                  <img
                    src={mainDomain + slide.image}
                    alt={slide.summary || slide.title}
                    className="object-contain w-full h-auto"
                  />

                  {/* Content Overlay */}
                  <div className="absolute sm:right-8 right-2 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="bg-[#e72b3bd3] bg-opacity-50! md:p-6 p-2  rounded-2xl max-w-84 backdrop-blur-sm!">
                      <div className="">
                        <h2 className="text-white! md:text-[2.5rem]! font-bold mb-4 leading-tight line-clamp-2">
                          {htmlToPlainText(slide.summary || "")}
                        </h2>
                        <button className="text-white! px-3 py-1 relative cursor-pointer group md:text-xl! text-xs!">
                          <span className="z-10 relative">نمایش بیشتر</span>
                          <div className="absolute left-0 right-0 top-0 bottom-full bg-[#f0b542] group-hover:bottom-0 duration-300"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
