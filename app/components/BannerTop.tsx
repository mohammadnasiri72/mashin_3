import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

function BannerTop({ banner }: { banner: Items[] }) {
  return (
    <div className="bannerTop_wrap my-8">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banner.map((ban, index) => (
            <figure key={ban.id} className="banner_box rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow m-0 relative aspect-[10/2]">
              <Link href={ban.url || "#"} className="block relative w-full h-full">
                <OptimizedImage
                  src={mainDomainOld + ban.image}
                  alt={ban.title}
                  className="object-cover rounded-2xl transition-transform hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </Link>
              <figcaption className="sr-only">{ban.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BannerTop;
