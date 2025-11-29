import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import MainBoxAutoService from "../autoservices/components/MainBoxAutoServices";
import SidebarAutoService from "../autoservices/components/SidebarAutoServices";


async function pageAutoService({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page);
  const id = String(searchParam.id);

  const AutoServiceData: Items[] = await getItem({
    TypeId: 1050,
    langCode: "fa",
    PageIndex: page || 1,
    PageSize: 15,
  });
  const brands: ItemsCategory[] = await getCategory({
    TypeId: 1050,
    LangCode: "fa",
    PageSize: 50,
    PageIndex: 1,
  });

  return (
    <>
      <div className="flex flex-wrap bg-gray-50">
        <div className="lg:w-3/4 w-full">
          <MainBoxAutoService AutoServiceData={AutoServiceData} brands={brands} id={id}/>
        </div>
        <div className="lg:w-1/4 w-full">
          <SidebarAutoService />
        </div>
      </div>
    </>
  );
}

export default pageAutoService;
