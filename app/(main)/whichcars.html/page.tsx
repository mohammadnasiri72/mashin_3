import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getItem } from "@/services/Item/Item";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import WhichCars from "./components/WhichCars";
import { JsonLd } from "@/app/components/JsonLd";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const dataPage: ItemsId |ItemsCategoryId| null = await getItemByUrl(decodedPathname);


  if (dataPage && dataPage.title) {
    const title = `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`;
    const description = dataPage.seoInfo?.seoDescription
      ? dataPage.seoInfo?.seoDescription
      : dataPage.title;
    const keywords = dataPage.seoInfo?.seoKeywords
      ? dataPage.seoInfo?.seoKeywords
      : dataPage.seoKeywords;
    const metadataBase = new URL(mainDomainOld);
   const seoUrl = dataPage?.url
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
      title: "ماشین3 - مقایسه خودرو",
      description: "مقایسه تخصصی خودروها برای کمک به انتخاب بهترین گزینه خرید",
    };
  }
}

async function pageWhichCars({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page) || 1;
  const term = String(searchParam.term);

  const whichCars: Items[] = await getItem({
    TypeId: 1045,
    langCode: "fa",
     PageIndex: page,
    ...(term && term !== "undefined" && { Term: term }),
    PageSize: 15,
    FullData:false,
  });
  const popularComparisons: Items[] = await getItem({
    TypeId: 1045,
    langCode: "fa",
    PageSize: 15,
    PageIndex: 1,
    OrderBy: 8,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    FullData: false,
  });

  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const whichCarsCat: ItemsId |ItemsCategoryId| null = await getItemByUrl(decodedPathname);

  const schemas = whichCarsCat?.seoInfo?.schemas || [];

  return (
    <>
    <JsonLd schemas={schemas} />
      {whichCarsCat && (
        <BreadcrumbCategory
          breadcrumb={whichCarsCat.breadcrumb}
          title={whichCarsCat.title}
        />
      )}
      <WhichCars
        whichCars={whichCars}
        popularComparisons={popularComparisons}
        banner={banner}
        whichCarsCat={whichCarsCat}
        curentPage={page}
      />
    </>
  );
}

export default pageWhichCars;
