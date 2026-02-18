"use client";

import {
  formatPersianDate,
  htmlToPlainText,
  toPersianNumbers,
} from "@/utils/func";
import React, { useEffect, useRef, useState } from "react";
import SearchBoxBestChoice from "./SearchBoxBestChoice";
import Link from "next/link";
import { mainDomainOld } from "@/utils/mainDomain";
import { FaCalendar, FaCar, FaEye } from "react-icons/fa";
import CustomPagination from "@/app/components/CustomPagination";
import { useRouter, useSearchParams } from "next/navigation";
import SideBarBestChoices from "./SideBarBestChoices";

function MainBoxBestChoices({
  title,
  summary,
  bestChoices,
  banner,
  popularBestChoices,
  lastNews,
lastCars,
}: {
  title: string;
  summary: string | null;
  bestChoices: Items[];
  banner: Items[];
  popularBestChoices: Items[];
  lastNews:Items[]
lastCars:Items[]
}) {
  const [isMainLonger, setIsMainLonger] = useState(true);

  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // مقایسه ارتفاع باکس‌ها
  useEffect(() => {
    const checkHeights = () => {
      if (mainBoxRef.current && sidebarRef.current) {
        const mainHeight = mainBoxRef.current.offsetHeight;
        const sidebarHeight = sidebarRef.current.offsetHeight;
        setIsMainLonger(mainHeight > sidebarHeight);
      }
    };

    checkHeights();

    const timer = setTimeout(checkHeights, 500);
    window.addEventListener("resize", checkHeights);

    return () => {
      window.removeEventListener("resize", checkHeights);
      clearTimeout(timer);
    };
  }, [bestChoices, banner, popularBestChoices]);

  const clearFilters = () => {
    router.push("/best-choices.html", {
      scroll: false,
    });
  };

  return (
    <>
      {/* هدر */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4 text-[#ce1a2a]!">{title}</h1>
        {summary && (
          <p className="text-gray-600 max-w-2xl mx-auto">
            {htmlToPlainText(summary)}
          </p>
        )}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 px-3 relative mx-auto">
        {/* محتوای اصلی - 3/4 صفحه */}
        <div
          ref={mainBoxRef}
          className={`
            lg:w-3/4 w-full transition-all duration-300
            ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
          `}
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex sm:flex-nowrap flex-wrap items-center gap-2">
              <SearchBoxBestChoice />
            </div>

            {/* لیست بهترین انتخاب */}
            {bestChoices.length > 0 && (
              <div className="space-y-6 mt-6">
                {bestChoices.map((bestChoice) => {
                  return (
                    <article
                      key={bestChoice.id}
                      className="py-6! border-b! border-gray-200 last:border-b-0 last:pb-0 group rounded-lg transition-colors"
                    >
                      <div className="flex flex-col md:flex-row gap-4 sm:items-start items-center">
                        {/* تصویر مقایسه */}
                        <div className="md:w-80 w-full shrink-0">
                          <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden relative">
                            <Link href={bestChoice.url} className="rounded-lg!">
                              <img
                                src={mainDomainOld + bestChoice.image}
                                alt={bestChoice.title}
                                className="object-contain w-full h-full hover:scale-105 rounded-lg! transition-transform duration-300"
                              />
                            </Link>
                          </div>
                        </div>

                        {/* محتوای مقایسه */}
                        <div className="flex-1">
                          <Link href={bestChoice.url}>
                            <h2 className="text-xl font-bold text-gray-900 mb-2! hover:text-[#ce1a2a]! duration-300 transition-colors cursor-pointer">
                              {bestChoice.title}
                            </h2>
                          </Link>

                          {/* خلاصه مقایسه */}
                          <div className="text-gray-600 mb-3 leading-relaxed text-justify line-clamp-6">
                            {htmlToPlainText(bestChoice.body)}
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* متا اطلاعات */}
                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700 ">
                              <div className="flex items-center gap-1">
                                <FaCalendar />
                                <span>
                                  {formatPersianDate(bestChoice.created)}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <FaEye className="w-3 h-3" />
                                <span>
                                  {toPersianNumbers(bestChoice.visit)} بازدید
                                </span>
                              </div>
                            </div>
                            <Link
                              href={bestChoice.url}
                              className="text-xs font-bold text-gray-900 hover:text-[#ce1a2a]! duration-300 transition-colors cursor-pointer"
                            >
                              ادامه مطلب
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
            
            {bestChoices.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <FaCar className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">
                  هیچ مطلبی یافت نشد
                </h3>
                <p className="text-gray-500 mb-4">
                  با تغییر فیلترها مجدداً تلاش کنید
                </p>
                <button
                  aria-label="نمایش همه مطالب"
                  onClick={clearFilters}
                  className="bg-[#ce1a2a] text-white! cursor-pointer px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  نمایش همه مطالب
                </button>
              </div>
            )}

            {bestChoices.length > 0 && (
              <CustomPagination
                total={bestChoices[0].total}
                pageSize={15}
                currentPage={Number(searchParams.get("page")) || 1}
              />
            )}
          </div>
        </div>

        {/* سایدبار - 1/4 صفحه */}
        <aside
          ref={sidebarRef}
          className={`
            lg:w-1/4 w-full transition-all duration-300
            ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
          `}
        >
          <SideBarBestChoices
            popularBestChoices={popularBestChoices}
            banner={banner}
            lastNews={lastNews}
lastCars={lastCars}
          />
        </aside>
      </div>

      <style jsx global>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* استایل‌های sticky */
        .lg\\:sticky {
          position: sticky;
          bottom: 0;
          align-self: flex-end;
        }

        /* غیرفعال کردن sticky در موبایل */
        @media (max-width: 1023px) {
          .lg\\:sticky {
            position: relative !important;
            bottom: auto !important;
            align-self: auto !important;
          }
        }
      `}</style>
    </>
  );
}

export default MainBoxBestChoices;