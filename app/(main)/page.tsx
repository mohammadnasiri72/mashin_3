import { getItemByUrl } from "@/services/Item/ItemByUrl";
import { decodeHtmlServer } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Suspense } from "react";
import {
  HeroFallback,
  NewsFallback,
  SectionFallback,
} from "./home/fallbacks";
import {
  HomeAutoServices,
  HomeCarFinder,
  HomeCarSpecs,
  HomeCarTypes,
  HomeComparison,
  HomeEducation,
  HomeHero,
  HomeMotorBrands,
  HomeNews,
  HomePrices,
  HomeVideo,
} from "./home/HomeSections";

export const revalidate = 60;

// ✅ تابع generateMetadata - اینجا تمام متادیتاها تنظیم می‌شود
export async function generateMetadata() {
  const dataPage: ItemsId | null = await getItemByUrl("/");
  const seoUrl = dataPage?.url
    ? `${mainDomainOld}${dataPage?.url}`
    : `${mainDomainOld}`;

  if (dataPage && dataPage.title) {
    // استخراج و پردازش seoHeadTags
    const seoHeadTags = dataPage?.seoInfo?.seoHeadTags || "";

    // تگ‌های سفارشی را به صورت یک آبجکت برای other استخراج می‌کنیم
    const customTags = extractCustomMetaTags(seoHeadTags);

    return {
      title: decodeHtmlServer(
        `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title}`,
      ),
      description: decodeHtmlServer(
        dataPage.seoInfo?.seoDescription
          ? dataPage.seoInfo?.seoDescription
          : dataPage.title,
      ),
      keywords: decodeHtmlServer(
        dataPage.seoInfo?.seoKeywords
          ? dataPage.seoInfo?.seoKeywords
          : dataPage.seoKeywords,
      ),
      metadataBase: new URL(mainDomainOld),
      alternates: {
        canonical: seoUrl,
      },
      openGraph: {
        title: decodeHtmlServer(
          `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title}`,
        ),
        description: decodeHtmlServer(
          dataPage.seoInfo?.seoDescription
            ? dataPage.seoInfo?.seoDescription
            : dataPage.title,
        ),
        // اضافه کردن تصویر اگر وجود دارد
        images: dataPage?.image ? [dataPage.image] : [],
        type: "website",
        locale: "fa_IR",
        siteName: "ماشین سه",
      },
      twitter: {
        card: "summary_large_image",
        title: decodeHtmlServer(
          `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title}`,
        ),
        description: decodeHtmlServer(
          dataPage.seoInfo?.seoDescription
            ? dataPage.seoInfo?.seoDescription
            : dataPage.title,
        ),
        images: dataPage?.image ? [dataPage.image] : [],
      },
      // ✅ تگ‌های سفارشی و متاهای اضافی
      other: {
        copyright: "activeidea.net",
        author: "ایده پویا",
        "document-type": "Public",
        "document-rating": "General",
        classification: "Consumer",
        rating: "ماشین",
        "resource-type": "document",
        "og:locale": "fa_IR",
        "og:type": "ماشین",
        ...customTags, // اضافه کردن تگ‌های سفارشی از seoHeadTags
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

// ✅ تابع کمکی برای استخراج تگ‌های سفارشی از seoHeadTags
function extractCustomMetaTags(htmlString: string): Record<string, string> {
  if (!htmlString) return {};

  const tags: Record<string, string> = {};

  // استخراج تگ‌های meta با استفاده از regex
  const metaRegex = /<meta\s+([^>]*?)>/gi;
  const matches = htmlString.matchAll(metaRegex);

  for (const match of matches) {
    const attrs = match[1];

    // استخراج name و content
    const nameMatch = attrs.match(/name=["']([^"']*)["']/i);
    const contentMatch = attrs.match(/content=["']([^"']*)["']/i);

    if (nameMatch && contentMatch) {
      const name = nameMatch[1];
      const content = contentMatch[1];

      // فقط تگ‌هایی که در Metadata API پشتیبانی می‌شوند را اضافه کن
      if (!["title", "description", "keywords", "robots"].includes(name)) {
        tags[name] = content;
      }
    }
  }

  return tags;
}

export default function Home() {
  return (
    <div className="page-wrapper min-h-screen bg-[#f4f4f4]">
      <div className="content-box ">
        <Suspense fallback={<HeroFallback />}>
          <HomeHero />
        </Suspense>

        <Suspense fallback={<NewsFallback />}>
          <HomeNews />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeight="min-h-44" />}>
          <HomeCarTypes />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeight="min-h-72" />}>
          <HomeVideo />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeight="min-h-96" />}>
          <HomeCarSpecs />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeight="min-h-96" />}>
          <HomeComparison />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeight="min-h-96" />}>
          <HomePrices />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeight="min-h-96" />}>
          <HomeAutoServices />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeight="min-h-72" />}>
          <HomeEducation />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeight="min-h-72" />}>
          <HomeMotorBrands />
        </Suspense>

        <Suspense fallback={<SectionFallback minHeight="min-h-64" />}>
          <HomeCarFinder />
        </Suspense>
      </div>
    </div>
  );
}
