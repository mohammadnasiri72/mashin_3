import MarketStats from "@/app/components/MarketStats";
import NewsBlogForm from "@/app/components/NewsBlogForm";
import { formatPersianDate, toPersianNumbers } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import React from "react";
import { FaBalanceScale, FaCalendar, FaEye } from "react-icons/fa";

function SideBarBestChoices({
  popularBestChoices,
  banner,
}: {
  popularBestChoices: Items[];
  banner: Items[];
}) {
  return (
    <>
      <div className="space-y-6">
        {/* بهترین خودروها از نگاه کاربران*/}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4! border-b pb-2 flex items-center gap-2">
            <FaBalanceScale className="text-[#ce1a2a]" />
            بهترین خودروها از نگاه کاربران
          </h3>
          <div className="space-y-4">
            {popularBestChoices.map((bestChoice) => (
              <Link
                key={bestChoice.id}
                href={bestChoice.url}
                className="block group"
              >
                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#ce1a2a] hover:text-white! transition-colors">
                  <div className="w-16 h-12 bg-gray-200 rounded shrink-0 overflow-hidden relative">
                    <img
                      src={mainDomainOld + bestChoice.image}
                      alt={bestChoice.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/placeholder-comparison.jpg";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm leading-tight group-hover:text-white! transition-colors line-clamp-2">
                      {bestChoice.title}
                    </h4>

                    {/* متا اطلاعات */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700 mt-2 group-hover:text-white!">
                      <div className="flex items-center gap-1">
                        <FaCalendar />
                        <span>{formatPersianDate(bestChoice.created)}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <FaEye className="w-3 h-3" />
                        <span>{toPersianNumbers(bestChoice.visit)} بازدید</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {banner.length > 0 &&
          banner.map((ban) => (
            <div className="w-full" key={ban.id}>
              <img
                className="w-full"
                src={mainDomainOld + ban.image}
                alt={ban.title}
              />
            </div>
          ))}
        {/* آمار بازار */}
        <MarketStats />
      </div>
    </>
  );
}

export default SideBarBestChoices;
