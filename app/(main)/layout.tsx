import { getItem } from "@/services/Item/Item";
import { getMenu } from "@/services/Menu/Menu";
import { getSetting } from "@/services/Property/setting";
import BannerTop from "../components/BannerTop";
import Footer from "../components/Footer";
import Header from "../components/Header";



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu: MenuGroup[] = await getMenu({ langCode: "fa", menuKey: "" });
  const setting: SettingType[] = await getSetting();
  const Social: Items[] = await getItem({ TypeId: 8, langCode: "fa" });
  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6390",
  });

  return (
    <>
      <Header menu={menu} setting={setting} />
      <BannerTop banner={banner} />
      <main>{children}</main>
      <Footer menu={menu} setting={setting} Social={Social} />
    </>
  );
}
