"use client";

import { formatPersianDate } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const NewsRelatedSection = ({ relatedNews }: { relatedNews: Items[] }) => {
  if (!relatedNews?.length) {
    return null;
  }

  return (
    <section className="mb-12 max-w-7xl mx-auto px-4 md:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 bg-linear-to-b from-[#ce1a2a] to-red-400 rounded-full" />
          <h3 className="text-xl font-bold text-gray-900">
            <span className="text-[#ce1a2a]">اخبار</span> مرتبط
          </h3>
        </div>
        <Link
          href="/news"
          className="text-[#ce1a2a] text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300"
        >
          مشاهده همه
          <FaArrowLeftLong className="text-xs" />
        </Link>
      </div>

      {/* News Cards - Vertical List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
        {relatedNews.map((news, index) => (
          <Link
            key={news.id}
            href={news.url}
            className={`group flex items-center gap-4 p-4 hover:bg-gray-50/80 transition-all duration-300 ${
              index !== relatedNews.length - 1
                ? "border-b border-gray-100/80"
                : ""
            }`}
          >
            {/* Image */}
            <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={mainDomain + news.image}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2 group-hover:text-[#ce1a2a] transition-colors duration-300">
                {news.title}
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatPersianDate(
                    news.modified ? news.modified : news.created,
                  )}
                </span>
              </div>
            </div>

            {/* Arrow Icon */}
            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <div className="w-8 h-8 rounded-full bg-[#ce1a2a]/10 flex items-center justify-center text-[#ce1a2a]">
                <FaArrowLeftLong className="text-xs" />
              </div>
            </div>
          </Link>
        ))}
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
