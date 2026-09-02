"use client";
import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";

function SidebarAutoServices({
  banner,
  lastNews,
  lastCars,
}: {
  banner: Items[];
  lastNews: Items[];
  lastCars: Items[];
}) {
  return (
    <>
      <div className="space-y-6">
        {/* بنرهای سایدبار */}
        <SideBarBanner banner={banner.filter((e) => e.id === 2570)} />
        {/* جدیدترین خودروها */}
        <SideBarListItems
          itemsList={lastCars}
          title={"جدیدترین خودروها"}
          type={"car"}
        />
        {/* جدیدترین اخبار */}
        <SideBarListItems itemsList={lastNews} title={"جدیدترین اخبار خودرو"} />

        {/* آمار بازار */}
        <MarketStats />
      </div>
    </>
  );
}

export default SidebarAutoServices;
