"use client";

import { Card, Row, Col, Tag, Avatar } from "antd";
import { mainDomainOld } from "@/utils/mainDomain";
import { FaStar } from "react-icons/fa";

interface ComparisonTableProps {
  car1: ItemsId;
  car2: ItemsId;
  comparisonTableData: {
    key: string;
    feature: string;
    car1: string;
    car2: string;
  }[];
}

function ComparisonTable({
  car1,
  car2,
  comparisonTableData,
}: ComparisonTableProps) {
  const numEN1 = car1.properties.find((e) => e.propertyId === 22654)?.value;
  const numEN2 = car2.properties.find((e) => e.propertyId === 22654)?.value;

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
    <div className="space-y-8">
      {/* دو کارد کنار هم */}
      <div
        className={`flex items-center sm:flex-nowrap flex-wrap gap-3 ${
          sum1 >= sum2 ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* کارد خودرو اول */}
        <div className="w-full">
          <Card
            className="shadow-xl border-2 border-emerald-200 hover:shadow-2xl transition-all duration-300 h-full"
            cover={
              <div className="relative p-6 bg-white">
                <img
                  src={mainDomainOld + car1.image}
                  alt={car1.title}
                  className="w-auto mx-auto h-56 object-contain rounded-2xl"
                />
                {/* لوگوهای کوچک روی تصویر اصلی */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full!">
                  <img
                    className="w-20 h-20 rounded-full object-contain"
                    src={
                      mainDomainOld +
                      car1.properties.find((e) => e.propertyId === 22655)?.value
                    }
                    alt={
                      car1.properties.find((e) => e.propertyId === 22655)?.title
                    }
                  />
                </div>
              </div>
            }
          >
            {/* هدر کارد */}
            <div className="text-center mb-6 h-20">
              <h3 className="text-xl font-bold text-emerald-700! mb-2!">
                {car1.title}
              </h3>
              {/* عنوان انگلیسی */}
              <p className="text-gray-500 text-sm">{numEN1}</p>
            </div>

            {/* لیست ویژگی‌ها */}
            <div className="space-y-3">
              {comparisonTableData
                .filter((e) => Number(e.car1) >= 0 && Number(e.car1) <= 10)
                .map((row, index) => (
                  <div
                    key={row.key}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      index % 2 === 0
                        ? "bg-white border-gray-200"
                        : "bg-gray-50 border-gray-100"
                    } ${
                      row.car1 !== "---" &&
                      row.car2 !== "---" &&
                      row.car1 !== row.car2
                        ? "border-emerald-300 bg-emerald-25"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ml-2 ${
                            row.car1 !== "---" &&
                            row.car2 !== "---" &&
                            row.car1 !== row.car2
                              ? "bg-emerald-700 animate-pulse"
                              : "bg-gray-400"
                          }`}
                        ></div>
                        <span className="font-semibold text-gray-800 text-sm">
                          {row.feature}
                        </span>
                      </div>
                      <span
                        className={`font-bold text-lg ${
                          row.car1 !== "---"
                            ? "text-emerald-700"
                            : "text-gray-400 italic"
                        } ${
                          row.car1 !== "---" &&
                          row.car2 !== "---" &&
                          row.car1 !== row.car2
                            ? "text-emerald-600 font-bold"
                            : ""
                        }`}
                      >
                        {row.car1}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            {/* امتیاز کل */}
            <div className="w-full flex justify-center pt-5">
              <div className="rounded-full w-28 h-28 bg-amber-100 border-amber-600 border-4 p-4 flex flex-col justify-center items-center">
                <span>امتیاز کل</span>
                <span className="font-bold text-3xl!">{sum1}</span>
                <div className="flex items-center justify-center gap-0.5">
                  {[1, 2, 3].map((e) => (
                    <FaStar key={e} className="text-amber-600" />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* کارد خودرو دوم */}
        <div className="w-full">
          <Card
            className="shadow-xl border-2 border-blue-200 hover:shadow-2xl transition-all duration-300 h-full"
            cover={
              <div className="relative p-6 bg-white">
                <img
                  src={mainDomainOld + car2.image}
                  alt={car2.title}
                  className="w-auto mx-auto h-56 object-contain rounded-2xl"
                />
                {/* لوگوهای کوچک روی تصویر اصلی */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full!">
                  <img
                    className="w-20 h-20 rounded-full object-contain"
                    src={
                      mainDomainOld +
                      car2.properties.find((e) => e.propertyId === 22655)?.value
                    }
                    alt={
                      car2.properties.find((e) => e.propertyId === 22655)?.title
                    }
                  />
                </div>
              </div>
            }
          >
            {/* هدر کارد */}
            <div className="text-center mb-6 h-20">
              <h3 className="text-xl font-bold text-blue-700! mb-2!">
                {car2.title}
              </h3>
              {/* عنوان انگلیسی */}
              <p className="text-gray-500 text-sm">{numEN2}</p>
            </div>

            {/* لیست ویژگی‌ها */}
            <div className="space-y-3">
              {comparisonTableData
                .filter((e) => Number(e.car2) >= 0 && Number(e.car2) <= 10)
                .map((row, index) => (
                  <div
                    key={row.key}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      index % 2 === 0
                        ? "bg-white border-gray-200"
                        : "bg-gray-50 border-gray-100"
                    } ${
                      row.car1 !== "---" &&
                      row.car2 !== "---" &&
                      row.car1 !== row.car2
                        ? "border-blue-300 bg-blue-25"
                        : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ml-2 ${
                            row.car1 !== "---" &&
                            row.car2 !== "---" &&
                            row.car1 !== row.car2
                              ? "bg-blue-700 animate-pulse"
                              : "bg-gray-400"
                          }`}
                        ></div>
                        <span className="font-semibold text-gray-800 text-sm">
                          {row.feature}
                        </span>
                      </div>
                      <span
                        className={`font-bold text-lg ${
                          row.car2 !== "---"
                            ? "text-blue-700"
                            : "text-gray-400 italic"
                        } ${
                          row.car1 !== "---" &&
                          row.car2 !== "---" &&
                          row.car1 !== row.car2
                            ? "text-blue-600 font-bold"
                            : ""
                        }`}
                      >
                        {row.car2}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            {/* امتیاز کل */}
            <div className="w-full flex justify-center pt-5">
              <div className="rounded-full w-28 h-28 bg-amber-100 border-amber-600 border-4 p-4 flex flex-col justify-center items-center">
                <span>امتیاز کل</span>
                <span className="font-bold text-3xl!">{sum2}</span>
                <div className="flex items-center justify-center gap-0.5">
                  {[1, 2, 3].map((e) => (
                    <FaStar key={e} className="text-amber-600" />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ComparisonTable;
