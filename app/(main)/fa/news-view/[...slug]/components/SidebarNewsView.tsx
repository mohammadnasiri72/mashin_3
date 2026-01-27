import MarketStats from "@/app/components/MarketStats";
import NewsBlogForm from "@/app/components/NewsBlogForm";
import { formatPersianDate, toPersianNumbers } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { FaCalendar, FaEye } from "react-icons/fa";

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
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4! border-b pb-2">
                محبوب‌ترین اخبار
              </h3>
              <div className="space-y-4">
                {popularNews.map((news) => (
                  <Link key={news.id} href={news.url} className="block group">
                    <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#ce1a2a] hover:text-white! transition-colors">
                      <div className="w-16 h-12 bg-gray-200 rounded shrink-0 overflow-hidden">
                        <img
                          src={mainDomainOld + news.image}
                          alt={news.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight group-hover:text-white! transition-colors line-clamp-2">
                          {news.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700 mt-2 group-hover:text-white!">
                          <div className="flex items-center gap-1">
                            <FaCalendar />
                            <span>{formatPersianDate(news.created)}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <FaEye className="w-3 h-3" />
                            <span>{toPersianNumbers(news.visit)} بازدید</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            {banner.length > 0 &&
              banner.map((ban) => (
                <div className="w-full" key={ban.id}>
                  <img
                    className="w-full"
                    src={mainDomainOld + ban.image}
                    alt={ban.title}
                  />
                </div>
              ))}
            {/* آمار بازار */}
            <MarketStats />
          </div>
        </div>
      </section>
    </>
  );
}

export default SidebarNewsView;
