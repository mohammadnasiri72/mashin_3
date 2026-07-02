'use client'

import React from "react";

function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Breadcrumb Skeleton */}
      <div className="mb-3 animate-pulse">
        <div className="flex items-center gap-2 overflow-auto pb-3 px-5">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap relative mx-auto p-4">
        {/* Main Content */}
        <div className="lg:w-3/4 w-full transition-all duration-300 px-2">
          {/* Categories Swiper Skeleton */}
          <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6 animate-pulse">
            <div className="h-7 w-40 bg-gray-200 rounded mx-auto mb-6"></div>
            <div className="flex gap-3 overflow-x-auto pb-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="shrink-0 h-10 w-28 bg-gray-200 rounded-full"
                ></div>
              ))}
            </div>
          </div>

          {/* Podcasts List Skeleton */}
          <div className="mt-3">
            <div className="space-y-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              {/* Header with Search */}
              <div className="flex md:flex-nowrap flex-wrap items-center gap-2">
                <div className="h-7 w-48 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="flex w-full">
                    <div className="flex-1 h-10 bg-gray-200 rounded-r-lg"></div>
                    <div className="w-12 h-10 bg-gray-200 rounded-l-lg"></div>
                  </div>
                </div>
              </div>

              {/* Podcast Items Skeleton */}
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="group bg-gray-50 rounded-xl border-2 border-gray-200 animate-pulse"
                >
                  <div className="flex md:items-stretch items-center justify-center gap-4 p-5 md:flex-row flex-col">
                    {/* Image Section Skeleton */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative shrink-0 sm:w-72 w-full sm:h-56 rounded-xl overflow-hidden bg-gray-200"></div>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200">
                          <div className="w-4 h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200">
                          <div className="w-4 h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>

                    {/* Audio Player Skeleton */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1 w-full">
                      <div className="w-full bg-gray-100 rounded-2xl p-4 lg:p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-24 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-200 rounded-2xl"></div>
                          <div className="flex-1 space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <div className="h-3 w-8 bg-gray-200 rounded"></div>
                                <div className="h-3 w-8 bg-gray-200 rounded"></div>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                              <div className="w-24 h-8 bg-gray-200 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination Skeleton */}
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <aside className="lg:w-1/4 w-full">
          <div className="space-y-6">
            {/* Popular News Skeleton */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
              <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
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
              
              <div className="mb-3">
                <div className="flex gap-2 border-b pb-2">
                  <div className="h-8 w-28 bg-gray-200 rounded"></div>
                  <div className="h-8 w-28 bg-gray-200 rounded"></div>
                </div>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-2">
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

        .lg\\:sticky {
          position: sticky;
          bottom: 0;
          align-self: flex-end;
        }

        @media (max-width: 1023px) {
          .lg\\:sticky {
            position: relative !important;
            bottom: auto !important;
            align-self: auto !important;
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