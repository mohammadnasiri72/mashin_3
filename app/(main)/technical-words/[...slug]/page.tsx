import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";
import { mainDomainOld } from "@/utils/mainDomain";
import React from "react";
import CardDic from "../../fa/technical-words.html/components/CardDic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);
  const dataPage: ItemsCategoryId = await getCategoryId(id);

  if (dataPage.title) {
    const title = `${dataPage?.seoTitle ? dataPage?.seoTitle : dataPage.title + " | ماشین3"}`;
    const description = dataPage?.seoDescription
      ? dataPage?.seoDescription
      : dataPage.title;
    const keywords = dataPage?.seoKeywords;

    const metadataBase = new URL(mainDomainOld);
    const seoUrl = dataPage?.seoUrl
      ? `${mainDomainOld}${dataPage?.seoUrl}`
      : dataPage?.url
        ? `${mainDomainOld}${dataPage?.url}`
        : `${mainDomainOld}`;

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
    };
  } else {
    return {
      title: "ماشین3 - واژگان فنی",
      description: "واژگان فنی",
    };
  }
}

async function pageTechnicalWords({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = Number(param.slug[0]);
  const dataPage: ItemsCategoryId = await getCategoryId(id);

  const page = Number(searchParam.page);
  const term = String(searchParam.term);

  const dic: Items[] = await getItem({
    TypeId: 1046,
    langCode: "fa",
    ...(id && !isNaN(id) && { CategoryIdArray: String(id) }),
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
