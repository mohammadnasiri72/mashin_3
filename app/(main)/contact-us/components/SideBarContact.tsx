"use client";

import MarketStats from "@/app/components/SideBar/MarketStats";
import { mainDomainOld } from "@/utils/mainDomain";

function SideBarContact({ banner }: { banner: Items[] }) {
  return (
    <>
      <section className="py-8 bg-gray-50">
        <div className="mx-auto pl-4 lg:pr-2 pr-4">
          <div className="space-y-6">
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

export default SideBarContact;
