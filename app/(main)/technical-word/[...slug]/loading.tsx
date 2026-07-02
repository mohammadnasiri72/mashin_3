'use client'

import React from "react";

function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Skeleton */}
      <div className="mb-4 animate-pulse">
        <div className="flex items-center gap-2 overflow-auto pb-3 px-3">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 p-3 relative mx-auto">
        {/* Main Content - 3/4 صفحه */}
        <div className="lg:w-3/4 w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-5 animate-pulse">
            {/* Header with Gradient Skeleton */}
            <div className="bg-linear-to-l from-red-400 to-red-300 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white/30 rounded"></div>
                  <div className="h-6 w-32 bg-white/30 rounded"></div>
                </div>
              </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="px-6 py-3">
              {/* Title Skeleton */}
              <div className="mb-2">
                <div className="h-8 w-48 bg-gray-200 rounded mb-3"></div>
              </div>

              {/* Body Content Skeleton */}
              <div className="mb-3 border-b border-gray-200 pb-3">
                <div className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Metadata Skeleton */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton - 1/4 صفحه */}
        <aside className="lg:w-1/4 w-full">
          <div className="space-y-6">
            {/* Banner Skeleton */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
              <div className="w-full h-48 bg-gray-200"></div>
            </div>

            {/* Market Stats Skeleton (commented in original but added for consistency) */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-pulse">
              <div className="h-6 w-24 bg-gray-200 rounded mb-3"></div>
              
              {/* Tabs Skeleton */}
              <div className="mb-3">
                <div className="flex gap-2 border-b pb-2">
                  <div className="h-8 w-28 bg-gray-200 rounded"></div>
                  <div className="h-8 w-28 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Stats List Skeleton */}
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
                      <div className="h-3 w-12 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button Skeleton */}
              <div className="w-full mt-3">
                <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style jsx global>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* استایل‌های sticky */
        .lg\\:sticky {
          position: sticky;
          bottom: 0;
          align-self: flex-end;
        }

        /* غیرفعال کردن sticky در موبایل */
        @media (max-width: 1023px) {
          .lg\\:sticky {
            position: relative !important;
            bottom: auto !important;
            align-self: auto !important;
          }
        }

        @media (max-width: 1024px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        .custom-market-tabs .ant-tabs-nav {
          margin: 0;
        }
        .custom-market-tabs .ant-tabs-tab {
          padding: 8px 4px !important;
          margin: 0 2px !important;
        }
        .custom-market-tabs .ant-tabs-tab-btn {
          font-size: 12px;
          padding: 0 8px;
        }
        .custom-market-tabs .ant-tabs-ink-bar {
          background: #ce1a2a;
        }
        .custom-market-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #ce1a2a !important;
          font-weight: 600;
        }
        .custom-market-tabs .ant-tabs-tab:hover {
          color: #ce1a2a !important;
        }

        /* Scrollbar Styles */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #a1a1a1;
        }
      `}</style>
    </div>
  );
}

export default Loading;