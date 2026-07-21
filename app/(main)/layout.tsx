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
  
    const menu: MenuGroup[] = await getMenu({ langCode: "fa", menuKey: "" });
    const setting: SettingType[] = await getSetting();
    const Social: Items[] = await getItem({ TypeId: 8, langCode: "fa" , FullData: true,});
    
    const banner: Items[] = await getItem({
      TypeId: 1051,
      langCode: "fa",
      CategoryIdArray: "6390",
       FullData: true,
    });
    
  
    return (
      <>
        <Header menu={menu} setting={setting} />
        {!decodedPathname.includes("/dashboard") && (
          <section aria-label="بنرهای تبلیغاتی">
            <BannerTop banner={banner} />
          </section>
        )}
        <main role="main">{children}</main>
        <Footer menu={menu} setting={setting} Social={Social} />
      </>
    );
  }
   catch (error: any) {
      // استخراج status code از خطا
      const status = error.response?.status || error.status || 500;
  
      // ریدایرکت مستقیم به صفحه خطا
      // redirect(`/error?status=${status}`);
      return notFound()
    }
}
