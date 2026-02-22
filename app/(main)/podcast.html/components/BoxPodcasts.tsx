import { formatPersianDate, toPersianNumbers } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { BiSolidMicrophone } from "react-icons/bi";
import {
  FaCalendar,
  FaEye,
  FaHeadphones,
  FaMicrophone,
  FaPodcast,
} from "react-icons/fa";
import { MdOutlinePodcasts } from "react-icons/md";
import AudioPlayer from "./AudioPlayer";
import PaginationPodcasts from "./PaginationPodcasts";
import SearchBoxPodcasts from "./SearchBoxPodcasts";
import Link from "next/link";

function BoxPodcasts({
  podcasts,
  titleCategory,
}: {
  podcasts: Items[];
  titleCategory: string;
}) {
  return (
    <>
      <div className="mt-3">
        {/* Videos List */}
        <div className="space-y-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex md:flex-nowrap flex-wrap items-center gap-2">
            <h2 className="whitespace-nowrap text-[#ce1a2a]! text-xl">
              {titleCategory
                ? `پادکست های ${titleCategory}`
                : " پادکست های بررسی خودرو"}
            </h2>
            <SearchBoxPodcasts />
          </div>
          {podcasts.length > 0 ? (
            podcasts.map((podcast) => (
              <div
                key={podcast.id}
                className="group bg-gray-50 rounded-xl hover:bg-white border-2 border-gray-200 hover:border-[#ce1a2a]/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex md:items-stretch items-center justify-center gap-4 p-5 md:flex-row flex-col">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative group/icon shrink-0 sm:w-72 w-full sm:h-56 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <img
                        src={mainDomainOld + podcast.image}
                        alt={podcast.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center sm:gap-2 gap-1 bg-white sm:px-3 px-2 sm:py-2 py-1 rounded-xl border border-gray-200 shadow-sm">
                        <FaCalendar className="text-[#ce1a2a] text-xs!" />
                        <span className="font-medium text-gray-700 text-xs">
                          {formatPersianDate(podcast.created)}
                        </span>
                      </div>

                      {/* Views */}
                      <div className="flex items-center sm:gap-2 gap-1 bg-white sm:px-3 px-2 sm:py-2 py-1 rounded-xl border border-gray-200 shadow-sm">
                        <FaEye className=" text-[#ce1a2a] text-xs!" />
                        <span className="font-medium text-gray-700 text-xs">
                          {toPersianNumbers(podcast.visit)} بازدید
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Container - Larger */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1 w-full">
                    <AudioPlayer podcast={podcast} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-linear-to-b from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-200">
              {/* آیکون‌های متحرک */}
              <div className="relative mb-6!">
                <div className="absolute -top-2 -right-2 animate-pulse">
                  <FaMicrophone className="text-[#ce1a2a]/30 text-3xl" />
                </div>
                <div className="absolute -bottom-2 -left-2 animate-pulse delay-150">
                  <FaHeadphones className="text-[#ce1a2a]/30 text-3xl" />
                </div>
                <div className="bg-red-50 p-6 rounded-full">
                  <MdOutlinePodcasts className="text-7xl text-[#ce1a2a]" />
                </div>
              </div>

              {/* عنوان */}
              <h3 className="text-2xl font-bold text-gray-800 mb-3!">
                🎙️ هیچ پادکستی یافت نشد!
              </h3>

              {/* متن توضیح */}
              <p className="text-gray-500 text-center max-w-md mb-6!">
                متأسفیم! در حال حاضر هیچ پادکستی در این دسته‌بندی وجود ندارد.
                لطفاً بعداً دوباره امتحان کنید یا دسته‌بندی دیگری را انتخاب
                نمایید.
              </p>

              {/* پیشنهادات */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="flex cursor-pointer items-center gap-2 bg-[#ce1a2a] text-white! px-5 py-2.5 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FaPodcast />
                  <span>بارگذاری مجدد</span>
                </button>

                <Link
                  href={"/podcast.html"}
                  className="flex cursor-pointer items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <BiSolidMicrophone />
                  <span>همه پادکست‌ها</span>
                </Link>
              </div>

              {/* خط پایانی با آیکون */}
              <div className="mt-8 flex items-center gap-2 text-sm text-gray-400">
                <span className="w-12 h-px bg-gray-300"></span>
                <span>🎧</span>
                <span className="w-12 h-px bg-gray-300"></span>
              </div>
            </div>
          )}
        </div>
        <PaginationPodcasts podcasts={podcasts} />
      </div>
    </>
  );
}

export default BoxPodcasts;
