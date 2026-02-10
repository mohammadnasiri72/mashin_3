import { formatPersianDate, toPersianNumbers } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { FaCalendar, FaEye, FaPlay } from "react-icons/fa";
import PaginationVideo from "./PaginationVideo";
import SearchBoxVideo from "./SearchBoxVideo";

function BoxVideo({ videos, titleCat }: { videos: Items[]; titleCat: string }) {
  return (
    <div className="px-2">
      {/* Videos List */}
      <div className="space-y-6 bg-white rounded-2xl p-3 shadow-lg border border-gray-100">
        <div className="flex sm:flex-nowrap flex-wrap items-center gap-2">
          <h2 className="whitespace-nowrap text-[#ce1a2a]! text-xl">
            {titleCat ? titleCat : " فیلم های تست و بررسی خودرو"}
          </h2>
          <SearchBoxVideo />
        </div>
        <div className="flex flex-wrap">
          {videos.map((video) => (
            <div className="p-2 sm:w-1/2 lg:w-1/3 w-full" key={video.id}>
              <div className="group bg-gray-50 rounded-xl hover:bg-white border-2 border-gray-200 hover:border-[#ce1a2a]/40 transition-all duration-300 hover:shadow-lg ">
                <div className="flex items-stretch justify-center gap-4 flex-col">
                  {/* Thumbnail Container - Larger */}
                  <Link
                    href={video.url}
                    className="relative group/icon shrink-0 w-full h-40 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300"
                  >
                    <img
                      src={mainDomainOld + video.image}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover/icon:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="bg-[#ce1a2a] text-white! p-3 rounded-full transform group-hover/icon:scale-125 transition-transform duration-300 shadow-lg">
                        <FaPlay className="text-sm ml-0.5" />
                      </div>
                    </div>
                  </Link>

                  {/* Content Container - Larger */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1 px-3">
                    {/* Title - Larger */}
                    <Link className="mb-2! sm:h-14 h-auto" href={video.url}>
                      <h4 className="font-bold text-gray-900 sm:text-lg leading-relaxed hover:text-[#ce1a2a]! transition-colors duration-300 line-clamp-2 mb-3">
                        {video.title}
                      </h4>
                    </Link>

                    {/* Metadata - Larger */}
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Date */}
                      <div className="flex items-center sm:gap-2 gap-1 bg-white sm:px-3 px-2 sm:py-2 py-1 rounded-xl border border-gray-200 shadow-sm">
                        <FaCalendar className="text-[#ce1a2a] text-xs!" />
                        <span className="font-medium text-gray-700 text-xs">
                          {formatPersianDate(video.created)}
                        </span>
                      </div>

                      {/* Views */}
                      <div className="flex items-center sm:gap-2 gap-1 bg-white sm:px-3 px-2 sm:py-2 py-1 rounded-xl border border-gray-200 shadow-sm">
                        <FaEye className=" text-[#ce1a2a] text-xs!" />
                        <span className="font-medium text-gray-700 text-xs">
                          {toPersianNumbers(video.visit)} بازدید
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Arrow - Larger */}
                  {/* <div className="flex items-center justify-center transition-all duration-300 text-[#ce1a2a]">
                  <Link
                    href={video.url}
                    className="bg-[#ce1a2a] text-white! px-3 py-1 rounded-lg hover:bg-red-700 duration-300"
                  >
                    مشاهده فیلم
                  </Link>
                </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PaginationVideo videos={videos} />
    </div>
  );
}

export default BoxVideo;
