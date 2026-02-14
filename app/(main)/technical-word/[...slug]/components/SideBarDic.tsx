"use client";

import MarketStats from "@/app/components/MarketStats";
import { mainDomainOld } from "@/utils/mainDomain";
import React from "react";

function SideBarDic({ banner }: { banner: Items[] }) {
  return (
    <>
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
    </>
  );
}

export default SideBarDic;
