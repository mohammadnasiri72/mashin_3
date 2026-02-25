"use client";

import { Car, ChevronLeft, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CommentsMe from "./components/CommentsMe";
import RecentViews from "./components/RecentViews";

interface FavoriteItem {
  id: string;
  title: string;
  image?: string;
  price?: string;
  url: string;
}

export default function DashboardOverview() {
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

  // لینک‌های سریع
  const quickLinks = [
    { title: "مقایسه خودرو", href: "/compare", icon: "🔄" },
    { title: "قیمت روز خودرو", href: "/price.html", icon: "💰" },
    {
      title: "نکات آموزشی",
      href: "/fa/educationtips/نکات-آموزشی.html",
      icon: "📝",
    },
    { title: "اخبار خودرو", href: "/fa/news/اخبار-خودرو.html", icon: "📰" },
  ];

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
          <RecentViews />

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
          <CommentsMe />
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
      </div>
    </div>
  );
}
