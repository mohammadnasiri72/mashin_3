import { getItem } from "@/services/Item/Item";
import CarNews from "./components/CarNews";

async function pageNewsDetails({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const param = await params;
  const searchParam = await searchParams;
  const page = Number(searchParam.page);

  const id = Number(param.slug[0]);

  const news: Items[] = id
    ? await getItem({
        TypeId: 5,
        langCode: "fa",
        CategoryIdArray: String(id),
        PageIndex: page || 1,
        PageSize: 20,
      })
    : await getItem({
        TypeId: 5,
        langCode: "fa",
        PageIndex: page || 1,
        PageSize: 20,
      });

  const popularNews: Items[] = await getItem({
    TypeId: 5,
    langCode: "fa",
    OrderBy: 5,
    PageIndex: 1,
    PageSize: 5,
  });

  return <CarNews id={id} newsData={news} popularNews={popularNews} />;
}

export default pageNewsDetails;
