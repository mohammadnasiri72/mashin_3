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

  const autoServiceCat: ItemsId = await getItemByUrl(decodedPathname);
  const seoUrl = `${mainDomainOld}${autoServiceCat?.seoUrl}`;

  if (autoServiceCat.title) {
    return {
      title: `${autoServiceCat.seoInfo?.seoTitle ? autoServiceCat?.seoInfo?.seoTitle : autoServiceCat.title + " | ماشین3"}`,
      description: autoServiceCat.seoInfo?.seoDescription,
      keywords: autoServiceCat.seoInfo?.seoKeywords
        ? autoServiceCat.seoInfo?.seoKeywords
        : autoServiceCat.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${autoServiceCat.seoInfo?.seoTitle ? autoServiceCat?.seoInfo?.seoTitle : autoServiceCat.title + " | ماشین3"}`,
        description: autoServiceCat.seoInfo?.seoDescription,
      },
      other: {
        seoHeadTags: autoServiceCat?.seoInfo?.seoHeadTags,
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

  const autoServiceCat: ItemsId = await getItemByUrl(decodedPathname);

  return (
    <>
      <BreadcrumbCategory
        breadcrumb={autoServiceCat.breadcrumb}
        title={autoServiceCat.title}
      />
      <MainBoxAutoServices
        AutoServiceData={AutoServiceData}
        brands={brands}
        id={id}
        propertyItems={propertyItems}
        banner={banner}
        title={autoServiceCat.title}
        summary={autoServiceCat.summary || ""}
      />
    </>
  );
}

export default pageAutoService;
