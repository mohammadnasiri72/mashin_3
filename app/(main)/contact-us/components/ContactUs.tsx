"use client";

import MainBanner from "@/app/components/MainBanner";
import ContactUsForm from "./ContactUsForm";
import SideBarContact from "./SideBarContact";
import { useEffect, useRef, useState } from "react";

function ContactUs({
  banner,
  setting,
}: {
  banner: Items[];
  setting: SettingType[];
}) {
  const [isMainLonger, setIsMainLonger] = useState(true);

  const mainBoxRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // مقایسه ارتفاع باکس‌ها
  useEffect(() => {
    const checkHeights = () => {
      if (mainBoxRef.current && sidebarRef.current) {
        const mainHeight = mainBoxRef.current.offsetHeight;
        const sidebarHeight = sidebarRef.current.offsetHeight;
        setIsMainLonger(mainHeight > sidebarHeight);
      }
    };

    checkHeights();

    const timer = setTimeout(checkHeights, 500);
    window.addEventListener("resize", checkHeights);

    return () => {
      window.removeEventListener("resize", checkHeights);
      clearTimeout(timer);
    };
  }, []);

  const tel: string | undefined = setting.find(
    (e) => e.propertyKey === "site_tel",
  )?.propertyValue;
  const mobile: string | undefined = setting.find(
    (e) => e.propertyKey === "site_tel1",
  )?.propertyValue;
  const address: string | undefined = setting.find(
    (e) => e.propertyKey === "site_address1",
  )?.propertyValue;
  const map: string | undefined = setting.find(
    (e) => e.propertyKey === "site_map_script",
  )?.propertyValue;

  return (
    <>
      <div className="bg-gray-50 flex flex-wrap min-h-screen">
        {/* محتوای اصلی */}
        <div
          ref={mainBoxRef}
          className={`
            lg:w-3/4 w-full p-2 transition-all duration-300
            ${!isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
          `}
        >
          <ContactUsForm tel={tel} mobile={mobile} address={address} map={map} />
        </div>

        {/* سایدبار */}
        <aside
          ref={sidebarRef}
          className={`
            lg:w-1/4 w-full transition-all duration-300
            ${isMainLonger ? "lg:sticky lg:bottom-0 lg:self-end" : ""}
          `}
        >
          <SideBarContact banner={banner} />
        </aside>
      </div>

      <MainBanner banner={banner.filter((e) => e.categoryId === 6393)} />

      <style jsx global>{`
        /* دسکتاپ */
        @media (min-width: 1024px) {
          .lg\\:sticky {
            position: sticky !important;
            top: auto !important;
            bottom: 0 !important;
            align-self: flex-end !important;
          }
        }

        /* موبایل */
        @media (max-width: 1023px) {
          .lg\\:sticky {
            position: relative !important;
            bottom: auto !important;
            align-self: auto !important;
          }
        }
      `}</style>
    </>
  );
}

export default ContactUs;