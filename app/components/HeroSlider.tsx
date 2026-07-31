// app/components/HeroSection.tsx
"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { mainDomain } from "@/utils/mainDomain";
import "swiper/css";
import { formatPersianDate, htmlToPlainText } from "@/utils/func";
import Link from "next/link";
import OptimizedImage from "./OptimizedImage";
import { BiBarChart, BiCalendar, BiShow } from "react-icons/bi";
import { FaClock } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { useState } from "react";

// تابع کمکی برای ساخت آدرس تصویر
const getImageUrl = (image: string) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  return `${mainDomain}${image}`;
};

// تابع برای دریافت رنگ چیپ براساس نوع
const getChipColor = (type: string) => {
  switch (type) {
    case "خبر":
      return "bg-blue-700 text-blue-100 border-blue-500/30";
    case "مقایسه":
      return "bg-orange-700 text-orange-100 border-orange-500/30";
    case "پیش‌فروش":
      return "bg-yellow-700 text-yellow-100 border-yellow-500/30";
    default:
      return "bg-gray-700 text-gray-100 border-gray-500/30";
  }
};

export default function HeroSection({
  slider,
  latestNews,
  latestComparisons,
  latestPresales,
}: {
  slider: Items[];
  latestNews: Items[];
  latestComparisons: Items[];
  latestPresales: Items[];
}) {
  return (
    <section
      className="mx-auto px-4 py-6 bg-[#1a1a1a]"
      aria-label="بخش اصلی صفحه"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* اسلایدر (8/12) */}
        <div className="lg:col-span-9">
          <div className="main-slider rounded-2xl overflow-hidden relative lg:h-115 sm:h-80 h-56 shadow-2xl shadow-red-900/20">
            <Swiper
              modules={[Autoplay]}
              speed={1000}
              grabCursor={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="h-full w-full"
            >
              {slider.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <Link target="_blank" href={slide.sourceLink || "#"}>
                    <div className="relative w-full h-full ">
                      <OptimizedImage
                        src={mainDomain + slide.image}
                        alt={slide.summary || slide.title}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />

                      {/* لایه گرادینت برای خوانایی بهتر */}

                      {/* محتوای روی اسلایدر */}
                      <div className="absolute bottom-0 right-0 left-0 p-0 md:p-10 z-10">
                        <div className="max-w-2xl">
                          <div className="bg-black/20 backdrop-blur-sm px-4 md:p-6 rounded-2xl border border-white/10 inline-block">
                            <h2 className="text-white! text-lg md:text-2xl lg:text-4xl font-bold mb-0! leading-tight line-clamp-2 drop-shadow-lg">
                              {htmlToPlainText(slide.title)}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* ستون کناری (4/12) */}
        <div className="lg:col-span-3 space-y-4">
          {/* باکس آخرین اخبار */}
          <SidebarBox
            icon={<BiCalendar className="w-5 h-5" />}
            item={latestNews[0]}
            type="خبر"
          />
          {/* باکس آخرین مقایسه‌ها */}
          <SidebarBox
            icon={<BiBarChart className="w-5 h-5" />}
            item={latestComparisons[0]}
            type="مقایسه"
          />
          {/* باکس آخرین پیش‌فروش‌ها */}
          <SidebarBox
            icon={<FaClock className="w-5 h-5" />}
            item={latestPresales[0]}
            type="پیش‌فروش"
          />
        </div>
      </div>
    </section>
  );
}

// کامپوننت باکس کناری با طراحی خفن
function SidebarBox({
  icon,
  item,
  type,
}: {
  icon: React.ReactNode;
  item: Items;
  type: string;
}) {
  if (!item) return null;

  const imageUrl = getImageUrl(item.image);
  const chipColor = getChipColor(type);
  const lastEdit = item.modified;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={item.url || "#"}
      className="group block h-36 bg-no-repeat rounded-2xl relative transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/20"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
        backgroundSize: "contain",
        backgroundPosition: "left",
        borderRadius: "16px",
        overflow: "visible",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ===== کانتینر بوردرها ===== */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-30" style={{ overflow: "hidden" }}>
        
        {/* بوردر سمت راست (همیشه قرمز) */}
        <div className="absolute top-0 right-0 w-[3px] h-full bg-gradient-to-b from-red-500 via-red-600 to-red-700"></div>
        
        {/* بوردر بالا - از راست به چپ */}
        <div 
          className="absolute top-0 right-0 h-[3px] bg-gradient-to-l from-red-500 via-red-600 to-red-700"
          style={{
            width: isHovered ? "100%" : "0%",
            transition: isHovered 
              ? "width 0.5s ease-out 0s" 
              : "width 0.5s ease-out 0.4s",
          }}
        ></div>
        
        {/* بوردر چپ - از بالا به پایین */}
        <div 
          className="absolute top-0 left-0 w-[3px] bg-gradient-to-b from-red-500 via-red-600 to-red-700"
          style={{
            height: isHovered ? "100%" : "0%",
            transition: isHovered 
              ? "height 0.5s ease-out 0.15s" 
              : "height 0.5s ease-out 0.25s",
          }}
        ></div>
        
        {/* بوردر پایین - از چپ به راست */}
        <div 
          className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-red-500 via-red-600 to-red-700"
          style={{
            width: isHovered ? "100%" : "0%",
            transition: isHovered 
              ? "width 0.5s ease-out 0.3s" 
              : "width 0.5s ease-out 0s",
          }}
        ></div>
      </div>

      {/* لایه محو شدن از چپ به راست */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          backgroundImage:
            "linear-gradient(to left, black 0%, black 30%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.05) 100%)",
          borderRadius: "16px",
        }}
      ></div>

      {/* افکت نورانی هاور */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-red-600/0 via-red-600/0 to-red-600/0 blur-2xl transition-all duration-700 rounded-2xl ${
        isHovered ? "from-red-600/5 via-red-600/0 to-red-600/5" : ""
      }`}></div>

      {/* محتوای باکس */}
      <div className="relative h-full px-4 flex flex-col justify-start z-10">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3 text-[10px] text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">
            {lastEdit && (
              <div className="flex items-center gap-1">
                <MdEdit className="w-3 h-3" />
                <span>{formatPersianDate(lastEdit)}</span>
              </div>
            )}
          </div>
        </div>

        <h4 className="text-white! w-1/2 text-justify group-hover:text-red-400 text-sm font-bold line-clamp-3 transition-all duration-300 leading-relaxed drop-shadow-lg">
          {htmlToPlainText(item.title)}
        </h4>
        
        <div className="flex mt-auto pb-2">
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm ${chipColor}`}
          >
            {type}
          </span>
        </div>
      </div>
    </Link>
  );
}
