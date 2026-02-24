// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Eye,
  ChevronLeft,
  Clock,
  Car,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatPersianDate } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";

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

interface FavoriteItem {
  id: string;
  title: string;
  image?: string;
  price?: string;
  url: string;
}

interface CommentItem {
  id: string;
  text: string;
  carName: string;
  date: string;
  url: string;
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

export default function DashboardOverview() {
  const [recentViews, setRecentViews] = useState<RecentView[]>([]);
  const [isLoading, setIsLoading] = useState(true); // state برای لودینگ
  const [favorites] = useState<FavoriteItem[]>([
    {
      id: "1",
      title: "پژو ۲۰۷ دنده‌ای",
      price: "۵۸۰ میلیون تومان",
      url: "/car/peugeot-207",
    },
    {
      id: "2",
      title: "ام وی ام X22",
      price: "۴۲۰ میلیون تومان",
      url: "/car/mvm-x22",
    },
    {
      id: "3",
      title: "هایما S7 پلاس",
      price: "۱.۲ میلیارد تومان",
      url: "/car/haima-s7",
    },
  ]);

  const [comments] = useState<CommentItem[]>([
    {
      id: "1",
      text: "مصرف سوخت این خودرو چقدر است؟",
      carName: "پژو ۲۰۷",
      date: "۲ روز پیش",
      url: "/car/peugeot-207#comments",
    },
    {
      id: "2",
      text: "کیا اپتیما رو با این مقایسه کردین عالی بود",
      carName: "مقایسه کیا اپتیما و سوناتا",
      date: "۵ روز پیش",
      url: "/compare/kia-optima-vs-sonata",
    },
  ]);

  // گرفتن آخرین بازدیدها از localStorage
  useEffect(() => {
    const loadRecentViews = () => {
      try {
        setIsLoading(true);
        const views = JSON.parse(localStorage.getItem("recentCarViews") || "[]");
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

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('recentViewsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('recentViewsUpdated', handleStorageChange);
    };
  }, []);

  // فیلتر کردن بر اساس نوع
  const carViews = recentViews.filter((view) => view.type === "خودرو");
  const newsViews = recentViews.filter((view) => view.type === "اخبار");

  // لینک‌های سریع
  const quickLinks = [
    { title: "مقایسه خودرو", href: "/compare", icon: "🔄" },
    { title: "قیمت روز خودرو", href: "/prices", icon: "💰" },
    { title: "نکات آموزشی", href: "/reviews", icon: "📝" },
    { title: "اخبار خودرو", href: "/news", icon: "📰" },
  ];

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
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">
            {formatPersianDate(view.timestamp)}
          </span>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* هدر صفحه */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">داشبورد</h1>
          <p className="text-gray-600 text-sm mt-1">
            خلاصه فعالیت‌های شما در ماشین‌۳
          </p>
        </div>

        {/* سه باکس اصلی */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* باکس آخرین بازدیدها */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden md:col-span-1">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <h2 className="font-semibold text-gray-900">آخرین بازدیدها</h2>
              </div>
              <Link
                href="/dashboard/history"
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
              >
                نمایش همه
                <ChevronLeft className="w-3.5 h-3.5" />
              </Link>
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

          {/* باکس علاقه‌مندی‌ها */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600" />
                <h2 className="font-semibold text-gray-900">علاقه‌مندی‌ها</h2>
              </div>
              <Link
                href="/dashboard/favorites"
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
              >
                نمایش همه
                <ChevronLeft className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {favorites.length > 0 ? (
                favorites.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                      <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <Car className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </p>
                      {item.price && (
                        <p className="text-xs font-medium text-green-600 mt-1">
                          {item.price}
                        </p>
                      )}
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500 text-sm">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>علاقه‌مندی‌ای ندارید</p>
                </div>
              )}
            </div>
          </div>

          {/* باکس نظرات ارسالی */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <h2 className="font-semibold text-gray-900">نظرات شما</h2>
              </div>
              <Link
                href="/dashboard/comments"
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
              >
                نمایش همه
                <ChevronLeft className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
              {comments.length > 0 ? (
                comments.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="block p-3 hover:bg-gray-50 transition-colors"
                  >
                    <p className="text-sm text-gray-900 line-clamp-2">
                      {item.text}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        در {item.carName}
                      </span>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500 text-sm">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>نظری ثبت نکرده‌اید</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* لینک‌های سریع */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            دسترسی سریع
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">
                  {link.icon}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {link.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* فوتر ساده */}
        <div className="mt-6 text-center text-xs text-gray-400">
          آخرین بروزرسانی: {new Date().toLocaleDateString("fa-IR")}
        </div>
      </div>
    </div>
  );
}