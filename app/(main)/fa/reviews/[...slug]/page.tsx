import { getCategory } from "@/services/Category/Category";
import CarBrands from "./componnents/CarBrands";
import { getItem } from "@/services/Item/Item";
import { redirect } from "next/navigation";

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

  if (brand.length > 0) {
    return <CarBrands carBrands={brand} banner={banner} />;
  } else {
    // return <>موجود نیست</>;
    redirect(`/error?status=${404}`);
  }
}

export default pageReviews;
