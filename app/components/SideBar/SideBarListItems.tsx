import { formatPersianDate, toPersianNumbers } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import { FaCalendar, FaEye } from "react-icons/fa";

function SideBarListItems({
  itemsList,
  title,
}: {
  itemsList: Items[];
  title: string;
}) {
  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4! border-b pb-2">
          {title}
        </h3>
        <div className="space-y-4">
          {itemsList.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="block group"
            >
              <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#ce1a2a] hover:text-white! transition-colors">
                <div className="w-16 h-12 bg-gray-200 rounded shrink-0 overflow-hidden">
                  <img
                    src={mainDomainOld + item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm leading-tight group-hover:text-white! transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mt-2 group-hover:text-white!">
                    <div className="flex items-center gap-1">
                      <FaCalendar />
                      <span>{formatPersianDate(item.created)}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FaEye className="w-3 h-3" />
                      <span>{toPersianNumbers(item.visit)} بازدید</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default SideBarListItems;
