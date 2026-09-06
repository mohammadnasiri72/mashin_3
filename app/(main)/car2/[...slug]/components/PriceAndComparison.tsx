// components/PriceAndComparison.tsx (کامپوننت اصلی که دو کامپوننت رو کنار هم قرار میده)
"use client";

import ComparisonTable from "./ComparisonTable";
import PriceChart from "./PriceChart";

interface PriceAndComparisonProps {
  competitorIds: string | undefined;
}

export default function PriceAndComparison({
  competitorIds
}: PriceAndComparisonProps) {
  return (
    <section dir="rtl" className="mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comparison Table - 2/3 عرض */}
        <div className="lg:col-span-2 w-full">
          <ComparisonTable competitorIds={competitorIds}/>
        </div>

        {/* Price Chart - 1/3 عرض */}
        <div className="lg:col-span-1 w-full">
          <PriceChart />
        </div>
      </div>
    </section>
  );
}
