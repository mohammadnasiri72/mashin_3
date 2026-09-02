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
        {/* بنرهای سایدبار */}
        <SideBarBanner banner={banner.filter((e) => e.id === 2570)} />
        {/*اخبار فروش ویژه*/}
        <SideBarListItems itemsList={offerNews} title={"اخبار فروش ویژه"} />

        {/* محبوب‌ترین اخبار */}
        <SideBarListItems itemsList={popularNews} title={"محبوب‌ترین اخبار"} />

        {/* آمار بازار */}
        <MarketStats />
      </div>
    </>
  );
}

export default SideBarNews;
