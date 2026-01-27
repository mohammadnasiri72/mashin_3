import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import MainBoxAutoServices from "../components/MainBoxAutoServices";
import SidebarAutoServices from "../components/SidebarAutoServices";
import { getCategoryId } from "@/services/Category/CategoryId";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = param.slug[0];

  const autoServiceCat = await getCategoryId(Number(id));

  if (autoServiceCat.title) {
    return {
      title: `مراکز و نمایندگی های خدمات خودرو - ${
        autoServiceCat.seoTitle ? autoServiceCat.seoTitle : autoServiceCat.title
      }`,
      description: autoServiceCat.seoDescription,
      openGraph: {
        title: `مراکز و نمایندگی های خدمات خودرو - ${
          autoServiceCat.seoTitle
            ? autoServiceCat.seoTitle
            : autoServiceCat.title
        }`,
        description: autoServiceCat.seoDescription,
      },
    };
  } else {
    return {
      title: "مراکز و نمایندگی های خدمات خودرو",
      description: "مراکز و نمایندگی های خدمات خودرو",
    };
  }
}

async function pageAutoServiceDetails({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const page = Number(searchParam.page);
  const id = param.slug[0];

  const AutoServiceData: Items[] = await getItem({
    TypeId: 1050,
    langCode: "fa",
    PageIndex: page || 1,
    CategoryIdArray: id,
    PageSize: 15,
  });
  const brands: ItemsCategory[] = await getCategory({
    TypeId: 1050,
    LangCode: "fa",
    PageSize: 50,
    PageIndex: 1,
  });
  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });
  return (
    <>
      <div className="flex flex-wrap bg-gray-50">
        <div className="lg:w-3/4 w-full">
          <MainBoxAutoServices
            AutoServiceData={AutoServiceData}
            brands={brands}
            id={id}
          />
        </div>
        <div className="lg:w-1/4 w-full">
          <SidebarAutoServices banner={banner} />
        </div>
      </div>
    </>
  );
}

export default pageAutoServiceDetails;
