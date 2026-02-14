import { formatPersianDate } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";
import React from "react";

function RelatedComparisons({
  relatedComparisons,
  detailsCar,
}: {
  relatedComparisons: Items[];
  detailsCar: ItemsId;
}) {
  return (
    <>
      <Card className="rounded-xl shadow-lg">
        <div className="space-y-4">
          <h3 className="dt_title text-xl font-bold text-gray-900 mb-4!">
            <strong className="text-red-600">مقایسه‌های مرتبط </strong>
            ماشین {detailsCar.sourceName} {detailsCar.title}
          </h3>

          {relatedComparisons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedComparisons.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <Link href={video.url} className="w-full h-full">
                      <img
                        src={mainDomainOld + video.image}
                        alt={video.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </Link>
                  </div>

                  <div className="p-4">
                    <Link href={video.url} className="font-medium group">
                      <h3 className="font-bold text-gray-800 mt-3! mb-2! line-clamp-2 duration-300 group-hover:text-[#ce1a2a]!">
                        {video.title}
                      </h3>
                    </Link>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{formatPersianDate(video.created)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-700">
              <p>ویدئوی مرتبطی یافت نشد</p>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

export default RelatedComparisons;
