// RelatedComparisons.tsx
"use client";

import { getItemByIds } from "@/services/Item/ItemByIds";
import { formatPersianDate } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// کامپوننت لودینگ
const ComparisonsSkeleton = () => (
  <Card className="rounded-xl shadow-lg">
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

function RelatedComparisons({
  detailsCar,
  loading,
  relatedCompares,
}: {
  detailsCar: ItemsId;
  loading: boolean;
  relatedCompares: ItemsId[];
}) {
  if (loading) {
    return <ComparisonsSkeleton />;
  }

  if (relatedCompares.length === 0) {
    return null; // اگر مقایسه‌ای نبود، بخش نمایش داده نشود
  }

  return (
    <Card className="rounded-xl shadow-lg">
      <div className="space-y-4">
        <h3 className="dt_title text-xl font-bold text-gray-900 mb-4!">
          <strong className="text-red-600">مقایسه‌های مرتبط </strong>
          ماشین {detailsCar.sourceName} {detailsCar.title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedCompares.map((compare) => (
            <div
              key={compare.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <Link href={compare.url} className="w-full h-full">
                  <img
                    src={mainDomain + compare.image}
                    alt={compare.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </Link>
              </div>

              <div className="p-4">
                <Link href={compare.url} className="font-medium group">
                  <h3 className="font-bold text-gray-800 mt-3! mb-2! line-clamp-2 duration-300 group-hover:text-[#ce1a2a]!">
                    {compare.title}
                  </h3>
                </Link>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{formatPersianDate(compare.created)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default RelatedComparisons;
