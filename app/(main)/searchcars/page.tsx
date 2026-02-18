import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";
import SearchCarsDetails from "./components/SearchCarsDetails";
import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import { getItemByUrl } from "@/services/Item/ItemByUrl";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const searchParam = await searchParams;
  const brandId = Number(searchParam.brandId);
  const modelId = Number(searchParam.modelId);
  const typeId = Number(searchParam.typeId);

  const id = modelId ? modelId : brandId ? brandId : null;

  const segmentCars: Items[] = await getItem({
    TypeId: 1048,
    langCode: "fa",
  });
  const typeCarTitle = segmentCars.find((e) => e.id === typeId)?.title;

  if (id) {
    const dataPage: ItemsCategoryId = await getCategoryId(id);

    if (dataPage.title) {
      const title = dataPage.seoTitle
        ? dataPage.seoTitle
        : `مدل های ${dataPage.title} ${typeCarTitle ? typeCarTitle : ""} | ماشین3`;
      const description = dataPage.seoDescription
        ? dataPage.seoDescription
        : `مدل های ${dataPage.title} ${typeCarTitle ? typeCarTitle : ""}`;
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
        title: typeCarTitle
          ? `همه خودروهای ${typeCarTitle} | ماشین3`
          : "همه خودروهای ماشین3",
        description: typeCarTitle
          ? `همه خودروهای ${typeCarTitle} | ماشین3`
          : "همه خودروهای ماشین3",
      };
    }
  } else {
    return {
      title: typeCarTitle
        ? `همه خودروهای ${typeCarTitle} | ماشین3`
        : "همه خودروهای ماشین3",
      description: typeCarTitle
        ? `همه خودروهای ${typeCarTitle} | ماشین3`
        : "همه خودروهای ماشین3",
      alternates: {
        canonical: `${mainDomainOld}${decodedPathname}`,
      },
    };
  }
}

async function pageSearchCars({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const brandId = Number(searchParam.brandId);
  const modelId = Number(searchParam.modelId);
  const typeId = Number(searchParam.typeId);
  const page = Number(searchParam.page) || 1;
  const orderby = Number(searchParam.orderby);

  const carBrands: ItemsCategory[] = await getCategory({
    TypeId: 1042,
    LangCode: "fa",
    ParentIdArray: 6058,
    PageIndex: 1,
    PageSize: 200,
  });

  let carDetails: ItemsCategoryId[] = [];
  if (modelId) {
    const carCategory = await getCategoryId(modelId);
    carDetails = [carCategory];
  } else if (brandId) {
    const carCategory = await getCategoryId(brandId);
    carDetails = [carCategory];
  }

  const carView: Items[] = await getItem({
    TypeId: 1042,
    langCode: "fa",
    ...(modelId && { CategoryIdArray: String(modelId) }),
    ...(brandId && !modelId && { CategoryIdArray: String(brandId) }),
    PageIndex: page,
    PageSize: 20,
    ...(typeId && { FilterProps: `22690=${typeId}` }),
    OrderBy: orderby ? orderby : 1,
  });
  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  const segmentCars: Items[] = await getItem({
    TypeId: 1048,
    langCode: "fa",
  });

  const typeCarTitle = segmentCars.find((e) => e.id === typeId)?.title;

  return (
    <>
      <BreadcrumbCategory
        breadcrumb={carDetails.length > 0 ? carDetails[0].breadcrumb : []}
        title={
          carDetails.length > 0
            ? carDetails[0].title
            : ` همه برند های خودرو ${typeCarTitle ? typeCarTitle : ""}`
        }
      />
      <SearchCarsDetails
        carBrands={carBrands}
        carDetails={carDetails}
        carView={carView}
        banner={banner}
        segmentCars={segmentCars}
        initialtype={typeId}
        initialBrandId={brandId}
        initialModelId={modelId}
        initialOrderby={orderby}
      />
    </>
  );
}

export default pageSearchCars;
