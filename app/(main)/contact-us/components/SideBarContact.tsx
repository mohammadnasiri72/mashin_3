import MarketStats from "@/app/components/MarketStats";
import NewsBlogForm from "@/app/components/NewsBlogForm";
import React from "react";

function SideBarContact() {
  return (
    <>
      <section className="py-8 bg-gray-50">
        <div className="mx-auto pl-4 lg:pr-2 pr-4">
          <div className="space-y-6">
            {/* آمار بازار */}
            <MarketStats />

            {/* خبرنامه */}
            <NewsBlogForm />
          </div>
        </div>
      </section>
    </>
  );
}

export default SideBarContact;
