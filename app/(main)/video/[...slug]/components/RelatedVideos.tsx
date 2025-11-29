import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";

function RelatedVideos({ video, videos }: { video: ItemsId; videos: Items[] }) {
  return (
    <Card className="rounded-xl shadow-lg">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">ویدئوهای مرتبط</h2>

        {videos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {videos.map((relatedVideo) => (
              <Link
                key={relatedVideo.id}
                href={relatedVideo.url}
                className="block group"
              >
                <div className="bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={mainDomainOld + relatedVideo.image}
                      alt={relatedVideo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/50! text-white! p-2 rounded-full text-xs">
                      <FaPlay />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800 line-clamp-2 group-hover:text-[#ce1a2a] transition-colors">
                      {relatedVideo.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                      <span>{relatedVideo.visit} بازدید</span>
                      <span>
                        {new Date(relatedVideo.created).toLocaleDateString(
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
            <p>ویدئوی مرتبطی یافت نشد</p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default RelatedVideos;
