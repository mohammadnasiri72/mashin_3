"use client";

import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";

function SideBarEducation({
  educationPopular,
  banner,
}: {
  educationPopular: Items[];
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
            {/* محبوب ترین نکات آموزشی خودرو */}
            <SideBarListItems
              itemsList={educationPopular}
              title={"محبوب ترین نکات آموزشی خودرو"}
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

export default SideBarEducation;
