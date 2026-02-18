"use client";

import React, { useEffect, useRef, useState } from "react";
import BoxPodcasts from "./BoxPodcasts";
import SidebarPodcasts from "./SidebarPodcasts";
import BoxCatPodcasts from "./BoxCatPodcasts";

function Podcast({
  podcasts,
  podcastsCat,
  banner,
  popularNews,
  titleCategory,
}: {
  podcasts: Items[];
  podcastsCat: ItemsCategory[];
  banner: Items[];
  popularNews: Items[];
  titleCategory: string;
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
  }, [podcasts, podcastsCat, banner, popularNews]);

  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap relative mx-auto p-4">
        {/* محتوای اصلی */}
        <div
          ref={mainBoxRef}
          className={`
            lg:w-3/4 w-full transition-all duration-300 px-2
            ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
          `}
        >
          <BoxCatPodcasts podcastsCat={podcastsCat} />
          <BoxPodcasts podcasts={podcasts} titleCategory={titleCategory} />
        </div>

        {/* سایدبار */}
        <aside
          ref={sidebarRef}
          className={`
            lg:w-1/4 w-full transition-all duration-300
            ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
          `}
        >
          <SidebarPodcasts popularNews={popularNews} banner={banner} />
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
          bottom: 0;
          align-self: flex-end;
        }

        /* غیرفعال کردن sticky در موبایل */
        @media (max-width: 1023px) {
          .lg\\:sticky {
            position: relative !important;
            bottom: auto !important;
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

export default Podcast;
