import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";
import { mainDomainOld } from "@/utils/mainDomain";
import CarsDetails from "./components/CarsDetails";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const id = searchParam.id;

  const dataPage: ItemsCategoryId = await getCategoryId(Number(id));

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

  // ✅ دریافت آیتم‌های مربوط به این دسته‌بندی
  const carView: Items[] = await getItem({
    TypeId: 1042,
    langCode: "fa",
    CategoryIdArray: String(id),
    PageIndex: 1,
    PageSize: 200,
    FullData:true,
  });

  

  // ✅ دریافت جزئیات برند
  const carDetails: ItemsCategoryId = await getCategoryId(id);

  // ✅ دریافت بنرها
  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
    FullData: true,
  });

  return (
    <>
      <BreadcrumbCategory
        breadcrumb={carDetails.breadcrumb}
        title={carDetails.title}
      />
      <CarsDetails carView={carView} carDetails={carDetails} banner={banner} />
    </>
  );
}

export default pageCarsDetails;
