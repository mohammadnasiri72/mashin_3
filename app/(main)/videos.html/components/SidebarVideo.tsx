"use client";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";

function SidebarVideo({
  popularVideos,
  banner,
}: {
  popularVideos: Items[];
  banner: Items[];
}) {
  return (
    <>
      <section className="px-2">
        <div className="mx-auto">
          <div className="space-y-6">
            {/* بنرهای سایدبار */}
            <SideBarBanner banner={banner} />

            {/* محبوب‌ترین اخبار */}
            <SideBarListItems
              itemsList={popularVideos}
              title={"محبوب ترین فیلم های ماشین 3"}
            />

            {/* آمار بازار */}
            {/* <MarketStats /> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default SidebarVideo;
