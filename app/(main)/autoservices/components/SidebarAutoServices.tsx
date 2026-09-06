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
        {/* بنر جستجوگر */}
        <SideBarBanner banner={banner.filter((e) => e.categoryId === 6506)} />
        {/* جدیدترین خودروها */}
        <SideBarListItems
          itemsList={lastCars}
          title={"جدیدترین خودروها"}
          type={"car"}
        />
        {/* جدیدترین اخبار */}
        <SideBarListItems itemsList={lastNews} title={"جدیدترین اخبار خودرو"} />

        {/* سایر بنرها  */}
        <SideBarBanner banner={banner.filter((e) => e.categoryId === 6415)} />

        {/* آمار بازار */}
        <MarketStats />
      </div>
    </>
  );
}

export default SidebarAutoServices;
