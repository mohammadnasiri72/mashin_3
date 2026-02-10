import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getItem } from "@/services/Item/Item";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import WhichCars from "./components/WhichCars";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const whichCarsCat: ItemsId | null = await getItemByUrl(decodedPathname);

  const seoUrl = `${mainDomainOld}${whichCarsCat?.seoUrl}`;

  if (whichCarsCat && whichCarsCat.title) {
    return {
      title: `${whichCarsCat.seoInfo?.seoTitle ? whichCarsCat?.seoInfo?.seoTitle : whichCarsCat.title + " | ماشین3"}`,
      description: whichCarsCat.seoInfo?.seoDescription
        ? whichCarsCat.seoInfo?.seoDescription
        : "مقایسه تخصصی خودروها برای کمک به انتخاب بهترین گزینه خرید",
      keywords: whichCarsCat.seoInfo?.seoKeywords
        ? whichCarsCat.seoInfo?.seoKeywords
        : whichCarsCat.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${whichCarsCat.seoInfo?.seoTitle ? whichCarsCat?.seoInfo?.seoTitle : whichCarsCat.title + " | ماشین3"}`,
        description: whichCarsCat.seoInfo?.seoDescription
          ? whichCarsCat.seoInfo?.seoDescription
          : "مقایسه تخصصی خودروها برای کمک به انتخاب بهترین گزینه خرید",
      },
      other: {
        seoHeadTags: whichCarsCat?.seoInfo?.seoHeadTags,
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
  const page = Number(searchParam.page);
  const term = String(searchParam.term);

  const whichCars: Items[] = await getItem({
    TypeId: 1045,
    langCode: "fa",
    PageIndex: page || 1,
    ...(term && term !== "undefined" && { Term: term }),
    PageSize: 15,
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
    CategoryIdArray: "6415",
  });

  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const whichCarsCat: ItemsId | null = await getItemByUrl(decodedPathname);

  return (
    <>
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
      />
    </>
  );
}

export default pageWhichCars;
