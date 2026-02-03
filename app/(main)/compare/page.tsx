import { getItemByUrl } from "@/services/Item/ItemByUrl";
import SelectType from "./components/SelectType";
import { mainDomainOld } from "@/utils/mainDomain";

export async function generateMetadata() {
  const dataPage: ItemsId | null = await getItemByUrl("/compare");
  const seoUrl = `${mainDomainOld}${dataPage?.seoUrl}`;
  if (dataPage && dataPage.title) {
    return {
      title: `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`,
      description: dataPage.seoInfo?.seoDescription
        ? dataPage.seoInfo?.seoDescription
        : "مقایسه خودروهای بازار",
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
          : "مقایسه خودروهای بازار",
      },
      other: {
        seoHeadTags: dataPage?.seoInfo?.seoHeadTags,
      },
    };
  } else {
    return {
      title: "مقایسه خودروهای بازار",
      description: "مقایسه خودروهای بازار",
    };
  }
}

async function pageCompare() {
  return <SelectType />;
}

export default pageCompare;
