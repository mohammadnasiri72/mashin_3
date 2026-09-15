import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";

function MainBanner({ banner }: { banner: Items[] }) {
  return (
    <div className="">
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
    </div>
  );
}

export default MainBanner;
