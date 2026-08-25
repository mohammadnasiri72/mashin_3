"use client";

import { mainDomain } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";
import { FaBook, FaArrowLeftLong } from "react-icons/fa6";

function RelatedEducation({
  relatedEducations,
}: {
  relatedEducations: Items[];
}) {
  if (!relatedEducations?.length) {
    return null;
  }

  return (
    <section className="mb-12 max-w-7xl mx-auto px-4 md:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 bg-linear-to-b from-[#ce1a2a] to-red-400 rounded-full" />
          <h3 className="text-xl font-bold text-gray-900">
            <span className="text-[#ce1a2a]">مطالب</span> مرتبط
          </h3>
        </div>
        <Link
          href="/education"
          className="text-[#ce1a2a]! text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300"
        >
          مشاهده همه
          <FaArrowLeftLong className="text-xs" />
        </Link>
      </div>

      {/* Education Cards - Vertical List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 overflow-hidden">
        {relatedEducations.map((education, index) => (
          <Link
            key={education.id}
            href={education.url}
            className={`group flex items-center gap-4 p-4 hover:bg-gray-50/80 transition-all duration-300 ${
              index !== relatedEducations.length - 1
                ? "border-b border-gray-100/80"
                : ""
            }`}
          >
            {/* Image */}
            <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={mainDomain + education.image}
                alt={education.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2 group-hover:text-[#ce1a2a]! transition-colors duration-300">
                {education.title}
              </h4>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                <span className="flex items-center gap-1">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {education.visit?.toLocaleString("fa-IR") || 0} بازدید
                </span>
                <span className="flex items-center gap-1">
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
                  {new Date(
                    education.modified ? education.modified : education.created
                  ).toLocaleDateString("fa-IR")}
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
}

export default RelatedEducation;