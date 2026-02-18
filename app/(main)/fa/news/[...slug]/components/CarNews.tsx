"use client";

import CustomPagination from "@/app/components/CustomPagination";
import MarketStats from "@/app/components/SideBar/MarketStats";
import {
  formatPersianDate,
  htmlToPlainText,
  toPersianNumbers,
} from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaCalendar, FaEye } from "react-icons/fa";
import SideBarNews from "./SideBarNews";

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

  const searchParams = useSearchParams();

  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      setActiveTab(id);
    } else {
      setActiveTab(0);
    }
  }, [id]);

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
  }, [newsData, popularNews, offerNews, banner]);

  return (
    <>
      <div className="min-h-screen bg-[#f4f4f4] py-8">
        <div className="mx-auto px-4">
          {/* هدر صفحه */}
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
            {/* محتوای اصلی - 3/4 صفحه */}
            <div
              ref={mainBoxRef}
              className={`
                lg:w-3/4 w-full transition-all duration-300
                ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
              `}
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                {/* تب‌های اخبار */}
                <div className="mb-6 flex items-center flex-wrap gap-2">
                  {tabConfig.map((tab) => (
                    <Link
                      key={tab.key}
                      className={`hover:text-white! duration-300 px-3 py-1 rounded-lg ${
                        activeTab === tab.key
                          ? "text-white! bg-[#ce1a2a]"
                          : "text-black! hover:bg-[#ce1a2a]"
                      }`}
                      href={tab.href}
                    >
                      {tab.label}
                    </Link>
                  ))}
                </div>

                {/* لیست اخبار */}
                <div className="space-y-6">
                  {newsData.map((news) => (
                    <article
                      key={news.id}
                      className="py-6! border-b! border-gray-200 last:border-b-0 last:pb-0 group"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* تصویر خبر */}
                        <div className="md:w-48 w-full h-32 shrink-0">
                          <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden relative">
                            <Link href={news.url} className="rounded-lg!">
                              <img
                                src={mainDomainOld + news.image}
                                alt={news.title}
                                className="object-cover w-full h-full hover:scale-105 rounded-lg! transition-transform duration-300"
                              />
                            </Link>
                          </div>
                        </div>

                        {/* محتوای خبر */}
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

                          {/* متا اطلاعات */}
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

                {/* صفحه بندی */}
                {newsData.length > 0 && (
                  <CustomPagination
                    total={newsData[0].total}
                    pageSize={20}
                    currentPage={Number(searchParams.get("page")) || 1}
                  />
                )}
              </div>
            </div>

            {/* سایدبار - 1/4 صفحه */}
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

        {/* استایل‌های سفارشی */}
        <style jsx global>{`
          .container {
            max-width: 1200px;
          }

          .custom-news-tabs .ant-tabs-nav {
            margin-bottom: 1rem;
          }
          .custom-news-tabs .ant-tabs-tab {
            padding: 0.4rem;
            user-select: none !important;
          }

          .custom-news-tabs .ant-tabs-ink-bar {
            background: transparent;
          }

          .custom-news-tabs .ant-tabs-tab-active {
            background: #ce1a2a;
            user-select: none !important;
          }
          .custom-news-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
            color: #fff !important;
            user-select: none !important;
            font-weight: 600;
          }

          .custom-news-tabs .ant-tabs-tab:hover {
            color: #fff !important;
            background: #ce1a2a;
            user-select: none !important;
            transition: 0.4s;
          }

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
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
      </div>
    </>
  );
};

export default CarNews;
