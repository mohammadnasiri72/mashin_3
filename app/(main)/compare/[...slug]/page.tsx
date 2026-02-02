import { getCategory } from "@/services/Category/Category";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { mainDomainOld } from "@/utils/mainDomain";
import CompareClient from "./components/CompareClient";

export async function generateMetadata() {
  const dataPage: ItemsId = await getItemByUrl("/compare");
  const seoUrl = `${mainDomainOld}${dataPage?.seoUrl}`;
  if (dataPage.title) {
    return {
      title: `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`,
      description: dataPage.seoInfo?.seoDescription,
      keywords: dataPage.seoInfo?.seoKeywords
        ? dataPage.seoInfo?.seoKeywords
        : dataPage.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`,
        description: dataPage.seoInfo?.seoDescription,
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
