// components/PriceChart.tsx
"use client";

import { useMemo, useState } from "react";
import { PricePoint, PriceRange } from "./types";

const formatToman = (n: number) => n.toLocaleString("fa-IR");

// تبدیل عدد به میلیون تومان برای نمایش بهتر
const formatTomanShort = (n: number) => {
  if (n >= 1000000000) {
    return (n / 1000000000).toFixed(1) + " میلیارد";
  }
  if (n >= 1000000) {
    return (n / 1000000).toFixed(0) + " میلیون";
  }
  return n.toLocaleString("fa-IR");
};

// MiniLineChart برای نمودار قیمت با محورها
function MiniLineChart({ data }: { data: PricePoint[] }) {
  const width = 640;
  const height = 300;
  const padding = { top: 30, right: 30, bottom: 50, left: 75 };

  const { points, areaPath, linePath, min, max, yTicks } = useMemo(() => {
    if (data.length === 0) {
      return { points: [], areaPath: "", linePath: "", min: 0, max: 0, yTicks: [] };
    }

    const values = data.map((d) => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;

    // محور Y - 5 نقطه
    const yTickCount = 5;
    const yStep = range / yTickCount;
    const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) => ({
      value: Math.round(minVal + i * yStep),
      label: formatTomanShort(Math.round(minVal + i * yStep)),
    }));

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const step = chartWidth / Math.max(data.length - 1, 1);

    const pts = data.map((d, i) => {
      const x = padding.left + i * step;
      const y =
        padding.top +
        chartHeight -
        ((d.value - minVal) / range) * chartHeight;
      return { x, y, label: d.label };
    });

    const line = pts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
    const area = `${line} L ${pts[pts.length - 1].x} ${padding.top + chartHeight} L ${
      pts[0].x
    } ${padding.top + chartHeight} Z`;

    return {
      points: pts,
      areaPath: area,
      linePath: line,
      min: minVal,
      max: maxVal,
      yTicks,
    };
  }, [data]);

  return (
    <div className="w-full overflow-x-auto ">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ minHeight: "200px", width: "100%" }}
      >
        <defs>
          <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines - محور Y */}
        {yTicks.map((tick, i) => {
          const y =
            padding.top +
            (height - padding.top - padding.bottom) -
            ((tick.value - min) / (max - min || 1)) *
              (height - padding.top - padding.bottom);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="0.5"
                strokeDasharray="4,4"
              />
              <text
                x={padding.left - 70}
                y={y - 5}
                textAnchor="end"
                fontSize="16"
                fill="#6b7280"
                fontWeight="500"
              >
                {tick.label}
              </text>
            </g>
          );
        })}

        {/* Axis Y line */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke="#d1d5db"
          strokeWidth="1.5"
        />

        {/* Area */}
        <path d={areaPath} fill="url(#priceGradient)" />

        {/* Line */}
        <path d={linePath} fill="none" stroke="#dc2626" strokeWidth="3" />

        {/* Points and labels */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill="#dc2626" stroke="#fff" strokeWidth="2.5" />
            {/* برچسب محور X */}
            <text
              x={p.x}
              y={height - padding.bottom + 22}
              textAnchor="middle"
              fontSize="11"
              fill="#6b7280"
              fontWeight="500"
            >
              {p.label}
            </text>
          </g>
        ))}

        {/* Axis X line */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="#d1d5db"
          strokeWidth="1.5"
        />

        {/* عنوان محور Y */}
        <text
          x={45}
          y={0}
          textAnchor="middle"
          fontSize="14"
          fill="#9ca3af"
          fontWeight="500"
          transform={`rotate(0, 1000)`}
        >
          قیمت (تومان)
        </text>
      </svg>
    </div>
  );
}

interface PriceChartProps {
  ranges: PriceRange[];
  dataByRange: Record<string, PricePoint[]>;
  defaultRangeId?: string;
}

export default function PriceChart({
  ranges,
  dataByRange,
  defaultRangeId,
}: PriceChartProps) {
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
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm h-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-extrabold text-slate-900">
          نمودار قیمت
        </h2>
        <button
        //   onClick={onViewDetails}
          className="flex items-center gap-0.5 text-sm font-semibold text-red-600 hover:text-red-700 cursor-pointer"
        >
          مشاهده جزئیات...
        </button>
        <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-2 w-full sm:justify-center overflow-x-auto">
          {ranges.map((r) => {
            const isActive = r.id === activeRange;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRange(r.id)}
                className={[
                  "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap",
                  isActive
                    ? "bg-[#ce1a2a] text-white! shadow-sm"
                    : "text-slate-500 bg-white! hover:text-slate-700",
                ].join(" ")}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      <MiniLineChart data={data} />

      <div className="mt-4 grid sm:grid-cols-3 grid-cols-1 gap-3 border-t border-slate-100 pt-4 text-center">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-slate-400">کمترین قیمت</span>
          <span className="text-sm font-bold text-slate-900">
            {formatToman(min)}{" "}
          </span>
            <span className="text-xs font-normal text-slate-400">
              تومان
            </span>
        </div>
        <div className="flex flex-col gap-0.5 rounded-lg bg-red-50 py-1">
          <span className="text-xs text-red-500">میانگین قیمت</span>
          <span className="text-sm font-bold text-red-600">
            {formatToman(avg)}{" "}
          </span>
            <span className="text-xs font-normal text-red-400">
              تومان
            </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-slate-400">بیشترین قیمت</span>
          <span className="text-sm font-bold text-slate-900">
            {formatToman(max)}{" "}
          </span>
            <span className="text-xs font-normal text-slate-400">
              تومان
            </span>
        </div>
      </div>
    </div>
  );
}