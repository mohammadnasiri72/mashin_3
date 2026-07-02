"use client";

function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] py-8">
      <div className="mx-auto px-4">
        {/* Breadcrumb Skeleton */}
        <div className="mb-4 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Main Content - 3/4 صفحه */}
          <div className="lg:w-3/4 w-full">
            {/* Search Box Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 animate-pulse">
              <div className="relative">
                <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            {/* Title Section Skeleton */}
            <div className="flex items-center justify-between mb-4 animate-pulse">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full ml-3"></div>
                <div className="h-8 w-64 bg-gray-200 rounded"></div>
              </div>
              <div className="h-5 w-20 bg-gray-200 rounded"></div>
            </div>

            {/* Summary Skeleton */}
            <div className="mb-6 animate-pulse">
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-8 w-24 bg-gray-200 rounded mt-2 mx-auto"></div>
            </div>

            {/* Cars Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="group block animate-pulse">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
                    {/* Image Skeleton */}
                    <div className="w-full h-40 overflow-hidden rounded-lg mb-4 bg-gray-100">
                      <div className="w-full h-full bg-gray-200"></div>
                    </div>

                    {/* Title Skeleton */}
                    <div className="flex-1">
                      <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-2"></div>
                    </div>

                    {/* Summary Skeleton */}
                    <div className="space-y-2 mt-2">
                      <div className="h-3 w-full bg-gray-200 rounded"></div>
                      <div className="h-3 w-full bg-gray-200 rounded"></div>
                      <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
                    </div>

                    {/* Mobile Links Skeleton (hidden on desktop) */}
                    <div className="sm:hidden flex flex-col gap-1 py-4">
                      <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                      <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Skeleton - 1/4 صفحه */}
          <aside className="lg:w-1/4 w-full">
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
          </aside>
        </div>
      </div>

      {/* Custom Styles to match original */}
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

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default Loading;
