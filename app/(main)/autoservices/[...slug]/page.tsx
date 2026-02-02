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

  const autoServiceCat = await getCategoryId(Number(id));
  const seoUrl = `${mainDomainOld}${autoServiceCat?.seoUrl}`;

  if (autoServiceCat.title) {
    return {
      title: `${
        autoServiceCat.seoTitle
          ? autoServiceCat.seoTitle
          : autoServiceCat.title + " | ماشین3"
      }`,
      description: autoServiceCat.seoDescription,
      keywords: autoServiceCat?.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${
          autoServiceCat.seoTitle
            ? autoServiceCat.seoTitle
            : autoServiceCat.title + " | ماشین3"
        }`,
        description: autoServiceCat.seoDescription,
      },
      other: {
        seoHeadTags: autoServiceCat?.headTags,
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
