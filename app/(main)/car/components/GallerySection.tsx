"use client";

import { useEffect } from "react";

// Fancybox
import { mainDomainOld } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const GallerySection = ({ Attachment ,detailsCar}: { Attachment: ItemsAttachment[] , detailsCar:ItemsId}) => {

  // Initialize Fancybox
  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {
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

  // Increase z-index for fancybox
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .fancybox__container { 
        z-index: 999999 !important; 
      }
      .fancybox__backdrop {
        background: rgba(0, 0, 0, 0.8);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="detailsBox bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="dt_title text-xl font-bold text-gray-900 mb-4">
        <strong className="text-red-600">تصاویر </strong>
        ماشین {detailsCar.sourceName} {detailsCar.title}
      </h3>

      <div className="space-y-4 mt-3">
        {/* ردیف‌های تصاویر */}

        <div className="flex flex-wrap items-center">
          {Attachment.map((image) => (
            <div key={image.id} className="lg:w-1/5 sm:w-1/4 w-1/2 p-1">
              <div className="inn_gl_item border-2 border-transparent rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:border-red-400">
                <a
                  href={mainDomainOld + image.fileUrl}
                  data-fancybox="gallery"
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

      <style jsx global>{`
        .inn_gl_item {
          position: relative;
          overflow: hidden;
        }

        .inn_gl_item::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(206, 26, 42, 0.1);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
          pointer-events: none;
        }

        .inn_gl_item:hover::before {
          opacity: 1;
        }

        .inn_gl_item a {
          display: block;
          width: 100%;
          height: 100%;
        }

        /* Fancybox custom styles */
        .fancybox__toolbar {
          background: rgba(0, 0, 0, 0.5);
        }

        .fancybox__nav {
          --f-button-color: #fff;
          --f-button-hover-color: #ce1a2a;
        }

        .fancybox__thumbs {
          background: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
};

export default GallerySection;
