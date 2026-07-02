'use client'

import React from "react";

function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Skeleton */}
        <div className="mb-6 animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>

        {/* Change Password Form Skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
          <div className="space-y-6">
            {/* Current Password Field */}
            <div>
              <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
            </div>

            {/* New Password Field */}
            <div>
              <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
              <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
              <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
            </div>

            {/* Submit Button */}
            <div className="h-12 w-full bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;