// components/PriceChart.tsx
"use client";

import { toPersianNumbers } from "@/utils/func";
import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// تایپ نقطه نمودار
interface PricePoint {
  label: string;
  value: number;
  timestamp: number;
}

// تایپ داده چارت برای Recharts
interface ChartDatum {
  date: string;
  price: number;
}

type RangeId = "1m" | "3m" | "6m" | "1y" | "all";

interface Range {
  id: RangeId;
  label: string;
  days: number | null;
}

const RANGES: Range[] = [
  { id: "1m", label: "1 ماه", days: 30 },
  { id: "3m", label: "3 ماه", days: 90 },
  { id: "6m", label: "6 ماه", days: 180 },
  { id: "1y", label: "1 سال", days: 365 },
  { id: "all", label: "همه", days: null },
];

// تبدیل امن هر مقدار عددی (شامل BigInt) به number
const toNumber = (val: unknown): number => {
  if (typeof val === "bigint") return Number(val);
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    const n = Number(val);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};

// فرمت قیمت به میلیارد تومان (برای محور Y)
const formatPriceMillion = (n: number) => {
  const safe = toNumber(n);
  const inBillion = safe / 1000;
  const formatted =
    inBillion % 1 === 0 ? inBillion.toString() : inBillion.toFixed(1);
  return toPersianNumbers(formatted);
};

// تبدیل تاریخ شمسی به عدد قابل مقایسه (YYYYMMDD)
const parseFaDate = (faDate: string): number => {
  if (!faDate) return 0;
  const parts = faDate.split(/[\/\-]/).map((p) => p.trim());
  if (parts.length < 3) return 0;
  const [y, m, d] = parts.map((p) => parseInt(p, 10) || 0);
  return y * 10000 + m * 100 + d;
};

// تبدیل تاریخ شمسی به تعداد روز
const faDateToDayNumber = (faDate: string): number => {
  if (!faDate) return 0;
  const parts = faDate.split(/[\/\-]/).map((p) => p.trim());
  if (parts.length < 3) return 0;
  const jy = parseInt(parts[0], 10) || 0;
  const jm = parseInt(parts[1], 10) || 0;
  const jd = parseInt(parts[2], 10) || 0;

  const q = Math.floor(jy / 4);
  const daysInMonths = [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  let dayOfYear = 0;
  for (let i = 1; i < jm; i++) {
    dayOfYear += daysInMonths[i];
  }
  dayOfYear += jd;

  return jy * 365 + q + dayOfYear;
};

// اختلاف روز بین دو تاریخ شمسی
const faDaysBetween = (faDateA: string, faDateB: string): number => {
  return Math.abs(faDateToDayNumber(faDateA) - faDateToDayNumber(faDateB));
};

// کل بازه دیتا (روز)
const getTotalSpan = (points: PricePoint[]): number => {
  if (points.length < 2) return 0;
  return faDaysBetween(points[0].label, points[points.length - 1].label);
};

// چک می‌کنه آیا این تب قابل استفاده هست
const hasEnoughDataForRange = (
  points: PricePoint[],
  rangeIndex: number,
): boolean => {
  const range = RANGES[rangeIndex];
  if (!range) return false;

  // "همه" همیشه فعال
  if (range.days === null) return true;

  // "۱ ماه" همیشه فعال (اگه دیتا داشته باشیم)
  if (rangeIndex === 0) {
    return points.length >= 1;
  }

  // برای بقیه: فعال اگه کل بازه دیتا از بازه‌ی تب قبلی بیشتر باشه
  const prevRange = RANGES[rangeIndex - 1];
  const prevDays = prevRange.days ?? 0;
  const totalSpan = getTotalSpan(points);

  return totalSpan > prevDays;
};

// آیا اصلاً باید تب‌های بازه زمانی نمایش داده بشن؟
// فقط اگه حداقل ۳ نقطه دیتا داشته باشیم
const shouldShowRangeTabs = (points: PricePoint[]): boolean => {
  return points.length >= 3;
};

export default function PriceChart({
  dataPriceChart,
}: {
  dataPriceChart: PriceChart[];
}) {
  // نرمال‌سازی و مرتب‌سازی
  const normalizedData: PricePoint[] = useMemo(() => {
    if (!Array.isArray(dataPriceChart) || dataPriceChart.length === 0)
      return [];

    return [...dataPriceChart]
      .map((d) => ({
        label: d.createdFa,
        value: toNumber(d.price),
        timestamp: parseFaDate(d.createdFa),
      }))
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [dataPriceChart]);

  // پیش‌فرض: کوچک‌ترین بازه‌ای که کل دیتا رو پوشش بده
  const defaultRangeId: RangeId = useMemo(() => {
    if (normalizedData.length < 2) return "all";
    const totalSpan = getTotalSpan(normalizedData);

    if (totalSpan <= 30) return "1m";
    if (totalSpan <= 90) return "3m";
    if (totalSpan <= 180) return "6m";
    if (totalSpan <= 365) return "1y";
    return "all";
  }, [normalizedData]);

  const [activeRange, setActiveRange] = useState<RangeId>(defaultRangeId);

  // sync state با defaultRangeId وقتی دیتا تغییر کرد
  useMemo(() => {
    setActiveRange(defaultRangeId);
  }, [defaultRangeId]);

  // فیلتر دیتا
  const filteredData = useMemo(() => {
    const range = RANGES.find((r) => r.id === activeRange);
    if (!range) return normalizedData;
    const rangeDays = range.days;
    if (rangeDays === null) return normalizedData;

    const lastPoint = normalizedData[normalizedData.length - 1];
    if (!lastPoint) return normalizedData;
    const lastFaDate = lastPoint.label;

    return normalizedData.filter(
      (p) => faDaysBetween(p.label, lastFaDate) <= rangeDays,
    );
  }, [normalizedData, activeRange]);

  const hasData = filteredData.length > 0;
  const isUpdating = normalizedData.length < 2;

  // آمار
  const stats = useMemo(() => {
    const values = filteredData.map((d) => toNumber(d.value));
    if (values.length === 0) {
      return { min: 0, max: 0, avg: 0 };
    }
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return { min, max, avg };
  }, [filteredData]);

  // داده چارت برای Recharts
  const chartData: ChartDatum[] = useMemo(() => {
    return filteredData.map((d) => ({
      date: d.label,
      price: toNumber(d.value),
    }));
  }, [filteredData]);

  // محاسبه بازه محور Y
  const yDomain = useMemo(() => {
    const values = filteredData.map((d) => toNumber(d.value));
    if (values.length === 0) return [0, 100];
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;
    const padding = range * 0.1;
    return [Math.max(0, minVal - padding), maxVal + padding];
  }, [filteredData]);

  return (
    <div
      className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm h-full"
      dir="rtl"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">
          <span className="pl-1">نمودار</span>
          <strong className="text-red-700">قیمت</strong>
        </h2>

        {shouldShowRangeTabs(normalizedData) && (
          <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-2 w-full sm:justify-center overflow-x-auto">
            {RANGES.map((r, index) => {
              const isActive = r.id === activeRange;
              const hasEnoughData = hasEnoughDataForRange(
                normalizedData,
                index,
              );
              return (
                <button
                  key={r.id}
                  disabled={!hasEnoughData}
                  onClick={() => setActiveRange(r.id)}
                  className={[
                    "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap",
                    isActive
                      ? "bg-[#ce1a2a] text-white! shadow-sm"
                      : "text-slate-500 bg-white! hover:text-slate-700",
                    !hasEnoughData && "opacity-40 cursor-not-allowed",
                  ].join(" ")}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {!hasData ? (
        <EmptyState />
      ) : isUpdating ? (
        <UpdatingState lastPoint={normalizedData[normalizedData.length - 1]} />
      ) : (
        <div className="w-full" style={{ height: "320px" }} dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#f1f5f9"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#64748b", fontWeight: 500 }}
                tickMargin={10}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={false}
                angle={-55}
                textAnchor="end"
                height={70}
                interval={0}
                tickFormatter={(val) => toPersianNumbers(val)}
              />
              <YAxis
                orientation="left"
                domain={yDomain}
                tickFormatter={(val) => formatPriceMillion(val)}
                tick={{ fontSize: 11, fill: "#64748b", fontWeight: 500 }}
                tickMargin={8}
                axisLine={{ stroke: "#cbd5e1" }}
                tickLine={false}
                width={70}
                label={{
                  value: "میلیارد تومان",
                  angle: -90,
                  position: "insideLeft",
                  offset: 0,
                  style: {
                    fontSize: 11,
                    fill: "#94a3b8",
                    fontWeight: 600,
                    textAnchor: "middle",
                  },
                }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#dc2626",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "#dc2626",
                  stroke: "#ffffff",
                  strokeWidth: 2.5,
                }}
                activeDot={{
                  r: 8,
                  fill: "#dc2626",
                  stroke: "#ffffff",
                  strokeWidth: 3,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {hasData && (
        <div className="mt-4 grid sm:grid-cols-3 grid-cols-1 gap-3 border-t border-slate-100 pt-4 text-center">
          <StatBox label="بیشترین قیمت" value={stats.max} />
          <StatBox label="میانگین قیمت" value={stats.avg} highlight />
          <StatBox label="کمترین قیمت" value={stats.min} />
        </div>
      )}
    </div>
  );
}

/* ---------- Tooltip سفارشی ---------- */

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload as ChartDatum;

  return (
    <div
      dir="rtl"
      className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg"
    >
      <div className="mb-1 h-1 w-full rounded-full bg-red-600" />
      <p className="text-xs text-slate-500">{toPersianNumbers(data.date)}</p>
      <p className="text-base font-extrabold text-red-700">
        {toPersianNumbers(
          Math.round(toNumber(data.price)).toLocaleString("en-US"),
        )}
      </p>
      <p className="text-xs text-slate-400">میلیون تومان</p>
    </div>
  );
}

/* ---------- زیرکامپوننت‌ها ---------- */

function StatBox({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  const safeValue = toNumber(value);
  return (
    <div
      className={[
        "flex flex-col gap-0.5",
        highlight ? "rounded-lg bg-red-50 py-1" : "",
      ].join(" ")}
    >
      <span
        className={`text-xs ${highlight ? "text-red-600" : "text-slate-700"}`}
      >
        {label}
      </span>
      <span
        className={`text-sm font-bold ${
          highlight ? "text-red-800" : "text-slate-900"
        }`}
      >
        {toPersianNumbers(Math.round(safeValue).toLocaleString("en-US"))}
      </span>
      <span
        className={`text-xs font-normal ${
          highlight ? "text-red-600" : "text-slate-700"
        }`}
      >
        میلیون تومان
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
        <svg
          className="h-7 w-7 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
      <p className="text-sm font-semibold text-slate-700">
        هنوز قیمتی برای این خودرو ثبت نشده است
      </p>
      <p className="mt-1 text-xs text-slate-500">
        به‌زودی نمودار قیمت نمایش داده می‌شود
      </p>
    </div>
  );
}

function UpdatingState({ lastPoint }: { lastPoint: PricePoint }) {
  const safeValue = toNumber(lastPoint.value);
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
        <svg
          className="h-7 w-7 animate-spin text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
      <p className="text-sm font-semibold text-slate-700">
        نمودار در حال بروزرسانی است
      </p>
      <p className="mt-1 text-xs text-slate-500">
        آخرین قیمت ثبت‌شده ({lastPoint.label}):
      </p>
      <p className="mt-2 text-lg font-extrabold text-red-700">
        {safeValue.toLocaleString("fa-IR")} میلیون تومان
      </p>
    </div>
  );
}