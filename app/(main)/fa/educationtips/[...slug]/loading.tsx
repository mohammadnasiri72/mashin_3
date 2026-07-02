'use client'

import React from "react";

function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] py-8">
      <div className="mx-auto px-4">
        {/* Breadcrumb Skeleton */}
        <div className="mb-4 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-8 text-center animate-pulse">
          <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4"></div>
          <div className="h-5 w-96 max-w-full bg-gray-200 rounded mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Main Content - 3/4 صفحه */}
          <div className="lg:w-3/4 w-full">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* Tabs Skeleton */}
              <div className="flex flex-wrap gap-2 animate-pulse">
                <div className="h-8 w-24 bg-gray-200 rounded-lg"></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 w-28 bg-gray-200 rounded-lg"></div>
                ))}
              </div>

              {/* Articles List Skeleton */}
              <div className="space-y-6 mt-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="py-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Image Skeleton */}
                      <div className="md:w-48 w-full h-32 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>

                      {/* Content Skeleton */}
                      <div className="flex-1">
                        <div className="h-7 w-3/4 bg-gray-200 rounded mb-3 animate-pulse"></div>
                        <div className="space-y-2 mb-3">
                          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        {/* Meta Info Skeleton */}
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Skeleton */}
              <div className="flex justify-center mt-8 animate-pulse">
                <div className="flex gap-2">
                  <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton - 1/4 صفحه */}
          <aside className="lg:w-1/4 w-full">
            <section className="px-2">
              <div className="space-y-6">
                {/* Popular Tips Skeleton */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
                  <div className="h-6 w-48 bg-gray-200 rounded mb-3"></div>
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-16 h-16 bg-gray-200 rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                          <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Banner Skeleton */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                </div>

                {/* Market Stats Skeleton */}
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
            </section>
          </aside>
        </div>
      </div>

      {/* Custom Styles to match original */}
      <style jsx global>{`
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

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
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