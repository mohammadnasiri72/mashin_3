"use client";

import SideBarBanner from "@/app/components/SideBar/SideBarBanner";

function SideBarDic({ banner }: { banner: Items[] }) {
  return (
    <>
      <div className="space-y-6">
        {/* بنرهای سایدبار */}
        <SideBarBanner banner={banner.filter((e) => e.id === 2570)} />

        {/* آمار بازار */}
        {/* <MarketStats /> */}
      </div>
    </>
  );
}

export default SideBarDic;
