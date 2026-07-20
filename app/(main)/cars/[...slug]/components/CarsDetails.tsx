"use client";

import {
  createpublishCode,
  htmlToPlainText,
  toPersianNumbers,
} from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaCar, FaSearch } from "react-icons/fa";
import ShowSummary from "./ShowSummary";
import SideBarCars from "./SideBarCars";

// ✅ کامپوننت کارت خودرو با memo
const CarCard = memo(({ 
  car,
  mainDomain,
}: { 
  car: Items;
  mainDomain: string;
}) => {
  return (
    <div className="group block">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200 h-full flex flex-col">
        {/* تصویر خودرو */}
        <div className="w-full h-40 overflow-hidden rounded-lg mb-4 bg-gray-50 flex items-center justify-center relative">
          <Link 
            href={car.url || "#"} 
            prefetch={true}
            className="block w-full h-full"
          >
            <img
              src={mainDomain + car.image}
              alt={car.title}
              loading="lazy"
              className="object-contain w-full h-full p-2 hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* اطلاعات خودرو */}
        <div className="flex-1">
          <Link
            href={car.url || "#"}
            prefetch={true}
            className="block"
          >
            <h3 className="font-bold text-gray-900 text-lg mb-2 text-center hover:text-[#ce1a2a]! transition-colors">
              {car.sourceName} {car.title}
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
  );
});

CarCard.displayName = 'CarCard';

// ✅ کامپوننت گروه خودرو (برای آیتم‌هایی که چند مدل دارن)
const CarGroupCard = memo(({ 
  groupKey,
  cars,
  mainDomain,
}: { 
  groupKey: string;
  cars: Items[];
  mainDomain: string;
}) => {
  const firstCar = cars[0];

  return (
    <div className="group block">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200 h-full flex flex-col">
        {/* تصویر خودرو */}
        <div className="w-full h-40 overflow-hidden rounded-lg mb-4 bg-gray-50 flex items-center justify-center relative">
          <Link 
            href={firstCar.url || "#"} 
            prefetch={true}
            className="block w-full h-full"
          >
            <img
              src={mainDomain + firstCar.image}
              alt={firstCar.title}
              loading="lazy"
              className="object-contain w-full h-full p-2 hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          {/* لینک‌های سریع - دسکتاپ (برای مدل‌های مختلف) */}
          {cars.length > 1 && (
            <div className="sm:flex! hidden flex-col gap-1 absolute top-0 -right-1 translate-x-full group-hover:translate-x-0 group-hover:right-0 duration-300">
              {cars.slice(0, 3).map((ca) => (
                <Link
                  href={ca.url}
                  key={ca.id}
                  prefetch={true}
                  className="bg-[#ce1a2a] rounded-lg px-2 py-1 text-white! hover:bg-red-800 duration-300 text-xs whitespace-nowrap"
                >
                  {ca.sourceName} {ca.title} {createpublishCode(ca.publishCode)}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* لینک‌های موبایل */}
        {cars.length > 1 && (
          <div className="sm:hidden flex flex-col gap-1 py-4 duration-300">
            {cars.slice(0, 3).map((ca) => (
              <Link
                href={ca.url}
                key={ca.id}
                prefetch={true}
                className="bg-[#ce1a2a] rounded-lg px-2 py-1 text-white! hover:bg-red-800 duration-300 text-xs"
              >
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div className="flex flex-wrap items-center gap-1">
                    <span>{ca.sourceName}</span>
                    <span>{ca.title}</span>
                  </div>
                  <span>{createpublishCode(ca.publishCode)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* اطلاعات خودرو */}
        <div className="flex-1">
          <Link
            href={firstCar.url || "#"}
            prefetch={true}
            className="block"
          >
            <h3 className="font-bold text-gray-900 text-lg mb-2 text-center hover:text-[#ce1a2a]! transition-colors">
              {firstCar.sourceName} {firstCar.title}
            </h3>
          </Link>

          {firstCar.summary && firstCar.summary !== "<!DOCTYPE html>" && (
            <div
              className="text-gray-600 text-sm line-clamp-3 mb-4 text-justify"
              dangerouslySetInnerHTML={{
                __html:
                  firstCar.summary.length > 150
                    ? firstCar.summary.substring(0, 150) + "..."
                    : firstCar.summary,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
});

CarGroupCard.displayName = 'CarGroupCard';

interface CarsDetailsProps {
  carView: Items[];
  carDetails: ItemsCategoryId;
  banner: Items[];
}

const CarsDetails = ({
  carView,
  carDetails,
  banner,
}: CarsDetailsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMainLonger, setIsMainLonger] = useState(true);
  
  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // ✅ دسته‌بندی بر اساس itemKey
  const groupedCars = useMemo(() => {
    const groups: Record<string, Items[]> = {};
    
    carView.forEach((car) => {
      const key = car.categoryId;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(car);
    });

    return groups;
  }, [carView]);

  // ✅ تبدیل به آرایه برای رندر
  const groupedCarsArray = useMemo(() => {
    return Object.entries(groupedCars).map(([key, cars]) => ({
      key,
      cars,
      // مرتب‌سازی بر اساس publishCode (جدیدترین اول)
      sortedCars: [...cars].sort((a, b) => {
        const yearA = parseInt(a.publishCode?.split("-")[0] || "0");
        const yearB = parseInt(b.publishCode?.split("-")[0] || "0");
        return yearB - yearA;
      }),
    }));
  }, [groupedCars]);

  // ✅ فیلتر با useMemo
  const filteredGroups = useMemo(() => {
    if (!searchTerm) return groupedCarsArray;
    const term = searchTerm.toLowerCase();
    return groupedCarsArray.filter(
      (group) =>
        group.key.toLowerCase().includes(term) ||
        group.cars.some(
          (car) =>
            car.title?.toLowerCase().includes(term) ||
            car.sourceName?.toLowerCase().includes(term)
        )
    );
  }, [groupedCarsArray, searchTerm]);

  // ✅ هندلر جستجو
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // ✅ useEffect برای ارتفاع با debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;

    const checkHeights = () => {
      if (!isMounted) return;
      if (mainBoxRef.current && sidebarRef.current) {
        const mainHeight = mainBoxRef.current.offsetHeight;
        const sidebarHeight = sidebarRef.current.offsetHeight;
        setIsMainLonger(mainHeight > sidebarHeight);
      }
    };

    const initialTimer = setTimeout(checkHeights, 200);

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkHeights, 300);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      clearTimeout(initialTimer);
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [filteredGroups]);

  // ✅ محاسبه تعداد کل مدل‌ها
  const totalModels = useMemo(() => {
    return carView.length;
  }, [carView]);

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-8">
      <div className="mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* محتوای اصلی */}
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
                  onChange={handleSearch}
                  value={searchTerm}
                  type="text"
                  placeholder={`جستجو در مدل‌های ${carDetails.title}...`}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
            </div>

            {/* عنوان */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={mainDomain + carDetails.image}
                  alt={carDetails.title}
                  className="object-contain w-20 h-20"
                />
                <h2 className="text-2xl font-bold text-gray-900">
                  مدل‌های <span className="text-red-600">{carDetails.title}</span>
                </h2>
              </div>
              <span className="text-gray-700 text-sm">
                {toPersianNumbers(totalModels)} مدل
              </span>
            </div>

            {/* خلاصه */}
            {htmlToPlainText(carDetails.summary) && (
              <ShowSummary text={htmlToPlainText(carDetails.summary)} />
            )}

            {/* گرید */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredGroups.map((group) => {
                // اگر یک آیتم بیشتر داشت، از CarGroupCard استفاده کن
                if (group.cars.length > 1) {
                  return (
                    <CarGroupCard
                      key={group.key}
                      groupKey={group.key}
                      cars={group.sortedCars}
                      mainDomain={mainDomain}
                    />
                  );
                }
                // وگرنه از CarCard معمولی
                return (
                  <CarCard
                    key={group.key}
                    car={group.cars[0]}
                    mainDomain={mainDomain}
                  />
                );
              })}
            </div>

            {/* Empty state */}
            {filteredGroups.length === 0 && (
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

          {/* سایدبار */}
          <aside
            ref={sidebarRef}
            className={`
              lg:w-1/4 w-full transition-all duration-300
              ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
            `}
          >
            <SideBarCars banner={banner} />
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .lg\\:sticky {
          position: sticky;
          bottom: 0;
          align-self: flex-end;
        }

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

export default CarsDetails;