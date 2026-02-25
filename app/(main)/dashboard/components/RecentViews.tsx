import { formatPersianDate } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Car, Eye, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegCalendarDays } from "react-icons/fa6";

// تایپ‌ها
interface RecentView {
  id: string;
  title: string;
  sourceName: string;
  publishCode: string;
  image: string;
  timestamp: number;
  url: string;
  type: "خودرو" | "اخبار";
}

// کامپوننت اسکلتون لودینگ
const RecentViewsSkeleton = () => {
  return (
    <div className="divide-y divide-gray-100">
      {/* اسکلتون خودروها */}
      <div className="px-3 pt-3 pb-1">
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
      {[1, 2].map((i) => (
        <div key={`skeleton-car-${i}`} className="flex items-center gap-3 p-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse shrink-0" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}

      {/* اسکلتون اخبار */}
      <div className="px-3 pt-3 pb-1">
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
      </div>
      {[1, 2].map((i) => (
        <div key={`skeleton-news-${i}`} className="flex items-center gap-3 p-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse shrink-0" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

function RecentViews() {
  const [recentViews, setRecentViews] = useState<RecentView[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // تابع کمکی برای رندر آیتم بازدید
  const renderViewItem = (view: RecentView) => (
    <Link
      key={`${view.type}-${view.id}`}
      href={view.url || "#"}
      className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
    >
      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
        {view.image ? (
          <Image
            src={mainDomainOld + view.image}
            alt={view.title}
            width={48}
            height={48}
            className="w-full h-full object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 line-clamp-2">
          {view.title}
        </p>
        <div className="flex items-center gap-1 mt-1">
          <FaRegCalendarDays className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">
            {formatPersianDate(view.timestamp)}
          </span>
        </div>
      </div>
    </Link>
  );

  // فیلتر کردن بر اساس نوع
  const carViews = recentViews.filter((view) => view.type === "خودرو");
  const newsViews = recentViews.filter((view) => view.type === "اخبار");

  // گرفتن آخرین بازدیدها از localStorage
  useEffect(() => {
    const loadRecentViews = () => {
      try {
        setIsLoading(true);
        const views = JSON.parse(
          localStorage.getItem("recentCarViews") || "[]",
        );
        // شبیه‌سازی تاخیر شبکه (اختیاری - برای دیدن اسکلتون)
        setTimeout(() => {
          setRecentViews(views.slice(0, 10));
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("خطا در خواندن localStorage:", error);
        setIsLoading(false);
      }
    };

    loadRecentViews();

    // آپدیت هنگام تغییر در تب دیگر
    const handleStorageChange = () => {
      loadRecentViews();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("recentViewsUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("recentViewsUpdated", handleStorageChange);
    };
  }, []);

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden md:col-span-1">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-gray-900">آخرین بازدیدها</h2>
          </div>
        </div>

        <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
          {/* نمایش اسکلتون در حال لودینگ */}
          {isLoading ? (
            <RecentViewsSkeleton />
          ) : (
            <>
              {/* خودروها */}
              {carViews.length > 0 && (
                <>
                  <div className="px-3 pt-3 pb-1 bg-gray-50/50">
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                      <Car className="w-3.5 h-3.5" />
                      خودروها
                    </span>
                  </div>
                  {carViews.slice(0, 3).map(renderViewItem)}
                </>
              )}

              {/* اخبار */}
              {newsViews.length > 0 && (
                <>
                  <div className="px-3 pt-3 pb-1 bg-gray-50/50">
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                      <Newspaper className="w-3.5 h-3.5" />
                      اخبار
                    </span>
                  </div>
                  {newsViews.slice(0, 3).map(renderViewItem)}
                </>
              )}

              {/* حالت خالی - فقط وقتی لودینگ تموم شده و هیچ داده‌ای نیست */}
              {!isLoading && recentViews.length === 0 && (
                <div className="p-6 text-center text-gray-500 text-sm">
                  <Eye className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>بازدیدی نداشته‌اید</p>
                  <p className="text-xs text-gray-400 mt-1">
                    با مشاهده خودروها و اخبار، لیست بازدیدهای شما اینجا نمایش
                    داده می‌شود
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default RecentViews;
