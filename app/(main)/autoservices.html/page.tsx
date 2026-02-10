import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { headers } from "next/headers";
import MainBoxAutoServices from "../autoservices/components/MainBoxAutoServices";
import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { mainDomainOld } from "@/utils/mainDomain";

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
      title: "مراکز و نمایندگی های خدمات خودرو | ماشین3",
      description: "مراکز و نمایندگی های خدمات خودرو",
    };
  }
}

async function pageAutoService({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page);
  const id = String(searchParam.id);

  const AutoServiceData: Items[] = await getItem({
    TypeId: 1050,
    langCode: "fa",
    PageIndex: page || 1,
    PageSize: 15,
  });
  const ids = AutoServiceData.map((item) => item.id).join(",");

  let propertyItems: ItemsId[] = [];
  if (ids) {
    propertyItems = await getItemByIds(ids);
  }

  const brands: ItemsCategory[] = await getCategory({
    TypeId: 1050,
    LangCode: "fa",
    PageSize: 50,
    PageIndex: 1,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const autoServiceCat: ItemsId | null = await getItemByUrl(decodedPathname);

  return (
    <>
      {autoServiceCat && (
        <BreadcrumbCategory
          breadcrumb={autoServiceCat.breadcrumb}
          title={autoServiceCat.title}
        />
      )}
      {autoServiceCat && (
        <MainBoxAutoServices
          AutoServiceData={AutoServiceData}
          brands={brands}
          id={id}
          propertyItems={propertyItems}
          banner={banner}
          title={autoServiceCat.title}
          summary={autoServiceCat.summary || ""}
        />
      )}
    </>
  );
}

export default pageAutoService;
