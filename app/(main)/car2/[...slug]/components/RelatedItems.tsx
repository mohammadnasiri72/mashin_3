"use client";

import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { formatPersianDate, toPersianNumbers } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaCalendar, FaEye } from "react-icons/fa";

export default function RelatedItems({
  relatedItems,
  title,
  linkAll,
  sliderId, // اضافه کردن prop جدید
}: {
  relatedItems: Items[] | ItemsId[];
  title: string;
  linkAll: string;
  sliderId: string; // ID منحصربه‌فرد
}) {
  // کلاس‌های منحصربه‌فرد برای هر اسلایدر
  const prevClass = `${sliderId}-prev`;
  const nextClass = `${sliderId}-next`;

  return (
    <section dir="rtl" className="mx-auto w-full p-4">
      <div className="mb-4 flex items-center justify-between">
        {/* <h2 className="text-lg font-extrabold text-slate-900">{title}</h2> */}
         <h2 className="text-2xl font-bold text-gray-900">
            
            <strong className="text-red-700">
             {title}
            </strong>
            <span className="pl-1"> مرتبط</span>
          </h2>
        <Link
          href={linkAll || "#"}
          className="flex items-center gap-0.5 text-sm font-medium text-[#ce1a2a]! hover:text-red-700! transition-colors"
        >
          مشاهده همه
          <BiChevronLeft fontSize="small" />
        </Link>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
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
          {relatedItems.map((item) => (
            <SwiperSlide key={item.id}>
              <Link href={item.url} className="block group py-1">
                <div className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#ce1a2a]">
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <img
                      src={mainDomain + item.image}
                      alt={item.title}
                      className="object-cover! w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                   
                  </div>
                  <div className="flex flex-col gap-1 p-3">
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 h-10 group-hover:text-[#ce1a2a]! transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <div className="flex items-center gap-1">
                        <FaCalendar />
                        <span>
                          {formatPersianDate(
                            item.modified ? item.modified : item.created,
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaEye className="w-3 h-3" />
                        <span>{toPersianNumbers(item.visit)} بازدید</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons با کلاس‌های منحصربه‌فرد */}
        <button
          aria-label="قبلی"
          className={`${prevClass} border border-black/10 absolute right-0 translate-x-1/2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md hover:bg-white cursor-pointer`}
        >
          <BiChevronRight className="text-xl" />
        </button>
        <button
          aria-label="بعدی"
          className={`${nextClass} border border-black/10 absolute left-0 -translate-x-1/2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md hover:bg-white cursor-pointer`}
        >
          <BiChevronLeft className="text-xl" />
        </button>
      </div>
    </section>
  );
}
