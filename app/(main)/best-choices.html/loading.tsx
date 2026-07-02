'use client'

function Loading() {
  return (
    <>
      <div className="flex justify-center items-center">
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
                    <div className=" w-full flex gap-3 items-center">
                      <div className="h-10 w-full bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="flex mt-5 gap-3 border-b pb-5 border-[#0002]"
                  >
                    <div className="min-h-64 min-w-64 bg-gray-200 rounded"></div>
                    <div className="flex flex-col w-full">
                      <div className="w-full">
                        <div className="h-5 w-full bg-gray-200 rounded mb-2.5"></div>
                        <div className="h-5 w-full bg-gray-200 rounded mb-2.5"></div>
                        <div className="h-5 w-full bg-gray-200 rounded mb-2.5"></div>
                        <div className="h-5 w-full bg-gray-200 rounded mb-2.5"></div>
                        <div className="h-5 w-full bg-gray-200 rounded mb-2.5"></div>
                        <div className="h-5 w-full bg-gray-200 rounded mb-2.5"></div>
                        <div className="h-5 w-full bg-gray-200 rounded mb-2.5"></div>
                        <div className="h-5 w-full bg-gray-200 rounded mb-2.5"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <div className="h-6 w-20 bg-gray-200 rounded"></div>
                          <div className="h-6 w-20 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-6 w-20 bg-gray-200 rounded"></div>
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
                    <div
                      key={i}
                      className="h-8 w-8 bg-gray-200 rounded-lg"
                    ></div>
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
