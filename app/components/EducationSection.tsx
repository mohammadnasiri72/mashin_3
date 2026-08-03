"use client";

import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";
import { FaArrowLeftLong, FaBook } from "react-icons/fa6";

function EducationSection({ education }: { education: Items[] }) {
  return (
    <section className="md:px-6 mt-5">
      <div className="relative overflow-hidden">
        <div className="select-none!">
          <div className="flex sm:flex-row flex-col justify-between items-center mb-4!">
            <div className="sm:w-auto w-full px-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
              <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 sm:text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
                آموزش‌های تخصصی
              </h3>
            </div>

            <Link
              href="/fa/educationtips/نکات-آموزشی.html"
              className="text-[#ce1a2a]! text-sm flex items-center gap-1"
            >
              نمایش بیشتر
              <FaArrowLeftLong />
            </Link>
          </div>
        </div>
        {/* هدر - به سبک قیمت برند خودرویی */}

        {/* محتوای آموزش‌ها */}
        <div className="p-5 select-none!">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {education.slice(0, 8).map((item, index) => (
              <Link
                key={item.id}
                href={item.url}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 aspect-4/3"
              >
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={mainDomain + item.image}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                <h4 className="absolute! bottom-0! right-0! left-0! text-white! font-bold! p-3! text-xs! md:text-sm! leading-tight line-clamp-2 group-hover:text-red-200! transition-colors! duration-300">
                  {item.title}
                </h4>
                <div className="absolute bottom-0 right-0 w-0 h-0.5 bg-red-400 group-hover:w-full transition-all duration-700" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
