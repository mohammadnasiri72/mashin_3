'use client'

import React from "react";
import { Card } from "antd";

function Loading() {
  return (
    <div
      className="min-h-screen bg-gray-50 py-3 px-3 sm:px-4 lg:px-6 relative"
      dir="rtl"
    >
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

        {/* Tabs Skeleton */}
        <div className="mb-4 animate-pulse">
          <div className="flex justify-center gap-2">
            <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
          </div>
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
                  <div
                    key={i}
                    className="bg-white rounded-xl border border-gray-200 p-3"
                  >
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
        /* استایل برای Tab */
        .custom-tabs .ant-tabs-nav-wrap {
          border: none !important;
          border-bottom: none !important;
        }
        .custom-tabs .ant-tabs-nav,
        .custom-tabs .ant-tabs-nav-wrap,
        .custom-tabs .ant-tabs-nav-list,
        .custom-tabs .ant-tabs-ink-bar {
          border: none !important;
        }

        .custom-tabs .ant-tabs-nav::before {
          border-bottom: none !important;
        }
        .custom-tabs .ant-tabs-nav {
          border: none !important;
          border-bottom: none !important;
        }
        .custom-tabs .ant-tabs-nav-list {
          border: none !important;
          border-bottom: none !important;
        }

        .custom-tabs .ant-tabs-tab {
          margin: 0 4px !important;
          padding: 0 !important;
          border-radius: 6px !important;
          transition: all 0.3s ease !important;
          background-color: #e5e7eb !important;
        }

        .custom-tabs .ant-tabs-tab:hover {
          background-color: #e5e7eb !important;
        }

        .custom-tabs .ant-tabs-tab.ant-tabs-tab-active {
          background-color: #ce1a2a !important;
        }

        .custom-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: white !important;
        }

        .custom-tabs .ant-tabs-ink-bar {
          height: 0px !important;
        }

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

        .animate-fadeInUp {
          animation: fadeInUp 0.2s ease-out;
        }

        /* خط‌بندی متن */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* کاهش padding‌ها */
        .ant-card-body {
          padding: 12px !important;
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

        /* بهبود نمایش در حالت موبایل */
        @media (max-width: 640px) {
          .custom-tabs .ant-tabs-nav {
            width: 100% !important;
          }

          .custom-tabs .ant-tabs-tab {
            margin: 0 2px !important;
          }

          .ant-tabs-tab {
            font-size: 13px !important;
          }
        }

        /* کاهش فاصله‌ها در تبلت */
        @media (max-width: 768px) {
          .py-3 {
            padding-top: 12px !important;
            padding-bottom: 12px !important;
          }

          .px-3 {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }

          .mb-5 {
            margin-bottom: 20px !important;
          }

          .mb-4 {
            margin-bottom: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Loading;