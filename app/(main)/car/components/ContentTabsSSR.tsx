// content-tabs-ssr.tsx
import React from "react";
import GallerySection from "./GallerySection";
import ReviewSection from "./ReviewSection";
import TechnicalSection from "./TechnicalSection";
import CommentsSection from "@/app/components/CommentsSection";
import ContentTabsWrapper from "./ContentTabsWrapper";

async function ContentTabsSSR({
  Attachment,
  detailsCar,
  comments,
  id,
  vehicle,
}: {
  Attachment: ItemsAttachment[];
  detailsCar: ItemsId;
  comments: CommentResponse[];
  id: number;
  vehicle: string;
}) {
  const Criticism = detailsCar.properties.filter(
    (e) => e.propertyKey === "p1042_naghd",
  );
  const specifications = detailsCar.properties.filter(
    (e) => e.isTechnicalProperty,
  );

  // ✅ فقط تب‌های SSR (مهم برای سئو)
  const tabItems = [
    ...(Criticism[0]?.value ? [{ key: "review", label: "نقد کارشناسی" }] : []),
    ...(specifications.length > 0
      ? [{ key: "technical", label: "مشخصات فنی" }]
      : []),
    ...(Attachment.length > 0 ? [{ key: "images", label: "تصاویر" }] : []),
    // ✅ تب‌های کلاینت - بعداً توسط Wrapper اضافه میشن
  ];

  return (
    <ContentTabsWrapper
      tabItems={tabItems}
      detailsCar={detailsCar}
      commentsContent={
        <CommentsSection details={detailsCar} comments={comments} id={id} />
      }
    >
      {/* ✅ بخش‌های SSR برای سئو */}
      {Criticism[0]?.value && (
        <div id="review" className="section-anchor">
          <ReviewSection detailsCar={detailsCar} vehicle={vehicle}/>
        </div>
      )}

      {specifications.length > 0 && (
        <div id="technical" className="section-anchor">
          <TechnicalSection detailsCar={detailsCar} vehicle={vehicle}/>
        </div>
      )}

      {Attachment.length > 0 && (
        <div id="images" className="section-anchor">
          <GallerySection Attachment={Attachment} detailsCar={detailsCar} vehicle={vehicle}/>
        </div>
      )}
    </ContentTabsWrapper>
  );
}

export default ContentTabsSSR;
