import { getItem } from "@/services/Item/Item";
import { getItemId } from "@/services/Item/ItemId";
import { mainDomainOld } from "@/utils/mainDomain";
import DetailsDic from "./components/DetailsDic";
import SideBarDic from "./components/SideBarDic";
import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);
  const dataPage: ItemsId = await getItemId(id);

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
      title: "ماشین3 - واژگان فنی",
      description: "واژگان فنی",
    };
  }
}

async function pageTechnicalWord({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);
  const detailsDic: ItemsId = await getItemId(id);

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  return (
    <>
      {detailsDic?.breadcrumb && (
        <BreadcrumbCategory
          breadcrumb={detailsDic.breadcrumb}
          title={detailsDic.title}
        />
      )}
      <div className="flex flex-col lg:flex-row gap-4 p-3 ">
        <div className="lg:w-3/4 w-full">
          <DetailsDic detailsDic={detailsDic} />
        </div>
        <aside className="lg:w-1/4 w-full">
          <SideBarDic banner={banner} />
        </aside>
      </div>
    </>
  );
}

export default pageTechnicalWord;
