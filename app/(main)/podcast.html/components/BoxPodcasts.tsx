import { formatPersianDate, toPersianNumbers } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { FaCalendar, FaEye } from "react-icons/fa";
import AudioPlayer from "./AudioPlayer";
import PaginationPodcasts from "./PaginationPodcasts";
import SearchBoxPodcasts from "./SearchBoxPodcasts";

function BoxPodcasts({ podcasts }: { podcasts: Items[] }) {
  return (
    <>
      <div className="px-2 py-4">
        {/* Videos List */}
        <div className="space-y-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex md:flex-nowrap flex-wrap items-center gap-2">
            <h2 className="whitespace-nowrap text-[#ce1a2a]! text-xl">
              پادکست های بررسی خودرو
            </h2>
            <SearchBoxPodcasts />
          </div>
          {podcasts.map((podcast) => (
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
          ))}
        </div>
        <PaginationPodcasts podcasts={podcasts} />
      </div>
    </>
  );
}

export default BoxPodcasts;
