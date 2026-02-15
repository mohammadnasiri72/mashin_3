"use client";

import { createMarkup } from "@/utils/func";
import { Card } from "antd";
import { FaCalendar, FaEye } from "react-icons/fa";
import ComparisonTable from "./ComparisonTable";
import DescCarCompare from "./DescCarCompare";

// تعریف تایپ‌ها بر اساس interface شما

function CompareContent({
  whichcars,
  dataCompare,
}: {
  whichcars: ItemsId;
  dataCompare: ItemsId[];
}) {
  return (
    <Card className="rounded-xl shadow-lg border-0">
      <div className="space-y-8">
        {/* خلاصه مقایسه از whichcars */}
        {whichcars.body && (
          <Card className="shadow-lg mb-5!">
            <h3 className="dt_title text-xl font-semibold text-gray-900 mb-4!">
              <span className="px-1">مقایسه</span>
              {dataCompare.map((e, i) => (
                <strong key={e.id} className="text-red-600">
                  {e.title}{" "}
                  <span
                    className={`px-1 ${dataCompare.length - 1 > i ? "" : "hidden"}`}
                  >
                    با
                  </span>
                </strong>
              ))}
            </h3>
            <div
              className="prose prose-lg max-w-none text-justify text-gray-700 leading-8"
              dangerouslySetInnerHTML={createMarkup(
                whichcars.body.replace(
                  /<span style="font-size: 12pt;">|<\/span>/g,
                  "",
                ),
              )}
            />
          </Card>
        )}
        {dataCompare.length > 0 && (
          <div className="flex items-center sm:flex-nowrap flex-wrap gap-3">
            {dataCompare.map((car) => (
              <ComparisonTable key={car.id} car={car} />
            ))}
          </div>
        )}
        {dataCompare.length > 0 && (
          <div className="flex flex-col">
            {dataCompare.map((car) => (
              <DescCarCompare key={car.id} car={car} />
            ))}
          </div>
        )}

        {/* News Tags */}
        <div className=" pt-3 border-t border-gray-200">
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 flex-wrap">
            <div className="flex items-center gap-1 ">
              <FaEye className="text-[#666] text-xs" />
              <span className="font-bold text-[#666] text-xs">
                {whichcars.visit}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FaCalendar className="text-[#666] text-xs" />
              <span className="font-bold text-[#666] text-xs">
                {new Date(whichcars.created).toLocaleDateString("fa-IR")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .comparison-table .ant-table-thead > tr > th {
          background: #f8fafc;
          font-weight: 600;
          text-align: center;
        }
        .comparison-table .ant-table-tbody > tr > td {
          text-align: center;
          border-bottom: 1px solid #f0f0f0;
        }
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }
        .prose ul,
        .prose ol {
          padding-right: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
        }
        .prose h2 {
          color: #1f2937;
          font-weight: bold;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .prose p {
          margin-bottom: 1rem;
          line-height: 2;
        }
      `}</style>
    </Card>
  );
}

export default CompareContent;
