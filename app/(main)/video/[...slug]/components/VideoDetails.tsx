"use client";

import { Card, Tabs } from "antd";
import { useEffect, useRef, useState } from "react";
import RelatedVideos from "./RelatedVideos";
import SidebarVideo from "./SideBarVideo";
import VideoComments from "./VideoComments";
import VideoPlayer from "./VideoPlayer";
import HeroSectionVideo from "./HeroSectionVideo";

function VideoDetails({
  video,
  popularVideos,
  relatedVideos,
  banner,
  comments,
  id,
}: {
  video: ItemsId;
  popularVideos: Items[];
  relatedVideos: Items[];
  banner: Items[];
  comments: CommentResponse[];
  id: number;
}) {
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

          if (sectionTop <= 200 && sectionBottom >= 200) {
            currentActiveKey = section.key;
            break;
          }

          if (i < sections.length - 1) {
            const nextSection = sections[i + 1];
            if (nextSection.ref.current) {
              const nextRect = nextSection.ref.current.getBoundingClientRect();
              if (sectionBottom < 200 && nextRect.top > 200) {
                currentActiveKey = section.key;
                break;
              }
            }
          }
        }
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
      "2": relatedRef,
      "3": commentsRef,
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
        top: offsetPosition-50,
        behavior: "smooth",
      });
    }
  };

  const items = [
    ...(video
      ? [
          {
            key: "1",
            label: "پخش ویدئو",
          },
        ]
      : []),
    ...(relatedVideos.length > 0
      ? [
          {
            key: "2",
            label: "ویدئوهای مرتبط",
          },
        ]
      : []),

    {
      key: "3",
      label: "نظرات کاربران",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* هدر صفحه */}
      {video && <HeroSectionVideo video={video} />}

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
              {relatedVideos.length > 0 && (
                <div id="related" className="section-anchor" ref={relatedRef}>
                  <RelatedVideos relatedVideos={relatedVideos} />
                </div>
              )}
            </div>
          </div>

          {/* سایدبار */}
          <aside className="lg:w-1/4 w-full">
            <SidebarVideo popularVideos={popularVideos} banner={banner} />
          </aside>
        </div>

        {/* بخش نظرات */}
        <div id="comments" className="section-anchor mt-8" ref={commentsRef}>
          <VideoComments video={video} comments={comments} id={id} />
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
          top: 112px;
          left: 0;
          right: 0;
          z-index: 1000;
          animation: slideDown 0.3s ease;
        }

        .video-details-tabs .ant-tabs-tab {
          padding: 12px 24px;
          font-weight: 600;
          height: 50px !important;
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
          scroll-margin-top: 110px;
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
            top: 60px;
          }
        }
      `}</style>
    </div>
  );
}

export default VideoDetails;
