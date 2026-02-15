// app/dashboard/favorites/page.tsx
'use client';

import { HiOutlineHeart, HiOutlineTrash } from 'react-icons/hi';

export default function FavoritesPage() {
  const favorites = [
    { id: 1, name: 'پژو ۲۰۷', type: 'خودرو', image: null },
    { id: 2, name: 'ام وی ام X33', type: 'خودرو', image: null },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">علاقه‌مندی‌ها</h1>
      
      {favorites.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <HiOutlineHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">لیست علاقه‌مندی‌ها خالی است</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm p-4">
              <div className="aspect-video bg-gray-100 rounded-xl mb-3"></div>
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{item.type}</p>
              <button className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm">
                <HiOutlineTrash className="w-4 h-4" />
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}