// app/page.tsx
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
import {
  CompetitorCar,
  CompetitorRow,
  PricePoint,
  PriceRange,
} from "./components/types";

import CommentsSection from "@/app/components/CommentsSection";
import { getItem } from "@/services/Item/Item";
import { getItemByIds } from "@/services/Item/ItemByIds";
import PriceAndComparison from "./components/PriceAndComparison";
import RelatedItems from "./components/RelatedItems";
import ReviewSection from "./components/ReviewSection";

async function page({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const param = await params;
  const id = Number(param.slug[0]);
  const detailsCar: ItemsId = await getItemId(id);

  const [Attachment, comments, pollData] = await Promise.all([
    getAttachment(id),
    getComment({
      id,
      langCode: "fa",
      type: 0,
      pageSize: 20,
      pageIndex: 1,
    }),
    getPollId(id),
  ]);

  try {
    await ItemVisit({
      langCode: "fa",
      id,
      ip: "",
      url: detailsCar.url,
      userAgent: "",
    });
  } catch (error) {
    console.error("Error recording visit:", error);
  }

  const competitorIds = detailsCar.properties.find(
    (e) => e.propertyKey === "p1042_relatedcars",
  )?.propertyValue;

  const sourceLink = detailsCar.sourceLink;
  const categoryId = String(detailsCar.categoryId);
  const brandName = detailsCar.sourceName || "خودرو";
  const specificName = detailsCar.title || "";
  const [detailsCarcompetitor, carsModel, carsModel2, lastNews, lastVideos] =
    await Promise.all([
      competitorIds ? getItemByIds(competitorIds) : Promise.resolve([]),
      sourceLink
        ? getItem({
            TypeId: 1042,
            langCode: "fa",
            CategoryIdArray: sourceLink,
            PageIndex: 1,
            PageSize: 5,
          })
        : Promise.resolve([]),
      categoryId
        ? getItem({
            TypeId: 1042,
            langCode: "fa",
            CategoryIdArray: categoryId,
            PageIndex: 1,
            PageSize: 5,
            FullData: true,
          })
        : Promise.resolve([]),
      getItem({
        TypeId: 5,
        langCode: "fa",
        PageIndex: 1,
        PageSize: 5,
      }),
      getItem({
        TypeId: 1028,
        langCode: "fa",
        PageIndex: 1,
        PageSize: 5,
      }),
    ]);

  const searchTerm = detailsCar.sourceName + " " + detailsCar.title;

  const relatedNews = await getItem({
    TypeId: 5,
    langCode: "fa",
    Term: searchTerm,
    PageIndex: 1,
    PageSize: 10,
  });

  const relatedVideo = await getItem({
    TypeId: 1028,
    langCode: "fa",
    Term: searchTerm,
    PageIndex: 1,
    PageSize: 10,
  });

  const idsCompares = detailsCar.properties.find(
    (e) => e.propertyKey === "p1042_vidrelatedcompare",
  )?.propertyValue;

  const relatedCompare: ItemsId[] = idsCompares
    ? await getItemByIds(idsCompares)
    : [];

  const priceRanges: PriceRange[] = [
    { id: "1m", label: "1 ماه" },
    { id: "3m", label: "3 ماه" },
    { id: "6m", label: "6 ماه" },
    { id: "1y", label: "1 سال" },
    { id: "all", label: "همه" },
  ];

  const priceDataByRange: Record<string, PricePoint[]> = {
    "3m": [
      { label: "بهمن", value: 1865000000 },
      { label: "اسفند", value: 1900000000 },
      { label: "فروردین", value: 1850000000 },
      { label: "اردیبهشت", value: 1780000000 },
      { label: "خرداد", value: 1720000000 },
      { label: "تیر", value: 1800000000 },
    ],
    "1m": [
      { label: "هفته 1", value: 1830000000 },
      { label: "هفته 2", value: 1800000000 },
      { label: "هفته 3", value: 1780000000 },
      { label: "هفته 4", value: 1800000000 },
    ],
    "6m": [
      { label: "دی", value: 1750000000 },
      { label: "بهمن", value: 1865000000 },
      { label: "اسفند", value: 1900000000 },
      { label: "فروردین", value: 1850000000 },
      { label: "اردیبهشت", value: 1780000000 },
      { label: "خرداد", value: 1720000000 },
    ],
    "1y": [
      { label: "تیر ۱۴۰۲", value: 1600000000 },
      { label: "مهر ۱۴۰۲", value: 1700000000 },
      { label: "دی ۱۴۰۲", value: 1750000000 },
      { label: "بهمن ۱۴۰۲", value: 1865000000 },
      { label: "اردیبهشت ۱۴۰۳", value: 1780000000 },
      { label: "خرداد ۱۴۰۳", value: 1720000000 },
    ],
    all: [
      { label: "۱۴۰۲", value: 1600000000 },
      { label: "۱۴۰۳", value: 1865000000 },
    ],
  };

  const competitors: CompetitorCar[] = [
    { id: "swm-g01", name: "SWM G01", image: "/images/swm-g01/thumb.png" },
    {
      id: "haval-jolion",
      name: "هاوال جولیون",
      image: "/images/competitors/haval-jolion.png",
    },
    {
      id: "jac-js4",
      name: "جک جوان",
      image: "/images/competitors/jac-js4.png",
    },
    { id: "kmc-x5", name: "KMC X5", image: "/images/competitors/kmc-x5.png" },
  ];

  const comparisonRows: CompetitorRow[] = [
    {
      label: "قیمت بازار (تومان)",
      values: [
        "1,865,000,000",
        "2,120,000,000",
        "1,950,000,000",
        "1,780,000,000",
      ],
    },
    { label: "قدرت (اسب بخار)", values: ["155", "147", "143", "230"] },
    { label: "شتاب 0-100 (ثانیه)", values: ["11.5", "11.8", "12.1", "10.8"] },
    { label: "مصرف ترکیبی (لیتر)", values: ["7.8", "7.5", "7.3", "7.6"] },
    { label: "حجم صندوق عقب (لیتر)", values: ["480", "475", "337", "450"] },
  ];

  const hasBrandModels = carsModel && carsModel.length > 1;
  const hasSpecificModels = carsModel2 && carsModel2.length > 1;
  const isShowModelShowcase = hasBrandModels || hasSpecificModels;

  return (
    <>
      <HeroSection detailsCar={detailsCar} pollData={pollData} />
      <SectionTabs
        isShowRelatedVideo={relatedVideo.length > 0}
        isShowRelatedCompare={relatedCompare.length > 0}
        isShowRelatedNews={relatedNews.length > 0}
        isShowModelShowcase={isShowModelShowcase}
      />

      {/* هر بخش با id مخصوص برای اسکرول */}
      <div className="px-3">
        <section
          id="specifications"
          className="scroll-mt-20 bg-white rounded-2xl mt-5 shadow-sm border border-gray-100"
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
        {isShowModelShowcase && (
          <section
            id="models"
            className="scroll-mt-20 bg-white rounded-2xl mt-5"
          >
            <ModelShowcase
              brandModels={carsModel}
              specificModels={carsModel2}
              brandName={brandName}
              specificName={specificName}
              specificHref={
                detailsCar.breadcrumb.find((e) => e.title === detailsCar.title)
                  ?.href
              }
              brandHref={
                detailsCar.breadcrumb.find(
                  (e) => e.title === detailsCar.sourceName,
                )?.href
              }
            />
          </section>
        )}
        <section
          id="priceAndComparison"
          className="scroll-mt-20 bg-white rounded-2xl mt-5 "
        >
          <PriceAndComparison
            ranges={priceRanges}
            dataByRange={priceDataByRange}
            defaultRangeId="3m"
            competitors={competitors}
            rows={comparisonRows}
            detailsCarcompetitor={detailsCarcompetitor.slice(0, 4)}
          />
        </section>

        {relatedNews.length > 0 && (
          <section
            id="news"
            className="scroll-mt-20 bg-white rounded-2xl mt-5 shadow-sm border border-gray-100"
          >
            <RelatedItems
              relatedItems={relatedNews}
              title={"اخبار مرتبط"}
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
              title={"ویدئوهای مرتبط"}
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
              title={"مقایسه‌های مرتبط"}
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
