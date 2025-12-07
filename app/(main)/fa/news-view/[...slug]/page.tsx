import { getAttachment } from "@/services/Attachment/Attachment";
import { getItemId } from "@/services/Item/ItemId";
import NewsViewDetails from "./components/NewsViewDetails";
import { getItem } from "@/services/Item/Item";
import { getComment } from "@/services/Comment/Comment";

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

  const comments: CommentResponse[] = await getComment({
    id: Number(id),
    langCode: "fa",
    type: 0,
    pageSize: 20,
    pageIndex: 1,
  });


  return (
    <NewsViewDetails
      detailsNews={detailsNews}
      Attachment={Attachment}
      popularNews={popularNews}
      comments={comments}
      id={Number(id)}
    />
  );
}

export default pageNewsViewDetails;
