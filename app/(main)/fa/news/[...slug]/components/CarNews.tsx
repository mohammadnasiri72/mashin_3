"use client";

import Loading from "@/app/components/loader";
import MarketStats from "@/app/components/MarketStats";
import NewsBlogForm from "@/app/components/NewsBlogForm";
import {
  formatPersianDate,
  htmlToPlainText,
  toPersianNumbers,
} from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Pagination } from "antd";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FaCalendar, FaEye } from "react-icons/fa";

const CarNews = ({
  id,
  newsData,
  popularNews,
}: {
  id: number;
  newsData: Items[];
  popularNews: Items[];
}) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const page = searchParams.get("page");

  useEffect(() => {
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  }, [page]);

  const handleChangPageIndex = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  // تعریف تب‌ها و URL مربوطه
  const tabConfig = [
    {
      key: "all",
      href: "/fa/News/اخبار-خودرو.html",
      label: "همه اخبار خودرو",
    },
    {
      key: "salePresale",
      href: "/fa/News/6593/شرایط-فروش-و-پیش-فروش-خودرو.html",
      label: "شرایط فروش و پیش فروش خودرو",
    },
    {
      key: "market",
      href: "/fa/News/6323/اخبار-بازار-خودرو.html",
      label: "اخبار بازار خودرو",
    },
    {
      key: "test",
      href: "/fa/News/6430/تست-خودرو.html",
      label: "تست خودرو",
    },
    {
      key: "review",
      href: "/fa/News/6448/بررسی-خودرو.html",
      label: "بررسی خودرو",
    },
    {
      key: "ads",
      href: "/fa/News/6510/آگهی.html",
      label: "آگهی",
    },
  ];

  useEffect(() => {
    if (id === 6510) {
      setActiveTab("ads");
    } else if (id === 6448) {
      setActiveTab("review");
    } else if (id === 6430) {
      setActiveTab("test");
    } else if (id === 6323) {
      setActiveTab("market");
    } else if (id === 6593) {
      setActiveTab("salePresale");
    } else {
      setActiveTab("all");
    }
  }, [id]);

  return (
    <>
      <div className="min-h-screen bg-[#f4f4f4] py-8">
        <div className="mx-auto px-4">
          {/* هدر صفحه */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="text-red-600">اخبار خودرو</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              آخرین اخبار و تحلیل‌های بازار خودرو ایران
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* محتوای اصلی - 3/4 صفحه */}
            <div className="lg:w-3/4 w-full">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                {/* تب‌های اخبار */}
                <div className="mb-6 flex items-center flex-wrap gap-2">
                  {tabConfig.map((tab) => (
                    <Link
                      key={tab.key}
                      onClick={() => {
                        setActiveTab(tab.key);
                      }}
                      className={`hover:text-white!  duration-300 px-3 py-1 rounded-lg ${
                        activeTab === tab.key
                          ? "text-white! bg-[#ce1a2a]"
                          : "text-black! hover:bg-[#ce1a2a]"
                      }`}
                      href={tab.href}
                    >
                      {tab.label}
                    </Link>
                  ))}
                  {/* <Tabs
                  activeKey={activeTab}
                  items={tabItems}
                  className="custom-news-tabs"
                  tabBarStyle={{ marginBottom: 0 }}
                /> */}
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
                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2">
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
                  <div className="p-3 flex justify-center items-center">
                    <Pagination
                      onChange={(page) => {
                        handleChangPageIndex(page);
                      }}
                      total={newsData[0].total}
                      showSizeChanger={false}
                      defaultPageSize={20}
                      current={Number(searchParams.get("page")) || 1}
                    />
                    <span>{newsData[0].total} مورد</span>
                  </div>
                )}
              </div>
            </div>

            {/* سایدبار - 1/4 صفحه */}
            <div className="lg:w-1/4 w-full">
              <div className="space-y-6">
                {/* محبوب‌ترین اخبار */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4! border-b pb-2">
                    محبوب‌ترین اخبار
                  </h3>
                  <div className="space-y-4">
                    {popularNews.map((news) => (
                      <Link
                        key={news.id}
                        href={`/news/${news.id}`}
                        className="block group"
                      >
                        <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#ce1a2a] hover:text-white! transition-colors">
                          <div className="w-16 h-12 bg-gray-200 rounded shrink-0 overflow-hidden">
                            <img
                              src={mainDomainOld + news.image}
                              alt={news.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 text-sm leading-tight group-hover:text-white! transition-colors line-clamp-2">
                              {news.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2 group-hover:text-white!">
                              <div className="flex items-center gap-1">
                                <FaCalendar />
                                <span>{formatPersianDate(news.created)}</span>
                              </div>

                              <div className="flex items-center gap-1">
                                <FaEye className="w-3 h-3" />
                                <span>
                                  {toPersianNumbers(news.visit)} بازدید
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* آمار بازار */}
                <MarketStats />

                {/* خبرنامه */}
                <NewsBlogForm />
              </div>
            </div>
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

          @media (max-width: 1024px) {
            .container {
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }
        `}</style>
      </div>
      {isPending && <Loading />}
    </>
  );
};

export default CarNews;
