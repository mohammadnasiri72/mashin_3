"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loader";

interface ItemsCategory {
  id: number;
  title: string;
  url: string;
  total: number;
}

function BoxCatPodcasts({ podcastsCat }: { podcastsCat: ItemsCategory[] }) {
  const [isPending, startTransition] = useTransition();
    const router = useRouter();
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6! text-center">
        دسته‌بندی‌های پادکست
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Mousewheel]}
        spaceBetween={12}
        slidesPerView={"auto"}
        centeredSlides={false}
        mousewheel={{
          forceToAxis: true,
        }}
        navigation={false}
        className="category-swiper"
        dir="rtl"
      >
        {podcastsCat.map((category) => (
          <SwiperSlide key={category.id} className="w-auto!">
            <Link
              href={category.url}
              onClick={(e) => {
                e.preventDefault();
                startTransition(() => {
                  router.push(category.url);
                });
              }}
              className="inline-flex items-center gap-2 bg-linear-to-br from-red-50 to-white border border-[#ce1a2a] rounded-full px-3 py-2 hover:shadow-lg transition-all duration-300 hover:scale-105 group select-none"
            >
              <span className="font-medium text-gray-800 text-xs group-hover:text-[#ce1a2a]! transition-colors whitespace-nowrap">
                {category.title}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .category-swiper {
          padding: 8px 4px 40px 4px;
          margin: -8px -4px -40px -4px;
        }

        .category-swiper .swiper-slide {
          width: auto !important;
        }

        .category-swiper .swiper-pagination {
          bottom: 20px;
        }

        .category-swiper .swiper-pagination-bullet {
          background: #9ca3af;
          opacity: 0.5;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }

        .category-swiper .swiper-pagination-bullet-active {
          background: #3b82f6;
          opacity: 1;
          width: 20px;
          border-radius: 4px;
        }

        .category-swiper .swiper-button-next,
        .category-swiper .swiper-button-prev {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .category-swiper .swiper-button-next:after,
        .category-swiper .swiper-button-prev:after {
          font-size: 12px;
          color: #374151;
          font-weight: bold;
        }

        .category-swiper .swiper-button-next:hover,
        .category-swiper .swiper-button-prev:hover {
          background: #3b82f6;
          border-color: #3b82f6;
        }

        .category-swiper .swiper-button-next:hover:after,
        .category-swiper .swiper-button-prev:hover:after {
          color: white;
        }

        /* برای نمایش بهتر در موبایل */
        @media (max-width: 768px) {
          .category-swiper .swiper-button-next,
          .category-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
      {isPending && <Loading />}
    </div>
  );
}

export default BoxCatPodcasts;
