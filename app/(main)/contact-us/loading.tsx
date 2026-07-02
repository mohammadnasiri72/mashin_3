'use client'

import React from "react";

function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex flex-wrap">
        {/* Main Content - 3/4 صفحه */}
        <div className="lg:w-3/4 w-full p-2">
          <div className="py-8">
            {/* Header Section Skeleton */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-r-4 border-[#ce1a2a] animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-6"></div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Phone Info Skeleton */}
                <div className="flex items-center space-x-3 space-x-reverse gap-2">
                  <div className="bg-gray-200 p-3 rounded-full w-10 h-10"></div>
                  <div>
                    <div className="h-5 w-24 bg-gray-200 rounded mb-2"></div>
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
                
                {/* Social Media Info Skeleton */}
                <div className="flex items-center space-x-3 space-x-reverse gap-2">
                  <div className="bg-gray-200 p-3 rounded-full w-10 h-10"></div>
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="h-5 w-40 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Form Skeleton */}
              <div className="bg-white rounded-lg shadow-lg border-t-4 border-t-gray-200 overflow-hidden animate-pulse">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 p-3 rounded-full w-8 h-8"></div>
                    <div className="h-6 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-col gap-5">
                    {/* Name Field */}
                    <div>
                      <div className="flex items-center gap-0.5 mb-2">
                        <div className="h-4 w-8 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
                    </div>
                    
                    {/* Mobile Field */}
                    <div>
                      <div className="flex items-center gap-0.5 mb-2">
                        <div className="h-4 w-12 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
                    </div>
                    
                    {/* Email Field */}
                    <div>
                      <div className="flex items-center gap-0.5 mb-2">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
                    </div>
                    
                    {/* Message Field */}
                    <div>
                      <div className="flex items-center gap-0.5 mb-2">
                        <div className="h-4 w-12 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-32 w-full bg-gray-200 rounded-lg"></div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>

              {/* Map Section Skeleton */}
              <div className="bg-white rounded-lg shadow-lg border-t-4 border-t-gray-200 overflow-hidden animate-pulse">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-200 p-3 rounded-full w-8 h-8"></div>
                    <div className="h-6 w-40 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="p-6">
                  {/* Map Placeholder Skeleton */}
                  <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-300 mx-auto mb-4"></div>
                      <div className="h-4 w-32 bg-gray-300 rounded mx-auto"></div>
                    </div>
                  </div>
                  
                  {/* Address Section Skeleton */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="h-5 w-20 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded mt-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton - 1/4 صفحه */}
        <aside className="lg:w-1/4 w-full">
          <section className="py-8 bg-gray-50">
            <div className="mx-auto pl-4 lg:pr-2 pr-4">
              <div className="space-y-6">
                {/* Banner Skeleton */}
                <div className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
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
            </div>
          </section>
        </aside>
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