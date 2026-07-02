'use client'

import React from "react";
import { Skeleton, Card } from "antd";

function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-3 px-3 sm:px-4 lg:px-6 relative" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Skeleton */}
        <div className="mb-4 animate-pulse">
          <div className="flex items-center gap-2 overflow-auto pb-3">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="text-center mb-5 animate-pulse">
          <div className="h-7 w-64 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="h-4 w-80 max-w-full bg-gray-200 rounded mx-auto"></div>
          <div className="h-3 w-96 max-w-full bg-gray-200 rounded mx-auto mt-2"></div>
        </div>

        {/* Search Box Skeleton */}
        <div className="mb-4 max-w-2xl mx-auto animate-pulse">
          <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Brands Swiper Skeleton */}
        <div className="mb-5 px-1">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="shrink-0 w-20 h-12 bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Price Cards Skeleton */}
        <div className="space-y-6">
          {[...Array(4)].map((_, brandIndex) => (
            <Card
              key={brandIndex}
              className="shadow-sm border-0 rounded-lg overflow-hidden animate-pulse"
              bodyStyle={{ padding: "12px" }}
            >
              {/* Brand Header Skeleton */}
              <div
                className="p-2.5 mb-3 rounded-lg"
                style={{ backgroundColor: "#fdf2f2" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    <div className="h-5 w-40 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
                </div>
              </div>

              {/* Desktop Table Skeleton (hidden on mobile) */}
              <div className="hidden md:block">
                {/* Table Header Skeleton */}
                <div className="flex bg-gray-50 rounded-lg p-2 mb-2">
                  <div className="flex-1 h-5 bg-gray-200 rounded mx-1"></div>
                  <div className="flex-1 h-5 bg-gray-200 rounded mx-1"></div>
                  <div className="flex-1 h-5 bg-gray-200 rounded mx-1"></div>
                  <div className="flex-1 h-5 bg-gray-200 rounded mx-1"></div>
                </div>
                {/* Table Rows Skeleton */}
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex p-2 border-b border-gray-100">
                    <div className="flex-1 h-4 bg-gray-200 rounded mx-1"></div>
                    <div className="flex-1 h-4 bg-gray-200 rounded mx-1"></div>
                    <div className="flex-1 h-4 bg-gray-200 rounded mx-1"></div>
                    <div className="flex-1 h-4 bg-gray-200 rounded mx-1"></div>
                  </div>
                ))}
              </div>

              {/* Mobile Cards Skeleton (visible on mobile) */}
              <div className="md:hidden space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-200 p-3">
                    <div className="flex items-center gap-3 mb-3 pb-2 border-b border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                      <div className="flex-1">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style jsx global>{`
        /* انیمیشن‌ها */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* خط‌بندی متن */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* اسکرول بار سفارشی */
        .overflow-x-auto::-webkit-scrollbar {
          height: 4px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }

        /* کاهش padding‌ها در موبایل */
        @media (max-width: 640px) {
          .ant-card-body {
            padding: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Loading;