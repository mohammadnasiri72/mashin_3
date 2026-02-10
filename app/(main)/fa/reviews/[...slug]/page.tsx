import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";
import CarBrands from "./componnents/CarBrands";
import { mainDomainOld } from "@/utils/mainDomain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);

  const dataPage: ItemsCategoryId = await getCategoryId(id);

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
      title: "ماشین3 - خودروهای بازار",
      description:
        "بررسی کامل تمامی برند های خودرو موجود در بازار ایران با جزئیات فنی، قیمت و نظرات کاربران",
    };
  }
}

async function pageReviews({ params }: { params: Promise<{ slug: string }> }) {
  const param = await params;
  const id = Number(param.slug[0]);

  const carDetails: ItemsCategoryId = await getCategoryId(id);

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

  return (
    <>
      <BreadcrumbCategory
        breadcrumb={carDetails.breadcrumb}
        title={carDetails.title}
      />
      <CarBrands carBrands={brand} banner={banner} carDetails={carDetails} />
    </>
  );
}

export default pageReviews;
