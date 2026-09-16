// app/page.tsx
import { after } from "next/server";
import { getAttachment } from "@/services/Attachment/Attachment";
import { getComment } from "@/services/Comment/Comment";
import { getItemId } from "@/services/Item/ItemId";
import { ItemVisit } from "@/services/Item/ItemVisit";
import { getPollId } from "@/services/Poll/pollId";
import CarDimensions from "./components/CarDimensions";
import HeroSection from "./components/HeroSection";
import ImageGallery from "./components/ImageGallery";
import ModelShowcase from "./components/ModelShowcase";
import RatingProsCons from "./components/RatingProsCons";
import SectionTabs from "./components/SectionTabs";
import { PricePoint, PriceRange } from "./components/types";

import CommentsSection from "@/app/components/CommentsSection";
import { getItem } from "@/services/Item/Item";
import { getItemByIds } from "@/services/Item/ItemByIds";
import PriceAndComparison from "./components/PriceAndComparison";
import RelatedItems from "./components/RelatedItems";
import ReviewSection from "./components/ReviewSection";
import { JsonLd } from "@/app/components/JsonLd";
import { mainDomainOld } from "@/utils/mainDomain";
import { getPriceChart } from "@/services/PriceChart/PriceChart";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
   const param = await params;
  const id = Number(param.slug[0]);
  const dataPage: ItemsId = await getItemId(id);



 

  if (dataPage && dataPage.title) {
    const title = `${dataPage.seoInfo?.seoTitle ? dataPage?.seoInfo?.seoTitle : dataPage.title + " | ماشین3"}`;
    const description = dataPage.seoInfo?.seoDescription
      ? dataPage.seoInfo?.seoDescription
      : dataPage.title;
    const keywords = dataPage.seoInfo?.seoKeywords
      ? dataPage.seoInfo?.seoKeywords
      : dataPage.seoKeywords;
    const metadataBase = new URL(mainDomainOld);
   const seoUrl = dataPage?.url
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
      title: "ماشین3 - جزئیات خودرو",
      description: "جزئیات خودرو",
    };
  }
}

async function page({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);
  const detailsCar: ItemsId = await getItemId(id);

  const competitorIds = detailsCar.properties.find(
    (e) => e.propertyKey === "p1042_relatedcars",
  )?.propertyValue;

  const searchTerm = detailsCar.sourceName + " " + detailsCar.title;

  const idsCompares = detailsCar.properties.find(
    (e) => e.propertyKey === "p1042_vidrelatedcompare",
  )?.propertyValue;

  // همه درخواست‌ها به صورت موازی برای کاهش زمان پاسخ سرور
  const [Attachment, comments, pollData, relatedNews, relatedVideo, relatedCompare] =
    await Promise.all([
      getAttachment(id),
      getComment({
        id,
        langCode: "fa",
        type: 0,
        pageSize: 20,
        pageIndex: 1,
      }),
      getPollId(id),
      getItem({
        TypeId: 5,
        langCode: "fa",
        Term: searchTerm,
        PageIndex: 1,
        PageSize: 10,
      }),
      getItem({
        TypeId: 1028,
        langCode: "fa",
        Term: searchTerm,
        PageIndex: 1,
        PageSize: 10,
      }),
      idsCompares ? getItemByIds(idsCompares) : Promise.resolve([] as ItemsId[]),
    ]);

  // ثبت بازدید بعد از ارسال پاسخ به کاربر انجام می‌شود تا TTFB کند نشود
  after(() =>
    ItemVisit({
      langCode: "fa",
      id,
      ip: "",
      url: detailsCar.url,
      userAgent: "",
    }).catch((error) => console.error("Error recording visit:", error)),
  );



  

   // ✅ فقط اگر pollData وجود داشت و مقدار معتبری داشت، aggregateRating رو اضافه کن
  let schemas = detailsCar?.seoInfo?.schemas || [];

  if (pollData && pollData.pollScore !== undefined && pollData.pollNumber !== undefined) {
    const aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": pollData.pollScore,
      "bestRating": 10,
      "worstRating": 1,
      "ratingCount": pollData.pollNumber
    };

    // ✅ فقط اگر schemas وجود داشت، به schema های موجود aggregateRating اضافه کن
    if (schemas.length > 0) {
      schemas = schemas.map((schema) => {
        if (schema['@type'] === 'Product' || schema['@type'] === 'Car' || schema['@type'] === 'Vehicle') {
          return {
            ...schema,
            aggregateRating: aggregateRating
          };
        }
        return schema;
      });
    }
  }

  const dataPriceChart:PriceChart[] = await getPriceChart(id)
  

  return (
    <>
    <JsonLd schemas={schemas} />
      <HeroSection detailsCar={detailsCar} pollData={pollData} />
      <SectionTabs
        isShowRelatedVideo={relatedVideo.length > 0}
        isShowRelatedCompare={relatedCompare.length > 0}
        isShowRelatedNews={relatedNews.length > 0}
      />

      {/* هر بخش با id مخصوص برای اسکرول */}
      <div className="bg-[#f4f4f4] pt-5 px-3">
        <section
          id="specifications"
          className="scroll-mt-20 bg-white rounded-2xl shadow-sm border border-gray-100"
        >
          <CarDimensions
            detailsCar={detailsCar}
            vehicle={"car"}
            Attachment={Attachment.filter((e) => e.tabId === 4)}
          />
          <RatingProsCons detailsCar={detailsCar} pollData={pollData} />
        </section>
        <section
          id="expert-review"
          className="scroll-mt-20 bg-white rounded-2xl mt-5 shadow-sm border border-gray-100"
        >
          <ReviewSection detailsCar={detailsCar} vehicle="car" />
        </section>

        <section
          id="images"
          className="scroll-mt-20 bg-white rounded-2xl mt-5 shadow-sm border border-gray-100"
        >
          <ImageGallery
            Attachment={Attachment}
            title={detailsCar.title + detailsCar.sourceName}
          />
        </section>
       
          <section
            id="models"
            className="scroll-mt-20 bg-[#f4f4f4] rounded-2xl mt-5"
          >
            <ModelShowcase
            detailsCar={detailsCar}
             
             
            />
          </section>
        
        <section
          id="priceAndComparison"
          className="scroll-mt-20 bg-[#f4f4f4] rounded-2xl mt-5 "
        >
          <PriceAndComparison
            competitorIds={competitorIds}
            dataPriceChart={dataPriceChart}
          />
        </section>

        {relatedNews.length > 0 && (
          <section
            id="news"
            className="scroll-mt-20 bg-white rounded-2xl mt-5 shadow-sm border border-gray-100"
          >
            <RelatedItems
              relatedItems={relatedNews}
              title={"اخبار "}
              linkAll={"/fa/news/اخبار-خودرو.html"}
              sliderId="news-slider"
            />
          </section>
        )}

        {relatedVideo.length > 0 && (
          <section
            id="videos"
            className="scroll-mt-20 bg-white rounded-2xl mt-5 shadow-sm border border-gray-100"
          >
            <RelatedItems
              relatedItems={relatedVideo}
              title={"ویدئوهای "}
              linkAll={"/videos.html"}
              sliderId="videos-slider"
            />
          </section>
        )}

        {relatedCompare.length > 0 && (
          <section
            id="comparisons"
            className="scroll-mt-20 bg-white rounded-2xl mt-5 shadow-sm border border-gray-100"
          >
            {/* <ComparisonsSection /> */}
            <RelatedItems
              relatedItems={relatedCompare}
              title={"مقایسه‌های "}
              linkAll={"/whichcars.html"}
              sliderId="compare-slider"
            />
          </section>
        )}

        <section
          id="reviews"
          className="scroll-mt-20 bg-white rounded-2xl my-5 shadow-sm border border-gray-100"
        >
          <CommentsSection details={detailsCar} comments={comments} id={id} />
        </section>
      </div>
    </>
  );
}

export default page;
