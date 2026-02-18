"use client";

import CustomPagination from "@/app/components/CustomPagination";
import { htmlToPlainText } from "@/utils/func";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaTag } from "react-icons/fa";
import SearchBoxDic from "./SearchBoxDic";
import SideBarTechnicalWords from "./SideBarTechnicalWords";

function CardDic({
  title,
  summary,
  tabConfig,
  dic,
  banner,
}: {
  title: string;
  summary: string;
  tabConfig: { key: number; href: string; label: string }[];
  dic: Items[];
  banner: Items[];
}) {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isMainLonger, setIsMainLonger] = useState(true);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("term");
  const router = useRouter();
  const pathname = usePathname();

  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const key = Number(pathname.split("/")[2]);
    if (isNaN(key)) {
      setActiveTab(0);
    } else {
      setActiveTab(key);
    }
  }, [pathname]);

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
  }, [dic, banner, searchTerm]); // وابستگی به searchTerm برای وقتی جستجو تغییر میکنه

  return (
    <>
      <div className="min-h-screen">
        <div className="p-4 mx-auto">
          {/* هدر صفحه */}
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="text-red-600">{title}</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {summary && htmlToPlainText(summary)}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 relative">
            {/* محتوای اصلی - 3/4 صفحه */}
            <div
              ref={mainBoxRef}
              className={`
                lg:w-3/4 w-full transition-all duration-300
                ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
              `}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                {/* تب‌های واژگان فنی */}
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

                {/* سرچ باکس */}
                <SearchBoxDic />

                {/* نمایش عبارت جستجو */}
                {searchTerm && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-blue-700">
                    نتایج جستجو برای:{" "}
                    <span className="font-bold">"{searchTerm}"</span>
                    <button
                      onClick={() => {
                        const params = new URLSearchParams(
                          searchParams.toString(),
                        );
                        params.delete("term");
                        router.push(`${pathname}?${params.toString()}`);
                      }}
                      className="mr-2 text-blue-500 hover:text-blue-700 underline text-sm"
                    >
                      پاک کردن
                    </button>
                  </div>
                )}

                {/* لیست واژگان با طراحی کارت‌های زیبا */}
                {dic.length > 0 ? (
                  <div className="space-y-4">
                    {dic.map((d) => (
                      <Link href={d.url} key={d.id} className="">
                        <div className="group bg-gray-50 rounded-xl mt-3! p-5 hover:bg-linear-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-300 border border-gray-200 hover:border-red-200 shadow-sm hover:shadow-md">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <FaTag className="text-red-500 group-hover:rotate-12 transition-transform" />
                            </div>
                            <div className="flex-1">
                              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-700 transition-colors">
                                {d.title}
                              </h2>
                              <p className="text-gray-600 leading-relaxed">
                                {htmlToPlainText(d.body)}
                              </p>
                            </div>
                            <FaArrowLeft className="text-gray-400 group-hover:text-red-500 group-hover:-translate-x-1 transition-all" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      هیچ واژه‌ای یافت نشد
                    </p>
                  </div>
                )}

                {/* صفحه بندی */}
                {dic.length > 0 && (
                  <div className="mt-8">
                    <CustomPagination
                      total={dic[0].total}
                      pageSize={20}
                      currentPage={Number(searchParams.get("page")) || 1}
                    />
                  </div>
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
              <SideBarTechnicalWords banner={banner} />
            </aside>
          </div>
        </div>
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

export default CardDic;
