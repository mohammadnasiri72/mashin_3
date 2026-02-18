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
      <section className="py-8 bg-[#f4f4f4]">
        <div className="mx-auto pl-4 lg:pr-2 pr-4">
          <div className="space-y-6">
            {/* بنرهای سایدبار */}
            <SideBarBanner banner={banner} />

            {/* آمار بازار */}
            <MarketStats />

            {/* جدیدترین اخبار */}
            <SideBarListItems
              itemsList={lastNews}
              title={"جدیدترین اخبار خودرو"}
            />

            {/* جدیدترین خودروها */}
            <SideBarListItems itemsList={lastCars} title={"جدیدترین خودروها"} />
          </div>
        </div>
      </section>
    </>
  );
}

export default SidebarAutoServices;
