"use client";

import { useEffect, useMemo, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { mainDomain } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function ImageGallery({
  Attachment,
}: {
  Attachment: ItemsAttachment[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // دسته‌بندی تصاویر بر اساس tabId
  const categories = [
    { id: "all", label: "همه" },
    { id: "exterior", label: "نمای خارجی" },
    { id: "interior", label: "نمای داخلی" },
  ];

  // فیلتر کردن تصاویر بر اساس دسته‌بندی
  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return Attachment;
    const tabId = activeCategory === "exterior" ? 1 : 3;
    return Attachment.filter((img) => img.tabId === tabId);
  }, [Attachment, activeCategory]);

  // مقداردهی Fancybox
  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ["close"],
        },
      },
      Thumbs: {
        type: "classic",
      },
      Images: {
        zoom: true,
      },
      Carousel: {
        infinite: true,
      },
    });

    return () => {
      Fancybox.destroy();
    };
  }, [filteredImages]);

  // استایل‌های Fancybox
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .fancybox__container { 
        z-index: 999999 !important; 
      }
      .fancybox__backdrop {
        background: rgba(0, 0, 0, 0.9) !important;
      }
      .fancybox__toolbar {
        background: rgba(0, 0, 0, 0.5) !important;
      }
      .fancybox__nav {
        --f-button-color: #fff !important;
        --f-button-hover-color: #ce1a2a !important;
      }
      .fancybox__thumbs {
        background: rgba(0, 0, 0, 0.8) !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section
      id="gallery"
      dir="rtl"
      className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-6 py-8"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-slate-900">گالری تصاویر</h2>
      </div>

      {/* Category filter */}
      <div className="mb-4 flex items-center justify-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          const count =
            cat.id === "all"
              ? Attachment.length
              : cat.id === "exterior"
                ? Attachment.filter((i) => i.tabId === 1).length
                : Attachment.filter((i) => i.tabId === 3).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={[
                "shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer",
                isActive
                  ? "bg-[#ce1a2a] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200",
              ].join(" ")}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Simple Slider */}
      <div className=" rounded-2xl border border-slate-100 bg-white p-3 shadow-sm relative">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".gallery-prev",
            nextEl: ".gallery-next",
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
          {filteredImages.map((img) => (
            <SwiperSlide key={img.id}>
              <a
                href={mainDomain + img.fileUrl}
                data-fancybox="gallery"
                data-caption={img.title || "تصویر"}
                className="block"
              >
                <div className="relative w-full rounded-xl overflow-hidden border-2 border-transparent hover:border-[#ce1a2a] transition-all duration-300 cursor-pointer">
                  <img
                    src={mainDomain + img.fileUrl}
                    alt={img.title || "تصویر"}
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation buttons */}
        <button
          aria-label="تصویر قبلی"
          className="gallery-prev border border-black/10 absolute right-0 translate-x-1/2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md hover:bg-white cursor-pointer"
        >
          <BiChevronRight className="text-xl" />
        </button>
        <button
          aria-label="تصویر بعدی"
          className="gallery-next absolute border border-black/10 left-0 -translate-x-1/2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md hover:bg-white cursor-pointer"
        >
          <BiChevronLeft className="text-xl" />
        </button>
      </div>
    </section>
  );
}
