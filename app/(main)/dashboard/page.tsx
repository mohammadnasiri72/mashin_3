// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  HiOutlineHeart, 
  HiOutlineChat, 
  HiOutlineEye,
  HiOutlineClock,
  HiOutlineStar,
  HiOutlineDocumentText 
} from 'react-icons/hi';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    favorites: 0,
    comments: 0,
    views: 0,
    reviews: 0
  });

  // اینجا می‌تونی از API برای گرفتن آمار استفاده کنی
  useEffect(() => {
    // نمونه آمار
    setStats({
      favorites: 12,
      comments: 8,
      views: 345,
      reviews: 5
    });
  }, []);

  const statCards = [
    { label: 'علاقه‌مندی‌ها', value: stats.favorites, icon: HiOutlineHeart, color: 'rose', bg: 'bg-rose-50', text: 'text-rose-600' },
    { label: 'نظرات', value: stats.comments, icon: HiOutlineChat, color: 'blue', bg: 'bg-blue-50', text: 'text-blue-600' },
    { label: 'بازدیدها', value: stats.views, icon: HiOutlineEye, color: 'green', bg: 'bg-green-50', text: 'text-green-600' },
    { label: 'نقد و بررسی', value: stats.reviews, icon: HiOutlineDocumentText, color: 'purple', bg: 'bg-purple-50', text: 'text-purple-600' },
  ];

  const recentActivities = [
    { id: 1, action: 'ثبت نظر برای پژو 207', time: '۲ ساعت پیش', icon: HiOutlineChat },
    { id: 2, action: 'اضافه کردن به علاقه‌مندی‌ها - ام وی ام X33', time: 'دیروز', icon: HiOutlineHeart },
    { id: 3, action: 'مشاهده قیمت خودروهای داخلی', time: '۲ روز پیش', icon: HiOutlineEye },
  ];

  return (
    <div className="space-y-6">
      {/* header صفحه */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">خلاصه فعالیت</h1>
        <p className="text-gray-600 mt-1">به پنل کاربری خود خوش آمدید</p>
      </div>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.bg} p-4 rounded-2xl`}>
                  <Icon className={`w-6 h-6 ${stat.text}`} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <HiOutlineStar className="w-4 h-4 ml-1" />
                <span>+۱۲٪ نسبت به ماه قبل</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* فعالیت‌های اخیر */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* فعالیت‌های اخیر */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">فعالیت‌های اخیر</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <HiOutlineClock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* توصیه‌ها */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">توصیه‌های ویژه</h2>
          <div className="space-y-3">
            <div className="border border-blue-100 bg-blue-50 rounded-xl p-4">
              <h3 className="font-medium text-blue-800">مقایسه خودرو</h3>
              <p className="text-sm text-blue-600 mt-1">۳ خودرو را با هم مقایسه کنید</p>
            </div>
            <div className="border border-green-100 bg-green-50 rounded-xl p-4">
              <h3 className="font-medium text-green-800">آخرین نقدها</h3>
              <p className="text-sm text-green-600 mt-1">نقد و بررسی خودروها را بخوانید</p>
            </div>
            <div className="border border-purple-100 bg-purple-50 rounded-xl p-4">
              <h3 className="font-medium text-purple-800">قیمت روز</h3>
              <p className="text-sm text-purple-600 mt-1">از آخرین قیمت‌ها مطلع شوید</p>
            </div>
          </div>
        </div>
      </div>

      {/* آخرین بازدیدها */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">آخرین بازدیدها</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 border rounded-xl hover:shadow-sm transition-shadow">
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div>
                <h3 className="font-medium text-gray-800">پژو ۲۰۷</h3>
                <p className="text-sm text-gray-500">دیروز</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}