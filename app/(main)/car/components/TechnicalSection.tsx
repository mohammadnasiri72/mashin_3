"use client";

import React, { useMemo, useState } from "react";

const TechnicalSection = ({ detailsCar }: { detailsCar: ItemsId }) => {
  // فیلتر مشخصات فنی
  const specifications = detailsCar.properties.filter(
    (e) => e.isTechnicalProperty,
  );

  // دسته‌بندی مشخصات براساس propertyCategoryTitle از دیتا
  const categorizedSpecs = useMemo(() => {
    const categories = new Map();

    specifications.forEach((spec) => {
      // استفاده از propertyCategoryTitle موجود در دیتا
      const categoryTitle = spec.propertyCategoryTitle || "سایر مشخصات";

      if (!categories.has(categoryTitle)) {
        categories.set(categoryTitle, {
          items: [],
          priority: spec.propertyCategoryPriority || 0, // ذخیره priority
        });
      }

      categories.get(categoryTitle).items.push(spec);
    });

    return categories;
  }, [specifications]);

  // تبدیل به آرایه برای رندر و مرتب‌سازی براساس priority
  const categories = useMemo(() => {
    return Array.from(categorizedSpecs.entries())
      .map(([title, { items, priority }]) => ({
        title,
        items,
        priority,
        count: items.length,
      }))
      .sort((a, b) => {
        // مرتب‌سازی نزولی (عدد بزرگتر = اولویت بالاتر)
        return b.priority - a.priority;
      });
  }, [categorizedSpecs]);

  // استیت برای تب فعال - اولین تب بعد از سورت
  const [activeCategory, setActiveCategory] = useState(
    categories.length > 0 ? categories[0].title : "",
  );

  // اگه هیچ مشخصاتی وجود نداشت
  if (specifications.length === 0) {
    return (
      <div className="detailsBox bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="dt_title text-xl font-bold text-gray-900 mb-4">
          <strong className="text-[#ce1a2a]">مشخصات فنی </strong>
          ماشین {detailsCar.sourceName} {detailsCar.title}
        </h3>
        <p className="text-gray-500 text-center py-8">
          مشخصات فنی برای این خودرو ثبت نشده است.
        </p>
      </div>
    );
  }

  // اگه فقط یک دسته داریم، تب نمایش نده
  const showTabs = categories.length > 1;

  return (
    <div className="detailsBox bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="dt_title text-xl font-bold text-gray-900 mb-4">
        <strong className="text-[#ce1a2a]">مشخصات فنی </strong>
        ماشین {detailsCar.sourceName} {detailsCar.title}
      </h3>

      {/* تب‌های دسته‌بندی - فقط اگه بیش از یک دسته داشته باشیم */}
      {showTabs && (
        <div className="my-6 border-b border-gray-200 overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-1">
            {categories.map((category) => (
              <button
                key={category.title}
                onClick={() => setActiveCategory(category.title)}
                className={`
                  flex cursor-pointer items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-all duration-300 whitespace-nowrap
                  ${
                    activeCategory === category.title
                      ? "bg-[#ce1a2a] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                <span className="flex items-center">{category.title}</span>
                
              </button>
            ))}
          </div>
        </div>
      )}

      {/* جدول مشخصات */}
      <div className="overflow-x-auto">
        <table className="details_table w-full border-collapse">
          <tbody>
            {categories
              .filter((cat) => !showTabs || cat.title === activeCategory)
              .map((category) => (
                <React.Fragment key={category.title}>
                  {/* آیتم‌های هر دسته */}
                  {category.items.map((spec: properties, index: number) => (
                    <tr
                      key={spec.id}
                      className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-red-50 transition-colors`}
                    >
                      <th className="text-right p-4 text-gray-600 font-medium text-sm border-b border-gray-200 w-2/5">
                        {spec.title}
                      </th>
                      <td className="text-right p-4 text-gray-800 font-bold text-sm border-b border-gray-200 w-3/5">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechnicalSection;
