import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";
import CarsDetails from "./components/CarsDetails";

async function pageCarsDetails({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = Number(searchParam.id);
  const carBrands: ItemsCategory[] = await getCategory({
    TypeId: 1042,
    LangCode: "fa",
    ParentIdArray: id,
    PageIndex: 1,
    PageSize: 200,
  });
  const carDetails: ItemsCategoryId = await getCategoryId(id);
  const carView: Items[] = await getItem({
    TypeId: 1042,
    langCode: "fa",
    CategoryIdArray: String(id),
    PageIndex: 1,
    PageSize: 200,
  });

  const uniqueArray = carBrands.filter(
    (item, index, self) => index === self.findIndex((i) => i.id === item.id)
  );
  const productsWithCategories = uniqueArray.filter((product) =>
    carView.some((category) => category.categoryId === product.id)
  );

  return (
    <CarsDetails
      carBrands={productsWithCategories}
      carDetails={carDetails}
      carView={carView}
    />
  );
}

export default pageCarsDetails;
