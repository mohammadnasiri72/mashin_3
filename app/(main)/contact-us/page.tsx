import React from "react";
import ContactUs from "./components/ContactUs";
import { getItem } from "@/services/Item/Item";
import { getSetting } from "@/services/Property/setting";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { mainDomainOld } from "@/utils/mainDomain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>; // تغییر این خط
}) {
  const param = await params;
  const slugArray = Array.isArray(param.slug) ? param.slug : [param.slug];
  const path = slugArray.length > 0 ? "/" + slugArray.join("/") : "/";
  const dataPage: ItemsId | null = await getItemByUrl(path);
  const seoUrl = `${mainDomainOld}${dataPage?.seoUrl}`;

  if (dataPage && dataPage.title) {
    return {
      title: `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`,
      description: dataPage.seoInfo?.seoDescription
        ? dataPage.seoInfo?.seoDescription
        : "تماس با ما",
      keywords: dataPage.seoInfo?.seoKeywords
        ? dataPage.seoInfo?.seoKeywords
        : dataPage.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`,
        description: dataPage.seoInfo?.seoDescription
          ? dataPage.seoInfo?.seoDescription
          : "تماس با ما",
      },
      other: {
        seoHeadTags: dataPage?.seoInfo?.seoHeadTags,
      },
    };
  } else {
    return {
      title: "ماشین3 - تماس با ما",
      description: "تماس با ما",
    };
  }
}

async function pageContactUs() {
  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });
  const setting: SettingType[] = await getSetting();
  return <ContactUs banner={banner} setting={setting} />;
}

export default pageContactUs;
