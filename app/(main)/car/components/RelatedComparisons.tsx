// RelatedComparisons.tsx
"use client";

import { formatPersianDate } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getItemByIds } from "@/services/Item/ItemByIds";

// کامپوننت لودینگ
const ComparisonsSkeleton = () => (
  <Card className="rounded-xl shadow-lg">
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
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

function RelatedComparisons({ detailsCar }: { detailsCar: ItemsId }) {
  const [loading, setLoading] = useState(true);
  const [relatedCompares, setRelatedCompares] = useState<ItemsId[]>([]);
  const isFetched = useRef(false);

  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        const idsCompares = detailsCar.properties.find(
          (e) => e.propertyKey === "p1042_vidrelatedcompare"
        )?.propertyValue;

        if (!idsCompares) {
          setRelatedCompares([]);
          setLoading(false);
          return;
        }

        const response = await getItemByIds(idsCompares);
        setRelatedCompares(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("❌ [RelatedComparisons] Error fetching data:", error);
        setRelatedCompares([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [detailsCar]);

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
                    src={mainDomainOld + compare.image}
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