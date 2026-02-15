"use client";

import { formatPersianDate } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";

const RelatedVideosCompare = ({
  relatedVideos,
}: {
  relatedVideos: ItemsId[];
}) => {
  return (
    <section className="py-5 bg-white rounded-xl shadow-sm">
      <div className="mx-auto px-4">
        <h3 className="dt_title text-2xl font-bold text-gray-900 mb-4!">
          <strong className="text-red-600"> ویدئوهای مرتبط</strong>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedVideos.map((video) => (
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
      </div>

      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default RelatedVideosCompare;
