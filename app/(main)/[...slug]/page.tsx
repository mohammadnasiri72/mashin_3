import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { htmlToPlainText } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { notFound, redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>; // تغییر این خط
}) {
  const param = await params;
  const slugArray = Array.isArray(param.slug) ? param.slug : [param.slug];
  const path = slugArray.length > 0 ? "/" + slugArray.join("/") : "/";
  const dataPage: ItemsId | null = await getItemByUrl(path);

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
      title:
        "ماشین 3 - بانک اطلاعات خودرو ، بررسی خودرو ، سایت تخصصی خودرو ماشین",
      description: "بانک اطلاعات خودرو ، بررسی خودرو ، سایت تخصصی خودرو ماشین",
    };
  }
}

async function pageDynamic({
  params,
}: {
  params: Promise<{ slug: string | string[] }>; // تغییر این خط
}) {
  try {
    const param = await params;
    const slugArray = Array.isArray(param.slug) ? param.slug : [param.slug];
    const path = slugArray.length > 0 ? "/" + slugArray.join("/") : "/";
    const dataPage = await getItemByUrl(path);

    // اگر داده‌ای نبود - throw خطای 404
    if (!dataPage || !dataPage.id) {
      const error = new Error("Page not found");
      (error as any).status = 404;
      throw error;
    }

    return (
      <>
        <BreadcrumbCategory
          breadcrumb={dataPage.breadcrumb}
          title={dataPage.title}
        />
        <div className="min-h-96 p-5">
          {htmlToPlainText(dataPage.body ? dataPage.body : "")}
        </div>
      </>
    );
  } catch (err: any) {
    console.error("Error in pageDynamic:", err);

    // فقط برای خطاهای 404 از notFound استفاده کن
    if (err?.status === 404) {
      notFound();
    }

    // برای سایر خطاها redirect کن
    redirect(`/error?status=${err?.status ? err?.status : "500"}`);
    // notFound();
  }
}

export default pageDynamic;
