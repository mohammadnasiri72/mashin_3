"use client";
import MarketStats from "@/app/components/MarketStats";
import NewsBlogForm from "@/app/components/NewsBlogForm";
import { formatPersianDate, toPersianNumbers } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { FaCalendar, FaEye, FaPlay } from "react-icons/fa";

function SidebarVideo({ videos }: { videos: Items[] }) {
  return (
    <>
      <section className="px-2">
        <div className="mx-auto">
          <div className="space-y-6">
            {/* محبوب‌ترین اخبار */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4! border-b pb-2">
                محبوب ترین فیلم های ماشین 3
              </h3>
              <div className="space-y-4">
                {videos.slice(0,6).map((video) => (
                  <Link key={video.id} href={video.url} className="block group">
                    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#ce1a2a] hover:text-white! transition-colors">
                      <div className="w-18! h-14 bg-gray-200 rounded shrink-0 overflow-hidden relative">
                        <img
                          src={mainDomainOld + video.image}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/50! text-white! p-2 rounded-full text-xs">
                          <FaPlay />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight group-hover:text-white! transition-colors line-clamp-2">
                          {video.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2 group-hover:text-white!">
                          <div className="flex items-center gap-1">
                            <FaCalendar />
                            <span>{formatPersianDate(video.created)}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <FaEye className="w-3 h-3" />
                            <span>{toPersianNumbers(video.visit)} بازدید</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* آمار بازار */}
            <MarketStats />

            {/* خبرنامه */}
            <NewsBlogForm />
          </div>
        </div>
      </section>
    </>
  );
}

export default SidebarVideo;
