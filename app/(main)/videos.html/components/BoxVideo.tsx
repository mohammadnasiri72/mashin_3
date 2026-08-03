import { formatPersianDate, toPersianNumbers } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";
import { FaCalendar, FaEye, FaPlay, FaVideo } from "react-icons/fa";
import PaginationVideo from "./PaginationVideo";
import SearchBoxVideo from "./SearchBoxVideo";
import { useSearchParams } from "next/navigation";

function BoxVideo({ videos, titleCat }: { videos: Items[]; titleCat: string }) {
  const searchParams = useSearchParams();
  return (
    <div className="bg-[#f4f4f4]!">
      {/* هدر */}

      {/* Videos List */}
      <div className=" bg-white! rounded-2xl p-3 shadow-lg border border-gray-100">
       
       
        {/* نمایش اطلاعات صفحه */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-500">
              صفحه {toPersianNumbers(Number(searchParams.get("page")) || 1)} از{" "}
              {toPersianNumbers(Math.ceil(videos[0].total / 12))}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {toPersianNumbers(videos[0].total)} ویدئو
          </span>
        </div>
         {/* هدر صفحه */}
        <div className="mb-4! text-center">
          <h2 className="text-3xl font-bold mb-4! text-[#ce1a2a]!">
            {titleCat ? titleCat : " فیلم های تست و بررسی خودرو"}
          </h2>
        </div>
        <div className="flex sm:flex-nowrap flex-wrap items-center gap-2">
          <SearchBoxVideo />
        </div>

        {/* شرط بررسی وجود ویدئو */}
        {videos.length > 0 ? (
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
                        src={mainDomain + video.image}
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
                        <h4 className="font-bold text-gray-900 sm:text-lg leading-relaxed hover:text-[#ce1a2a]! transition-colors duration-300 line-clamp-2 mb-3!">
                          {video.title}
                        </h4>
                      </Link>

                      {/* Metadata - Larger */}
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Date */}
                        <div className="flex items-center sm:gap-2 gap-1 bg-white sm:px-3 px-2 sm:py-2 py-1 rounded-xl border border-gray-200 shadow-sm">
                          <FaCalendar className="text-[#ce1a2a] text-xs!" />
                          <span className="font-medium text-gray-700 text-xs">
                            {formatPersianDate(
                              video.modified ? video.modified : video.created,
                            )}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ✅ حالت خالی */
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="flex justify-center mb-4!">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <FaVideo className="text-gray-400 text-4xl" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2!">
              ویدئویی یافت نشد
            </h3>
            <p className="text-gray-500 mb-4!">
              با تغییر فیلترها مجدداً تلاش کنید
            </p>
            <Link
              href={"/videos.html"}
              className="bg-[#ce1a2a] text-white! cursor-pointer px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              نمایش همه ویدئوها
            </Link>
          </div>
        )}
      </div>

      {videos.length > 0 && <PaginationVideo videos={videos} />}
    </div>
  );
}

export default BoxVideo;
