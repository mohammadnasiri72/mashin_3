"use client";

import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";

const NewsRelatedSection = ({ relatedNews }: { relatedNews: Items[] }) => {
  return (
    <section className="py-8 bg-white">
      <div className="mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6! text-center">
          اخبار مرتبط
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedNews.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={mainDomainOld + news.image}
                  alt={news.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-800 mt-3! mb-2! line-clamp-2">
                  {news.title}
                </h3>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{news.created}</span>
                  <Link
                    href={`/news/${news.id}`}
                    className="text-[#ce1a2a] hover:text-red-700 font-medium"
                  >
                    ادامه مطلب
                  </Link>
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
};

export default NewsRelatedSection;
