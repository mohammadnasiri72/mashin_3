"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaCar } from "react-icons/fa";
import { mainDomain } from "@/utils/mainDomain";

export default function CarDimensions({
  detailsCar,
}: {
  detailsCar: ItemsId;
}) {
  const [showAll, setShowAll] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const specifications = detailsCar.properties.filter(
    (e) => e.isTechnicalProperty,
  );

  // Get first 12 items for initial display
  const initialSpecs = specifications.slice(0, 12);
  const remainingSpecs = specifications.slice(12);
  
  // Split initial specs into two columns (6 items each)
  const leftColumnSpecs = initialSpecs.slice(0, 6);
  const rightColumnSpecs = initialSpecs.slice(6, 12);

  // Split remaining specs into two columns
  const remainingLeftSpecs = remainingSpecs.slice(0, Math.ceil(remainingSpecs.length / 2));
  const remainingRightSpecs = remainingSpecs.slice(Math.ceil(remainingSpecs.length / 2));

  useEffect(() => {
    if (contentRef.current) {
      setHeight(showAll ? contentRef.current.scrollHeight : 0);
    }
  }, [showAll]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // تابع برای ترکیب دو ستون و ایجاد ردیف‌های متقابل
  const combineColumns = (leftCol: any[], rightCol: any[]) => {
    const maxLength = Math.max(leftCol.length, rightCol.length);
    const rows = [];
    for (let i = 0; i < maxLength; i++) {
      rows.push({
        left: leftCol[i] || null,
        right: rightCol[i] || null,
      });
    }
    return rows;
  };

  // ترکیب ستون‌های اولیه
  const initialRows = combineColumns(leftColumnSpecs, rightColumnSpecs);
  
  // ترکیب ستون‌های باقی‌مانده
  const remainingRows = combineColumns(remainingLeftSpecs, remainingRightSpecs);

  return (
    <section dir="rtl" className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900">مشخصات فنی</h2>
             
            </div>
      <div className="rounded-2xl border border-slate-200/60 bg-white shadow-lg shadow-slate-200/50 overflow-hidden">
        {/* Main content with image and specs */}
        <div className="flex flex-col lg:flex-row-reverse items-start">
          {/* Image section */}
          <div className="lg:w-[20%] w-full bg-white p-4 lg:p-6 flex items-center justify-center border-b lg:border-b-0 lg:border-l border-slate-200/60">
            <div className="relative w-full max-w-30 lg:max-w-none aspect-square">
              <img
                src={'/images/1.png'}
                alt={`${detailsCar.sourceName} ${detailsCar.title}`}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="lg:w-[80%] w-full p-4 md:p-6">
            {/* Initial specs - always visible */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {initialRows.map((row, rowIndex) => (
                <div key={rowIndex} className="contents">
                  {/* Left column */}
                  <div
                    className={`
                      flex items-center justify-between py-3 px-2
                      ${rowIndex % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}
                      ${rowIndex !== initialRows.length - 1 ? 'border-b border-slate-100' : ''}
                      transition-colors duration-200
                      h-full
                    `}
                  >
                    {row.left ? (
                      <>
                        <span className="text-sm text-slate-600 whitespace-nowrap">{row.left.title}</span>
                        <span className="text-sm font-semibold text-slate-900 text-left">{row.left.value}</span>
                      </>
                    ) : (
                      <span className="text-sm text-slate-400">-</span>
                    )}
                  </div>
                  
                  {/* Right column */}
                  <div
                    className={`
                      flex items-center justify-between py-3 px-2
                      ${rowIndex % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}
                      ${rowIndex !== initialRows.length - 1 ? 'border-b border-slate-100' : ''}
                      transition-colors duration-200
                      h-full
                    `}
                  >
                    {row.right ? (
                      <>
                        <span className="text-sm text-slate-600 whitespace-nowrap">{row.right.title}</span>
                        <span className="text-sm font-semibold text-slate-900 text-left">{row.right.value}</span>
                      </>
                    ) : (
                      <span className="text-sm text-slate-400">-</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Remaining specs with smooth animation */}
            {remainingSpecs.length > 0 && (
              <div className="mt-0">
                {/* Animated container */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: height }}
                >
                  <div ref={contentRef}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                      {remainingRows.map((row, rowIndex) => {
                        const globalIdx = initialRows.length + rowIndex;
                        return (
                          <div key={rowIndex} className="contents">
                            {/* Left column - remaining */}
                            <div
                              className={`
                                flex items-center justify-between py-3 px-2
                                ${globalIdx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}
                                ${rowIndex !== remainingRows.length - 1 ? 'border-b border-slate-100' : ''}
                                transition-colors duration-200
                                h-full
                              `}
                            >
                              {row.left ? (
                                <>
                                  <span className="text-sm text-slate-600 whitespace-nowrap">{row.left.title}</span>
                                  <span className="text-sm font-semibold text-slate-900 text-left">{row.left.value}</span>
                                </>
                              ) : (
                                <span className="text-sm text-slate-400">-</span>
                              )}
                            </div>
                            
                            {/* Right column - remaining */}
                            <div
                              className={`
                                flex items-center justify-between py-3 px-2
                                ${globalIdx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}
                                ${rowIndex !== remainingRows.length - 1 ? 'border-b border-slate-100' : ''}
                                transition-colors duration-200
                                h-full
                              `}
                            >
                              {row.right ? (
                                <>
                                  <span className="text-sm text-slate-600 whitespace-nowrap">{row.right.title}</span>
                                  <span className="text-sm font-semibold text-slate-900 text-left">{row.right.value}</span>
                                </>
                              ) : (
                                <span className="text-sm text-slate-400">-</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Show more button */}
                <div className="mt-4 text-center">
                  <button
                    onClick={toggleShowAll}
                    className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors group"
                  >
                    <span>
                      {showAll ? 'بستن مشخصات' : `مشاهده مشخصات کامل`}
                    </span>
                    {showAll ? (
                      <FaChevronUp className="text-xs group-hover:-translate-y-0.5 transition-transform" />
                    ) : (
                      <FaChevronDown className="text-xs group-hover:translate-y-0.5 transition-transform" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}