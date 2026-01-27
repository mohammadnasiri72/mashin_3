"use client";

import { createMarkup } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Card, Col, Divider, Row, Table, Tag } from "antd";
import ComparisonTable from "./ComparisonTable";
import Link from "next/link";
import { FaCalendar, FaEye } from "react-icons/fa";

// تعریف تایپ‌ها بر اساس interface شما

function CompareContent({
  whichcars,
  dataCompare,
}: {
  whichcars: ItemsId;
  dataCompare: ItemsId[];
}) {
  const car1 = dataCompare[0];
  const car2 = dataCompare[1];

  // if (!car1 || !car2) {
  //   return (
  //     <Card className="rounded-xl shadow-lg">
  //       <div className="text-center py-8 text-gray-500">
  //         <p>داده‌های کافی برای مقایسه موجود نیست</p>
  //       </div>
  //     </Card>
  //   );
  // }

  // استخراج properties برای مقایسه
  const extractPropertiesForComparison = (car: ItemsId) => {
    const properties: Record<
      string,
      {
        title: string;
        value: string;
        valueTitle: string | null;
      }
    > = {};

    if (car?.properties && Array.isArray(car.properties)) {
      car.properties.forEach((prop: properties) => {
        if (prop.propertyKey && prop.value) {
          properties[prop.propertyKey] = {
            title: prop.title || prop.propertyKey,
            value: prop.value,
            valueTitle: prop.valueTitle,
          };
        }
      });
    }

    return properties;
  };

  const car1Properties = extractPropertiesForComparison(car1);
  const car2Properties = extractPropertiesForComparison(car2);

  // ایجاد داده‌های جدول مقایسه properties
  const comparisonTableData: {
    key: string;
    feature: string;
    car1: string;
    car2: string;
  }[] = [];

  const allPropertyKeys = new Set([
    ...Object.keys(car1Properties),
    ...Object.keys(car2Properties),
  ]);

  allPropertyKeys.forEach((propertyKey) => {
    const car1Prop = car1Properties[propertyKey];
    const car2Prop = car2Properties[propertyKey];

    if (car1Prop || car2Prop) {
      comparisonTableData.push({
        key: propertyKey,
        feature: car1Prop?.title || car2Prop?.title || propertyKey,
        car1: car1Prop?.valueTitle || car1Prop?.value || "---",
        car2: car2Prop?.valueTitle || car2Prop?.value || "---",
      });
    }
  });

  const sum1 = comparisonTableData
    .filter((e) => Number(e.car1) >= 0 && Number(e.car1) <= 10)
    .reduce((accumulator, currentItem) => {
      return accumulator + Number(currentItem.car1);
    }, 0);
  const sum2 = comparisonTableData
    .filter((e) => Number(e.car2) >= 0 && Number(e.car2) <= 10)
    .reduce((accumulator, currentItem) => {
      return accumulator + Number(currentItem.car2);
    }, 0);

  return (
    <Card className="rounded-xl shadow-lg border-0">
      <div className="space-y-8">
        {/* خلاصه مقایسه از whichcars */}
        {whichcars.body && (
          <Card className="shadow-lg">
            <div
              className="prose prose-lg max-w-none text-justify text-gray-700 leading-8"
              dangerouslySetInnerHTML={createMarkup(
                whichcars.body.replace(
                  /<span style="font-size: 12pt;">|<\/span>/g,
                  ""
                )
              )}
            />
          </Card>
        )}
        {comparisonTableData.length > 0 && dataCompare.length === 2 && (
          <ComparisonTable
            car1={car1}
            car2={car2}
            comparisonTableData={comparisonTableData}
          />
        )}
        {dataCompare.length === 2 && (
          <div
            className={`flex ${sum1 >= sum2 ? "flex-col" : "flex-col-reverse"}`}
          >
            {/* نمایش محتوای کامل خودرو اول */}
            <Card className="shadow-lg mb-6!">
              <div className="text-center mb-6!">
                <h3 className="text-2xl font-bold text-blue-700 mb-2!">
                  {car1.title}
                </h3>
              </div>

              {car1.image && (
                <div className="flex justify-center mb-6!">
                  <img
                    src={mainDomainOld + car1.image}
                    alt={car1.title}
                    className="max-w-full h-auto max-h-80 object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/placeholder-car.jpg";
                    }}
                  />
                </div>
              )}

              {car1.body && (
                <div
                  className="prose prose-lg max-w-none text-justify text-gray-700 leading-8"
                  dangerouslySetInnerHTML={createMarkup(
                    car1.body.replace(
                      /<span style="font-size: 12pt;">|<\/span>/g,
                      ""
                    )
                  )}
                />
              )}
            </Card>

            {/* نمایش محتوای کامل خودرو دوم */}
            <Card className="shadow-lg mb-6!">
              <div className="text-center mb-6!">
                <h3 className="text-2xl font-bold text-red-700 mb-2!">
                  {car2.title}
                </h3>
              </div>

              {car2.image && (
                <div className="flex justify-center mb-6!">
                  <img
                    src={mainDomainOld + car2.image}
                    alt={car2.title}
                    className="max-w-full h-auto max-h-80 object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/placeholder-car.jpg";
                    }}
                  />
                </div>
              )}

              {car2.body && (
                <div
                  className="prose prose-lg max-w-none text-justify text-gray-700 leading-8"
                  dangerouslySetInnerHTML={createMarkup(
                    car2.body.replace(
                      /<span style="font-size: 12pt;">|<\/span>/g,
                      ""
                    )
                  )}
                />
              )}
            </Card>
          </div>
        )}
        {/* اطلاعات اضافی */}
        {dataCompare.length === 2 && (
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12} className="">
              <Card className="text-center h-full bg-emerald-100!">
                <h4 className="font-bold text-lg text-gray-800 mb-4!">
                  اطلاعات {car1.title}
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>تعداد بازدید:</span>
                    <span className="font-medium">{car1.visit || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تاریخ انتشار:</span>
                    <span className="font-medium">
                      {car1.created
                        ? new Date(car1.created).toLocaleDateString("fa-IR")
                        : "---"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>دسته‌بندی:</span>
                    <span className="font-medium">
                      {car1.categoryTitle || "---"}
                    </span>
                  </div>
                  {car1.score > 0 && (
                    <div className="flex justify-between">
                      <span>امتیاز:</span>
                      <span className="font-medium">{car1.score}/5</span>
                    </div>
                  )}
                </div>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card className="text-center h-full bg-blue-100!">
                <h4 className="font-bold text-lg text-gray-800 mb-4!">
                  اطلاعات {car2.title}
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>تعداد بازدید:</span>
                    <span className="font-medium">{car2.visit || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>تاریخ انتشار:</span>
                    <span className="font-medium">
                      {car2.created
                        ? new Date(car2.created).toLocaleDateString("fa-IR")
                        : "---"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>دسته‌بندی:</span>
                    <span className="font-medium">
                      {car2.categoryTitle || "---"}
                    </span>
                  </div>
                  {car2.score > 0 && (
                    <div className="flex justify-between">
                      <span>امتیاز:</span>
                      <span className="font-medium">{car2.score}/5</span>
                    </div>
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        )}

        {/* News Tags */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 justify-between">
            <Link
              href={`/whichcars/${whichcars.categoryId}`}
              className="bg-gray-100! px-3 py-1 rounded-full text-xs text-gray-700! hover:text-[#ce1a2a]! duration-300"
            >
              #{whichcars.categoryTitle}
            </Link>
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
