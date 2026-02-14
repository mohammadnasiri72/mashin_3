import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import CardDic from "./components/CardDic";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const dataPage: ItemsId | null = await getItemByUrl(decodedPathname);

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
      title: "ماشین3 -  واژگان فنی",
      description: "واژگان فنی",
    };
  }
}

async function pageTechnicalWords({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const dataPage: ItemsId | null = await getItemByUrl(decodedPathname);

  const page = Number(searchParam.page);
  const term = String(searchParam.term);

  const dic: Items[] = await getItem({
    TypeId: 1046,
    langCode: "fa",
    ...(term && term !== "undefined" && { Term: term }),
    PageIndex: page && !isNaN(page) ? page : 1,
    PageSize: 20,
  });

  const dicCat: ItemsCategory[] = await getCategory({
    TypeId: 1046,
    LangCode: "fa",
    PageIndex: 1,
    PageSize: 50,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  const tabs = [
    {
      key: 0,
      href: "/fa/technical-words.html",
      label: "همه واژگان فنی",
    },
  ];

  // تب‌های داینامیک از داده API
  if (dicCat.length > 0) {
    dicCat.forEach((item) => {
      tabs.push({
        key: item.id,
        href: item.url,
        label: item.title,
      });
    });
  }

  return (
    <>
      {dataPage?.breadcrumb && (
        <BreadcrumbCategory
          breadcrumb={dataPage.breadcrumb}
          title={dataPage.title}
        />
      )}
      <CardDic
        title={dataPage?.title ? dataPage?.title : "واژگان فنی"}
        summary={dataPage?.summary ? dataPage.summary : ""}
        tabConfig={tabs}
        dic={dic}
        banner={banner}
      />
    </>
  );
}

export default pageTechnicalWords;
