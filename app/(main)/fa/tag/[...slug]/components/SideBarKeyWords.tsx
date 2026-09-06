import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import React from "react";

function SideBarKeyWords({ banner }: { banner: Items[] }) {
  return (
    <>
      <div className="space-y-6">
        {/* بنرهای سایدبار */}
        <SideBarBanner banner={banner.filter((e) => e.categoryId === 6506)} />
          <SideBarBanner banner={banner.filter((e) => e.categoryId === 6415)} />

        {/* آمار بازار */}
        <MarketStats />
      </div>
    </>
  );
}

export default SideBarKeyWords;
