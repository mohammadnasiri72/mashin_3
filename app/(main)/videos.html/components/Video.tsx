"use client";

import React, { useEffect, useRef, useState } from "react";
import SidebarVideo from "./SidebarVideo";
import BoxVideo from "./BoxVideo";

function Video({
  popularVideos,
  videos,
  banner,
  titleCat,
}: {
  popularVideos: Items[];
  videos: Items[];
  banner: Items[];
  titleCat: string;
}) {
  const [isMainLonger, setIsMainLonger] = useState(true);

  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // مقایسه ارتفاع باکس‌ها
  useEffect(() => {
    const checkHeights = () => {
      if (mainBoxRef.current && sidebarRef.current) {
        const mainHeight = mainBoxRef.current.offsetHeight;
        const sidebarHeight = sidebarRef.current.offsetHeight;
        setIsMainLonger(mainHeight > sidebarHeight);
      }
    };

    checkHeights();

    const timer = setTimeout(checkHeights, 500);
    window.addEventListener("resize", checkHeights);

    return () => {
      window.removeEventListener("resize", checkHeights);
      clearTimeout(timer);
    };
  }, [videos, popularVideos, banner]);

  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap gap-6 relative  py-5">
        {/* محتوای اصلی */}
        <div
          ref={mainBoxRef}
          className={`
            lg:w-3/4 w-full transition-all duration-300 
            ${!isMainLonger ? "lg:sticky lg:top-20 lg:self-start" : ""}
          `}
        >
          <BoxVideo videos={videos} titleCat={titleCat} />
        </div>

        {/* سایدبار */}
        <aside
          ref={sidebarRef}
          className={`
            lg:w-1/4 w-full transition-all duration-300
            ${isMainLonger ? "lg:sticky lg:top-20 lg:self-start" : ""}
          `}
        >
          <SidebarVideo popularVideos={popularVideos} banner={banner} />
        </aside>
      </div>

      <style jsx global>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* استایل‌های sticky */
        .lg\\:sticky {
          position: sticky;
          top: 80px;
          align-self: flex-start;
        }

        /* غیرفعال کردن sticky در موبایل */
        @media (max-width: 1023px) {
          .lg\\:sticky {
            position: relative !important;
            top: auto !important;
            align-self: auto !important;
          }
        }

        @media (max-width: 1024px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </>
  );
}

export default Video;