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

        {/* Favorites List Skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
          <div className="p-4 border-b border-gray-200">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
          </div>
          <div className="divide-y divide-gray-100">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg shrink-0"></div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
                  <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;