import { getCategory } from "@/services/Category/Category";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { mainDomainOld } from "@/utils/mainDomain";
import CompareClient from "./components/CompareClient";
import { headers } from "next/headers";

function extractAfterSecondSlash(url: string) {
  // پیدا کردن دومین اسلش (با رد کردن اسلش‌های پروتکل مثل https://)
  const firstSlash = url.indexOf("/", url.indexOf("//") + 2);
  if (firstSlash === -1) return ""; // اگر اسلش دومی وجود نداشت

  // پیدا کردن علامت سوال
  const questionMark = url.indexOf("?", firstSlash);

  // اگر ? وجود داشت تا قبل از ?، وگرنه تا آخر رشته
  const result =
    questionMark !== -1
      ? url.substring(firstSlash + 1, questionMark)
      : url.substring(firstSlash + 1);

  return result;
}

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const ids = extractAfterSecondSlash(decodedPathname);
  const dataCompare: ItemsId[] = await getItemByIds(ids);
  const result = dataCompare
    .map((item) => `${item.sourceName} ${item.title}`)
    .join(" با ");

  if (result) {
    return {
      title: `مقایسه ${result}`,
      description: `بررسی و مقایسه ${result}`,
    };
  } else {
    const dataPage: ItemsId | null = await getItemByUrl("/compare");
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
        title: "مقایسه خودروهای بازار",
        description: "مقایسه خودروهای بازار",
      };
    }
  }
}

async function pageCompareDainamic({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const type = searchParam.type;
  const TypeId = type === "motor" ? 1052 : 1042;
  const ParentIdArray = type === "motor" ? 6059 : 6058;
  const ids = param.slug[0].replace("%2C", ",");

  const dataCompare: ItemsId[] = await getItemByIds(ids);

  const brandsCar: ItemsCategory[] = await getCategory({
    TypeId: TypeId,
    LangCode: "fa",
    ParentIdArray: ParentIdArray,

    PageIndex: 1,
    PageSize: 200,
  });

  return (
    <>
      <CompareClient
        brandsCar={brandsCar}
        dataCompare={dataCompare}
        ids={ids}
      />
    </>
  );
}

export default pageCompareDainamic;
