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
              <div className="h-8 w-64 bg-white/30 rounded-lg"></div>
            </div>
            {/* Breadcrumb Skeleton */}
            <nav className="mt-6 sm:block hidden">
              <div className="flex items-center space-x-2 space-x-reverse flex-wrap gap-2">
                <div className="h-4 w-16 bg-white/30 rounded"></div>
                <div className="h-4 w-4 bg-white/30 rounded"></div>
                <div className="h-4 w-20 bg-white/30 rounded"></div>
                <div className="h-4 w-4 bg-white/30 rounded"></div>
                <div className="h-4 w-24 bg-white/30 rounded"></div>
              </div>
            </nav>
          </div>
        </div>
      </section>

      {/* Tabs Navbar Skeleton - Sticky */}
      <div className="navbar-tabs w-full px-2 z-10000 sticky top-28 bg-white shadow-sm pt-2 pb-2 transition-all duration-300">
        <Card className="rounded-xl shadow-lg" style={{ padding: 0, margin: 0 }}>
          <div className="flex gap-1 p-2 border-b">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[50px] w-28 bg-gray-200 rounded-t-lg animate-pulse"
              ></div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mx-auto">
        <div className="flex flex-wrap lg:flex-nowrap items-start py-3 relative">
          {/* Main Content Skeleton */}
          <div className="lg:w-3/4 w-full px-2">
            <div className="space-y-8">
              {/* Desc Section Skeleton */}
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
                  <div className="flex gap-4">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Gallery Section Skeleton */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-7 w-40 bg-gray-200 rounded mb-4"></div>
                <div className="flex flex-wrap items-center gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="lg:w-1/5 sm:w-1/4 w-1/2 p-1">
                      <div className="h-32 bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitors Section Skeleton */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-7 w-48 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="block">
                      <div className="bg-white rounded-2xl overflow-hidden pb-2 shadow-sm border border-gray-100">
                        <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>
                        <div className="h-5 w-32 bg-gray-200 rounded mx-auto"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <aside className="lg:w-1/4 w-full mt-6 lg:mt-0 px-2">
            <section className="bg-gray-50 px-2">
              <div className="space-y-6">
                {/* Popular Cars List Skeleton */}
                <div className="bg-white rounded-xl p-4 animate-pulse">
                  <div className="h-6 w-48 bg-gray-200 rounded mb-3"></div>
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
                <div className="bg-white rounded-xl overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                </div>

                {/* Market Stats Skeleton */}
                <div className="bg-white rounded-xl p-4 animate-pulse">
                  <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Latest News Skeleton */}
                <div className="bg-white rounded-xl p-4 animate-pulse">
                  <div className="h-6 w-40 bg-gray-200 rounded mb-3"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
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

                {/* Latest Cars Skeleton */}
                <div className="bg-white rounded-xl p-4 animate-pulse">
                  <div className="h-6 w-36 bg-gray-200 rounded mb-3"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
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
              </div>
            </section>
          </aside>
        </div>

        {/* Comments Section Skeleton */}
        <div className="px-2 mt-6">
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

      {/* Global Styles to match original */}
      <style jsx global>{`
        .navbar-tabs {
          transition: all 0.3s ease;
          z-index: 10000;
        }
        .navbar-tabs .ant-card-body {
          padding: 0 !important;
          margin: 0 !important;
        }
        @media (max-width: 1023px) {
          .navbar-tabs {
            position: sticky !important;
            top: 115px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Loading;