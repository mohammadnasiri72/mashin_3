"use client";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

const VideoBannerSection = ({ video }: { video: Items[] }) => {
  return (
    <>
      <div className="mb-5">
        <div className="flex flex-wrap px-3">
          {video.length > 0 &&
            video.map((v) => (
              <div key={v.id} className="md:w-1/4 w-full md:pl-3 md:mt-0 mt-3">
                <div className="w-full relative overflow-hidden rounded-2xl shadow-lg h-80 cursor-pointer">
                  <Link href={v.url} className="h-full w-full">
                    <div className="relative h-full w-full">
                      <img
                        src={mainDomainOld + v.image}
                        alt={v.title}
                        className="object-cover h-full w-full bg-slate-300"
                      />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/50! text-white! p-4 rounded-full text-2xl">
                        <FaPlay />
                      </div>
                    </div>
                  </Link>
                  <div className="absolute bottom-0 right-0">
                    <div className="titleBox pink_Highlight pr-3">
                      <h3 className="text-white! font-bold! inline-block relative lg:text-2xl text-lg z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 after:bg-[#ce1a2a]">
                        {v.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default VideoBannerSection;
