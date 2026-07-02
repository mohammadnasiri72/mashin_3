'use client'

import React from "react";

function Loading() {
  return (
    <article className="min-h-screen bg-gray-50 w-full">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-[225px] bg-gray-300 bg-cover bg-center flex sm:block items-center justify-center animate-pulse">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative mx-auto px-4 py-12 sm:w-auto w-full">
          <div className="text-white sm:w-auto w-full">
            <div className="sm:w-auto w-full p-3 sm:bg-transparent bg-[#fff2] rounded-xl flex sm:justify-start justify-center items-center">
              <div className="h-8 w-80 bg-white/30 rounded-lg"></div>
            </div>
            {/* Breadcrumb Skeleton */}
            <nav className="mt-6 sm:block hidden">
              <div className="flex items-center space-x-2 space-x-reverse flex-wrap gap-2">
                <div className="h-4 w-16 bg-white/30 rounded"></div>
                <div className="h-4 w-4 bg-white/30 rounded"></div>
                <div className="h-4 w-20 bg-white/30 rounded"></div>
                <div className="h-4 w-4 bg-white/30 rounded"></div>
                <div className="h-4 w-32 bg-white/30 rounded"></div>
              </div>
            </nav>
            {/* Meta Info Skeleton */}
            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <div className="h-6 w-20 bg-white/30 rounded-full"></div>
              <div className="h-6 w-28 bg-white/30 rounded-full"></div>
              <div className="h-6 w-24 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navbar Skeleton - Sticky */}
      <div
        className="navbar-tabs w-full px-2 mt-4 sticky top-28 bg-white shadow-sm pt-2 pb-2 transition-all duration-300"
        style={{ zIndex: 1000 }}
      >
        <div className="rounded-xl shadow-lg bg-white">
          <div className="flex gap-1 p-2 border-b">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-[50px] w-24 bg-gray-200 rounded-t-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto px-2 py-8">
        <div className="flex flex-wrap lg:flex-nowrap items-start gap-6 relative">
          {/* Main Content Skeleton */}
          <div className="lg:w-3/4 w-full">
            <div className="space-y-8">
              {/* News Content Section Skeleton */}
              <div className="bg-white rounded-xl shadow-sm p-8 animate-pulse">
                <div className="flex flex-wrap gap-4">
                  {/* Image Skeleton */}
                  <div className="float-start w-96 pl-5">
                    <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
                  </div>
                  {/* Content Skeleton */}
                  <div className="flex-1">
                    <div className="h-7 w-48 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                      <div className="h-4 w-full bg-gray-200 rounded"></div>
                      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
                {/* Summary Skeleton */}
                <div className="mt-6 p-4 bg-blue-50 rounded">
                  <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded mt-2"></div>
                </div>
                {/* Meta Info Skeleton */}
                <div className="mt-6 pt-4 border-t flex justify-between">
                  <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                  <div className="flex gap-4">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Gallery Section Skeleton */}
              <div className="bg-white rounded-xl shadow-sm px-8 pb-8 animate-pulse">
                <div className="h-7 w-40 bg-gray-200 rounded py-4"></div>
                <div className="flex flex-wrap items-center gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="lg:w-1/5 sm:w-1/4 w-1/2 p-1">
                      <div className="h-32 bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related News Section Skeleton */}
              <div className="bg-white rounded-xl shadow-sm p-8 animate-pulse">
                <div className="h-7 w-40 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-5 w-full bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Cars Section Skeleton */}
              <div className="bg-white rounded-xl shadow-sm p-8 animate-pulse">
                <div className="h-7 w-40 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-5 w-full bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Videos Section Skeleton */}
              <div className="bg-white rounded-xl shadow-sm p-8 animate-pulse">
                <div className="h-7 w-40 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-4">
                        <div className="h-5 w-full bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Podcasts Section Skeleton */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse">
                <div className="h-7 w-40 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-5">
                      <div className="flex md:flex-row flex-col gap-4">
                        <div className="w-full sm:w-72 h-56 bg-gray-200 rounded-xl"></div>
                        <div className="flex-1">
                          <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
                          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <aside className="lg:w-1/4 w-full">
            <section className="py-8 bg-gray-50">
              <div className="mx-auto pl-4 lg:pr-2 pr-4">
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
              </div>
            </section>
          </aside>
        </div>

        {/* Comments Section Skeleton */}
        <div className="mt-8">
          <div className="bg-white rounded-xl p-6 animate-pulse">
            <div className="h-7 w-32 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .navbar-tabs {
          transition: all 0.3s ease;
          z-index: 1000;
        }
        .news-details-tabs .ant-tabs-nav {
          margin: 0 !important;
        }
        .section-anchor {
          scroll-margin-top: 180px;
        }
        @media (min-width: 1024px) {
          .navbar-tabs[style*="position: sticky"] {
            top: 60px !important;
          }
          .section-anchor {
            scroll-margin-top: 120px;
          }
        }
        @media (max-width: 1023px) {
          .navbar-tabs[style*="position: sticky"] {
            position: sticky !important;
            top: 115px !important;
          }
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
      `}</style>
    </article>
  );
}

export default Loading;