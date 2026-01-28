import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import Podcast from "../../podcast.html/components/Podcast";
import { getCategoryId } from "@/services/Category/CategoryId";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);
  const podcasts: ItemsCategoryId = await getCategoryId(id);

  if (podcasts.title) {
    return {
      title: `ماشین3 - ${
        podcasts.seoTitle ? podcasts.seoTitle : podcasts.title
      }`,
      description: podcasts.seoDescription,
      openGraph: {
        title: `ماشین3 - ${
          podcasts.seoTitle ? podcasts.seoTitle : podcasts.title
        }`,
        description: podcasts.seoDescription,
      },
    };
  } else {
    return {
      title: "ماشین3 - لیست پادکست‌های ماشین3",
      description: "لیست پادکست‌های ماشین3",
    };
  }
}

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
  const podcastsCa: ItemsCategoryId = await getCategoryId(id);

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

  const popularNews: Items[] = await getItem({
    TypeId: 5,
    langCode: "fa",
    OrderBy: 8,
    PageIndex: 1,
    PageSize: 5,
  });

  const podcastsCat: ItemsCategory[] = await getCategory({
    TypeId: 1047,
    LangCode: "fa",
    PageIndex: 1,
    PageSize: 200,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
  });

  return (
    <>
      <Podcast
        podcasts={podcasts}
        podcastsCat={podcastsCat}
        banner={banner}
        popularNews={popularNews}
        titleCategory={podcastsCa.title ? podcastsCa.title : ''}
      />
    </>
  );
}

export default pagePodcastDainamic;
