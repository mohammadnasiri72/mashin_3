"use client";

import { createpublishCode, toPersianNumbers } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import { FaDownload, FaStar } from "react-icons/fa";
import { FaArrowTrendUp, FaHeart } from "react-icons/fa6";
import { MdCompare } from "react-icons/md";

/**
 * Full-bleed hero section (background image spans 100% of viewport width).
 * Content itself is constrained to a max-width container, matching the
 * rest of the page.
 */
export default function HeroSection({ detailsCar , pollData }: { detailsCar: ItemsId , pollData:PollData}) {
  return (
    <section className="relative w-full overflow-hidden" dir="rtl">
      {/* Background image - full width */}
      <div className="absolute inset-0">
        <img
          src={mainDomain + detailsCar.image}
          alt={`${detailsCar.sourceName} ${detailsCar.title}`}
          className="object-cover w-full origin-center! bg-no-repeat"
        />
        {/* Gradient overlays for legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/95 via-slate-950/40 to-slate-950/70" />
        <div className="absolute inset-0 bg-linear-to-l from-slate-950/60 via-transparent to-transparent" />
      </div>

      {/* Finance / loan ribbon badge */}
      {detailsCar.summary && (
        <div className=" right-6 top-6 z-10 flex items-center gap-1 rounded-md bg-red-600/95 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
          {detailsCar.summary}
        </div>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 h-110 md:flex-row md:items-center md:justify-between">
        {/* Right: floating price + quick spec card */}
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/20 p-4 shadow-2xl backdrop-blur-md md:mb-2">
          <ul className="grid grid-cols-1">
            <li className="flex items-center gap-2 pb-2">
              <span className="flex justify-between w-full items-center">
                <span className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-slate-200">
                    <FaArrowTrendUp className="text-2xl" />
                  </span>
                  <span className="text-slate-400  flex flex-col items-start">
                    <span className="text-lg font-bold">قیمت بازار</span>
                    <span className="text-[11px]">(تومان)</span>
                  </span>
                </span>
                <span className="text-white text-lg font-bold">22,000,000</span>
              </span>
            </li>

            {detailsCar.properties
              .filter((e) => e.isTechnicalProperty)
              .slice(0, 6)
              .map((spec) => (
                <li
                  key={spec.title}
                  className="flex items-center gap-2 border-t border-white/10 py-2"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-slate-200">
                    <img
                      src={"/images/icons/speedometer-large.png"}
                      alt={spec.title}
                      className="w-10"
                    />
                  </span>
                  <span className="flex justify-between items-center w-full leading-tight">
                    <span className="text-sm font-bold text-slate-400">
                      {spec.title}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {spec.value}
                    </span>
                  </span>
                </li>
              ))}
          </ul>
        </div>
        {/* Left: title, tags, rating, actions */}
        <div className="flex max-w-xl flex-col items-start justify-between gap-4 h-full py-10">
         <div className="flex items-start flex-col gap-5">
           <div className="flex flex-col items-start">
            <h1 className="text-3xl font-extrabold text-white! md:text-4xl">
              {detailsCar.sourceName} {detailsCar.title}
            </h1>
            <span className="text-white!">
              {createpublishCode(detailsCar.publishCode)}
            </span>
          </div>

          <div className="flex items-center flex-col gap-2 ">
            <div className="flex items-center gap-1 rounded-lg  px-2.5 py-1 backdrop-blur-sm text-5xl">
             
              <span className="text-xs text-slate-300">{toPersianNumbers(10)}/</span>
              <span className="font-bold text-yellow-400!">{toPersianNumbers(pollData?.pollScore || 0)}</span>
               <FaStar className="text-yellow-400! text-xl"  />
            </div>
            <span className=" text-slate-100">
             امتیاز {toPersianNumbers(pollData.pollNumber)} کاربر
            </span>
          </div>
         </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            
            <button
              // onClick={onCompare}
              className="flex items-center gap-1.5 rounded-lg border cursor-pointer border-white/25 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-red-500/30"
            >
              <MdCompare />
              مقایسه کنید
            </button>
            <button
              // onClick={onDownloadCatalog}
              className="flex items-center gap-1.5 cursor-pointer rounded-lg border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-red-500/30"
            >
              <FaHeart fontSize="small" />
             افزودن به علاقه مندی‌ها
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
