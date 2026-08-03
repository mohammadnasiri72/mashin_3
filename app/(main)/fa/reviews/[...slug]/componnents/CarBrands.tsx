"use client";

import { htmlToPlainText } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  carDetails: ItemsId | ItemsCategoryId;
  lastNews: Items[];
}) => {
  const [term, setTerm] = useState("");

  // ✅ هندلر جستجو با useCallback
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  }, []);

  // ✅ فیلتر و مرتب‌سازی برندها با useMemo
  const filteredBrands = useMemo(() => {
    return carBrands
      .filter((e) => e.title.includes(term))
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [carBrands, term]);

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-8">
      <div className="mx-auto px-4 ">
       

        <div className="flex flex-col lg:flex-row gap-6 relative items-start ">
          {/* محتوای اصلی - sticky از بالا */}
          <div className="lg:w-3/4 w-full lg:sticky lg:top-20 lg:self-start">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

           {/* هدر صفحه */}
        <div className="mb-8!">
          <h1 className="text-3xl font-bold text-red-600! text-center mb-4!">
            {carDetails.title}
          </h1>
          {carDetails.summary && (
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              {htmlToPlainText(carDetails.summary)}
            </p>
          )}
        </div>
            {/* جستجو */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6!">
              <div className="relative">
                <input
                  value={term}
                  onChange={handleSearch}
                  type="text"
                  placeholder="جستجوی برند خودرو..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder:text-xs placeholder:text-gray-400"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
            </div>

            {/* تعداد برندها */}
            <div className="flex items-center justify-between mb-4!">
              <h2 className="text-2xl font-bold text-gray-900">
                برندهای <span className="text-red-600">{carDetails.title}</span>
              </h2>
              <span className="text-gray-700 text-sm">
                {filteredBrands.length} برند
              </span>
            </div>

            {/* گرید برندها */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBrands.map((brand) => (
                <Link key={brand.id} href={brand.url} className="group block">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200">
                    {/* لوگو و نام برند */}
                    <div className="flex flex-col items-center text-center">
                      <div className="overflow-hidden flex items-center justify-center w-28 h-28">
                        <img
                          src={mainDomain + brand.image}
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

            {/* Empty state */}
            {filteredBrands.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                <FaSearch className="text-gray-400 text-4xl mx-auto mb-4!" />
                <h3 className="text-xl font-bold text-gray-900 mb-2!">
                  برندی یافت نشد
                </h3>
                <p className="text-gray-600">
                  برندی با عبارت "{term}" در {carDetails.title} پیدا نشد.
                </p>
              </div>
            )}
          </div>
          </div>

          {/* سایدبار - sticky از بالا */}
          <aside className="lg:w-1/4 w-full lg:sticky lg:top-20 lg:self-start">
            <SideBarReviews banner={banner} lastNews={lastNews} />
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 1023px) {
          .lg\\:sticky {
            position: relative !important;
            top: auto !important;
            align-self: auto !important;
          }
        }

        @media (max-width: 1024px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default CarBrands;