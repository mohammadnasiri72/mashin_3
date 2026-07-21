import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { mainDomainOld } from "@/utils/mainDomain";
import MainBoxAutoServices from "../components/MainBoxAutoServices";
import { headers } from "next/headers";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { notFound } from "next/navigation";

export async function generateMetadata() {
   const headersList = await headers();
    const pathname = headersList.get("x-pathname");
    const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
    const dataPage: ItemsId | ItemsCategoryId | null =
      await getItemByUrl(decodedPathname);






  if (dataPage&& dataPage.title) {
    const title = `${
      dataPage.seoTitle ? dataPage.seoTitle : dataPage.title + " | ماشین3"
    }`;

    const description = dataPage.seoDescription
      ? dataPage.seoDescription
      : dataPage.title;

    const keywords = dataPage?.seoKeywords;

    const metadataBase = new URL(mainDomainOld);

    const seoUrl = dataPage?.seoUrl
      ? `${mainDomainOld}${dataPage?.seoUrl}`
      : dataPage?.url
        ? `${mainDomainOld}${dataPage?.url}`
        : `${mainDomainOld}`;

    const seoHeadTags = dataPage?.headTags;

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

async function pageAutoServiceDetails({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
   const headersList = await headers();
    const pathname = headersList.get("x-pathname");
    const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
    const autoServiceCat: ItemsId | ItemsCategoryId | null =
      await getItemByUrl(decodedPathname);

 if (!autoServiceCat) {
    return notFound();
  }
  const id = String(autoServiceCat.id);

  const searchParam = await searchParams;
  const page = Number(searchParam.page);
  const provinceId = Number(searchParam.provinceid);

  const AutoServiceData: Items[] = await getItem({
    TypeId: 1050,
    langCode: "fa",
    PageIndex: page || 1,
    ...(provinceId && { FilterProps: `23207=${provinceId}` }),
    CategoryIdArray: id,
    PageSize: 15,
  });
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
    FullData: true,
  });
  const ids = AutoServiceData.map((item) => item.id).join(",");
  let propertyItems: ItemsId[] = [];
  if (ids) {
    propertyItems = await getItemByIds(ids);
  }


  const lastNews: Items[] = await getItem({
    TypeId: 5,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 7,
  });
  const lastCars: Items[] = await getItem({
    TypeId: 1042,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 7,
  });

  const provinces: Items[] = await getItem({
    TypeId: 1055,
    langCode: "fa",
    CategoryIdArray: "10190",
    PageIndex: 1,
    PageSize: 100,
  });

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
        lastNews={lastNews}
        lastCars={lastCars}
        provinces={[...provinces].sort((a, b) =>
          a.title.localeCompare(b.title, "fa"),
        )}
      />
    </>
  );
}

export default pageAutoServiceDetails;
