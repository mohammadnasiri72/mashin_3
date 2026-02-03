import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";

function BannerTop({ banner }: { banner: Items[] }) {
  return (
    <>
      <div className="bannerTop_wrap my-8">
        <div className="mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banner.map((ban, index) => (
              <div
                key={ban.id}
                className="banner_box rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <Link href={ban.url || "#"}>
                  <img
                    src={mainDomainOld + ban.image}
                    alt={ban.title}
                    className="w-full aspect-10/2 object-cover rounded-2xl transition-transform hover:scale-105"
                    loading={index < 4 ? "eager" : "lazy"}
                    fetchPriority={index < 4 ? "high" : "auto"}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerTop;
