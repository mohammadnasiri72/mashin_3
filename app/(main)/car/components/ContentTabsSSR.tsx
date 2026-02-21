import React from "react";
import ContentTabs from "./ContentTabs";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { getItem } from "@/services/Item/Item";

async function ContentTabsSSR({
  Attachment,
  detailsCar,
  comments,
  id,
}: {
  Attachment: ItemsAttachment[];
  detailsCar: ItemsId;
  comments: CommentResponse[];
  id: number;
}) {
  // اول همه promiseها رو تعریف می‌کنیم
  const competitorPromise = detailsCar.properties.filter(
    (e) => e.propertyKey === "p1042_relatedcars",
  )[0]?.propertyValue
    ? getItemByIds(
        detailsCar.properties.filter(
          (e) => e.propertyKey === "p1042_relatedcars",
        )[0]?.value,
      )
    : Promise.resolve([]);

  const carsModelPromise = getItem({
    TypeId: 1042,
    langCode: "fa",
    CategoryIdArray: detailsCar.sourceLink,
    PageIndex: 1,
    PageSize: 5,
  });

  const carsModel2Promise = getItem({
    TypeId: 1042,
    langCode: "fa",
    CategoryIdArray: String(detailsCar.categoryId),
    PageIndex: 1,
    PageSize: 5,
  });

  const relatedNewsPromise = getItem({
    TypeId: 5,
    langCode: "fa",
    Term: detailsCar.sourceName + " " + detailsCar.title,
    PageIndex: 1,
    PageSize: 12,
  });

  const relatedVideosPromise = getItem({
    TypeId: 1028,
    langCode: "fa",
    Term: detailsCar.sourceName + " " + detailsCar.title,
    PageIndex: 1,
    PageSize: 12,
  });

  const idsCompares = detailsCar.properties.find(
    (e) => e.propertyKey === "p1042_vidrelatedcompare",
  )?.propertyValue;
  
  const relatedComparesPromise = idsCompares
    ? getItemByIds(idsCompares)
    : Promise.resolve([]);

  const lastNewsPromise = getItem({
    TypeId: 5,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 7,
  });

  const lastVideosPromise = getItem({
    TypeId: 1028,
    langCode: "fa",
    PageIndex: 1,
    PageSize: 5,
  });

  // ✅ اجرای همزمان همه درخواست‌ها
  const [
    detailsCarcompetitor,
    carsModel,
    carsModel2,
    relatedNews,
    relatedVideos,
    relatedCompares,
    lastNews,
    lastVideos,
  ] = await Promise.all([
    competitorPromise,
    carsModelPromise,
    carsModel2Promise,
    relatedNewsPromise,
    relatedVideosPromise,
    relatedComparesPromise,
    lastNewsPromise,
    lastVideosPromise,
  ]);

  return (
    <ContentTabs
      Attachment={Attachment}
      detailsCar={detailsCar}
      detailsCarcompetitor={detailsCarcompetitor}
      comments={comments}
      id={id}
      carsModel={carsModel}
      carsModel2={carsModel2}
      relatedNews={relatedNews}
      relatedVideos={relatedVideos}
      relatedCompares={relatedCompares}
      lastNews={lastNews}
      lastVideos={lastVideos}
    />
  );
}

export default ContentTabsSSR;