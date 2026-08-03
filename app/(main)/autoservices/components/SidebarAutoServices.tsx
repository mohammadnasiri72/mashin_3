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
      <section className="bg-[#f4f4f4]">
        <div className="mx-auto pl-4 lg:pr-2 pr-4">
          <div className="space-y-6">
            {/* جدیدترین خودروها */}
            <SideBarListItems
              itemsList={lastCars}
              title={"جدیدترین خودروها"}
              type={"car"}
            />
            {/* جدیدترین اخبار */}
            <SideBarListItems
              itemsList={lastNews}
              title={"جدیدترین اخبار خودرو"}
            />

            {/* بنرهای سایدبار */}
            <SideBarBanner banner={banner} />

            {/* آمار بازار */}
            <MarketStats />
          </div>
        </div>
      </section>
    </>
  );
}

export default SidebarAutoServices;
