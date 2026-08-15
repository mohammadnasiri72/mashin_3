// components/PriceAndComparison.tsx (کامپوننت اصلی که دو کامپوننت رو کنار هم قرار میده)
"use client";

import { CompetitorCar, CompetitorRow, PricePoint, PriceRange } from "./types";
import PriceChart from "./PriceChart";
import ComparisonTable from "./ComparisonTable";

interface PriceAndComparisonProps {
  ranges: PriceRange[];
  dataByRange: Record<string, PricePoint[]>;
  defaultRangeId?: string;
  detailsCarcompetitor: ItemsId[];
}

export default function PriceAndComparison({
  ranges,
  dataByRange,
  defaultRangeId,
  detailsCarcompetitor,
}: PriceAndComparisonProps) {
  return (
    <section dir="rtl" className="mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comparison Table - 2/3 عرض */}
        <div className="lg:col-span-2 w-full">
          <ComparisonTable
            competitors={detailsCarcompetitor}
          />
        </div>

        {/* Price Chart - 1/3 عرض */}
        <div className="lg:col-span-1 w-full">
          <PriceChart
            ranges={ranges}
            dataByRange={dataByRange}
            defaultRangeId={defaultRangeId}
          />
        </div>
      </div>
    </section>
  );
}