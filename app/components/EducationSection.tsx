"use client";

import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";
import { FaArrowLeftLong, FaBook } from "react-icons/fa6";

function EducationSection({ education }: { education: Items[] }) {
  return (
    <div className="relative bg-gradient-to-br from-[#f5f3ff] to-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
      {/* هدر - به سبک قیمت برند خودرویی */}
      <div className="p-4 sm:bg-transparent bg-[#f6eced] rounded-t-3xl flex sm:justify-start justify-center items-center border-b border-gray-100">
        <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
          آموزش‌های تخصصی
        </h3>
      </div>

      {/* محتوای آموزش‌ها */}
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {education.slice(0, 8).map((item, index) => (
            <Link
              key={item.id}
              href={item.url}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 aspect-[4/3]"
            >
              <div className="w-full h-full overflow-hidden">
                <img
                  src={mainDomain + item.image}
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h4 className="absolute! bottom-0! right-0! left-0! text-white! font-bold! p-3! text-xs! md:text-sm! leading-tight line-clamp-2 group-hover:text-red-200! transition-colors! duration-300">
                {item.title}
              </h4>
              <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-700" />
            </Link>
          ))}
        </div>

        {/* دکمه نمایش بیشتر - به سبک قیمت برند خودرویی */}
        <div className="flex justify-center mt-4">
          <Link
            href="/fa/educationtips/نکات-آموزشی.html"
            className="inline-block cursor-pointer py-2 px-4 border border-[#ce1a2a] text-[#ce1a2a] rounded-lg font-medium hover:bg-[#ce1a2a] hover:text-white! transition-colors duration-300 text-sm"
          >
            <span className="flex items-center justify-center gap-1">
              <span>مشاهده همه آموزش‌ها</span>
              <FaArrowLeftLong className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EducationSection;