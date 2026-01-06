"use client";

import MarketStats from "@/app/components/MarketStats";
import { mainDomainOld } from "@/utils/mainDomain";

function SidebarAutoService({ banner }: { banner: Items[] }) {
  // اطلاعات تماس نمونه (در حالت واقعی از properties یا API میاد)

  return (
    <>
      <section className="py-6 bg-gray-50 px-2">
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
      </section>
    </>
  );
}

export default SidebarAutoService;
