import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getItem } from "@/services/Item/Item";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import DetailsDic from "./components/DetailsDic";
import SideBarDic from "./components/SideBarDic";

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
      title: "ماشین3 - واژگان فنی",
      description: "واژگان فنی",
    };
  }
}

async function pageTechnicalWord() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const detailsDic: ItemsId | null = await getItemByUrl(decodedPathname);
  if (!detailsDic) {
    return notFound();
  }

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
    FullData: true,
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
