import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getCategory } from "@/services/Category/Category";
import { getItem } from "@/services/Item/Item";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import CarNews from "./components/CarNews";

export async function generateMetadata() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const dataPage: ItemsId | ItemsCategoryId | null =
    await getItemByUrl(decodedPathname);

  if (dataPage && dataPage.title) {
    const title = `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`;
    const description = dataPage.seoInfo?.seoDescription
      ? dataPage.seoInfo?.seoDescription
      : dataPage.title;
    const keywords = dataPage.seoInfo?.seoKeywords
      ? dataPage.seoInfo?.seoKeywords
      : dataPage.seoKeywords;
    const metadataBase = new URL(mainDomainOld);
    const seoUrl = dataPage?.seoUrl
      ? `${mainDomainOld}${dataPage?.seoUrl}`
      : dataPage?.url
        ? `${mainDomainOld}${dataPage?.url}`
        : `${mainDomainOld}`;
    const seoHeadTags = dataPage?.seoInfo?.seoHeadTags;

    return {
      title,
      description,
      keywords,
      metadataBase,
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title,
        description,
      },
      other: {
        seoHeadTags,
      },
    };
  } else {
    return {
      title: "اخبار خودرو | ماشین3",
      description: "آخرین اخبار و تحلیل‌های بازار خودرو ایران",
    };
  }
}

async function pageNewsDetails({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
  const newsDetails: ItemsId | ItemsCategoryId | null =
    await getItemByUrl(decodedPathname);
  if (!newsDetails) {
    return notFound();
  }

  const searchParam = await searchParams;
  const page = Number(searchParam.page);
  const id = newsDetails.typeUrl ==='item' ? 0: Number(newsDetails.id)

  const news: Items[] = id
    ? await getItem({
        TypeId: 5,
        langCode: "fa",
        CategoryIdArray: String(id),
        PageIndex: page || 1,
        PageSize: 20,
        FullData: true,
      })
    : await getItem({
        TypeId: 5,
        langCode: "fa",
        PageIndex: page || 1,
        PageSize: 20,
        FullData: true,
      });

  const popularNews: Items[] = await getItem({
    TypeId: 5,
    langCode: "fa",
    OrderBy: 8,
    PageIndex: 1,
    PageSize: 5,
  });
  const offerNews: Items[] = await getItem({
    TypeId: 5,
    langCode: "fa",
    CategoryIdArray: "6593",
    PageIndex: 1,
    PageSize: 5,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
    FullData: true,
  });

  const newsCat: ItemsCategory[] = await getCategory({
    TypeId: 5,
    LangCode: "fa",
    PageIndex: 1,
    PageSize: 50,
  });

  const tabs = [
    {
      key: 0,
      href: "/fa/News/اخبار-خودرو.html",
      label: "همه اخبار خودرو",
    },
  ];

  // تب‌های داینامیک از داده API
  if (newsCat.length > 0) {
    newsCat.forEach((item) => {
      tabs.push({
        key: item.id,
        href: item.url,
        label: item.title,
      });
    });
  }
  

  if (news.length > 0) {
    return (
      <>
        {newsDetails && (
          <BreadcrumbCategory
            breadcrumb={newsDetails.breadcrumb}
            title={newsDetails.title}
          />
        )}
        {newsDetails && (
          <CarNews
            id={id}
            newsData={news}
            popularNews={popularNews}
            offerNews={offerNews}
            banner={banner}
            newsDetails={newsDetails}
            tabConfig={tabs}
          />
        )}
      </>
    );
  } 
}

export default pageNewsDetails;
