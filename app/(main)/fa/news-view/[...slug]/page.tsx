import { getAttachment } from "@/services/Attachment/Attachment";
import { getItemId } from "@/services/Item/ItemId";
import NewsViewDetails from "./components/NewsViewDetails";
import { getItem } from "@/services/Item/Item";

async function pageNewsViewDetails({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const id = Number(param.slug[0]);
  const detailsNews: ItemsId = await getItemId(Number(id));
 const popularNews: Items[] = await getItem({
     TypeId: 5,
     langCode: "fa",
     OrderBy: 5,
     PageIndex: 1,
     PageSize: 5,
   });
  const Attachment: ItemsAttachment[] = await getAttachment(2135);

  return  <NewsViewDetails detailsNews={detailsNews} Attachment={Attachment} popularNews={popularNews}/>;
}

export default pageNewsViewDetails;
