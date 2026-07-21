// app/error/ErrorContent.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaBan,
  FaCog,
  FaExclamationTriangle,
  FaHome,
  FaSearch,
  FaServer,
  FaSignInAlt,
  FaWifi,
} from "react-icons/fa";
import { IoReloadOutline } from "react-icons/io5";

interface ErrorContentProps {
  initialStatus?: number;
}

const getErrorMessage = (status: number): string => {
  const messages: { [key: number]: string } = {
    400: "درخواست نامعتبر است",
    401: "لطفاً مجدداً وارد شوید",
    403: "شما دسترسی به این بخش را ندارید",
    404: "صفحه مورد نظر یافت نشد",
    500: "خطای داخلی سرور",
    502: "سرور در دسترس نیست",
    503: "سرویس موقتاً غیرفعال است",
    504: "اتصال timed out شد",
  };
  return messages[status] || "خطای غیرمنتظره رخ داده است";
};

export default function ErrorContent({
  initialStatus = 500,
}: ErrorContentProps) {
  const router = useRouter();
  const [errorInfo] = useState({
    status: initialStatus,
    message: getErrorMessage(initialStatus),
  });

  const getErrorIcon = (status: number): React.ReactNode => {
    // ✅ تغییر به React.ReactNode
    const icons: { [key: number]: React.ReactNode } = {
      // ✅ تغییر به React.ReactNode
      400: <FaBan className="w-8 h-8" />,
      401: <FaSignInAlt className="w-8 h-8" />,
      403: <FaBan className="w-8 h-8" />,
      404: <FaSearch className="w-8 h-8" />,
      500: <FaServer className="w-8 h-8" />,
      502: <FaServer className="w-8 h-8" />,
      503: <FaCog className="w-8 h-8" />,
      504: <FaWifi className="w-8 h-8" />,
    };
    return icons[status] || <FaExclamationTriangle className="w-8 h-8" />;
  };

  const getErrorColor = (status: number): string => {
    const colors: { [key: number]: string } = {
      400: "text-orange-500",
      401: "text-yellow-500",
      403: "text-red-600",
      404: "text-red-600",
      500: "text-red-600",
      502: "text-red-600",
      503: "text-blue-500",
      504: "text-gray-500",
    };
    return colors[status] || "text-red-500";
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
          {/* Error Code */}
          <div className="mb-8 relative">
            <div className="text-9xl font-black text-gray-200 opacity-60 absolute -top-10 left-1/2 transform -translate-x-1/2">
              {errorInfo.status}
            </div>
            <div
              className={`text-6xl font-bold ${getErrorColor(errorInfo.status)} relative mb-4`}
            >
              {errorInfo.status}
            </div>
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg ${getErrorColor(errorInfo.status)} bg-opacity-20`}
            >
              {getErrorIcon(errorInfo.status)}
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {errorInfo.status === 404 ? "صفحه یافت نشد" : "مشکلی پیش آمد!"}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {errorInfo.message}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => router.push("/")}
              className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-[#ce1a2a] text-white rounded-full hover:bg-red-700 transition-all duration-300 font-medium shadow-sm hover:shadow-lg transform hover:scale-105"
            >
              <FaHome className="w-4 h-4" />
              صفحه اصلی
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-white text-[#ce1a2a] rounded-full hover:shadow-lg transition-all duration-300 font-medium shadow-sm border border-[#ce1a2a] hover:bg-gray-50 transform hover:scale-105"
            >
              <IoReloadOutline className="w-4 h-4" />
              تلاش مجدد
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
