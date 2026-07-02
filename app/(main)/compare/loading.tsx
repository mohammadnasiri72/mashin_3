'use client'

import React from "react";

function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] py-8">
      <div className="mx-auto px-4 max-w-7xl">
        {/* Hero Section Skeleton */}
        <div className="text-center mb-8 animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded-lg mx-auto mb-4"></div>
          <div className="h-4 w-96 max-w-full bg-gray-200 rounded-lg mx-auto"></div>
        </div>

        {/* Type Selection Skeleton */}
        <div className="p-3 flex justify-center items-center sm:flex-nowrap flex-wrap gap-3">
          <div className="flex justify-center items-center w-64">
            <div className="border border-gray-200 shadow-lg min-h-20 p-3 rounded-lg flex items-center justify-center flex-col w-full bg-white animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="flex justify-center items-center w-64">
            <div className="border border-gray-200 shadow-lg min-h-20 p-3 rounded-lg flex items-center justify-center flex-col w-full bg-white animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-full mb-2"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Compare Section Skeleton (after type selection) */}
        <div className="mt-8">
          {/* Header with breadcrumb and title */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4 animate-pulse">
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Car Selector Grid - Two sides */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - First Car Selection */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="p-4 border-b border-gray-100">
                <div className="h-6 w-40 bg-gray-200 rounded"></div>
              </div>
              <div className="p-4">
                {/* Search Box Skeleton */}
                <div className="relative mb-4">
                  <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
                </div>
                {/* Brand Filter Skeleton */}
                <div className="mb-4">
                  <div className="h-5 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-8 w-20 bg-gray-200 rounded-full shrink-0"></div>
                    ))}
                  </div>
                </div>
                {/* Car List Skeleton */}
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-3 p-3 border border-gray-100 rounded-lg">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0"></div>
                      <div className="flex-1">
                        <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                        <div className="h-3 w-20 bg-gray-200 rounded"></div>
                      </div>
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Second Car Selection (or Comparison Result) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="p-4 border-b border-gray-100">
                <div className="h-6 w-40 bg-gray-200 rounded"></div>
              </div>
              <div className="p-4">
                {/* VS Badge Skeleton (centered) */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <div className="h-5 w-8 bg-gray-300 rounded"></div>
                  </div>
                </div>
                {/* Empty State Skeleton */}
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-5 w-48 bg-gray-200 rounded mx-auto mb-2"></div>
                  <div className="h-4 w-64 bg-gray-200 rounded mx-auto"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table Skeleton (shown when cars selected) */}
          <div className="mt-8 hidden">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {[...Array(8)].map((_, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="p-4 w-1/4">
                          <div className="h-5 w-32 bg-gray-200 rounded"></div>
                        </td>
                        <td className="p-4 w-1/4">
                          <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </td>
                        <td className="p-4 w-1/4">
                          <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Custom scrollbar for car list */
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