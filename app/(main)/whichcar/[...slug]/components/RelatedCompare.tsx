import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";

function RelatedCompare({
  ralatedComparisons,
}: {
  ralatedComparisons: Items[];
}) {
  return (
    <Card className="rounded-xl shadow-lg">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-3!">
          مقایسه‌های مرتبط
        </h2>

        {ralatedComparisons.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ralatedComparisons.map((compare) => (
              <Link key={compare.id} href={compare.url} className="block group">
                <div className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-300">
                  <div className="aspect-video relative">
                    <img
                      src={mainDomainOld + compare.image}
                      alt={compare.title}
                      className="w-full h-full object-cover group-hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800 line-clamp-2 group-hover:text-[#ce1a2a]! transition-colors h-10">
                      {compare.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{compare.visit} بازدید</span>
                      <span>
                        {new Date(compare.created).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>ویدئوی مرتبطی یافت نشد</p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default RelatedCompare;
