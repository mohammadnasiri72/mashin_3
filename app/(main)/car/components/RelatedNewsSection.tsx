// RelatedNewsSection.tsx
"use client";

import { formatPersianDate } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";

// کامپوننت لودینگ
const NewsSkeleton = () => (
  <section className="py-8 bg-white rounded-xl shadow-sm">
    <div className="mx-auto px-4">
      <div className="h-8 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

function RelatedNewsSection({ detailsCar ,relatedNews , loading}: { detailsCar: ItemsId ,relatedNews:Items[], loading:boolean}) {

 

  if (loading) {
    return <NewsSkeleton />;
  }

  if (relatedNews.length === 0) {
    return null; // اگر خبری نبود، بخش نمایش داده نشود
  }

  return (
    <section className="py-8 bg-white rounded-xl shadow-sm">
      <div className="mx-auto px-4">
        <h3 className="dt_title text-xl font-bold text-gray-900 mb-4!">
          <strong className="text-red-600">اخبار مرتبط </strong>
          ماشین {detailsCar.sourceName} {detailsCar.title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedNews.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <Link href={news.url} className="w-full h-full">
                  <img
                    src={mainDomain + news.image}
                    alt={news.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </Link>
              </div>

              <div className="p-4">
                <Link href={news.url} className="font-medium group">
                  <h3 className="font-bold text-gray-800 mt-3! mb-2! line-clamp-2 duration-300 group-hover:text-[#ce1a2a]!">
                    {news.title}
                  </h3>
                </Link>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{formatPersianDate(news.created)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}

export default RelatedNewsSection;
