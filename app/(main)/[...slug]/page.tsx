import BreadcrumbCategory from "@/app/components/BreadcrumbCategory";
import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { htmlToPlainText } from "@/utils/func";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>; // تغییر این خط
}) {
  const param = await params;
  const slugArray = Array.isArray(param.slug) ? param.slug : [param.slug];
  const path = slugArray.length > 0 ? "/" + slugArray.join("/") : "/";
  const dataPage = await getItemByUrl(path);
  if (dataPage.title) {
    return {
      title: `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`,
      description: dataPage.seoInfo?.seoDescription,
      openGraph: {
        title: `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`,
        description: dataPage.seoInfo?.seoDescription,
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
  } catch (err) {
    notFound();
  }
}

export default pageDynamic;
