"use client";

import NewsBlogForm from "@/app/components/NewsBlogForm";
import { createMarkup, toPersianNumbers } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { useState } from "react";
import { FaCar, FaInfoCircle, FaSearch, FaStar } from "react-icons/fa";
import MarketStats from "../../../../components/MarketStats";



const CarsDetails = ({
  carBrands,
  carDetails,
  carView,
}: {
  carBrands: ItemsCategory[];
  carDetails: ItemsCategoryId;
  carView: Items[];
}) => {
  
  const [carBrandsFilter, setCarBrandsFilter] = useState(carBrands);
  

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

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-8">
      <div className="mx-auto px-4">
        {/* هدر صفحه با اطلاعات برند */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* لوگو برند */}
            <div className="w-24 h-24 overflow-hidden flex items-center justify-center bg-gray-50 rounded-xl">
              <img
                src={mainDomainOld + carDetails.image}
                alt={carDetails.title}
                className="object-contain w-20 h-20"
              />
            </div>

            {/* اطلاعات برند */}
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {carDetails.title}
              </h1>
              {carDetails.seoTitle && (
                <p className="text-gray-600 text-lg mb-3">
                  {carDetails.seoTitle}
                </p>
              )}

              {/* اطلاعات آماری */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
                  <FaCar className="text-red-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {toPersianNumbers(carBrands.length)} مدل
                  </span>
                </div>

                {carDetails.created && (
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                    <FaInfoCircle className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      فعالیت از {new Date(carDetails.created).getFullYear()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* توضیحات برند */}
          {carDetails.summary && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div
                className="prose prose-sm max-w-none text-justify text-gray-600"
                dangerouslySetInnerHTML={createMarkup(carDetails.summary)}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* محتوای اصلی - 3/4 صفحه */}
          <div className="lg:w-3/4 w-full">
            {/* جستجو در مدل‌های این برند */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="relative">
                <input
                  onChange={(e) => {
                    if (!e.target.value) {
                      setCarBrandsFilter([...carBrands]);
                    } else {
                      setCarBrandsFilter([
                        ...carBrands.filter(
                          (ev) =>
                            ev.title.includes(e.target.value) ||
                            ev.parentTitle.includes(e.target.value)
                        ),
                      ]);
                    }
                  }}
                  type="text"
                  placeholder={`جستجو در مدل‌های ${carDetails.title}...`}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
            </div>

            {/* عنوان بخش مدل‌ها */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                مدل‌های <span className="text-red-600">{carDetails.title}</span>
              </h2>
              <span className="text-gray-500 text-sm">
                {toPersianNumbers(carBrands.length)} مدل
              </span>
            </div>

            {/* گرید مدل‌های خودرو */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {carBrandsFilter.map((car) => (
                <div
                  key={car.id}
                  //   href={car.url + `?id=${car.id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200 h-full flex flex-col">
                    {/* تصویر خودرو */}
                    <div className="w-full h-40 overflow-hidden rounded-lg mb-4 bg-gray-50 flex items-center justify-center relative">
                      <Link
                        href={
                          carView.filter((c) => c.categoryId === car.id)[0]?.url || ''
                        }
                      >
                        <img
                          src={mainDomainOld + car.image}
                          alt={car.title}
                          className="object-contain w-full h-full p-2 hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="sm:flex hidden flex-col gap-1 absolute top-0 -right-1 translate-x-full group-hover:translate-x-0 group-hover:right-0 duration-300">
                        {carView
                          .filter((c) => c.categoryId === car.id)
                          .map((ca) => (
                            <Link
                              href={ca.url}
                              key={ca.id}
                              className="bg-[#ce1a2a] rounded-lg px-2 py-1 text-white! hover:bg-red-800 duration-300"
                            >
                              {ca.sourceName} {ca.title} {ca.publishCode}
                            </Link>
                          ))}
                      </div>
                    </div>

                    <div className="sm:hidden flex  flex-col gap-1 py-4 duration-300">
                      {carView
                        .filter((c) => c.categoryId === car.id)
                        .map((ca) => (
                          <Link
                            href={ca.url}
                            key={ca.id}
                            className="bg-[#ce1a2a] rounded-lg px-2 py-1 text-white! hover:bg-red-800 duration-300"
                          >
                            <div className="flex flex-wrap justify-between items-center gap-2">
                              <div className="flex flex-wrap items-center gap-1">
                                <span> {ca.sourceName} </span>{" "}
                                <span>{ca.title}</span>
                              </div>{" "}
                              <span>{ca.publishCode}</span>
                            </div>
                          </Link>
                        ))}
                    </div>

                    {/* اطلاعات خودرو */}
                    <div className="flex-1">
                      <Link
                        href={
                          carView.filter((c) => c.categoryId === car.id)[0]?.url || ''
                        }
                      >
                        <h3 className="font-bold text-gray-900 text-lg mb-2 text-center hover:text-[#ce1a2a]! transition-colors">
                          {car.parentTitle} {car.title}
                        </h3>
                      </Link>

                      {car.summary && car.summary !== "<!DOCTYPE html>" && (
                        <div
                          className="text-gray-600 text-sm line-clamp-3 mb-4 text-justify"
                          dangerouslySetInnerHTML={{
                            __html:
                              car.summary.length > 150
                                ? car.summary.substring(0, 150) + "..."
                                : car.summary,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* پیام زمانی که مدلی وجود ندارد */}
            {carBrands.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100">
                <FaCar className="text-gray-400 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  مدلی یافت نشد
                </h3>
                <p className="text-gray-600">
                  در حال حاضر مدلی برای برند {carDetails.title} ثبت نشده است.
                </p>
              </div>
            )}
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

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
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

export default CarsDetails;
