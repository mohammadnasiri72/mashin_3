"use client";

import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";

function SidebarBestChoice({
  banner,
  popularBestChoices,
  lastNews,
  lastCars,
}: {
  banner: Items[];
  popularBestChoices: Items[];
  lastNews: Items[];
  lastCars: Items[];
}) {
  // اطلاعات تماس نمونه (در حالت واقعی از properties یا API میاد)

  return (
    <>
      <section className="bg-gray-50 px-2">
        <div className="space-y-6">
          {/* بهترین خودروها از نگاه کاربران*/}
          <SideBarListItems
            itemsList={popularBestChoices}
            title={"بهترین خودروها از نگاه کاربران"}
          />
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
      </section>
    </>
  );
}

export default SidebarBestChoice;
