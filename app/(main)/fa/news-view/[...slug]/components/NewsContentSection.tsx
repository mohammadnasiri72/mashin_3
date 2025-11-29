"use client";

import { createMarkup } from "@/utils/func";

const NewsContentSection = ({ detailsNews }: { detailsNews: ItemsId }) => {
 

  return (
    <section className="py-8 bg-gray-50">
      <div className="mx-auto pr-4 lg:pl-2 pl-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="sm:w-auto w-full p-3 sm:bg-transparent bg-[#fff2] rounded-xl flex sm:justify-start justify-center items-center">
            <h3 className="pb-0! mb-0! text-center text-gray-900! font-bold! inline-block relative sm:text-3xl text-xl z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-gray-200">
              {detailsNews.title}
            </h3>
          </div>
          {/* News Summary */}
          {detailsNews.summary && (
            <div className="mb-8 p-4 bg-blue-50 border-r-4 border-blue-500 rounded">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                خلاصه خبر:
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {detailsNews.summary}
              </p>
            </div>
          )}

          {/* Main Content */}
          {detailsNews.body && (
            <div className="prose prose-lg max-w-none">
              <div
                className="text-gray-700 leading-8 text-justify"
                dangerouslySetInnerHTML={createMarkup(detailsNews.body)}
              />
            </div>
          )}

          {/* News Tags */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                #{detailsNews.categoryTitle}
              </span>
              {detailsNews.keywords
                ?.split(",")
                .map((keyword: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                  >
                    #{keyword.trim()}
                  </span>
                ))}
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

export default NewsContentSection;
