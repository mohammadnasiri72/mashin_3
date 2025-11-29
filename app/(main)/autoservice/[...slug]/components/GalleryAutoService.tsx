import { Card } from "antd";
import React from "react";

function GalleryAutoService({ detailsAuto }: { detailsAuto: ItemsId }) {
  // تصاویر نمونه
  const galleryImages = [
    "/images/gallery/service-1.jpg",
    "/images/gallery/service-2.jpg",
    "/images/gallery/service-3.jpg",
    "/images/gallery/service-4.jpg",
    "/images/gallery/service-1.jpg",
    "/images/gallery/service-2.jpg",
    "/images/gallery/service-3.jpg",
    "/images/gallery/service-4.jpg",
  ];
  return (
    <>
      <Card className="rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4!">
          گالری تصاویر نمایندگی
        </h3>
        <p className="text-gray-600 mb-6!">
          تصاویری از فضای داخلی و خدمات نمایندگی {detailsAuto.title}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden"
            >
              <img
                src={image}
                alt={`نمایندگی ${detailsAuto.title}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

export default GalleryAutoService;
