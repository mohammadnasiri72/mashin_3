import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";
import SearchCarsDetails from "./components/SearchCarsDetails";

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
    return {
      title: `ماشین3 - مدل های ${carDetails.title} ${typeCarTitle ? typeCarTitle : ""}`,
      description: `مدل های ${carDetails.title} ${typeCarTitle ? typeCarTitle : ""}`,
    };
  } else if (brandId) {
    const carDetails: ItemsCategoryId = await getCategoryId(brandId);
    return {
      title: `ماشین3 - مدل های ${carDetails.title} ${typeCarTitle ? typeCarTitle : ""}`,
      description: `مدل های ${carDetails.title} ${typeCarTitle ? typeCarTitle : ""}`,
    };
  } else {
    return {
      title: typeCarTitle
        ? `ماشین3 - همه خودروهای ${typeCarTitle}`
        : "ماشین3 - همه خودروهای ماشین3",
      description: typeCarTitle
        ? `ماشین3 - همه خودروهای ${typeCarTitle}`
        : "ماشین3 - همه خودروهای ماشین3",
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

  return (
    <>
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
