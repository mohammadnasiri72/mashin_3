import { getCategory } from "@/services/Category/Category";
import { getCategoryId } from "@/services/Category/CategoryId";
import { getItem } from "@/services/Item/Item";
import { redirect } from "next/navigation";
import CarNews from "./components/CarNews";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { headers } from "next/headers";
import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { mainDomainOld } from "@/utils/mainDomain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);

  if (isNaN(id)) {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname");
    const decodedPathname = pathname ? decodeURIComponent(pathname) : "";
    const newsDetails: ItemsId | null = await getItemByUrl(decodedPathname);
    const seoUrl = `${mainDomainOld}${newsDetails?.seoUrl}`;
    if (newsDetails && newsDetails.title) {
      return {
        title: `${newsDetails.seoInfo?.seoTitle ? newsDetails?.seoInfo?.seoTitle : newsDetails.title + " | ماشین3"}`,
        description: newsDetails.seoInfo?.seoDescription
          ? newsDetails.seoInfo?.seoDescription
          : "آخرین اخبار و تحلیل‌های بازار خودرو ایران",
        keywords: newsDetails.seoInfo?.seoKeywords
          ? newsDetails.seoInfo?.seoKeywords
          : newsDetails.seoKeywords,
        metadataBase: new URL(mainDomainOld),
        alternates: {
          canonical: seoUrl,
        },
        openGraph: {
          title: `${newsDetails.seoInfo?.seoTitle ? newsDetails?.seoInfo?.seoTitle : newsDetails.title + " | ماشین3"}`,
          description: newsDetails.seoInfo?.seoDescription
            ? newsDetails.seoInfo?.seoDescription
            : "آخرین اخبار و تحلیل‌های بازار خودرو ایران",
        },
        other: {
          seoHeadTags: newsDetails?.seoInfo?.seoHeadTags,
        },
      };
    } else {
      return {
        title: "اخبار خودرو | ماشین3",
        description: "آخرین اخبار و تحلیل‌های بازار خودرو ایران",
      };
    }
  } else {
    const newsDetails: ItemsCategoryId = await getCategoryId(id);
    const seoUrl = `${mainDomainOld}${newsDetails?.seoUrl}`;

    if (newsDetails.title) {
      return {
        title: `${
          newsDetails.seoTitle
            ? newsDetails.seoTitle
            : newsDetails.title + " | ماشین3"
        }`,
        description: newsDetails.seoDescription
          ? newsDetails.seoDescription
          : "آخرین اخبار و تحلیل‌های بازار خودرو ایران",
        keywords: newsDetails?.seoKeywords,
        metadataBase: new URL(mainDomainOld),
        alternates: {
          canonical: seoUrl,
        },
        openGraph: {
          title: `${
            newsDetails.seoTitle
              ? newsDetails.seoTitle
              : newsDetails.title + " | ماشین3"
          }`,
          description: newsDetails.seoDescription
            ? newsDetails.seoDescription
            : "آخرین اخبار و تحلیل‌های بازار خودرو ایران",
        },
        other: {
          seoHeadTags: newsDetails?.headTags,
        },
      };
    } else {
      return {
        title: "اخبار خودرو | ماشین3",
        description: "آخرین اخبار و تحلیل‌های بازار خودرو ایران",
      };
    }
  }
}

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

  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const newsDetails: ItemsCategoryId | ItemsId | null = id
    ? await getCategoryId(id)
    : await getItemByUrl(decodedPathname);

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
            banner={banner}
            newsDetails={newsDetails}
            tabConfig={tabs}
          />
        )}
      </>
    );
  } else {
    redirect(`/error?status=${404}`);
  }
}

export default pageNewsDetails;
