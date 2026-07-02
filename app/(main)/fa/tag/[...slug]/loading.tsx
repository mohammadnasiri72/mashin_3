'use client'

import React from "react";

function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 mx-auto">
        {/* Breadcrumb Skeleton */}
        <div className="mb-4 animate-pulse">
          <div className="flex items-center gap-2 overflow-auto pb-3">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Header Skeleton */}
        <div className="mb-4 text-center animate-pulse">
          <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 relative">
          {/* Main Content - 3/4 صفحه */}
          <div className="lg:w-3/4 w-full">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              {/* Search Term Display Skeleton */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="h-5 w-48 bg-gray-200 rounded"></div>
              </div>

              {/* Results Grid Skeleton */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(12)].map((_, index) => (
                  <div key={index} className="group block animate-pulse">
                    <div className="bg-white rounded-2xl overflow-hidden pb-2 shadow-sm border border-gray-100 h-full flex flex-col">
                      {/* Image Skeleton */}
                      <div className="w-full h-40 overflow-hidden rounded-lg mb-4 bg-gray-100">
                        <div className="w-full h-full bg-gray-200"></div>
                      </div>

                      {/* Title Skeleton */}
                      <div className="flex-1">
                        <div className="h-6 w-32 bg-gray-200 rounded mx-auto"></div>
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
            <div className="space-y-6">
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