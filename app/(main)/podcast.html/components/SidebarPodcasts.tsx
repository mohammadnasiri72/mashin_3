"use client";

import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";

function SidebarPodcasts({
  popularNews,
  banner,
}: {
  popularNews: Items[];
  banner: Items[];
}) {
  return (
    <>
      <section className="">
        <div className="mx-auto">
          <div className="space-y-6">
            {/* بنرهای سایدبار */}
            <SideBarBanner
              banner={banner.filter((e) => e.categoryId === 6506)}
            />
            {/* محبوب‌ترین اخبار */}
            <SideBarListItems
              itemsList={popularNews}
              title={"محبوب‌ترین اخبار"}
            />

            {/* بنرهای سایدبار */}
            <SideBarBanner
              banner={banner.filter((e) => e.categoryId === 6415)}
            />
            {/* آمار بازار */}
            <MarketStats />
          </div>
        </div>
      </section>
    </>
  );
}

export default SidebarPodcasts;
