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
      <section className="px-2">
        <div className="mx-auto">
          <div className="space-y-6">
            {/* محبوب ترین نکات آموزشی خودرو */}
            <SideBarListItems
              itemsList={educationPopular}
              title={"محبوب ترین نکات آموزشی خودرو"}
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

export default SideBarEducation;
