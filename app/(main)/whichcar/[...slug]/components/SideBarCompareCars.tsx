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
      <div className="space-y-6">
        {/*پرطرفدارترین مقایسه‌ها*/}
        <SideBarListItems
          itemsList={popularComparisons}
          title={"پرطرفدارترین مقایسه‌ها"}
        />

        {/* بنرهای سایدبار */}
        <SideBarBanner banner={banner} />

        {/* آمار بازار */}
        <MarketStats />
      </div>
    </>
  );
}

export default SideBarCompareCars;
