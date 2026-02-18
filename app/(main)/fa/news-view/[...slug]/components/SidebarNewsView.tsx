import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";

function SidebarNewsView({
  popularNews,
  banner,
}: {
  popularNews: Items[];
  banner: Items[];
}) {
  return (
    <>
      <section className="py-8 bg-gray-50">
        <div className="mx-auto pl-4 lg:pr-2 pr-4">
          <div className="space-y-6">
            {/* محبوب‌ترین اخبار */}
            <SideBarListItems
              itemsList={popularNews}
              title={"محبوب‌ترین اخبار"}
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

export default SidebarNewsView;
