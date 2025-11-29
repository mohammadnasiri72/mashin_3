import React from "react";
import Link from "next/link";
import { FaVideoSlash, FaHome, FaArrowRight } from "react-icons/fa";

function VideoNotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8!">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-linear-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
              <FaVideoSlash className="w-12 h-12 text-[#ce1a2a]" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white! text-sm font-bold">!</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4!">
          ویدیو یافت نشد
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8! leading-relaxed">
          متأسفانه ویدیویی با این مشخصات پیدا نشد. ممکن است آدرس را اشتباه وارد
          کرده باشید یا ویدیو حذف شده باشد.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/videos.html"
            className="flex items-center justify-center gap-2 bg-[#ce1a2a] text-white! px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            <FaVideoSlash className="w-4 h-4" />
            مشاهده همه ویدیوها
            <FaArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium"
          >
            <FaHome className="w-4 h-4" />
            بازگشت به خانه
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VideoNotFound;
