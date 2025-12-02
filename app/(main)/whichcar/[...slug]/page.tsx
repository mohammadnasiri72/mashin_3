import { getItem } from "@/services/Item/Item";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getItemId } from "@/services/Item/ItemId";
import CompareCars from "./components/CompareCars";

async function pageWhichcarsDainamic({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = Number(param.slug[0]);
  const page = Number(searchParam.page);
  const term = String(searchParam.term);
  if (String(id) === "NaN") {
    return <>موجود نیست</>;
  }

  const whichcars: ItemsId = await getItemId(id);
  const ids = whichcars.properties.find((w) => w.propertyId === 22664)?.value;
  let dataCompare: ItemsId[] = [];
  if (ids) {
    dataCompare = await getItemByIds(String(ids));
  }
  const popularComparisons: Items[] = await getItem({
    TypeId: 1045,
    langCode: "fa",
    PageSize: 15,
  });


  return (
    <>
      <CompareCars
        whichcars={whichcars}
        dataCompare={dataCompare}
        popularComparisons={popularComparisons}
      />
    </>
  );
}

export default pageWhichcarsDainamic;
