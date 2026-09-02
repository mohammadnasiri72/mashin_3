"use client";
import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";

function SideBarCompareCars({
  popularComparisons,
  banner,
}: {
  popularComparisons: Items[];
  banner: Items[];
}) {
  return (
    <>
      <div className="space-y-6 px-4">
        {/* بنرهای سایدبار */}
        <SideBarBanner banner={banner.filter((e) => e.id === 2570)} />
        {/*پرطرفدارترین مقایسه‌ها*/}
        <SideBarListItems
          itemsList={popularComparisons}
          title={"پرطرفدارترین مقایسه‌ها"}
        />


        {/* آمار بازار */}
        <MarketStats />
      </div>
    </>
  );
}

export default SideBarCompareCars;
