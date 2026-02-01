import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";
import CarsDetails from "./components/CarsDetails";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const id = searchParam.id;

  const carDetails: ItemsCategoryId = await getCategoryId(Number(id));

  if (carDetails.title) {
    return {
      title: `ماشین3 - ${
        carDetails.seoTitle ? carDetails.seoTitle : carDetails.title
      }`,
      description: carDetails.seoDescription,
      openGraph: {
        title: `ماشین3 - ${
          carDetails.seoTitle ? carDetails.seoTitle : carDetails.title
        }`,
        description: carDetails.seoDescription,
      },
    };
  } else {
    return {
      title: "مشخصات خودرو",
      description: "مشخصات خودرو",
    };
  }
}

async function pageCarsDetails({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const id = Number(searchParam.id);
  const carBrands: ItemsCategory[] = await getCategory({
    TypeId: 1042,
    LangCode: "fa",
    ParentIdArray: id,
    PageIndex: 1,
    PageSize: 200,
  });

  let carBrands2: Items[] = [];
  if (carBrands.length === 0) {
    carBrands2 = await getItem({
      TypeId: 1042,
      langCode: "fa",
      CategoryIdArray: String(id),
      PageIndex: 1,
      PageSize: 200,
    });
  }

  const carDetails: ItemsCategoryId = await getCategoryId(id);

  const carView: Items[] = await getItem({
    TypeId: 1042,
    langCode: "fa",
    CategoryIdArray: String(id),
    PageIndex: 1,
    PageSize: 200,
  });

  const uniqueArray = carBrands.filter(
    (item, index, self) => index === self.findIndex((i) => i.id === item.id),
  );
  const productsWithCategories = uniqueArray.filter((product) =>
    carView.some((category) => category.categoryId === product.id),
  );

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  return (
    <>
      <BreadcrumbCategory
        breadcrumb={carDetails.breadcrumb}
        title={carDetails.title}
      />
      <CarsDetails
        carBrands={productsWithCategories}
        carDetails={carDetails}
        carView={carView}
        banner={banner}
        carBrands2={carBrands2}
      />
    </>
  );
}

export default pageCarsDetails;
