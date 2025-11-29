import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import Podcast from "../../podcast.html/components/Podcast";

async function pagePodcastDainamic({
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

  const podcasts: Items[] = await getItem({
    TypeId: 1047,
    langCode: "fa",
    CategoryIdArray: String(id),
    PageIndex: page || 1,
    ...(term && term !== "undefined" && { Term: term }),
    PageSize: 15,
  });

  const podcastsCat: ItemsCategory[] = await getCategory({
    TypeId: 1047,
    LangCode: "fa",
    PageIndex: 1,
    PageSize: 200,
  });
  return (
    <>
      <Podcast podcasts={podcasts} podcastsCat={podcastsCat} />
    </>
  );
}

export default pagePodcastDainamic;
