"use client";

import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";

interface SidebarEducationProps {
  currentEducationId?: number;
  categoryId?: number;
}

function SidebarEducation({
  popularEducations,
  banner,
  loading,
}: {
  popularEducations: Items[];
  banner: Items[];
  loading: boolean;
}) {
  // نمایش لودینگ
  if (loading) {
    return (
      <section className="px-2">
        <div className="mx-auto">
          <div className="space-y-6">
            {/* اسکلتون لودینگ */}
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-2">
      <div className="mx-auto">
        <div className="space-y-6">
          {/* بنرهای سایدبار */}
          <SideBarBanner banner={banner.filter((e) => e.categoryId === 6506)} />

          {/* محبوب‌ترین مطالب آموزشی */}
          {popularEducations.length > 0 && (
            <SideBarListItems
              itemsList={popularEducations}
              title={"محبوب ترین مطالب آموزشی"}
            />
          )}

          {/* بنرهای سایدبار */}
          <SideBarBanner banner={banner.filter((e) => e.categoryId === 6415)} />

          {/* آمار بازار */}
          <MarketStats />
        </div>
      </div>
    </section>
  );
}

export default SidebarEducation;
