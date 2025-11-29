import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

const VideoBannerSection = ({ video }: { video: Items[] }) => {

  return (
    <div className="mb-5">
      <div className="flex flex-wrap px-3">
        <div className="md:w-1/2 w-full md:pl-3">
          <div className="w-full relative overflow-hidden rounded-2xl shadow-lg md:h-80 h-auto cursor-pointer">
            <Link href={video[0].url || "#"} className="h-full w-full">
              <div className="relative h-full w-full">
                <img
                  src={mainDomainOld + video[0].image}
                  alt={video[0].title}
                  className="object-cover h-full w-full"
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/50! text-white! p-4 rounded-full text-2xl">
                  <FaPlay />
                </div>
              </div>
            </Link>
            <div className="absolute bottom-0 right-0">
              <div className="titleBox pink_Highlight pr-3">
                <h3 className="text-white! font-bold! inline-block relative text-3xl z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 after:bg-[#ce1a2a]">
                  {video[0].title}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full  flex flex-wrap md:mt-0 mt-3">
          <div className="sm:w-1/2 w-full sm:pl-1.5 pl-0">
            <div className="w-full overflow-hidden rounded-2xl shadow-lg sm:h-80 h-auto cursor-pointer">
              <Link className="h-full w-full" href="#">
                <div className="relative h-full w-full">
                  <img
                    src="/images/gallery/bn-1.jpg"
                    alt="بنر اول"
                    className="object-cover h-full w-full"
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="sm:w-1/2 w-full sm:pr-1.5 pr-0 sm:mt-0 mt-3">
            <div className="w-full overflow-hidden rounded-2xl shadow-lg sm:h-80 h-auto cursor-pointer">
              <Link href="#" className="h-full w-full">
                <div className="relative h-full w-full">
                  <img
                    src="/images/gallery/bn-2.jpg"
                    alt="بنر دوم"
                    className="object-cover h-full w-full"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoBannerSection;
