'use client' 

import { FaClock, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";

function Loading() {
  return (
    <>
      {/* هدر اسکلتون */}
      <div className="text-center animate-pulse">
        <div className="h-60 w-full bg-gray-200 rounded-lg mx-auto mb-4"></div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="h-10 w-36 bg-gray-200 rounded-lg"></div>
        <div className="h-10 w-36 bg-gray-200 rounded-lg"></div>
        <div className="h-10 w-36 bg-gray-200 rounded-lg"></div>
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
                    {/* مشخصات نمایندگی اسکلتون */}
                    <div className="lg:w-1/2 w-full flex gap-3 items-center">
                      <div className="h-14 w-14 bg-gray-200 rounded-2xl"></div>
                      <div className="h-6 lg:w-96 sm:w-60 w-36 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="bg-white  overflow-hidden animate-pulse w-full lg:w-1/2 p-2">
                    <div className="flex flex-col h-full rounded-xl border border-gray-200 p-2">
                      {/* اطلاعات اسکلتون */}
                      <div className="flex-1 p-5">
                        {/* اطلاعات تماس و آدرس اسکلتون */}
                        <div className="space-y-3 mb-4">
                          {/* آدرس */}
                          <div className="flex items-start">
                            <FaMapMarkerAlt className="text-gray-200 ml-2 mt-1 shrink-0" />
                            <div className="flex flex-col w-full">
                              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                              <div className="h-4 w-full bg-gray-200 rounded"></div>
                            </div>
                          </div>

                          {/* تلفن */}
                          <div className="flex items-start">
                            <FaPhone className="text-gray-200 ml-2 mt-1 shrink-0" />
                            <div className="flex flex-col w-full">
                              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                              <div className="h-4 w-full bg-gray-200 rounded"></div>
                            </div>
                          </div>

                          {/* زمان */}
                          <div className="flex items-start">
                            <FaClock className="text-gray-200 ml-2 mt-1 shrink-0" />
                            <div className="flex flex-col w-full">
                              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                              <div className="h-4 w-full bg-gray-200 rounded"></div>
                            </div>
                          </div>
                          {/* کد عاملیت */}
                          <div className="flex items-start">
                            <MdNumbers className="text-gray-200 ml-2 mt-1 shrink-0" />
                            <div className="flex flex-col w-full">
                              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                              <div className="h-4 w-full bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white  overflow-hidden animate-pulse w-full lg:w-1/2 p-2">
                    <div className="flex flex-col h-full rounded-xl border border-gray-200 p-2">
                      {/* تصویر اسکلتون */}
                      <div className="h-56 bg-gray-200"></div>

                     {/* دکمه‌های اقدام اسکلتون */}
                        <div className="flex mt-auto pt-2">
                          <div className="flex-1 h-9 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                  </div>
                </div>
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
                  <div className="h-72 bg-gray-200"></div>
                </div>
                <div className="bg-white rounded-xl overflow-hidden animate-pulse">
                  <div className="h-72 bg-gray-200"></div>
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
