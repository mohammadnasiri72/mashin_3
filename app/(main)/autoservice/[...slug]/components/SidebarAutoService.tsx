"use client";

import SideBarBanner from "@/app/components/SideBar/SideBarBanner";

function SidebarAutoService({ banner }: { banner: Items[] }) {
  return (
    <>
      <section className="bg-gray-50 px-2">
        <div className="space-y-6">
          {/* بنرهای سایدبار */}
          <SideBarBanner banner={banner} />

          {/* آمار بازار */}
          {/* <MarketStats /> */}
        </div>
      </section>
    </>
  );
}

export default SidebarAutoService;
