import { getItem } from "@/services/Item/Item";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getItemId } from "@/services/Item/ItemId";
import CompareCars from "./components/CompareCars";
import { getComment } from "@/services/Comment/Comment";
import { mainDomainOld } from "@/utils/mainDomain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);
  const dataPage: ItemsId = await getItemId(id);
  // const seoUrl = `${mainDomainOld}${whichcars?.seoUrl}`;

  if (dataPage.title) {
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
      title: "ماشین3 - مقایسه خودرو",
      description: "مقایسه تخصصی خودروها برای کمک به انتخاب بهترین گزینه خرید",
    };
  }
}

async function pageWhichcarsDainamic({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = Number(param.slug[0]);
  const page = Number(searchParam.page);
  const term = String(searchParam.term);
  if (String(id) === "NaN") {
    return <>موجود نیست</>;
  }

  const whichcars: ItemsId = await getItemId(id);
  const ids = whichcars.properties.find((w) => w.propertyId === 22664)?.value;

  let dataCompare: ItemsId[] = [];
  if (ids) {
    dataCompare = await getItemByIds(String(ids));
  }

  const popularComparisons: Items[] = await getItem({
    TypeId: 1045,
    langCode: "fa",
    PageSize: 5,
    PageIndex: 1,
    OrderBy: 8,
  });
  const ralatedComparisons: Items[] = await getItem({
    TypeId: 1045,
    langCode: "fa",
    PageSize: 17,
    PageIndex: 1,
    CategoryIdArray: String(whichcars.categoryId),
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  const comments: CommentResponse[] = await getComment({
    id: Number(id),
    langCode: "fa",
    type: 0,
    pageSize: 20,
    pageIndex: 1,
  });

  const id1 = Number(
    dataCompare[0].properties.find((e) => e.propertyKey === "p1044_relatedcar")
      ?.propertyValue,
  );
  const id2 = Number(
    dataCompare[1].properties.find((e) => e.propertyKey === "p1044_relatedcar")
      ?.propertyValue,
  );

  return (
    <>
      <CompareCars
        whichcars={whichcars}
        dataCompare={dataCompare}
        popularComparisons={popularComparisons}
        ralatedComparisons={ralatedComparisons
          .filter((e) => e.id !== id)
          .slice(0, 16)}
        comments={comments}
        id={Number(id)}
        id1={id1}
        id2={id2}
        banner={banner}
      />
    </>
  );
}

export default pageWhichcarsDainamic;
