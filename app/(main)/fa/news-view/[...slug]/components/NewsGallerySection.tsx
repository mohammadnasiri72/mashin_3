"use client";

import { mainDomainOld } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const NewsGallerySection = ({
  Attachment,
  detailsNews,
}: {
  Attachment: ItemsAttachment[];
  detailsNews: ItemsId;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

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

  const images =
    Attachment.length > 0
      ? Attachment
      : detailsNews.image
      ? [{ fileUrl: detailsNews.image }]
      : [];

  return (
    <section className=" bg-gray-50">
      <div className="mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm px-8">
          {/* <h3 className="py-4">تصاویر خبر {detailsNews.title}</h3> */}
           <h3 className="dt_title text-xl font-bold text-gray-900 py-4">
        <strong className="text-[#ce1a2a]!">تصاویر </strong>
         خبر {detailsNews.title}
      </h3>
          {images.length > 0 ? (
            <div className="slider-newsDetails">
              {/* Main Image */}
              <Swiper
                loop={true}
                spaceBetween={10}
                speed={1700}
                navigation={false}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Thumbs]}
                className="mySwiper2 news-gallery-main mb-4"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <a
                      className="h-full block cursor-pointer"
                      href={mainDomainOld + image.fileUrl}
                      data-fancybox="news-gallery"
                      data-caption={detailsNews.title}
                      aria-label="لینک گالری تصاویر خبر"
                    >
                      <img
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                        src={mainDomainOld + image.fileUrl}
                        alt={detailsNews.title}
                      />
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbnails */}
              {images.length > 1 && (
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={3}
                   breakpoints={{
                      640: {
                        slidesPerView: 3,
                      },
                      768: {
                        slidesPerView: 4,
                      },
                      1024: {
                        slidesPerView: 5,
                      },
                    }}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Thumbs]}
                  className="mySwiper news-gallery-thumbs"
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="cursor-pointer border-2 border-transparent rounded overflow-hidden transition-all hover:border-[#ce1a2a]">
                        <img
                          className="w-full h-20 object-cover"
                          src={mainDomainOld + image.fileUrl}
                          alt={detailsNews.title}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              تصویری برای این خبر موجود نیست
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
