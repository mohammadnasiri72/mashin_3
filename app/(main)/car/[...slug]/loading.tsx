'use client'

import { Skeleton } from "antd";
import React from "react";
import { FaStar } from "react-icons/fa";

function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-56.25 bg-gray-300 bg-cover bg-center flex sm:block items-center justify-center animate-pulse">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative mx-auto px-4 py-12 sm:w-auto w-full">
          <div className="text-white sm:w-auto w-full">
            <div className="sm:w-auto w-full p-3 sm:bg-transparent bg-[#fff2] rounded-xl flex sm:justify-start justify-center items-center">
              <div className="h-8 w-80 bg-white/30 rounded-lg"></div>
            </div>
            {/* Breadcrumb Skeleton */}
            <nav className="mt-6 sm:block hidden">
              <div className="flex items-center flex-wrap gap-2">
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

      {/* Navbar Car Skeleton */}
      <div className="p-2 flex gap-2 items-center overflow-auto animate-pulse">
        <div className="flex gap-1 items-center">
          <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="h-3 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-8 w-28 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
      </div>

      <div className="mx-auto px-4">
        {/* Car Details Section - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Specifications Skeleton */}
          <div className="lg:col-span-7">
            {/* Specifications Grid Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white py-4 px-2 rounded-lg shadow-sm border border-gray-100 flex items-center"
                >
                  <div className="ml-3 w-1/5">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="w-4/5">
                    <div className="h-5 w-16 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ratings Section Skeleton */}
            <div className="bg-white py-6 px-4 rounded-lg shadow-sm border border-gray-100 mt-4 animate-pulse">
              <div className="bg-gray-50 py-3 rounded-lg flex md:flex-nowrap flex-wrap">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="text-center">
                      <div className="flex justify-between items-center mb-2">
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        <div className="h-5 w-8 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, j) => (
                          <div
                            key={j}
                            className="h-2 flex-1 rounded-full bg-gray-200"
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pr-2">
                  <div className="mt-4 md:mt-0 mr-2 h-10 w-28 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Gallery Skeleton */}
          <div className="lg:col-span-5 lg:-mt-[38%]">
            <div className="relative group">
              {/* Quick Actions Skeleton */}
              <div className="absolute lg:left-full lg:translate-x-0 -translate-y-1 lg:translate-y-0 lg:top-0 lg:mr-3 lg:space-y-3 z-10 lg:z-0 flex lg:block sm:flex-row flex-col lg:py-0 py-2 lg:px-0 px-1 gap-3">
                <div className="h-8 w-28 bg-gray-200 rounded"></div>
                <div className="h-8 w-32 bg-gray-200 rounded"></div>
              </div>

              {/* Main Image Skeleton */}
              <div className="slider-productDetails h-full">
                <div className="mySwiper2 product-gallery-main">
                  <div className="w-full sm:h-96 h-56 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>

                {/* Thumbnails Skeleton */}
                <div className="product-gallery-thumbs mt-3 pb-10">
                  <div className="gap-2 justify-center sm:flex hidden">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1/5 h-20 bg-gray-200 rounded-lg animate-pulse"
                      ></div>
                    ))}
                  </div>
                  <div className="gap-2 justify-center sm:hidden flex">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1/3 h-20 bg-gray-200 rounded-lg animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section Skeleton */}
        <div className="advg_wrap detailsBox bg-white rounded-xl p-6 mb-6 animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-6 w-6 bg-gray-200 rounded ml-2"></div>
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-4 w-4 bg-gray-200 rounded ml-2 mt-1"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="h-6 w-6 bg-gray-200 rounded ml-2"></div>
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-4 w-4 bg-gray-200 rounded ml-2 mt-1"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs Section Skeleton */}
        <div className="content-tabs-container">
          {/* Tabs Navbar Skeleton */}
          <div
            className="navbar-tabs p-0 m-0 bg-white rounded-xl mb-4"
            style={{
              position: "sticky",
              top: "112px",
              zIndex: 1000,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              padding: "1rem",
            }}
          >
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-[50px] w-28 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>

          <div className="flex lg:flex-row-reverse gap-3 lg:flex-nowrap flex-wrap container mx-auto px-2">
            {/* Sidebar Skeleton */}
            <aside className="lg:w-1/4 w-full mt-6 lg:block hidden">
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse"
                  >
                    <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
                    <div className="space-y-4">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="relative rounded-lg overflow-hidden">
                          <div className="h-32 bg-gray-200 rounded-lg"></div>
                          <div className="absolute left-0 bottom-0 p-3">
                            <div className="h-4 w-24 bg-white/30 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Content Skeleton */}
            <div className="lg:w-3/4 w-full mt-6">
              <div className="space-y-6">
                {/* Review Section Skeleton */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="h-7 w-48 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Technical Section Skeleton */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="h-7 w-56 bg-gray-200 rounded mb-4"></div>
                  <div className="my-6 border-b border-gray-200">
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-10 w-32 bg-gray-200 rounded-t-lg"
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex p-4 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                      >
                        <div className="w-2/5 h-4 bg-gray-200 rounded"></div>
                        <div className="w-3/5 h-4 bg-gray-200 rounded mr-4"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gallery Section Skeleton */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                  <div className="h-7 w-40 bg-gray-200 rounded mb-4"></div>
                  <div className="flex flex-wrap items-center">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="lg:w-1/5 sm:w-1/4 w-1/2 p-1">
                        <div className="h-32 bg-gray-200 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* News Section Skeleton */}
                <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                  <div className="h-7 w-48 bg-gray-200 rounded mb-4"></div>
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

                {/* Videos Section Skeleton */}
                <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                  <div className="h-7 w-48 bg-gray-200 rounded mb-4"></div>
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
              </div>
            </div>
          </div>

          {/* Comments Section Skeleton */}
          <div className="section-anchor py-5 container mx-auto px-2">
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
      </div>

      {/* Mobile Sidebar Skeleton (visible only on mobile) */}
      <aside className="lg:w-1/4 w-full mt-6 lg:hidden block px-4">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="h-6 w-32 bg-gray-200 rounded mb-3"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="relative rounded-lg overflow-hidden">
                    <div className="h-32 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Global Styles to match original */}
      <style jsx global>{`
        .content-tabs-container {
          position: relative;
        }
        .navbar-tabs {
          transition: all 0.3s ease;
        }
        .section-anchor {
          scroll-margin-top: 180px;
        }
        @media (min-width: 1024px) {
          .navbar-tabs[style*="position: sticky"] {
            top: 60px !important;
          }
        }
        @media (max-width: 1023px) {
          .navbar-tabs[style*="position: sticky"] {
            position: sticky !important;
            top: 115px !important;
          }
        }
        .product-gallery-thumbs .swiper-slide {
          width: 100px;
        }
        @media (max-width: 768px) {
          .product-gallery-thumbs .swiper-slide {
            width: 80px;
          }
        }
      `}</style>
    </div>
  );
}

export default Loading;