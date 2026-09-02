"use client";

import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";
import { getItem } from "@/services/Item/Item";
import { useEffect, useState } from "react";

interface SidebarEducationProps {
  currentEducationId?: number;
  categoryId?: number;
}

function SidebarEducation({
  currentEducationId,
  categoryId,
}: SidebarEducationProps) {
  const [popularEducations, setPopularEducations] = useState<Items[]>([]);
  const [banner, setBanner] = useState<Items[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        setLoading(true);

        // دریافت محبوب‌ترین مطالب آموزشی (همون درخواست اول)
        const popularData = await getItem({
          TypeId: 3,
          langCode: "fa",
          CategoryIdArray: String(categoryId || ""),
          PageIndex: 1,
          PageSize: 10,
          OrderBy: 8,
        });

        // دریافت بنرها (همون درخواست دوم)
        const bannerData = await getItem({
          TypeId: 1051,
          langCode: "fa",
          CategoryIdArray: "6415",
          FullData: false,
        });

        // فیلتر کردن آیتم فعلی از لیست محبوب‌ها
        setPopularEducations(
          popularData.filter((e: Items) => e.id !== currentEducationId),
        );
        setBanner(bannerData);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };

    // فقط در صورتی که categoryId وجود داشته باشه درخواست بزن
    if (categoryId) {
      fetchSidebarData();
    }
  }, [categoryId, currentEducationId]);

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
          {banner.filter((e) => e.id === 2570).length > 0 && (
            <SideBarBanner banner={banner.filter((e) => e.id === 2570)} />
          )}

          {/* محبوب‌ترین مطالب آموزشی */}
          {popularEducations.length > 0 && (
            <SideBarListItems
              itemsList={popularEducations}
              title={"محبوب ترین مطالب آموزشی"}
            />
          )}

          {/* آمار بازار */}
          <MarketStats />
        </div>
      </div>
    </section>
  );
}

export default SidebarEducation;
