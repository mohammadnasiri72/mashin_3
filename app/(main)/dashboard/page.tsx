"use client";

import Link from "next/link";
import CommentsMe from "./components/CommentsMe";
import Favorites from "./components/Favorites";
import RecentViews from "./components/RecentViews";

export default function DashboardOverview() {
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
          <Favorites />

          {/* باکس نظرات ارسالی */}
          <CommentsMe />
        </div>

        {/* لینک‌های سریع */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3!">
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
