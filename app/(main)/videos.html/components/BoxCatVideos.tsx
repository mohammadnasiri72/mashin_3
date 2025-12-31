import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

function BoxCatVideos({ videosCat }: { videosCat: ItemsCategory[] }) {
  return (
    <>
      <div className="px-2 py-4">
        <h2 className="text-[#ce1a2a]! text-xl pb-4">
          دسته بندی فیلم های ماشین 3
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {videosCat.map((category) => (
            <div
              key={category.id}
              className="group bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-[#ce1a2a]/40 overflow-hidden"
            >
              {/* Image Container */}
              <Link href={category.url} className="relative block">
                <div className="relative h-40 overflow-hidden group/Img">
                  <img
                    src={mainDomainOld + category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover/Img:scale-110 transition-transform duration-500"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover/Img:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-[#ce1a2a] text-white p-3 rounded-full transform group-hover/Img:scale-125 transition-transform duration-300 shadow-lg">
                      <FaPlay className="text-sm ml-0.5" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Content */}
              <div className="p-4">
                <Link href={category.url} className="text-center">
                  <h3 className="font-bold text-gray-900 text-sm leading-relaxed hover:text-[#ce1a2a]! transition-colors duration-300 line-clamp-2 mb-2">
                    {category.title}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BoxCatVideos;
