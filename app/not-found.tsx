"use client";

import { useRouter } from "next/navigation";
import { FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  const router = useRouter();

  // اطلاعات خطای 404 به صورت ثابت
  const errorInfo = {
    status: 404,
    message: "صفحه مورد نظر یافت نشد"
  };

  const getErrorIcon = () => {
    return <FaSearch className="w-8 h-8" />;
  };

  const getErrorColor = () => {
    return "text-[#ce1a2a]!";
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-100 via-white to-purple-100 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-75"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-lg w-full text-center">
          {/* Error Code with Creative Design */}
          <div className="mb-8 relative">
            <div className="text-9xl font-black text-gray-200 opacity-60 absolute -top-10 left-1/2 transform -translate-x-1/2">
              {errorInfo.status}
            </div>
            <div
              className={`text-6xl font-bold ${getErrorColor()} relative mb-4!`}
            >
              {errorInfo.status}
            </div>
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg ${getErrorColor()} bg-opacity-20`}
            >
              {getErrorIcon()}
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              مشکلی پیش آمد !!!
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {errorInfo.message}
            </p>
          </div>

          {/* Creative Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
           
            
            <button
              onClick={() => router.push("/")}
              className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-linear-to-r from-red-400 to-[#ce1a2a] text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium shadow-sm"
            >
              <FaHome className="w-4 h-4" />
              صفحه اصلی
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-sm text-gray-500">
            <p>اگر مشکل ادامه دارد، با پشتیبانی تماس بگیرید</p>
          </div>

          {/* Decorative Line */}
          <div className="mt-8">
            <div className="w-24 h-1 bg-linear-to-r from-transparent via-red-300 to-transparent mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}