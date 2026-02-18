import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import { mainDomainOld } from "@/utils/mainDomain";
import React from "react";

function SideBarCars({ banner }: { banner: Items[] }) {
  return (
    <>
      <div className="space-y-6">
        {/* بنرهای سایدبار */}
        <SideBarBanner banner={banner} />

        {/* آمار بازار */}
        <MarketStats />
      </div>
    </>
  );
}

export default SideBarCars;
