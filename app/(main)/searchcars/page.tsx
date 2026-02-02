import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";
import SearchCarsDetails from "./components/SearchCarsDetails";
import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { mainDomainOld } from "@/utils/mainDomain";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const brandId = Number(searchParam.brandId);
  const modelId = Number(searchParam.modelId);
  const typeId = Number(searchParam.typeId);

  const segmentCars: Items[] = await getItem({
    TypeId: 1048,
    langCode: "fa",
  });
  const typeCarTitle = segmentCars.find((e) => e.id === typeId)?.title;

  if (modelId) {
    const carDetails: ItemsCategoryId = await getCategoryId(modelId);
    const seoUrl = `${mainDomainOld}${carDetails?.seoUrl}`;
    return {
      title: carDetails.seoTitle
        ? carDetails.seoTitle
        : `مدل های ${carDetails.title} ${typeCarTitle ? typeCarTitle : ""} | ماشین3`,
      description: carDetails.seoDescription
        ? carDetails.seoDescription
        : `مدل های ${carDetails.title} ${typeCarTitle ? typeCarTitle : ""}`,
      keywords: carDetails?.seoKeywords,

      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: carDetails.seoTitle
          ? carDetails.seoTitle
          : `مدل های ${carDetails.title} ${typeCarTitle ? typeCarTitle : ""} | ماشین3`,
        description: carDetails.seoDescription
          ? carDetails.seoDescription
          : `مدل های ${carDetails.title} ${typeCarTitle ? typeCarTitle : ""}`,
      },
      other: {
        seoHeadTags: carDetails?.headTags,
      },
    };
  } else if (brandId) {
    const carDetails: ItemsCategoryId = await getCategoryId(brandId);
    const seoUrl = `${mainDomainOld}${carDetails?.seoUrl}`;
    return {
      title: carDetails.seoTitle
        ? carDetails.seoTitle
        : `مدل های ${carDetails.title} ${typeCarTitle ? typeCarTitle : ""} | ماشین3`,
      description: carDetails.seoDescription
        ? carDetails.seoDescription
        : `مدل های ${carDetails.title} ${typeCarTitle ? typeCarTitle : ""}`,
      keywords: carDetails?.seoKeywords,

      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: carDetails.seoTitle
          ? carDetails.seoTitle
          : `مدل های ${carDetails.title} ${typeCarTitle ? typeCarTitle : ""} | ماشین3`,
        description: carDetails.seoDescription
          ? carDetails.seoDescription
          : `مدل های ${carDetails.title} ${typeCarTitle ? typeCarTitle : ""}`,
      },
      other: {
        seoHeadTags: carDetails?.headTags,
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
      />
    </>
  );
}

export default pageSearchCars;
