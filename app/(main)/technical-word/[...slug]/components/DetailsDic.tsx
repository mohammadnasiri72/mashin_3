"use client";

import { formatPersianDate, htmlToPlainText } from "@/utils/func";
import React from "react";
import {
  FaBook,
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaShare,
  FaPrint,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

function DetailsDic({ detailsDic }: { detailsDic: ItemsId }) {
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  // تاریخ نمونه - در صورت وجود در detailsDic
  const publishDate = formatPersianDate(detailsDic?.created);
  const author = detailsDic?.authorId;

  return (
    <div className=" bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-5!">
      {/* هدر با گرادیانت */}
      <div className="bg-linear-to-l from-red-600 to-red-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaBook className="text-white text-xl" />
            <h1 className="text-xl font-bold text-white!">جزئیات واژه فنی</h1>
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="px-6 py-3">
        {/* عنوان اصلی */}
        <div className="mb-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-3! p-0! m-0!">
            <span className="border-b-4 border-[#ce1a2a]">
              {detailsDic.title}
            </span>
          </h2>
        </div>

        {/* بدنه اصلی با استایل بهتر */}
        <div className="prose prose-lg max-w-none mb-3! border-b border-[#0002] pb-3!">
          {detailsDic?.body ? (
            <div className="text-gray-700 leading-relaxed space-y-4">
              {htmlToPlainText(detailsDic.body)
                .split("\n")
                .map(
                  (paragraph, index) =>
                    paragraph.trim() && (
                      <p
                        key={index}
                        className="text-justify hover:text-gray-900 transition-colors"
                      >
                        {paragraph}
                      </p>
                    ),
                )}
            </div>
          ) : (
            <p className="text-gray-500 italic text-center py-8">
              توضیحاتی برای این واژه ثبت نشده است.
            </p>
          )}
        </div>
        {/* متادیتا */}
        <div className="flex flex-wrap items-center gap-4 text-xs! text-gray-600">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="text-red-500" size={14} />
            <span>تاریخ انتشار: {publishDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaTag className="text-red-500" size={14} />
            <span>دسته: {detailsDic.categoryTitle || "عمومی"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsDic;
