import { getComment } from "@/services/Comment/Comment";
import { getItem } from "@/services/Item/Item";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { ItemVisit } from "@/services/Item/ItemVisit";
import { mainDomainOld } from "@/utils/mainDomain";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import EducationView from "./components/EducationView";

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
      title: "ماشین3 - آموزش و نکات فنی",
      description:
        "جامع‌ترین منبع آموزشی برای نگهداری، تعمیر و رانندگی حرفه‌ای با خودرو و موتورسیکلت",
    };
  }
}

async function pageTipView() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname");
  const decodedPathname = pathname ? decodeURIComponent(pathname) : "";

  const education: ItemsId | ItemsCategoryId | null =
    await getItemByUrl(decodedPathname);
  if (!education) {
    return notFound();
  }

  const id = Number(education.id);

  const popularEducations: Items[] = await getItem({
    TypeId: 3,
    langCode: "fa",
    CategoryIdArray: String(education.categoryId),
    PageIndex: 1,
    PageSize: 10,
    OrderBy: 8,
  });
  const relatedEducations: Items[] = await getItem({
    TypeId: 3,
    langCode: "fa",
    CategoryIdArray: String(education.categoryId),
    PageIndex: 1,
    PageSize: 10,
  });

  const comments: CommentResponse[] = await getComment({
    id: Number(id),
    langCode: "fa",
    type: 0,
    pageSize: 10,
    pageIndex: 1,
  });

  const banner: Items[] = await getItem({
    TypeId: 1051,
    langCode: "fa",
    CategoryIdArray: "6415",
    FullData: true,
  });

  try {
    await ItemVisit({
      langCode: "fa",
      id,
      ip: "",
      url: education.url,
      userAgent: "",
    });
  } catch (error) {
    console.error("Error recording visit:", error);
  }
  return (
    <EducationView
      education={education}
      popularEducations={popularEducations.filter((e) => e.id !== education.id)}
      relatedEducations={relatedEducations.filter((e) => e.id !== education.id)}
      id={id}
      comments={comments}
      banner={banner}
    />
  );
}

export default pageTipView;
