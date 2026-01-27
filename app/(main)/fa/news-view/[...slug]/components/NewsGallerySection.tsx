"use client";

import { mainDomainOld } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect } from "react";

const NewsGallerySection = ({
  Attachment,
  detailsNews,
}: {
  Attachment: ItemsAttachment[];
  detailsNews: ItemsId;
}) => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox='news-gallery']", {
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ["close"],
        },
      },
      Thumbs: {
        type: "classic",
      },
      Images: {
        zoom: true,
      },
      Carousel: {
        infinite: true,
      },
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  return (
    <section className=" bg-gray-50">
      <div className="mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm px-8">
          {/* <h3 className="py-4">تصاویر خبر {detailsNews.title}</h3> */}
          <h3 className="dt_title text-xl font-bold text-gray-900 py-4">
            <strong className="text-[#ce1a2a]!">تصاویر </strong>
            خبر {detailsNews.title}
          </h3>
          {Attachment.length > 0 && (
            <div className="space-y-4 mt-3">
              <div className="flex flex-wrap items-center">
                {Attachment.map((image) => (
                  <div key={image.id} className="lg:w-1/5 sm:w-1/4 w-1/2 p-1">
                    <div className="inn_gl_item border-2 border-transparent rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:border-red-400">
                      <a
                        href={mainDomainOld + image.fileUrl}
                        data-fancybox="news-gallery"
                        data-caption={image.title || "تصاویر محصول"}
                        aria-label={image.title || "تصاویر محصول"}
                      >
                        <img
                          src={mainDomainOld + image.fileUrl}
                          alt={image.title || "تصاویر محصول"}
                          className="w-full h-32 object-cover"
                        />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .news-gallery-thumbs .swiper-slide {
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        .news-gallery-thumbs .swiper-slide-thumb-active {
          opacity: 1;
          border-color: #ce1a2a !important;
        }

        .fancybox__container {
          z-index: 999999 !important;
        }
      `}</style>
    </section>
  );
};

export default NewsGallerySection;
