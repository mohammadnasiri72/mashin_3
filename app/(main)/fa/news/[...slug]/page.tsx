import { getItem } from "@/services/Item/Item";
import CarNews from "./components/CarNews";
import { redirect } from "next/navigation";

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
    OrderBy: 8,
    PageIndex: 1,
    PageSize: 5,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  if (news.length > 0) {
    return (
      <CarNews
        id={id}
        newsData={news}
        popularNews={popularNews}
        banner={banner}
      />
    );
  } else {
    redirect(`/error?status=${404}`);
  }
}

export default pageNewsDetails;
