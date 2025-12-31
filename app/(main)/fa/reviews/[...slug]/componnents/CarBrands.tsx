"use client";

import MarketStats from "@/app/components/MarketStats";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import NewsBlogForm from "../../../../../components/NewsBlogForm";

const CarBrands = ({ carBrands }: { carBrands: ItemsCategory[] }) => {
  const [term, setTerm] = useState("");

  // محتوای سایدبار
  const popularCars = [
    {
      id: 1,
      name: "شاهین پلاس",
      brand: "ایران خودرو",
      image: "/images/gallery/shahin-plus.jpg",
      price: "۱,۲۹۰,۰۰۰,۰۰۰ تومان",
      link: "#",
    },
    {
      id: 2,
      name: "تارا پلاس",
      brand: "ایران خودرو",
      image: "/images/gallery/shahin-plus.jpg",
      price: "۱,۴۵۰,۰۰۰,۰۰۰ تومان",
      link: "#",
    },
    {
      id: 3,
      name: "تیگو ۷ پرو",
      brand: "چری",
      image: "/images/gallery/shahin-plus.jpg",
      price: "۱,۸۲۰,۰۰۰,۰۰۰ تومان",
      link: "#",
    },
  ];

  const parentTitle =
    carBrands[0].parentId === 6059
      ? "موتور سیکلت"
      : carBrands[0].parentId === 6058
      ? "خودرو"
      : "";

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-8">
      <div className="mx-auto px-4">
        {/* هدر صفحه */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            <span className="text-red-600">برند های {parentTitle}</span> در
            بازار ایران
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            بررسی کامل تمامی برند های {parentTitle} موجود در بازار ایران با
            جزئیات فنی، قیمت و نظرات کاربران
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* محتوای اصلی - 3/4 صفحه */}
          <div className="lg:w-3/4 w-full">
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
                .map((brand) => (
                  <Link key={brand.id} href={brand.url} className="group block">
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200">
                      {/* لوگو و نام برند */}
                      <div className="flex flex-col items-center text-center">
                        <div className=" overflow-hidden flex items-center justify-center w-28 h-28">
                          <img
                            src={mainDomainOld + brand.image}
                            alt={brand.title}
                            className="object-contain w-full h-full mb-2!"
                          />
                        </div>

                        <h3 className="font-bold text-gray-900 text-lg">
                          {brand.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* سایدبار - 1/4 صفحه */}
          <div className="lg:w-1/4 w-full">
            <div className="space-y-6">
              {/* محبوب ترین خودروهای بازار */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  محبوب ترین خودروهای بازار
                </h3>
                <div className="space-y-4">
                  {popularCars.map((car) => (
                    <Link key={car.id} href={car.link} className="block group">
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                          <img
                            src={car.image}
                            alt={car.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm group-hover:text-red-600 transition-colors">
                            {car.name}
                          </h4>
                          <p className="text-xs text-gray-500">{car.brand}</p>
                          <p className="text-xs font-bold text-red-600 mt-1">
                            {car.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* آمار بازار */}
              <MarketStats />

              {/* خبرنامه */}
              <NewsBlogForm />
            </div>
          </div>
        </div>
      </div>

      {/* استایل‌های سفارشی */}
      <style jsx global>{`
        .container {
          max-width: 1200px;
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
  );
};

export default CarBrands;
