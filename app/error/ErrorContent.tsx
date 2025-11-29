"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

export default function ErrorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [errorInfo, setErrorInfo] = useState<any>(null);

  useEffect(() => {
    const status = searchParams.get("status") || "500";
    const message = getErrorMessage(parseInt(status));

    setErrorInfo({
      status: parseInt(status),
      message,
    });
  }, [searchParams]);

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

  const getErrorIcon = (status: number) => {
    const icons = {
      400: <FaBan className="w-8 h-8" />,
      401: <FaSignInAlt className="w-8 h-8" />,
      403: <FaBan className="w-8 h-8" />,
      404: <FaSearch className="w-8 h-8" />,
      500: <FaServer className="w-8 h-8" />,
      502: <FaServer className="w-8 h-8" />,
      503: <FaCog className="w-8 h-8" />,
      504: <FaWifi className="w-8 h-8" />,
    };

    return (
      icons[status as keyof typeof icons] || (
        <FaExclamationTriangle className="w-8 h-8" />
      )
    );
  };

  const getErrorColor = (status: number) => {
    const colors = {
      400: "text-orange-500",
      401: "text-yellow-500",
      403: "text-[#ce1a2a]!",
      404: "text-purple-500",
      500: "text-[#ce1a2a]!",
      502: "text-[#ce1a2a]!",
      503: "text-blue-500",
      504: "text-gray-500",
    };

    return colors[status as keyof typeof colors] || "text-red-500";
  };

  if (!errorInfo) {
    return null; // Loading در صفحه اصلی هندل شده
  }

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
              className={`text-6xl font-bold ${getErrorColor(
                errorInfo.status
              )} relative mb-4`}
            >
              {errorInfo.status}
            </div>
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg ${getErrorColor(
                errorInfo.status
              )} bg-opacity-20`}
            >
              {getErrorIcon(errorInfo.status)}
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
              className="flex items-center cursor-pointer gap-2 px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium shadow-sm"
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
            <div className="w-24 h-1 bg-linear-to-r from-transparent via-gray-300 to-transparent mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
