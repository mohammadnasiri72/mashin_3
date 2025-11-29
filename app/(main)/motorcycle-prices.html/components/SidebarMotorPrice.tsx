"use client";
import MarketStats from "@/app/components/MarketStats";
import NewsBlogForm from "@/app/components/NewsBlogForm";

function SidebarMotorPrice() {
  return (
    <>
      <section className="px-2">
        <div className="mx-auto">
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

export default SidebarMotorPrice;
