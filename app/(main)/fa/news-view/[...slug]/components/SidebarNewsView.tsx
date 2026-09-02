"use client";

import { useEffect, useState } from "react";
import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";
import { getItem } from "@/services/Item/Item";

function SidebarNewsView() {
  const [popularNews, setPopularNews] = useState<Items[]>([]);
  const [newNews, setNewNews] = useState<Items[]>([]);
  const [banner, setBanner] = useState<Items[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        setLoading(true);
        
        // دریافت محبوب‌ترین اخبار
        const popularData = await getItem({
          TypeId: 5,
          langCode: "fa",
          OrderBy: 8,
          PageIndex: 1,
          PageSize: 5,
        });

        // دریافت جدیدترین اخبار
        const newNewsData = await getItem({
          TypeId: 5,
          langCode: "fa",
          PageIndex: 1,
          PageSize: 5,
        });

        // دریافت بنرها
        const bannerData = await getItem({
          TypeId: 1051,
          langCode: "fa",
          CategoryIdArray: "6415",
          FullData: true,
        });

        setPopularNews(popularData);
        setNewNews(newNewsData);
        setBanner(bannerData);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarData();
  }, []);

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
          {banner.filter((e) => e.id === 2570).length > 0 && <SideBarBanner banner={banner.filter((e) => e.id === 2570)} />}

          {/* جدیدترین اخبار */}
          {newNews.length > 0 && (
            <SideBarListItems
              itemsList={newNews}
              title={"جدیدترین اخبار"}
            />
          )}
          
          {/* محبوب‌ترین اخبار */}
          {popularNews.length > 0 && (
            <SideBarListItems
              itemsList={popularNews}
              title={"محبوب‌ترین اخبار"}
            />
          )}

        
          {/* آمار بازار */}
          <MarketStats />
        </div>
      </div>
    </section>
  );
}

export default SidebarNewsView;