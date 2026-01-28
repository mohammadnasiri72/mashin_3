import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import CarBrands from "./componnents/CarBrands";
import { getCategoryId } from "@/services/Category/CategoryId";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);

 const carDetails: ItemsCategoryId = await getCategoryId(id);
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
        title: "ماشین3 - خودروهای بازار",
        description: "بررسی کامل تمامی برند های خودرو موجود در بازار ایران با جزئیات فنی، قیمت و نظرات کاربران",
      };
    }
}

async function pageReviews({ params }: { params: Promise<{ slug: string }> }) {
  const param = await params;
  const id = Number(param.slug[0]);

  let brand: ItemsCategory[] = [];

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  if (id === 6058) {
    brand = await getCategory({
      TypeId: 1042,
      LangCode: "fa",
      ParentIdArray: 6058,
      PageIndex: 1,
      PageSize: 200,
    });
  } else if (id === 6059) {
    brand = await getCategory({
      TypeId: 1052,
      LangCode: "fa",
      ParentIdArray: 6059,
      PageIndex: 1,
      PageSize: 200,
    });
  }

  return <CarBrands carBrands={brand} banner={banner} />;
}

export default pageReviews;
