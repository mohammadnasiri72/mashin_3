// components/ComparisonTable.tsx
"use client";

import { mainDomain } from "@/utils/mainDomain";
import { BiChevronLeft } from "react-icons/bi";
import { CompetitorRow } from "./types";
import { useState } from "react";
import Link from "next/link";

interface ComparisonTableProps {
  competitors: ItemsId[];
  rows: CompetitorRow[];
}

export default function ComparisonTable({
  competitors,
  rows,
}: ComparisonTableProps) {
    const idsString = competitors.map(item => item.id).join(',');
    
  const [selectedCar, setSelectedCar] = useState<number>(0);

  if (competitors.length === 0) return null;

  // تابع برای انتخاب خودرو در موبایل
  const handleCarSelect = (index: number) => {
    setSelectedCar(index);
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-base md:text-lg font-extrabold text-slate-900">
          مقایسه با رقبا
        </h2>
        <Link href={`/compare/${idsString}`}
        //   onClick={onViewFullComparison}
          className="flex items-center gap-0.5 text-xs md:text-sm font-medium text-[#ce1a2a]! hover:text-red-700! cursor-pointer"
        >
          مشاهده مقایسه کامل
          <BiChevronLeft fontSize="small" />
        </Link>
      </div>

      {/* ====== دسکتاپ: جدول ====== */}
      <div className="hidden md:block p-5 pt-3 flex-1 overflow-x-auto">
        <table className="w-full border-collapse text-sm min-w-150">
          <thead>
            <tr>
              <th className="w-32 p-3 text-right text-xs font-medium text-slate-400" />
              {competitors.map((car) => (
                <th key={car.id} className="p-3 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative h-12 w-20">
                      <img
                        src={mainDomain + car.image}
                        alt={car.title}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      {car.sourceName} {car.title}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.label}
                className={idx % 2 === 0 ? "bg-slate-50/60" : "bg-white"}
              >
                <td className="p-3 text-xs text-slate-500 font-medium">
                  {row.label}
                </td>
                {row.values.map((value, i) => (
                  <td
                    key={i}
                    className="p-3 text-center text-sm font-semibold text-slate-800"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ====== موبایل: کارت‌های جداگانه ====== */}
      <div className="md:hidden p-4 pt-3 space-y-4">
        {/* انتخابگر خودرو */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {competitors.map((car, index) => (
            <button
              key={car.id}
              onClick={() => handleCarSelect(index)}
              className={`shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl border-2 transition-all ${
                selectedCar === index
                  ? "border-red-500 bg-red-50"
                  : "border-slate-100 bg-white hover:border-slate-200"
              }`}
            >
              <div className="relative h-10 w-16">
                <img
                  src={mainDomain + car.image}
                  alt={car.title}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className={`text-[10px] font-bold ${
                selectedCar === index ? "text-red-600" : "text-slate-600"
              }`}>
                {car.sourceName} {car.title}
              </span>
            </button>
          ))}
        </div>

        {/* نمایش مشخصات خودرو انتخاب شده */}
        <div className="space-y-2">
          {rows.map((row, idx) => (
            <div
              key={row.label}
              className={`flex items-center justify-between p-3 rounded-xl ${
                idx % 2 === 0 ? "bg-slate-50/80" : "bg-white"
              }`}
            >
              <span className="text-xs text-slate-500 font-medium">
                {row.label}
              </span>
              <span className="text-sm font-bold text-slate-800">
                {row.values[selectedCar] || "-"}
              </span>
            </div>
          ))}
        </div>

        {/* دکمه مشاهده همه رقبا */}
        <button
        //   onClick={onViewFullComparison}
          className="w-full py-2.5 text-center text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
        >
          مشاهده مقایسه کامل
        </button>
      </div>

      {/* استایل اسکرول‌بار مخفی */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}