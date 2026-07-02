'use client'

import React from "react";
import { Card } from "antd";

function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
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
          </div>
        </div>
      </section>

      {/* Tabs Navbar Skeleton - Sticky */}
      <div
        className="navbar-tabs w-full px-2 mt-4 mb-8 sticky top-28 bg-white shadow-sm pt-2 pb-2 transition-all duration-300"
        style={{ zIndex: 1000 }}
      >
        <div className="rounded-xl shadow-lg bg-white">
          <div className="flex gap-1 p-2 border-b">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-[50px] w-28 bg-gray-200 rounded-t-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Main Content Skeleton */}
          <div className="lg:w-3/4 w-full">
            <div className="space-y-8">
              {/* Compare Content Section Skeleton */}
              <div className="section-anchor">
                <Card className="rounded-xl shadow-lg border-0 animate-pulse">
                  <div className="space-y-8">
                    {/* Summary Card Skeleton */}
                    <Card className="shadow-lg mb-5">
                      <div className="h-7 w-64 bg-gray-200 rounded mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                      </div>
                    </Card>

                    {/* Comparison Tables Skeleton (2 cars side by side) */}
                    <div className="flex flex-wrap gap-3">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="w-full flex-1">
                          <div className="shadow-xl border-2 border-red-200 rounded-lg overflow-hidden">
                            <div className="relative p-6 bg-white">
                              <div className="w-full h-56 bg-gray-200 rounded-2xl"></div>
                            </div>
                            <div className="text-center mb-6 p-4">
                              <div className="h-6 w-32 bg-gray-200 rounded mx-auto mb-2"></div>
                              <div className="h-4 w-24 bg-gray-200 rounded mx-auto"></div>
                            </div>
                            <div className="p-4 space-y-3">
                              {[...Array(5)].map((_, j) => (
                                <div key={j} className="p-3 rounded-lg border border-gray-200">
                                  <div className="flex justify-between">
                                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                                    <div className="h-5 w-8 bg-gray-200 rounded"></div>
                                  </div>
                                </div>
                              ))}
                              <div className="flex justify-center pt-5">
                                <div className="rounded-full w-28 h-28 bg-gray-100 border-4 border-gray-200 p-4 flex flex-col justify-center items-center">
                                  <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
                                  <div className="h-8 w-8 bg-gray-200 rounded mb-1"></div>
                                  <div className="flex gap-0.5">
                                    {[...Array(3)].map((_, k) => (
                                      <div key={k} className="w-4 h-4 bg-gray-200 rounded"></div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Description Cards Skeleton */}
                    {[...Array(2)].map((_, i) => (
                      <Card key={i} className="shadow-lg mb-6">
                        <div className="text-center mb-6">
                          <div className="h-7 w-48 bg-gray-200 rounded mx-auto mb-2"></div>
                        </div>
                        <div className="flex justify-center mb-6">
                          <div className="w-64 h-48 bg-gray-200 rounded-lg"></div>
                        </div>
                        <div className="space-y-3">
                          <div className="h-4 w-full bg-gray-200 rounded"></div>
                          <div className="h-4 w-full bg-gray-200 rounded"></div>
                          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        </div>
                      </Card>
                    ))}

                    {/* Meta Info Skeleton */}
                    <div className="pt-3 border-t border-gray-200 flex gap-4">
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Related Comparisons Section Skeleton */}
              <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
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
              <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
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
            <div className="space-y-6">
              {/* Popular Comparisons Skeleton */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-6 w-40 bg-gray-200 rounded mb-3"></div>
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
          </aside>
        </div>

        {/* Comments Section Skeleton */}
        <div className="section-anchor mt-8">
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
        .navbar-tabs .ant-card-body {
          padding: 0 !important;
          margin: 0 !important;
        }
        .compare-cars-tabs .ant-tabs-nav {
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
          .lg\\:sticky {
            position: relative !important;
            bottom: auto !important;
            align-self: auto !important;
          }
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
    </div>
  );
}

export default Loading;