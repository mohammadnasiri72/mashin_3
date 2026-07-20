"use client";

import CustomPagination from "@/app/components/CustomPagination";
import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SideBarKeyWords from "./SideBarKeyWords";

function MainPageTags({
  term,
  banner,
  keyWord,
}: {
  term: string;
  banner: Items[];
  keyWord: ItemsFindByTerm[];
}) {
  const [isMainLonger, setIsMainLonger] = useState(true);

  const searchParams = useSearchParams();
  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

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
  }, [banner, keyWord]); // وابستگی به searchTerm برای وقتی جستجو تغییر میکنه

  return (
    <>
      <div className="min-h-screen">
        <div className="p-4 mx-auto">
          {/* هدر صفحه */}
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="text-red-600">{term}</span>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 relative">
            {/* محتوای اصلی - 3/4 صفحه */}
            <div
              ref={mainBoxRef}
              className={`
                    lg:w-3/4 w-full transition-all duration-300
                    ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
                  `}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                {/* نمایش عبارت جستجو */}
                {term && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-700">
                    نتایج جستجو برای:{" "}
                    <span className="font-bold">"{term}"</span>
                  </div>
                )}

                {keyWord.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {keyWord.map((car) => (
                      <div key={car.id} className="group block">
                        <div className="bg-white rounded-2xl overflow-hidden pb-2 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200 h-full flex flex-col">
                          {/* تصویر خودرو */}
                          <div className="w-full h-40 overflow-hidden rounded-lg mb-4 bg-gray-50 flex items-center justify-center relative">
                            <Link href={car?.url || "#"}>
                              <img
                                src={mainDomain + car.image}
                                alt={car.title}
                                className="object-contain w-full h-full p-2 hover:scale-105 transition-transform duration-300"
                              />
                            </Link>
                          </div>

                          {/* اطلاعات خودرو */}
                          <div className="flex-1">
                            <Link
                              href={car?.url || "#"}
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <h3 className="font-bold text-gray-900 text-lg mb-2 text-center hover:text-[#ce1a2a]! transition-colors">
                                {car.title}
                              </h3>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      هیچ واژه‌ای یافت نشد
                    </p>
                  </div>
                )}

                {/* صفحه بندی */}
                {keyWord.length > 0 && (
                  <div className="mt-8">
                    <CustomPagination
                      total={keyWord[0].total || 20}
                      pageSize={20}
                      currentPage={Number(searchParams.get("page")) || 1}
                    />
                  </div>
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
              <SideBarKeyWords banner={banner} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPageTags;
