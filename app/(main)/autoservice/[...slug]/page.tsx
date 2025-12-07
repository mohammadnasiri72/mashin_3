import { getItemId } from "@/services/Item/ItemId";
import MainBoxAutoService from "./components/MainBoxAutoService";
import { redirect } from "next/navigation";
import { getComment } from "@/services/Comment/Comment";

async function pageAutoservicesDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const param = await params;
    const id = Number(param.slug[0]);
    const detailsAuto: ItemsId = await getItemId(id);

    const comments: CommentResponse[] = await getComment({
        id: Number(id),
        langCode: "fa",
        type: 0,
        pageSize: 20,
        pageIndex: 1,
      });
    

    return (
      <>
        <div className="flex flex-wrap bg-gray-50">
          <MainBoxAutoService detailsAuto={detailsAuto} comments={comments} id={id}/>
        </div>
      </>
    );
  } catch (error: any) {
    // استخراج status code از خطا
    const status = error.response?.status || error.status || 500;

    // ریدایرکت مستقیم به صفحه خطا
    redirect(`/error?status=${status}`);
  }
}

export default pageAutoservicesDetails;
