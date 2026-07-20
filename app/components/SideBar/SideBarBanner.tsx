import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";

function SideBarBanner({ banner }: { banner: Items[] }) {
  return (
    <>
      {banner.length > 0 &&
        banner.map((ban) => (
          <div className="w-full" key={ban.id}>
            <Link target="_blank" href={ban.sourceLink ? ban.sourceLink : "#"}>
              <img
                className="w-full"
                src={mainDomain + ban.image}
                alt={ban.title}
              />
            </Link>
          </div>
        ))}
    </>
  );
}

export default SideBarBanner;
