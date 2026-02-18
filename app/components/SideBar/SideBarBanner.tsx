import { mainDomainOld } from "@/utils/mainDomain";
import Link from "next/link";
import React from "react";

function SideBarBanner({ banner }: { banner: Items[] }) {
  return (
    <>
      {banner.length > 0 &&
        banner.map((ban) => (
          <div className="w-full" key={ban.id}>
            <Link href={ban.url ? ban.url : "#"}>
              <img
                className="w-full"
                src={mainDomainOld + ban.image}
                alt={ban.title}
              />
            </Link>
          </div>
        ))}
    </>
  );
}

export default SideBarBanner;
