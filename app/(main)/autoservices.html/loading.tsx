'use client'

import React from "react";
import { FaCar, FaMapMarkerAlt, FaClock, FaPhone } from "react-icons/fa";

function Loading() {
  return (
    <>
      {/* هدر اسکلتون */}
      <div className="text-center mb-8 animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded-lg mx-auto mb-4"></div>
        <div className="h-4 w-96 max-w-full bg-gray-200 rounded-lg mx-auto"></div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap gap-6 relative mx-auto px-4">
        {/* محتوای اصلی اسکلتون */}
        <div className="lg:w-3/4 w-full">
          <div className="min-h-screen bg-[#f4f4f4] py-8">
            <div className="mx-auto max-w-6xl">
              {/* فیلترهای اسکلتون */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
                  <div className="flex flex-col lg:flex-row gap-4 w-full">
                    {/* فیلتر برند اسکلتون */}
                    <div className="lg:w-1/2 w-full">
                      <div className="h-5 w-24 bg-gray-200 rounded"></div>
                      <div className="h-12 w-full bg-gray-200 rounded-lg mt-2"></div>
                    </div>

                    {/* فیلتر استان اسکلتون */}
                    <div className="lg:w-1/2 w-full">
                      <div className="h-5 w-16 bg-gray-200 rounded"></div>
                      <div className="h-12 w-full bg-gray-200 rounded-lg mt-2"></div>
                    </div>
                  </div>

                  {/* دکمه پاک کردن فیلترها اسکلتون */}
                  <div className="h-10 w-36 bg-gray-200 rounded-lg mt-6 lg:mt-0"></div>
                </div>
              </div>

              {/* لیست گریدی نمایندگی‌ها اسکلتون */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse"
                  >
                    <div className="flex flex-col h-full">
                      {/* تصویر اسکلتون */}
                      <div className="h-48 bg-gray-200"></div>

                      {/* اطلاعات اسکلتون */}
                      <div className="flex-1 p-5">
                        <div className="mb-3">
                          {/* عنوان */}
                          <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>

                          {/* برچسب */}
                          <div className="h-5 w-24 bg-gray-200 rounded-full"></div>
                        </div>

                        {/* اطلاعات تماس و آدرس اسکلتون */}
                        <div className="space-y-3 mb-4">
                          {/* آدرس */}
                          <div className="flex items-start">
                            <FaMapMarkerAlt className="text-gray-200 ml-2 mt-1 shrink-0" />
                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                          </div>

                          {/* زمان */}
                          <div className="flex items-center">
                            <FaClock className="text-gray-200 ml-2 shrink-0" />
                            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                          </div>

                          {/* تلفن */}
                          <div className="flex items-center">
                            <FaPhone className="text-gray-200 ml-2 shrink-0" />
                            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                          </div>
                        </div>

                        {/* دکمه‌های اقدام اسکلتون */}
                        <div className="flex gap-2 mt-auto pt-2">
                          <div className="flex-1 h-9 bg-gray-200 rounded-lg"></div>
                          <div className="flex-1 h-9 bg-gray-200 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* صفحه‌بندی اسکلتون */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-3 p-4 bg-white rounded-lg shadow-sm animate-pulse">
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                  ))}
                </div>
                <div className="h-4 w-32 bg-gray-200 rounded hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>

        {/* سایدبار اسکلتون */}
        <aside className="lg:w-1/4 w-full">
          <section className="py-8 bg-[#f4f4f4]">
            <div className="mx-auto pl-4 lg:pr-2 pr-4">
              <div className="space-y-6">
                {/* بنر اسکلتون */}
                <div className="bg-white rounded-xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                </div>

                {/* آمار بازار اسکلتون */}
                <div className="bg-white rounded-xl p-4 animate-pulse">
                  <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* جدیدترین اخبار اسکلتون */}
                <div className="bg-white rounded-xl p-4 animate-pulse">
                  <div className="h-6 w-40 bg-gray-200 rounded mb-3"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex gap-2">
                        <div className="w-16 h-16 bg-gray-200 rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* جدیدترین خودروها اسکلتون */}
                <div className="bg-white rounded-xl p-4 animate-pulse">
                  <div className="h-6 w-36 bg-gray-200 rounded mb-3"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex gap-2">
                        <div className="w-16 h-16 bg-gray-200 rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}

export default Loading;