"use client";

import { createMarkup } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import { useEffect } from "react";
import { FaCalendar, FaEye } from "react-icons/fa";

const DescBestChoice = ({
  detailsBest,
  title,
}: {
  detailsBest: ItemsId;
  title: string | undefined;
}) => {
  useEffect(() => {
    Fancybox.bind("[data-fancybox='main-img']", {
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
    <section className="pb-8! bg-gray-50">
      <div className="mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="">
            {/* News Summary */}
            {detailsBest.summary && (
              <div className="mb-8 p-4 bg-blue-50 border-r-4 border-blue-500 rounded">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  خلاصه خبر:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {detailsBest.summary}
                </p>
              </div>
            )}

            <a
              href={mainDomainOld + detailsBest.image}
              data-fancybox="main-img"
              data-caption={detailsBest.title}
              aria-label={detailsBest.title}
            >
              <img
                className="float-start! w-96 pl-5"
                src={mainDomainOld + detailsBest.image}
                alt={detailsBest.title}
              />
            </a>

            {/* Main Content */}
            {detailsBest.body && (
              <div className="prose prose-lg max-w-none">
                <h3 className="dt_title text-xl font-bold text-gray-900 mb-4">
                  <strong className="text-red-600">درباره‌ </strong>
                  {title}
                </h3>
                <div
                  className="text-gray-700 leading-8 text-justify"
                  dangerouslySetInnerHTML={createMarkup(detailsBest.body)}
                />
              </div>
            )}
          </div>

          {/* News Tags */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 justify-between">
              {/* <Link
                href={`/fa/news/${detailsBest.categoryId}`}
                className="bg-gray-100! px-3 py-1 rounded-full text-xs text-gray-700! hover:text-[#ce1a2a]! duration-300"
              >
                #{detailsBest.categoryTitle}
              </Link> */}
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 flex-wrap">
                <div className="flex items-center gap-1 ">
                  <FaEye className="text-[#666] text-xs" />
                  <span className="font-bold text-[#666] text-xs">
                    {detailsBest.visit}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendar className="text-[#666] text-xs" />
                  <span className="font-bold text-[#666] text-xs">
                    {new Date(detailsBest.created).toLocaleDateString("fa-IR")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .prose p {
          margin-bottom: 1.5em;
          line-height: 2;
        }

        .prose strong {
          color: #ce1a2a;
        }

        .prose img {
          border-radius: 8px;
          margin: 2em auto;
        }
      `}</style>
    </section>
  );
};

export default DescBestChoice;
