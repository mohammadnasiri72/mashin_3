import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";
import React from "react";
import CarsDetails from "../../cars/[...slug]/components/CarsDetails";
import { mainDomainOld } from "@/utils/mainDomain";
import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const id = Number(searchParam.id);
  const detailsMotorcycle: ItemsCategoryId = await getCategoryId(id);
  const seoUrl = `${mainDomainOld}${detailsMotorcycle?.seoUrl}`;

  if (detailsMotorcycle.title) {
    return {
      title: `${
        detailsMotorcycle.seoTitle
          ? detailsMotorcycle.seoTitle
          : detailsMotorcycle.title + " | ماشین3"
      }`,
      description: detailsMotorcycle.seoDescription,
      keywords: detailsMotorcycle?.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${
          detailsMotorcycle.seoTitle
            ? detailsMotorcycle.seoTitle
            : detailsMotorcycle.title + " | ماشین3"
        }`,
        description: detailsMotorcycle.seoDescription,
      },
      other: {
        seoHeadTags: detailsMotorcycle?.headTags,
      },
    };
  } else {
    return {
      title: "ماشین3 - لیست موتورسیکلت‌ها",
      description: "لیست موتورسیکلت‌ها",
    };
  }
}

async function pageMotorcyclesDainamic({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const id = Number(searchParam.id);
  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  const motorBrands: ItemsCategory[] = await getCategory({
    TypeId: 1052,
    LangCode: "fa",
    ParentIdArray: id,
    PageIndex: 1,
    PageSize: 200,
  });
  const motorDetails: ItemsCategoryId = await getCategoryId(id);
  const motorView: Items[] = await getItem({
    TypeId: 1052,
    langCode: "fa",
    CategoryIdArray: String(id),
    PageIndex: 1,
    PageSize: 200,
  });

  const uniqueArray = motorBrands.filter(
    (item, index, self) => index === self.findIndex((i) => i.id === item.id),
  );
  const productsWithCategories = uniqueArray.filter((product) =>
    motorView.some((category) => category.categoryId === product.id),
  );

  let motorBrands2: Items[] = [];
  if (motorBrands.length === 0) {
    motorBrands2 = await getItem({
      TypeId: 1052,
      langCode: "fa",
      CategoryIdArray: String(id),
      PageIndex: 1,
      PageSize: 200,
    });
  }

  return (
    <>
      <BreadcrumbCategory
        breadcrumb={motorDetails.breadcrumb}
        title={motorDetails.title}
      />
      <CarsDetails
        carBrands={productsWithCategories}
        carDetails={motorDetails}
        carView={motorView}
        banner={banner}
        carBrands2={motorBrands2}
      />
    </>
  );
}

export default pageMotorcyclesDainamic;
