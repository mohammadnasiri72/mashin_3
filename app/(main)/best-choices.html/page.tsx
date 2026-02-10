import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getItem } from "@/services/Item/Item";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import MainBoxBestChoices from "./components/MainBoxBestChoices";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const bestCat: ItemsId | null = await getItemByUrl(decodedPathname);

  const seoUrl = `${mainDomainOld}${bestCat?.seoUrl}`;

  if (bestCat && bestCat.title) {
    return {
      title: `${bestCat.seoInfo?.seoTitle ? bestCat?.seoInfo?.seoTitle : bestCat.title + " | ماشین3"}`,
      description: bestCat.seoInfo?.seoDescription
        ? bestCat.seoInfo?.seoDescription
        : "بهترین انتخاب",
      keywords: bestCat.seoInfo?.seoKeywords
        ? bestCat.seoInfo?.seoKeywords
        : bestCat.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${bestCat.seoInfo?.seoTitle ? bestCat?.seoInfo?.seoTitle : bestCat.title + " | ماشین3"}`,
        description: bestCat.seoInfo?.seoDescription
          ? bestCat.seoInfo?.seoDescription
          : "بهترین انتخاب",
      },
      other: {
        seoHeadTags: bestCat?.seoInfo?.seoHeadTags,
      },
    };
  } else {
    return {
      title: "بهترین انتخاب | ماشین3",
      description: "بهترین انتخاب",
    };
  }
}

async function pageBestChoices({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page);
  const term = String(searchParam.term);

  const bestChoices: Items[] = await getItem({
    TypeId: 1043,
    langCode: "fa",
    PageIndex: page || 1,
    ...(term && term !== "undefined" && { Term: term }),
    PageSize: 15,
  });
  const popularBestChoices: Items[] = await getItem({
    TypeId: 1043,
    langCode: "fa",
    PageSize: 5,
    PageIndex: 1,
    OrderBy: 8,
  });
  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const bestCat: ItemsId | null = await getItemByUrl(decodedPathname);


  return (
    <>
      {bestCat && (
        <BreadcrumbCategory
          breadcrumb={bestCat.breadcrumb}
          title={bestCat.title}
        />
      )}

      {bestCat && (
        <MainBoxBestChoices
          title={bestCat.title}
          summary={bestCat.summary}
          bestChoices={bestChoices}
          banner={banner}
          popularBestChoices={popularBestChoices}
        />
      )}
    </>
  );
}

export default pageBestChoices;
