"use client";

import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";

function SidebarAutoService({ banner }: { banner: Items[] }) {
  return (
    <>
      <section className="bg-gray-50 px-2">
        <div className="space-y-6">
          {/* بنرهای سایدبار */}
          <SideBarBanner banner={banner.filter((e)=>e.id===2570)} />

          {/* آمار بازار */}
          <MarketStats />
        </div>
      </section>
    </>
  );
}

export default SidebarAutoService;
