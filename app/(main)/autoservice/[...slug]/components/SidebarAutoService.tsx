"use client";

import SideBarBanner from "@/app/components/SideBar/SideBarBanner";

function SidebarAutoService({ banner }: { banner: Items[] }) {
  return (
    <>
      <section className="bg-gray-50">
        <div className="space-y-2">
          {/* بنرهای سایدبار */}
          <SideBarBanner banner={banner.filter((e) => e.categoryId === 6506)} />
          <SideBarBanner banner={banner.filter((e) => e.categoryId === 6415)} />

          {/* آمار بازار */}
          {/* <MarketStats /> */}
        </div>
      </section>
    </>
  );
}

export default SidebarAutoService;
