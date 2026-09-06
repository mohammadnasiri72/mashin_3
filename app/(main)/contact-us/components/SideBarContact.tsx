"use client";

import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";

function SideBarContact({ banner }: { banner: Items[] }) {
  return (
    <>
      <section className="py-8 bg-gray-50">
        <div className="mx-auto pl-4 lg:pr-2 pr-4">
          <div className="space-y-6">
            <SideBarBanner
              banner={banner.filter((e) => e.categoryId === 6506)}
            />
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

export default SideBarContact;
