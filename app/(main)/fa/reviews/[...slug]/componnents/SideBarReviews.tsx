import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";

function SideBarReviews({
  banner,
  lastNews,
}: {
  banner: Items[];
  lastNews: Items[];
}) {
  return (
    <>
      <div className="space-y-6">
        {/* بنرهای سایدبار */}
        <SideBarBanner banner={banner} />

        {/* آمار بازار */}
        <MarketStats />

        {/* جدیدترین اخبار */}
        <SideBarListItems itemsList={lastNews} title={"جدیدترین اخبار خودرو"} />
      </div>
    </>
  );
}

export default SideBarReviews;
