import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";

function SideBarNews({
  banner,
  offerNews,
  popularNews,
}: {
  banner: Items[];
  offerNews: Items[];
  popularNews: Items[];
}) {
  return (
    <>
      <div className="space-y-6">
        {/*اخبار فروش ویژه*/}
        <SideBarListItems itemsList={offerNews} title={"اخبار فروش ویژه"} />

        {/* محبوب‌ترین اخبار */}
        <SideBarListItems itemsList={popularNews} title={"محبوب‌ترین اخبار"} />

        {/* بنرهای سایدبار */}
        <SideBarBanner banner={banner} />

        {/* آمار بازار */}
        <MarketStats />
      </div>
    </>
  );
}

export default SideBarNews;
