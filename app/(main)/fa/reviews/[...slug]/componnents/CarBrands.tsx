"use client";

import { htmlToPlainText } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import SideBarReviews from "./SideBarReviews";

const CarBrands = ({
  carBrands,
  banner,
  carDetails,
  lastNews,
}: {
  carBrands: ItemsCategory[];
  banner: Items[];
  carDetails: ItemsCategoryId;
  lastNews: Items[];
}) => {
  const [term, setTerm] = useState("");
  const [isMainLonger, setIsMainLonger] = useState(true);

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
  }, [carBrands, banner, term]); // وابستگی به term برای وقتی که جستجو باعث تغییر ارتفاع میشه

  return (
    <>
      <div className="min-h-screen bg-[#f4f4f4] py-8">
        <div className="mx-auto px-4">
          {/* هدر صفحه */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-red-600! text-center mb-4">
              {carDetails.title}
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              {htmlToPlainText(carDetails.summary)}
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
              {/* جستجو */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="relative">
                  <input
                    value={term}
                    onChange={(e) => {
                      setTerm(e.target.value);
                    }}
                    type="text"
                    placeholder="جستجوی برند خودرو..."
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                </div>
              </div>

              {/* گرید برندها */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {carBrands
                  .filter((e) => e.title.includes(term))
                  .sort((a, b) => {
                    return a.title.localeCompare(b.title);
                  })
                  .map((brand) => (
                    <Link
                      key={brand.id}
                      href={brand.url}
                      className="group block"
                    >
                      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200">
                        {/* لوگو و نام برند */}
                        <div className="flex flex-col items-center text-center">
                          <div className="overflow-hidden flex items-center justify-center w-28 h-28">
                            <img
                              src={mainDomainOld + brand.image}
                              alt={brand.title}
                              className="object-contain w-full h-full mb-2!"
                            />
                          </div>

                          <h2 className="font-bold! text-gray-900 text-lg">
                            {brand.title}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  ))}
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
              <SideBarReviews banner={banner} lastNews={lastNews} />
            </aside>
          </div>
        </div>

        {/* استایل‌های سفارشی */}
        <style jsx global>{`
          .container {
            max-width: 1200px;
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

          @media (max-width: 1024px) {
            .container {
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }

          .custom-market-tabs .ant-tabs-nav {
            margin: 0;
          }

          .custom-market-tabs .ant-tabs-tab {
            padding: 8px 4px !important;
            margin: 0 2px !important;
          }

          .custom-market-tabs .ant-tabs-tab-btn {
            font-size: 12px;
            padding: 0 8px;
          }

          .custom-market-tabs .ant-tabs-ink-bar {
            background: #ce1a2a;
          }

          .custom-market-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
            color: #ce1a2a !important;
            font-weight: 600;
          }

          .custom-market-tabs .ant-tabs-tab:hover {
            color: #ce1a2a !important;
          }

          /* اسکرول بار سفارشی */
          .overflow-y-auto::-webkit-scrollbar {
            width: 4px;
          }

          .overflow-y-auto::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 10px;
          }

          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #a1a1a1;
          }
        `}</style>
      </div>
    </>
  );
};

export default CarBrands;
