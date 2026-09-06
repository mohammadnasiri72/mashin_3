"use client";

import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";

function SidebarNewsView({
  popularNews,
  newNews,
  banner,
  loading,
}: {
  popularNews: Items[];
  newNews: Items[];
  banner: Items[];
  loading: boolean;
}) {
  // نمایش لودینگ
  if (loading) {
    return (
      <section className="bg-gray-50">
        <div className="mx-auto pl-4 lg:pr-2 pr-4">
          <div className="space-y-6">
            {/* اسکلتون لودینگ */}
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
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
    <section className="bg-gray-50">
      <div className="mx-auto pl-4 lg:pr-2 pr-4">
        <div className="space-y-6">
          {/* بنرهای سایدبار */}
          <SideBarBanner banner={banner.filter((e) => e.categoryId === 6506)} />

          {/* جدیدترین اخبار */}
          {newNews.length > 0 && (
            <SideBarListItems itemsList={newNews} title={"جدیدترین اخبار"} />
          )}

          {/* محبوب‌ترین اخبار */}
          {popularNews.length > 0 && (
            <SideBarListItems
              itemsList={popularNews}
              title={"محبوب‌ترین اخبار"}
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

export default SidebarNewsView;
