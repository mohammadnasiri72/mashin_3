"use client";
import MarketStats from "@/app/components/SideBar/MarketStats";
import NewsBlogForm from "@/app/components/NewsBlogForm";
import { formatPersianDate, toPersianNumbers } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { FaCalendar, FaEye, FaPlay } from "react-icons/fa";
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
            {/*محبوب ترین فیلم های ماشین 3*/}
            <SideBarListItems
              itemsList={popularVideos}
              title={"محبوب ترین فیلم های ماشین 3"}
            />

            {/* بنرهای سایدبار */}
            <SideBarBanner banner={banner} />
          </div>
        </div>
      </section>
    </>
  );
}

export default SidebarVideo;
