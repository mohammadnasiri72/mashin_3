"use client";

import MarketStats from "@/app/components/MarketStats";
import NewsBlogForm from "@/app/components/NewsBlogForm";

function SidebarAutoService() {
  // اطلاعات تماس نمونه (در حالت واقعی از properties یا API میاد)

  return (
    <>
      <section className="py-6 bg-gray-50 px-2">
        <div className="space-y-6">
          {/* آمار بازار */}
          <MarketStats />

          {/* خبرنامه */}
          <NewsBlogForm />
        </div>
      </section>
    </>
  );
}

export default SidebarAutoService;
