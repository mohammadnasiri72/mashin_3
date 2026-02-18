"use client";
import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";

function SidebarEducation({
  popularEducations,
  banner,
}: {
  popularEducations: Items[];
  banner: Items[];
}) {
  return (
    <>
      <section className="px-2">
        <div className="mx-auto">
          <div className="space-y-6">
            {/* محبوب‌ترین مطالب آموزشی */}
            <SideBarListItems
              itemsList={popularEducations}
              title={"محبوب ترین مطالب آموزشی"}
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

export default SidebarEducation;
