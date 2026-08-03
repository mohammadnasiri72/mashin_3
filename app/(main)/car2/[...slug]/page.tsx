import { getItemId } from "@/services/Item/ItemId";
import HeaderCar from "./components/HeaderCar";



async function page({
  params,
}: {
  params: Promise<{ slug: string | string[] }>; // تغییر این خط
}) {
 
const param = await params;
const id = Number(param.slug[0])
 const detailsCar: ItemsId = await getItemId(id);
console.log(detailsCar);

  return (
    <>
   <HeaderCar detailsCar={detailsCar}/>
    </>
  );
}

export default page;