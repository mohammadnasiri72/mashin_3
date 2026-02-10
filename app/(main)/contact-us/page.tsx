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

  if (dataPage && dataPage.title) {
    const title = `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`;
    const description = dataPage.seoInfo?.seoDescription
      ? dataPage.seoInfo?.seoDescription
      : dataPage.title;
    const keywords = dataPage.seoInfo?.seoKeywords
      ? dataPage.seoInfo?.seoKeywords
      : dataPage.seoKeywords;
    const metadataBase = new URL(mainDomainOld);
    const seoUrl = dataPage?.seoUrl
      ? `${mainDomainOld}${dataPage?.seoUrl}`
      : dataPage?.url
        ? `${mainDomainOld}${dataPage?.url}`
        : `${mainDomainOld}`;
    const seoHeadTags = dataPage?.seoInfo?.seoHeadTags;
    return {
      title,
      description,
      keywords,
      metadataBase,
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title,
        description,
      },
      other: {
        seoHeadTags,
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
