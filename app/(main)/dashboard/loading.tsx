"use client";

function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Skeleton */}
        <div className="mb-6 animate-pulse">
          <div className="h-8 w-32 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>

        {/* Three Main Boxes Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Recent Views Box Skeleton */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="h-5 w-28 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {/* Cars Section Header */}
              <div className="px-3 pt-3 pb-1">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              {/* Car Items */}
              {[...Array(3)].map((_, i) => (
                <div key={`car-${i}`} className="flex items-center gap-3 p-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0"></div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
              {/* News Section Header */}
              <div className="px-3 pt-3 pb-1">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              {/* News Items */}
              {[...Array(2)].map((_, i) => (
                <div key={`news-${i}`} className="flex items-center gap-3 p-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0"></div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Favorites Box Skeleton */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="h-5 w-28 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="divide-y divide-gray-100">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0"></div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Box Skeleton */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="h-5 w-28 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="divide-y divide-gray-100">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-3 space-y-2">
                  <div className="w-full h-8 bg-gray-200 rounded"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links Skeleton */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
          <div className="h-5 w-24 bg-gray-200 rounded mb-3"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
