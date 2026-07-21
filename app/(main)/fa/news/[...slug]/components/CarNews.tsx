"use client";

import CustomPagination from "@/app/components/CustomPagination";
import {
  formatPersianDate,
  htmlToPlainText,
  toPersianNumbers,
} from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaCalendar, FaEye } from "react-icons/fa";
import SideBarNews from "./SideBarNews";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const CarNews = ({
  id,
  newsData,
  popularNews,
  offerNews,
  banner,
  newsDetails,
  tabConfig,
}: {
  id: number;
  newsData: Items[];
  popularNews: Items[];
  offerNews: Items[];
  banner: Items[];
  newsDetails: ItemsCategoryId | ItemsId;
  tabConfig: { key: number; href: string; label: string }[];
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isMainLonger, setIsMainLonger] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const searchParams = useSearchParams();

  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (id) {
      setActiveTab(id);
    } else {
      setActiveTab(0);
    }
  }, [id]);

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
  }, [newsData, popularNews, offerNews, banner]);

  const handleSlideChange = () => {
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };

  return (
    <>
      <div className="min-h-screen bg-[#f4f4f4] py-8">
        <div className="mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="text-red-600">
                {newsDetails ? newsDetails.title : "اخبار خودرو"}
              </span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {newsDetails
                ? htmlToPlainText(
                    newsDetails.summary ? newsDetails.summary : "",
                  )
                : "آخرین اخبار و تحلیل‌های بازار خودرو ایران"}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 relative">
            <div
              ref={mainBoxRef}
              className={`
                lg:w-3/4 w-full transition-all duration-300 overflow-hidden
                ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
              `}
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="mb-6 relative">
                  <Swiper
                    ref={swiperRef}
                    modules={[FreeMode]}
                    slidesPerView="auto"
                    spaceBetween={8}
                    freeMode={{
                      enabled: true,
                      sticky: true,
                      momentum: true,
                      momentumBounce: true,
                    }}
                    grabCursor={true}
                    className="tabs-swiper"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onSliderMove={handleSlideChange}
                    onSlideChange={() => setIsDragging(true)}
                  >
                    {tabConfig.map((tab) => (
                      <SwiperSlide key={tab.key} style={{ width: "auto" }}>
                        <Link
                          className={`whitespace-nowrap duration-300 px-4 py-2 rounded-lg text-sm font-medium transition-all block text-center ${
                            activeTab === tab.key
                              ? "text-white! bg-[#ce1a2a] shadow-md"
                              : "text-gray-700! hover:text-red-900! hover:bg-red-100 bg-gray-100"
                          }`}
                          href={tab.href}
                          onClick={(e) => {
                            if (isDragging) {
                              e.preventDefault();
                            }
                          }}
                          onMouseDown={() => setIsDragging(false)}
                          onMouseUp={() => {
                            setTimeout(() => setIsDragging(false), 100);
                          }}
                        >
                          {tab.label}
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className="space-y-6">
                  {newsData.map((news) => (
                    <article
                      key={news.id}
                      className="py-6! border-b! border-gray-200 last:border-b-0 last:pb-0 group"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-48 w-full h-32 shrink-0">
                          <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden relative">
                            <Link href={news.url} className="rounded-lg!">
                              <img
                                src={mainDomain + news.image}
                                alt={news.title}
                                className="object-cover w-full h-full hover:scale-105 rounded-lg! transition-transform duration-300"
                              />
                            </Link>
                          </div>
                        </div>

                        <div className="flex-1">
                          <Link href={news.url}>
                            <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-[#ce1a2a]! duration-300 transition-colors cursor-pointer">
                              {news.title}
                            </h2>
                          </Link>
                          {news.body && (
                            <div className="text-gray-600 mb-3 leading-relaxed text-justify line-clamp-3">
                              {htmlToPlainText(news.body)}
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mt-2">
                            <div className="flex items-center gap-1">
                              <FaCalendar />
                              <span>{formatPersianDate(news.created)}</span>
                            </div>

                            <div className="flex items-center gap-1">
                              <FaEye className="w-3 h-3" />
                              <span>{toPersianNumbers(news.visit)} بازدید</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {newsData.length > 0 && (
                  <CustomPagination
                    total={newsData[0].total}
                    pageSize={20}
                    currentPage={Number(searchParams.get("page")) || 1}
                  />
                )}
              </div>
            </div>

            <aside
              ref={sidebarRef}
              className={`
                lg:w-1/4 w-full transition-all duration-300
                ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
              `}
            >
              <SideBarNews
                banner={banner}
                offerNews={offerNews}
                popularNews={popularNews}
              />
            </aside>
          </div>
        </div>

        <style jsx global>{`
          .tabs-swiper {
            overflow: visible !important;
            padding: 4px 0;
          }

          .tabs-swiper .swiper-slide {
            width: auto !important;
            flex-shrink: 0;
          }

          .tabs-swiper .swiper-slide a {
            user-select: none;
            -webkit-user-select: none;
          }

          .tabs-swiper .swiper-wrapper {
            transition-timing-function: ease-out;
          }

          .lg\\:sticky {
            position: sticky;
            bottom: 0;
            align-self: flex-end;
          }

          @media (max-width: 1023px) {
            .lg\\:sticky {
              position: relative !important;
              bottom: auto !important;
              align-self: auto !important;
            }
          }

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  );
};

export default CarNews;