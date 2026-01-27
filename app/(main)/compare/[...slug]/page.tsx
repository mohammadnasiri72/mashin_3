import { getCategory } from "@/services/Category/Category";
import CompareClient from "./components/CompareClient";
import { getItemByIds } from "@/services/Item/ItemByIds";

async function pageCompareDainamic({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const ids = param.slug[0].replace("%2C", ",");

  const dataCompare: ItemsId[] = await getItemByIds(ids);

  const brandsCar: ItemsCategory[] = await getCategory({
    TypeId: 1042,
    LangCode: "fa",
    ParentIdArray: 6058,
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
