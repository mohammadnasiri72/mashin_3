import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import Podcast from "./components/Podcast";
import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const podcastDetails: ItemsId | null = await getItemByUrl(decodedPathname);
  const seoUrl = `${mainDomainOld}${podcastDetails?.seoUrl}`;

  if (podcastDetails && podcastDetails.title) {
    return {
      title: `${podcastDetails.seoInfo?.seoTitle ? podcastDetails?.seoInfo?.seoTitle : podcastDetails.title + " | ماشین3"}`,
      description: podcastDetails.seoInfo?.seoDescription,
      keywords: podcastDetails.seoInfo?.seoKeywords
        ? podcastDetails.seoInfo?.seoKeywords
        : podcastDetails.seoKeywords,
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: `${podcastDetails.seoInfo?.seoTitle ? podcastDetails?.seoInfo?.seoTitle : podcastDetails.title + " | ماشین3"}`,
        description: podcastDetails.seoInfo?.seoDescription,
      },
      other: {
        seoHeadTags: podcastDetails?.seoInfo?.seoHeadTags,
      },
    };
  } else {
    return {
      title: "ماشین3 -  پادکست های بررسی خودرو",
      description: "پادکست های بررسی خودرو",
    };
  }
}

async function pagePodcast({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page);
  const term = String(searchParam.term);

  const podcasts: Items[] = await getItem({
    TypeId: 1047,
    langCode: "fa",
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

  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const podcastDetails: ItemsId | null = await getItemByUrl(decodedPathname);

  return (
    <>
      {podcastDetails && (
        <div className="mb-3!">
          <BreadcrumbCategory
            breadcrumb={podcastDetails.breadcrumb}
            title={podcastDetails.title}
          />
        </div>
      )}
      <Podcast
        podcasts={podcasts}
        podcastsCat={podcastsCat}
        banner={banner}
        popularNews={popularNews}
        titleCategory=""
      />
    </>
  );
}

export default pagePodcast;
