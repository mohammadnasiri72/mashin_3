import { getCategory } from "@/services/Category/Category";
import CompareClient from "./components/CompareClient";
import { getItemByIds } from "@/services/Item/ItemByIds";

async function pageCompareDainamic({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const type = searchParam.type;
  const TypeId = type === "motor" ? 1052 : 1042;
  const ParentIdArray = type === "motor" ? 6059 : 6058;
  const ids = param.slug[0].replace("%2C", ",");

  const dataCompare: ItemsId[] = await getItemByIds(ids);

  const brandsCar: ItemsCategory[] = await getCategory({
    TypeId: TypeId,
    LangCode: "fa",
    ParentIdArray: ParentIdArray,

    PageIndex: 1,
    PageSize: 200,
  });
  return (
    <>
      <CompareClient
        brandsCar={brandsCar}
        dataCompare={dataCompare}
        ids={ids}
      />
    </>
  );
}

export default pageCompareDainamic;
