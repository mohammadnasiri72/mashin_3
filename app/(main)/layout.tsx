import { getItem } from "@/services/Item/Item";
import { getMenu } from "@/services/Menu/Menu";
import { getSetting } from "@/services/Property/setting";
import BannerTop from "../components/BannerTop";
import Header from "../components/Header";
import { headers } from "next/headers";
import Footer from "../components/Footer";
import { notFound, redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try{

    const headersList = await headers();
    const pathname = headersList.get("x-pathname");
    const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  
    const [menu, setting, Social, banner]: [
      MenuGroup[],
      SettingType[],
      Items[],
      Items[],
    ] = await Promise.all([
      getMenu({ langCode: "fa", menuKey: "" }),
      getSetting(),
      getItem({ TypeId: 8, langCode: "fa", FullData: false }),
      getItem({
        TypeId: 1051,
        langCode: "fa",
        CategoryIdArray: "6390",
        FullData: false,
      }),
    ]);
    
  
    return (
      <>
        <Header menu={menu} setting={setting} />
        {!decodedPathname.includes("/dashboard") && (
          <section aria-label="بنرهای تبلیغاتی" className="bg-[#1a1a1a]">
            <BannerTop banner={banner} />
          </section>
        )}
        <main role="main">{children}</main>
        <Footer menu={menu} setting={setting} Social={Social} />
      </>
    );
  }
   catch (error: any) {
      return notFound()
    }
}
