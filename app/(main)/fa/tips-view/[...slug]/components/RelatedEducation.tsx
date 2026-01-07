import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";
import { FaBook } from "react-icons/fa";

interface ItemsId {
  id: number;
  categoryTitle: string;
}

interface Items {
  id: number;
  title: string;
  image: string;
  url: string;
  visit: number;
  created: string;
  categoryTitle: string;
}

function RelatedEducation({
  relatedEducations,
}: {
  relatedEducations: Items[];
}) {
  // فیلتر مطالب مرتبط (همان دسته‌بندی)

  return (
    <>
      <Card className="rounded-xl shadow-lg">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaBook className="text-[#ce1a2a]" />
            مطالب مرتبط
          </h2>

          {relatedEducations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedEducations.map((related) => (
                <Link
                  key={related.id}
                  href={related.url}
                  className="block group"
                >
                  <div className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={mainDomainOld + related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-800 line-clamp-2 group-hover:text-[#ce1a2a] transition-colors text-sm leading-tight">
                        {related.title}
                      </h3>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>{related.visit} بازدید</span>
                        <span>
                          {new Date(related.created).toLocaleDateString(
                            "fa-IR"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📚</div>
              <p>مطلب مرتبطی یافت نشد</p>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

export default RelatedEducation;
