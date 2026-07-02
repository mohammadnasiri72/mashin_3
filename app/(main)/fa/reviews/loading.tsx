'use client'

import React from "react";

function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] py-12">
      {/* Header Skeleton */}
      <div className="text-center mb-12 animate-pulse">
        <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-4"></div>
        <div className="h-5 w-96 max-w-full bg-gray-200 rounded-lg mx-auto"></div>
      </div>

      {/* Cards Container Skeleton */}
      <div className="px-3 flex justify-center items-center sm:flex-nowrap flex-wrap gap-6">
        {/* Car Card Skeleton */}
        <div className="flex justify-center items-center w-64">
          <div className="border border-gray-200 shadow-lg min-h-32 p-6 rounded-xl flex items-center justify-center flex-col w-full bg-white animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-3"></div>
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Motorcycle Card Skeleton */}
        <div className="flex justify-center items-center w-64">
          <div className="border border-gray-200 shadow-lg min-h-32 p-6 rounded-xl flex items-center justify-center flex-col w-full bg-white animate-pulse">
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-3"></div>
            <div className="h-5 w-28 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Optional: Decorative background elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-gray-100 to-transparent pointer-events-none"></div>
    </div>
  );
}

export default Loading;