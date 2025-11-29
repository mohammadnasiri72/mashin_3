"use client";

import { Card, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import RelatedVideos from "./RelatedVideos";
import SidebarVideo from "./SideBarVideo";
import VideoComments from "./VideoComments";
import VideoPlayer from "./VideoPlayer";

function VideoDetails({ video, videos }: { video: ItemsId; videos: Items[] }) {
  const [activeKey, setActiveKey] = useState("1");
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // رفرنس‌های مربوط به هر بخش
  const playerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  // هندل کردن اسکرول و sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarTop = navbarRef.current.offsetTop;
        setIsSticky(window.scrollY > navbarTop);
      }

      const sections = [
        { key: "1", ref: playerRef },
        { key: "2", ref: relatedRef },
        { key: "3", ref: commentsRef },
      ];

      let currentActiveKey = activeKey;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionBottom = rect.bottom;

          if (sectionTop <= 150 && sectionBottom >= 150) {
            currentActiveKey = section.key;
            break;
          }

          if (i < sections.length - 1) {
            const nextSection = sections[i + 1];
            if (nextSection.ref.current) {
              const nextRect = nextSection.ref.current.getBoundingClientRect();
              if (sectionBottom < 150 && nextRect.top > 150) {
                currentActiveKey = section.key;
                break;
              }
            }
          }
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        currentActiveKey = "4";
      }

      if (currentActiveKey !== activeKey) {
        setActiveKey(currentActiveKey);
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [activeKey]);

  // هندل کلیک روی تب - اسکرول به بخش مربوطه
  const handleTabClick = (key: string) => {
    const sectionRefs: {
      [key: string]: React.RefObject<HTMLDivElement | null>;
    } = {
      "1": playerRef,
      "2": infoRef,
      "3": relatedRef,
      "4": commentsRef,
    };

    const targetRef = sectionRefs[key];
    if (targetRef?.current) {
      const getAbsoluteOffsetTop = (element: HTMLElement): number => {
        let offsetTop = 0;
        let currentElement: HTMLElement | null = element;
        while (currentElement) {
          offsetTop += currentElement.offsetTop;
          currentElement = currentElement.offsetParent as HTMLElement;
        }
        return offsetTop;
      };

      const navbarHeight = isSticky
        ? (navbarRef.current?.offsetHeight || 0) + 20
        : 100;
      const absoluteOffsetTop = getAbsoluteOffsetTop(targetRef.current);
      const offsetPosition = absoluteOffsetTop - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const items = [
    {
      key: "1",
      label: "پخش ویدئو",
    },

    {
      key: "2",
      label: "ویدئوهای مرتبط",
    },
    {
      key: "3",
      label: "نظرات کاربران",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* هدر صفحه */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                {video.title}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>دسته‌بندی: {video.categoryTitle}</span>
                <span>•</span>
                <span>تعداد بازدید: {video.visit}</span>
                <span>•</span>
                <span>
                  تاریخ انتشار:{" "}
                  {new Date(video.created).toLocaleDateString("fa-IR")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-[#ce1a2a] cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                اشتراک گذاری
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* باکس تب ها */}
      <div ref={navbarRef} className="navbar-tabs sticky w-full px-2 mt-4">
        <Card
          style={{ padding: 0, margin: 0 }}
          className="rounded-xl shadow-lg"
        >
          <Tabs
            activeKey={activeKey}
            onChange={handleTabClick}
            type="card"
            items={items}
            className="video-details-tabs p-0! m-0!"
          />
        </Card>
      </div>

      <div className="px-4 py-8">
        <div className="flex flex-wrap items-start">
          {/* محتوای اصلی */}
          <div className="lg:w-3/4 w-full">
            <div className="space-y-8">
              {/* بخش پخش ویدئو */}
              <div id="player" className="section-anchor" ref={playerRef}>
                <VideoPlayer video={video} />
              </div>

              {/* بخش ویدئوهای مرتبط */}
              <div id="related" className="section-anchor" ref={relatedRef}>
                <RelatedVideos video={video} videos={videos} />
              </div>
            </div>
          </div>

          {/* سایدبار */}
          <div className="lg:w-1/4 w-full">
            <SidebarVideo videos={videos} />
          </div>
        </div>

        {/* بخش نظرات */}
        <div id="comments" className="section-anchor mt-8" ref={commentsRef}>
          <VideoComments video={video} />
        </div>
      </div>

      <style jsx global>{`
        .navbar-tabs {
          background: transparent;
          transition: all 0.3s ease;
          z-index: 100;
        }
        .navbar-tabs .ant-card-body {
          padding: 0 !important;
          margin: 0 !important;
        }
        .video-details-tabs .ant-tabs-nav {
          padding: 0 !important;
          margin: 0 !important;
        }

        .navbar-tabs.sticky {
          position: sticky;
          top: 120px;
          left: 0;
          right: 0;
          z-index: 1000;
          animation: slideDown 0.3s ease;
        }

        .video-details-tabs .ant-tabs-tab {
          padding: 12px 24px;
          font-weight: 600;
        }

        .video-details-tabs .ant-tabs-tab-active {
          background: #ce1a2a !important;
          border-color: #ce1a2a !important;
        }

        .video-details-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: white !important;
        }

        .video-details-tabs .ant-tabs-ink-bar {
          background: #ce1a2a;
        }

        .section-anchor {
          scroll-margin-top: 120px;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (min-width: 1024px) {
          .navbar-tabs.sticky {
            top: 65px;
          }
        }
      `}</style>
    </div>
  );
}

export default VideoDetails;
