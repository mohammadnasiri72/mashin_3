import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { mainDomainOld } from "@/utils/mainDomain";
import MainBoxAutoServices from "../components/MainBoxAutoServices";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = param.slug[0];

  const dataPage = await getCategoryId(Number(id));

  if (dataPage.title) {
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
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const page = Number(searchParam.page);
  const id = param.slug[0];

  const AutoServiceData: Items[] = await getItem({
    TypeId: 1050,
    langCode: "fa",
    PageIndex: page || 1,
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
  });
  const ids = AutoServiceData.map((item) => item.id).join(",");
  let propertyItems: ItemsId[] = [];
  if (ids) {
    propertyItems = await getItemByIds(ids);
  }

  const autoServiceCat = await getCategoryId(Number(id));

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

export default pageAutoServiceDetails;
