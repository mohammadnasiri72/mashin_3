'use client'

import React from "react";
import { Skeleton } from "antd";

function Loading() {
  return (
    <div className="bg-[#f4f4f4] py-8 mx-auto px-4 min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="text-center mb-8 animate-pulse">
        <div className="h-8 w-64 bg-gray-200 rounded-lg mx-auto mb-4"></div>
        <div className="h-4 w-96 max-w-full bg-gray-200 rounded-lg mx-auto"></div>
      </div>

      {/* Compare Cards Grid Skeleton */}
      <div className="flex h-full gap-4 flex-wrap lg:flex-nowrap">
        {/* Card 1 Skeleton */}
        <div className="lg:w-1/3 w-full animate-pulse">
          <div className="w-full">
            <div className="shadow-xl border-2 border-gray-100 rounded-lg overflow-hidden bg-white">
              <div className="relative p-4 bg-white border-b border-gray-100">
                <div className="w-auto mx-auto h-20 bg-gray-200 rounded-lg"></div>
                <div className="absolute top-2 left-2 w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
              <div className="text-center p-4">
                <div className="h-6 w-32 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 Skeleton */}
        <div className="lg:w-1/3 w-full animate-pulse">
          <div className="w-full">
            <div className="shadow-xl border-2 border-gray-100 rounded-lg overflow-hidden bg-white">
              <div className="relative p-4 bg-white border-b border-gray-100">
                <div className="w-auto mx-auto h-20 bg-gray-200 rounded-lg"></div>
                <div className="absolute top-2 left-2 w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
              <div className="text-center p-4">
                <div className="h-6 w-32 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 - Select Car Skeleton */}
        <div className="lg:w-1/3 w-full animate-pulse">
          <div className="flex-col gap-2 px-3 w-full">
            <div className="w-full h-10 bg-gray-200 rounded-lg mb-3"></div>
            <div className="w-full h-10 bg-gray-200 rounded-lg mb-3"></div>
            <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Features List Skeleton */}
      <div className="mt-8">
        {/* Technical Specifications Section */}
        <div className="mb-6">
          <div className="h-7 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="py-3 border-b border-dashed border-gray-200 animate-pulse"
            >
              <div className="h-5 w-32 bg-gray-200 rounded mb-3"></div>
              <div className="flex gap-2">
                <div className="lg:w-1/3 w-1/2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="lg:w-1/3 w-1/2">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="lg:w-1/3 w-1/2 md:block hidden">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advantages Section Skeleton */}
        <div className="sm:px-3 py-3 border-b border-gray-200 animate-pulse">
          <div className="h-6 w-20 bg-gray-200 rounded mb-3"></div>
          <div className="flex gap-2">
            <div className="lg:w-1/3 w-1/2">
              <div className="bg-green-50 rounded-xl px-4 py-2 mt-2">
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 w-1/2">
              <div className="bg-green-50 rounded-xl px-4 py-2 mt-2">
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 w-1/2 md:block hidden">
              <div className="bg-green-50 rounded-xl px-4 py-2 mt-2">
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disadvantages Section Skeleton */}
        <div className="sm:px-3 py-3 border-b border-gray-200 animate-pulse">
          <div className="h-6 w-20 bg-gray-200 rounded mb-3"></div>
          <div className="flex gap-2">
            <div className="lg:w-1/3 w-1/2">
              <div className="bg-red-50 rounded-xl px-4 py-2 mt-2">
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 w-1/2">
              <div className="bg-red-50 rounded-xl px-4 py-2 mt-2">
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3 w-1/2 md:block hidden">
              <div className="bg-red-50 rounded-xl px-4 py-2 mt-2">
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles to match original */}
      <style jsx global>{`
        .custom-ant-select .ant-select-selector {
          border-radius: 12px !important;
          border-color: #e5e7eb !important;
        }
        .custom-ant-select .ant-select-selector:hover {
          border-color: #ce1a2a !important;
        }
        .custom-ant-select.ant-select-focused .ant-select-selector {
          border-color: #ce1a2a !important;
          box-shadow: 0 0 0 2px rgba(206, 26, 42, 0.1) !important;
        }
        .ant-btn-primary {
          background-color: #ce1a2a !important;
          border-radius: 12px !important;
          height: 40px !important;
          font-weight: 600 !important;
        }
        .ant-btn-primary:hover {
          background-color: #a51522 !important;
        }
        .ant-btn-primary:disabled {
          background-color: #e5e7eb !important;
          color: #9ca3af !important;
        }
        /* Fancybox styles */
        .fancybox__container {
          z-index: 999999 !important;
        }
        .fancybox__backdrop {
          background: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
}

export default Loading;