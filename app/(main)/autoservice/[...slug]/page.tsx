import { getItemId } from "@/services/Item/ItemId";
import MainBoxAutoService from "./components/MainBoxAutoService";
import { redirect } from "next/navigation";

async function pageAutoservicesDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const param = await params;
    const id = Number(param.slug[0]);
    const detailsAuto: ItemsId = await getItemId(id);

    return (
      <>
        <div className="flex flex-wrap bg-gray-50">
          <MainBoxAutoService detailsAuto={detailsAuto} />
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
