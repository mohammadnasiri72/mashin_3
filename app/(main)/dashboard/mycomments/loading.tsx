'use client'

import React from "react";

function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Skeleton */}
        <div className="mb-6 animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>

        {/* Comments List Skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
          <div className="p-4 border-b border-gray-200">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
          </div>
          <div className="divide-y divide-gray-100">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
                    <div className="w-full h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;