"use client";

import {
  estimateReadTime,
  formatPersianDate,
  htmlToPlainText,
  toPersianNumbers,
} from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { FaCalendar, FaEye } from "react-icons/fa";
import PaginationEducation from "./PaginationEducation";
import SideBarEducation from "./SideBarEducation";

const EducationCar = ({
  education,
  educationPopular,
  educationCat,
  id,
  banner
}: {
  education: Items[];
  educationPopular: Items[];
  educationCat: ItemsCategory[];
  id: number;
  banner:Items[]
}) => {
  return (
    <div className="min-h-screen bg-[#f4f4f4] py-8">
      <div className="mx-auto px-4">
        {/* هدر صفحه */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            <span className="text-[#ce1a2a]">آموزش و نکات فنی</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            جامع‌ترین منبع آموزشی برای نگهداری، تعمیر و رانندگی حرفه‌ای با خودرو
            و موتورسیکلت
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* محتوای اصلی - 3/4 صفحه */}
          <div className="lg:w-3/4 w-full">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* تب‌های آموزشی */}
              <div className="flex flex-wrap gap-2">
                <div>
                  <Link
                    className={`rounded-lg px-3 py-1 duration-300 ${
                      id === 0
                        ? "bg-[#ce1a2a] text-white! hover:bg-red-700"
                        : "bg-slate-100 text-[#333] hover:bg-slate-200"
                    }`}
                    href={"/fa/EducationTips/نکات-آموزشی.html"}
                  >
                    همه نکات آموزشی
                  </Link>
                </div>
                {educationCat.length > 0 &&
                  educationCat.map((ed) => (
                    <div key={ed.id}>
                      <Link
                        className={`rounded-lg px-3 py-1 duration-300 ${
                          ed.id === id
                            ? "bg-[#ce1a2a] text-white! hover:bg-red-700"
                            : "bg-slate-100 text-[#333] hover:bg-slate-200"
                        }`}
                        href={ed.url}
                      >
                        {ed.title}
                      </Link>
                    </div>
                  ))}
              </div>

              {/* لیست مطالب آموزشی */}
              <div className="space-y-6">
                {education.length > 0 ? (
                  education.map((item) => (
                    <div key={item.id}>
                      <article className="py-6! border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col md:flex-row gap-4 ">
                          {/* تصویر مطلب */}
                          <div className="md:w-48 w-full h-32 shrink-0">
                            <Link href={item.url}>
                              <div className="w-full h-full bg-gray-200 rounded-lg overflow-hidden relative">
                                <img
                                  src={mainDomainOld + item.image}
                                  alt={item.title}
                                  className="object-contain hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            </Link>
                          </div>

                          {/* محتوای مطلب */}
                          <div className="flex-1 ">
                            <Link href={item.url}>
                              <h2 className="text-xl font-bold text-gray-900 mb-2! hover:text-[#ce1a2a]! transition-colors cursor-pointer">
                                {item.title}
                              </h2>
                            </Link>

                            {/* <div
                              className="text-gray-600 leading-relaxed text-justify mb-3! line-clamp-2"
                              dangerouslySetInnerHTML={createMarkup(item.body)}
                            /> */}
                            <div className="text-gray-600 leading-relaxed text-justify mb-3! line-clamp-2">
                              {htmlToPlainText(item.body)}
                            </div>

                            {/* متا اطلاعات */}
                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mt-2">
                              <div className="flex items-center gap-1">
                                <FaCalendar />
                                <span>{formatPersianDate(item.created)}</span>
                              </div>

                              <div className="flex items-center gap-1">
                                <FaEye className="w-3 h-3" />
                                <span>
                                  {toPersianNumbers(item.visit)} بازدید
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <span>
                                  زمان مطالعه:{" "}
                                  {estimateReadTime(item.body || "")}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                <span className="text-[#ce1a2a] font-medium">
                                  {item.categoryTitle}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-bold text-gray-600 mb-2">
                      آموزشی یافت نشد
                    </h3>
                    <p className="text-gray-500">
                      در این دسته‌بندی هیچ مطلب آموزشی وجود ندارد.
                    </p>
                  </div>
                )}
              </div>

              {/* صفحه بندی */}
              <PaginationEducation education={education} />
            </div>
          </div>

          {/* سایدبار - 1/4 صفحه */}
          <div className="lg:w-1/4 w-full">
            <SideBarEducation educationPopular={educationPopular} banner={banner}/>
          </div>
        </div>
      </div>

      {/* استایل‌های سفارشی */}
      <style jsx global>{`
        .container {
          max-width: 1200px;
        }

        .custom-education-tabs .ant-tabs-nav {
          margin-bottom: 1rem;
        }
        .custom-education-tabs .ant-tabs-tab {
          padding: 0.4rem;
          user-select: none !important;
        }

        .custom-education-tabs .ant-tabs-ink-bar {
          background: transparent;
        }

        .custom-education-tabs .ant-tabs-tab-active {
          background: #ce1a2a;
          user-select: none !important;
        }
        .custom-education-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #fff !important;
          user-select: none !important;
          font-weight: 600;
        }

        .custom-education-tabs .ant-tabs-tab:hover {
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
  );
};

export default EducationCar;
