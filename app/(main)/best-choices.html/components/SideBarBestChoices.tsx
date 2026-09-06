import MarketStats from "@/app/components/SideBar/MarketStats";
import SideBarBanner from "@/app/components/SideBar/SideBarBanner";
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";

function SideBarBestChoices({
  popularBestChoices,
  banner,
  lastNews,
  lastCars,
}: {
  popularBestChoices: Items[];
  banner: Items[];
  lastNews: Items[];
  lastCars: Items[];
}) {
  return (
    <>
      <div className="space-y-6">
        {/* بنرهای سایدبار */}
       <SideBarBanner banner={banner.filter((e) => e.categoryId === 6506)} />
        {/* بهترین خودروها از نگاه کاربران*/}
        <SideBarListItems
          itemsList={popularBestChoices}
          title={"بهترین خودروها از نگاه کاربران"}
        />
         {/* بنرهای سایدبار */}
         
          <SideBarBanner banner={banner.filter((e) => e.categoryId === 6415)} />

        {/* آمار بازار */}
        <MarketStats />

        {/* جدیدترین اخبار */}
        <SideBarListItems itemsList={lastNews} title={"جدیدترین اخبار خودرو"} />

        {/* جدیدترین خودروها */}
        <SideBarListItems
          itemsList={lastCars}
          title={"جدیدترین خودروها"}
          type={"car"}
        />
      </div>
    </>
  );
}

export default SideBarBestChoices;
