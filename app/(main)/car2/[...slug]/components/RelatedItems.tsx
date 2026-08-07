"use client";

import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { mainDomain } from "@/utils/mainDomain";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function RelatedItems({
  relatedItems,
  title
}: {
  relatedItems: Items[] |ItemsId[];
  title:string
}) {
  return (
    <section dir="rtl" className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
        <Link
          href="/news"
          className="flex items-center gap-0.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
        >
          مشاهده همه
          <BiChevronLeft fontSize="small" />
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".similar-prev",
            nextEl: ".similar-next",
          }}
          spaceBetween={12}
          slidesPerView={2}
          dir="rtl"
          breakpoints={{
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          className="w-full"
        >
          {relatedItems.map((news) => (
            <SwiperSlide key={news.id}>
              <Link href={news.url} className="block group">
                <div className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#ce1a2a]">
                  <div className="relative aspect-4/3 w-full bg-slate-50 overflow-hidden">
                    <img
                      src={mainDomain + news.image}
                      alt={news.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* برچسب دسته‌بندی */}
                    <div className="absolute top-2 right-2 bg-[#ce1a2a] text-white text-[10px] px-2 py-0.5 rounded-full">
                      {news.categoryTitle}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-3">
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-[#ce1a2a] transition-colors">
                      {news.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>
                        {new Date(news.modified).toLocaleDateString("fa-IR")}
                      </span>
                      <span>بازدید: {news.visit}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        <button
          aria-label="قبلی"
          className="similar-prev border border-black/10 absolute right-0 translate-x-1/2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md hover:bg-white cursor-pointer"
        >
          <BiChevronRight className="text-xl" />
        </button>
        <button
          aria-label="بعدی"
          className="similar-next border border-black/10 absolute left-0 -translate-x-1/2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md hover:bg-white cursor-pointer"
        >
          <BiChevronLeft className="text-xl" />
        </button>
      </div>
    </section>
  );
}
