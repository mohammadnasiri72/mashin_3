"use client";

import CustomPagination from "@/app/components/CustomPagination";
import {
  formatPersianDate,
  htmlToPlainText,
  toPersianNumbers,
} from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaCalendar, FaEye } from "react-icons/fa";
import SearchBoxWhichCars from "./SearchBoxWhichCars";
import SideBarWhichCars from "./SideBarWhichCars";

const WhichCars = ({
  whichCars,
  popularComparisons,
  banner,
  whichCarsCat,
}: {
  whichCars: Items[];
  popularComparisons: Items[];
  banner: Items[];
  whichCarsCat: ItemsId | null;
}) => {
  const [isMainLonger, setIsMainLonger] = useState(true);

  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // استخراج نام خودروها از عنوان برای نمایش بهتر
  const extractCarNames = (title: string) => {
    const matches = title.match(/(?:مقایسه|مقايسه)\s+(.+?)\s+(?:با|و)\s+(.+)/);
    if (matches) {
      return {
        car1: matches[1].trim(),
        car2: matches[2].trim(),
      };
    }
    return { car1: "", car2: "" };
  };

  const searchParams = useSearchParams();

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
  }, [whichCars, popularComparisons, banner]);

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-8">
      <div className="mx-auto px-4">
        {/* هدر صفحه */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            <span className="text-[#ce1a2a]">{whichCarsCat?.title}</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {whichCarsCat?.summary}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative">
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
                <SearchBoxWhichCars />
              </div>

              {/* لیست مقایسه‌ها */}
              <div className="space-y-6 mt-6">
                {whichCars.map((comparison) => {
                  const carNames = extractCarNames(comparison.title);

                  return (
                    <article
                      key={comparison.id}
                      className="py-6! border-b! border-gray-200 last:border-b-0 last:pb-0 group hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex flex-col md:flex-row gap-4 sm:items-start items-center">
                        {/* تصویر مقایسه */}
                        <div className="md:w-96 w-full shrink-0">
                          <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden relative">
                            <Link href={comparison.url} className="rounded-lg!">
                              <img
                                src={mainDomainOld + comparison.image}
                                alt={comparison.title}
                                className="object-contain w-full h-full hover:scale-105 rounded-lg! transition-transform duration-300"
                              />
                            </Link>
                          </div>
                        </div>

                        {/* محتوای مقایسه */}
                        <div className="flex-1">
                          <Link href={comparison.url}>
                            <h2 className="text-xl font-bold text-gray-900 mb-2! hover:text-[#ce1a2a]! duration-300 transition-colors cursor-pointer">
                              {comparison.title}
                            </h2>
                          </Link>

                          {/* نمایش نام خودروها */}
                          {carNames.car1 && carNames.car2 && (
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="font-medium text-green-700 whitespace-nowrap sm:text-sm text-xs">
                                  {carNames.car1}
                                </span>
                              </div>
                              <div className="text-gray-700 font-bold">VS</div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="font-medium text-blue-700 whitespace-nowrap sm:text-sm text-xs">
                                  {carNames.car2}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* خلاصه مقایسه */}
                          <div className="text-gray-600 mb-3 leading-relaxed text-justify line-clamp-6">
                            {htmlToPlainText(comparison.body)}
                          </div>

                          {/* متا اطلاعات */}
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700 mt-2">
                            <div className="flex items-center gap-1">
                              <FaCalendar />
                              <span>
                                {formatPersianDate(comparison.created)}
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <FaEye className="w-3 h-3" />
                              <span>
                                {toPersianNumbers(comparison.visit)} بازدید
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {whichCars.length > 0 && (
                <CustomPagination
                  total={whichCars[0].total}
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
            <SideBarWhichCars
              popularComparisons={popularComparisons}
              banner={banner}
            />
          </aside>
        </div>
      </div>

      {/* استایل‌های سفارشی */}
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 1024px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default WhichCars;