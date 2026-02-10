"use client";

import { getAttachment } from "@/services/Attachment/Attachment";
import { mainDomainOld } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Card, Tooltip } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdCameraAlt } from "react-icons/md";

interface ItemsId {
  id: number;
  title: string;
  image: string;
  properties: Array<{
    propertyId: number;
    value: string;
    title?: string;
  }>;
}

interface ComparisonTableProps {
  car1: ItemsId;
  car2: ItemsId;
  comparisonTableData: {
    key: string;
    feature: string;
    car1: string;
    car2: string;
  }[];
  id1: number;
  id2: number;
}

function ComparisonTable({
  car1,
  car2,
  comparisonTableData,
  id1,
  id2,
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

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [cachedAttachments1, setCachedAttachments1] = useState<
    ItemsAttachment[] | null
  >(null);
  const [cachedAttachments2, setCachedAttachments2] = useState<
    ItemsAttachment[] | null
  >(null);

  // تابع برای مدیریت کلیک روی تصویر
  const handleImageClick = async (
    e: React.MouseEvent,
    carId: number,
    carNumber: 1 | 2,
  ) => {
    e.preventDefault();

    const car = carNumber === 1 ? car1 : car2;
    const cachedAttachments =
      carNumber === 1 ? cachedAttachments1 : cachedAttachments2;
    const setLoading = carNumber === 1 ? setLoading1 : setLoading2;
    const setCachedAttachments =
      carNumber === 1 ? setCachedAttachments1 : setCachedAttachments2;

    setLoading(true);

    try {
      let attachments: ItemsAttachment[] = [];

      // اگر قبلا cache شده، از cache استفاده کن
      if (cachedAttachments) {
        attachments = cachedAttachments;
      } else {
        // درخواست API برای دریافت attachment‌ها
        attachments = await getAttachment(carId);
        setCachedAttachments(attachments);
      }

      // ایجاد آرایه تصاویر برای fancybox
      const allImages = [
        {
          src: mainDomainOld + car.image,
          caption: car.title,
        },
        ...attachments.map((attachment, index) => ({
          src: mainDomainOld + attachment.fileUrl,
          caption: attachment.title || `${car.title} - تصویر ${index + 2}`,
        })),
      ];

      // بستن هر fancybox فعال قبلی
      Fancybox.close();

      // باز کردن fancybox با تصاویر
      Fancybox.show(allImages, {
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
          infinite: allImages.length > 1,
        },
      });
    } catch (error) {
      console.error(`خطا در دریافت تصاویر خودرو ${carNumber}:`, error);
      // فقط تصویر اصلی را نمایش بده
      Fancybox.show(
        [
          {
            src: mainDomainOld + car.image,
            caption: car.title,
          },
        ],
        {
          Toolbar: {
            display: {
              left: [],
              middle: [],
              right: ["close"],
            },
          },
        },
      );
    } finally {
      setLoading(false);
    }
  };

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
            className="shadow-xl border-2 border-red-200! hover:shadow-2xl transition-all duration-300 h-full"
            cover={
              <div className="relative p-6 bg-white">
                {/* تصویر با امکان کلیک */}
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={mainDomainOld + car1.image}
                      alt={car1.title}
                      className="w-full mx-auto h-56 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay برای نمایش تعداد تصاویر */}
                    <Tooltip title="مشاهده تصاویر" placement="left">
                      <div
                        onClick={(e) => handleImageClick(e, id1, 1)}
                        className="absolute cursor-pointer hover:bg-red-100! hover:border-[#ce1a2a]! border-transparent! border top-3 right-0 bg-white! w-10 h-10 transition-all duration-300 rounded-2xl flex items-center justify-center"
                      >
                        {loading1 ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#ce1a2a] border-opacity-80"></div>
                        ) : (
                          <div className="duration-300 ">
                            <MdCameraAlt className="text-[#ce1a2a]! text-xl " />
                          </div>
                        )}
                      </div>
                    </Tooltip>
                  </div>
                </div>

                {/* لوگوهای کوچک روی تصویر اصلی */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full">
                  <img
                    className="w-20 h-20 rounded-full object-contain border-4 border-white shadow-lg"
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
              <Link
                href={`/car/${car1.title}?id=${id1}`}
                className="text-xl font-bold text-emerald-700! mb-2!"
              >
                {car1.title}
              </Link>
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
              <div className="rounded-full w-28 h-28 bg-red-100 border-[#ce1a2a]! border-4 p-4 flex flex-col justify-center items-center">
                <span>امتیاز کل</span>
                <span className="font-bold text-3xl!">{sum1}</span>
                <div className="flex items-center justify-center gap-0.5">
                  {[1, 2, 3].map((e) => (
                    <FaStar key={e} className="text-[#ce1a2a]!" />
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
                {/* تصویر با امکان کلیک */}
                <div
                  className="relative cursor-pointer group"
                  onClick={(e) => handleImageClick(e, id2, 2)}
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={mainDomainOld + car2.image}
                      alt={car2.title}
                      className="w-full mx-auto h-56 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay برای نمایش تعداد تصاویر */}
                    <Tooltip title="مشاهده تصاویر" placement="left">
                      <div
                        onClick={(e) => handleImageClick(e, id1, 1)}
                        className="absolute cursor-pointer hover:bg-red-100! hover:border-[#ce1a2a]! border-transparent! border top-3 right-0 bg-white! w-10 h-10 transition-all duration-300 rounded-2xl flex items-center justify-center"
                      >
                        {loading1 ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#ce1a2a] border-opacity-80"></div>
                        ) : (
                          <div className="duration-300">
                            <MdCameraAlt className="text-[#ce1a2a]! text-xl" />
                          </div>
                        )}
                      </div>
                    </Tooltip>
                  </div>
                </div>

                {/* لوگوهای کوچک روی تصویر اصلی */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full">
                  <img
                    className="w-20 h-20 rounded-full object-contain border-4 border-white shadow-lg"
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
              <Link
                href={`/car/${car2.title}?id=${id2}`}
                className="text-xl font-bold text-blue-700! mb-2!"
              >
                {car2.title}
              </Link>
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
              <div className="rounded-full w-28 h-28 bg-red-100 border-[#ce1a2a]! border-4 p-4 flex flex-col justify-center items-center">
                <span>امتیاز کل</span>
                <span className="font-bold text-3xl!">{sum2}</span>
                <div className="flex items-center justify-center gap-0.5">
                  {[1, 2, 3].map((e) => (
                    <FaStar key={e} className="text-[#ce1a2a]!" />
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
