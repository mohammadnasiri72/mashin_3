"use client";

import CustomPagination from "@/app/components/CustomPagination";
import MarketStats from "@/app/components/MarketStats";
import { htmlToPlainText } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBookOpen, FaTag, FaArrowLeft, FaSearch } from "react-icons/fa";
import { Button, Input, Space } from "antd";
import SearchBoxDic from "./SearchBoxDic";

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
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("term");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const key = Number(pathname.split("/")[2]);
    if (isNaN(key)) {
      setActiveTab(0);
    } else {
      setActiveTab(key);
    }
  }, [pathname]);


  return (
    <>
      <div className="min-h-screen">
        <div className="px-4">
          {/* هدر صفحه */}
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="text-red-600">{title}</span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {summary && htmlToPlainText(summary)}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* محتوای اصلی - 3/4 صفحه */}
            <div className="lg:w-3/4 w-full">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                {/* تب‌های واژگان فنی */}
                <div className="mb-6 flex items-center flex-wrap gap-2">
                  {tabConfig.map((tab) => (
                    <Link
                      key={tab.key}
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
            <aside className="lg:w-1/4 w-full">
              <div className="space-y-6">
                {/* بنرهای تبلیغاتی */}
                {banner.length > 0 && (
                  <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                    <div className="space-y-4">
                      {banner.map((ban) => (
                        <div
                          key={ban.id}
                          className="group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                        >
                          <img
                            className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                            src={mainDomainOld + ban.image}
                            alt={ban.title}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* آمار بازار */}
                <MarketStats />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardDic;
