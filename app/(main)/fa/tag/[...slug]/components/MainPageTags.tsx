"use client";

import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();

  // گروه‌بندی نتایج بر اساس type
  const groupResultsByType = (results: ItemsFindByTerm[]) => {
    const grouped: Record<string, ItemsFindByTerm[]> = {};

    results.forEach((item) => {
      const type = item.type || "سایر";
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(item);
    });

    return grouped;
  };

  const groupedResults = groupResultsByType(keyWord);

  // ترتیب نمایش دسته‌بندی‌ها (اولویت با دسته‌های خاص)
  const getCategoryOrder = (type: string) => {
    const order: Record<string, number> = {
      خودرو: 1,
      اخبار: 2,
      مطلب: 3,
      ویدئو: 4,
      سایر: 5,
    };
    return order[type] || 99;
  };

  // مرتب‌سازی دسته‌بندی‌ها
  const sortedCategories = Object.keys(groupedResults).sort(
    (a, b) => getCategoryOrder(a) - getCategoryOrder(b),
  );

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-8">
      <div className="mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 relative items-start">
          {/* محتوای اصلی */}
          <div className="lg:w-3/4 w-full lg:sticky lg:top-20 lg:self-start">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              {/* هدر صفحه */}
              <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  <span className="text-red-600">
                    نتایج جستجو برای "{term}"
                  </span>
                </h1>
                <p className="text-gray-500 mt-2">
                  {keyWord.length} نتیجه یافت شد
                </p>
              </div>
              {keyWord.length > 0 ? (
                <div className="space-y-8">
                  {sortedCategories.map((category) => (
                    <div key={category}>
                      {/* هدر دسته‌بندی */}
                      <div className="flex items-center gap-3 mb-4 pb-2 border-b-2 border-red-100">
                        <h2 className="text-xl font-bold text-gray-800">
                          {category}
                        </h2>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {groupedResults[category].length}
                        </span>
                      </div>

                      {/* آیتم‌های دسته‌بندی */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {groupedResults[category].map((car) => (
                          <div key={car.id} className="group block">
                            <div className="bg-white rounded-xl overflow-hidden pb-2 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200 h-full flex flex-col">
                              {/* تصویر */}
                              <div className="w-full h-36 overflow-hidden rounded-lg mb-2 bg-gray-50 flex items-center justify-center relative">
                                <Link href={car?.url || "#"}>
                                  <img
                                    src={mainDomain + car.image}
                                    alt={car.title}
                                    className="object-contain w-full h-full p-2 hover:scale-105 transition-transform duration-300"
                                  />
                                </Link>
                              </div>

                              {/* عنوان */}
                              <div className="flex-1 px-2">
                                <Link href={car?.url || "#"}>
                                  <h3 className="font-bold text-gray-900 text-sm text-center hover:text-[#ce1a2a] transition-colors line-clamp-2">
                                    {car.title}
                                  </h3>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    هیچ نتیجه‌ای برای "{term}" یافت نشد
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* سایدبار - sticky ساده */}
          <aside className="lg:w-1/4 w-full lg:sticky lg:top-4 lg:self-start">
            <SideBarKeyWords banner={banner} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default MainPageTags;
