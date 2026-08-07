"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { CompetitorCar, CompetitorRow, PricePoint, PriceRange } from "./types";
import { mainDomain } from "@/utils/mainDomain";

interface PriceAndComparisonProps {
  ranges: PriceRange[];
  dataByRange: Record<string, PricePoint[]>;
  defaultRangeId?: string;
  competitors: CompetitorCar[];
  rows: CompetitorRow[];
  onViewFullComparison?: () => void;
  onCompareOne?: (competitorId: string) => void;
}

const formatToman = (n: number) => n.toLocaleString("fa-IR");

// MiniLineChart برای نمودار قیمت
function MiniLineChart({ data }: { data: PricePoint[] }) {
  const width = 640;
  const height = 220;
  const padding = 24;

  const { points, areaPath, linePath } = useMemo(() => {
    if (data.length === 0) return { points: [], areaPath: "", linePath: "" };
    const values = data.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const step = (width - padding * 2) / Math.max(data.length - 1, 1);

    const pts = data.map((d, i) => {
      const x = padding + i * step;
      const y =
        height - padding - ((d.value - min) / range) * (height - padding * 2);
      return { x, y };
    });

    const line = pts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
    const area = `${line} L ${pts[pts.length - 1].x} ${height - padding} L ${
      pts[0].x
    } ${height - padding} Z`;

    return { points: pts, areaPath: area, linePath: line };
  }, [data]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-56 w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#priceGradient)" />
      <path d={linePath} fill="none" stroke="#dc2626" strokeWidth="2.5" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#dc2626" />
      ))}
    </svg>
  );
}

export default function PriceAndComparison({
  ranges,
  dataByRange,
  defaultRangeId,
  competitors,
  rows,
  onViewFullComparison,
  onCompareOne,
  detailsCarcompetitor
}: {
  ranges: PriceRange[];
  dataByRange: Record<string, PricePoint[]>;
  defaultRangeId?: string;
  competitors: CompetitorCar[];
  rows: CompetitorRow[];
  onViewFullComparison?: () => void;
  onCompareOne?: (competitorId: string) => void;
  detailsCarcompetitor:ItemsId[]
}) {
    console.log(detailsCarcompetitor);
    
  const [activeRange, setActiveRange] = useState(
    defaultRangeId ?? ranges[0]?.id,
  );

  const data = dataByRange[activeRange] ?? [];
  const values = data.map((d) => d.value);
  const min = values.length ? Math.min(...values) : 0;
  const max = values.length ? Math.max(...values) : 0;
  const avg = values.length
    ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
    : 0;

  return (
    <section dir="rtl" className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comparison Table - 2/3 عرض */}
        <div className="lg:col-span-2 w-full">
          <div className="rounded-2xl border border-slate-100 bg-white shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between p-5 pb-0">
              <h2 className="text-lg font-extrabold text-slate-900">
                مقایسه با رقبا
              </h2>
              <button
                onClick={onViewFullComparison}
                className="flex items-center gap-0.5 text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer"
              >
                مشاهده مقایسه کامل
                <BiChevronLeft fontSize="small" />
              </button>
            </div>

            <div className="p-5 pt-3 flex-1 overflow-x-auto">
              <table className="w-full border-collapse text-sm min-w-150">
                <thead>
                  <tr>
                    <th className="w-32 p-3 text-right text-xs font-medium text-slate-400" />
                    {detailsCarcompetitor.map((car) => (
                      <th key={car.id} className="p-3 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="relative h-12 w-20">
                            <img
                              src={mainDomain +car.image}
                              alt={car.title}
                              className="object-contain"
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
          </div>
        </div>
        {/* Price Chart - 1/3 عرض */}
        <div className="lg:col-span-1 w-full">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm h-full">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-extrabold text-slate-900">
                نمودار قیمت
              </h2>
 <button
                onClick={onViewFullComparison}
                className="flex items-center gap-0.5 text-sm font-semibold text-red-600 hover:text-red-700 cursor-pointer"
              >
                مشاهده جزئیات...
              </button>
              <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 w-full justify-center">
                {ranges.map((r) => {
                  const isActive = r.id === activeRange;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setActiveRange(r.id)}
                      className={[
                        "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer",
                        isActive
                          ? "bg-white text-red-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-700",
                      ].join(" ")}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>

             
            </div>

            <MiniLineChart data={data} />

            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-center">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-slate-400">کمترین قیمت</span>
                <span className="text-sm font-bold text-slate-900">
                  {formatToman(min)}{" "}
                  <span className="text-xs font-normal text-slate-400">
                    تومان
                  </span>
                </span>
              </div>
              <div className="flex flex-col gap-0.5 rounded-lg bg-red-50 py-1">
                <span className="text-xs text-red-500">میانگین قیمت</span>
                <span className="text-sm font-bold text-red-600">
                  {formatToman(avg)}{" "}
                  <span className="text-xs font-normal text-red-400">
                    تومان
                  </span>
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-slate-400">بیشترین قیمت</span>
                <span className="text-sm font-bold text-slate-900">
                  {formatToman(max)}{" "}
                  <span className="text-xs font-normal text-slate-400">
                    تومان
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
