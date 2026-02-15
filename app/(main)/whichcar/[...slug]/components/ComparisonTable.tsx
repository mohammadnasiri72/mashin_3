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

function ComparisonTable({ car }: { car: ItemsId }) {
  const [loading, setLoading] = useState<boolean>(false);

  const id = car.properties.find(
    (e) => e.propertyKey === "p1044_relatedcar",
  )?.propertyValue;

  const sum = car.properties
    .filter(
      (e) => Number(e.propertyValue) >= 0 && Number(e.propertyValue) <= 10,
    )
    .reduce((accumulator, currentItem) => {
      return accumulator + Number(currentItem.propertyValue);
    }, 0);

  // تابع برای مدیریت کلیک روی تصویر
  const handleImageClick = async (id: number) => {
    setLoading(true);

    try {
      const attachments: ItemsAttachment[] = !isNaN(id)
        ? await getAttachment(id)
        : [];

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
      console.error(`خطا در دریافت تصاویر خودرو :`, error);
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
    <div className="w-full">
      <Card
        className="shadow-xl border-2 border-red-200! hover:shadow-2xl transition-all duration-300 h-full"
        cover={
          <div className="relative p-6 bg-white">
            {/* تصویر با امکان کلیک */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={mainDomainOld + car.image}
                  alt={car.title}
                  className="w-full mx-auto h-56 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlay برای نمایش تعداد تصاویر */}
                <Tooltip title="مشاهده تصاویر" placement="left">
                  <div
                    onClick={(e) => handleImageClick(Number(id))}
                    className="absolute cursor-pointer hover:bg-red-100! hover:border-[#ce1a2a]! border-transparent! border top-3 right-0 bg-white! w-10 h-10 transition-all duration-300 rounded-2xl flex items-center justify-center"
                  >
                    {loading ? (
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
            <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-full ">
              <img
                className="w-20 h-20 rounded-full object-contain border-4 border-[#ce1a2a] shadow-lg bg-red-100! p-1"
                src={
                  mainDomainOld +
                  car.properties.find((e) => e.propertyKey === "p1044_logopic")
                    ?.propertyValue
                }
                alt={
                  car.properties.find((e) => e.propertyKey === "p1044_logopic")
                    ?.title
                }
              />
            </div>
          </div>
        }
      >
        {/* هدر کارد */}
        <div className="text-center mb-6 h-20">
          <Link
            href={`/car/${car.title}?id=${id}`}
            className="text-xl font-bold text-[#333]! mb-2!"
          >
            {car.title}
          </Link>
          {/* عنوان انگلیسی */}
          <p className="text-gray-500 text-sm">
            {
              car.properties.find((e) => e.propertyKey === "p1044_titleen")
                ?.propertyValue
            }
          </p>
        </div>

        {/* لیست ویژگی‌ها */}
        <div className="space-y-3">
          {car.properties
            .filter(
              (e) =>
                Number(e.propertyValue) > 0 && Number(e.propertyValue) <= 10,
            )
            .map((row, index) => (
              <div
                key={row.id}
                className={`p-3 rounded-lg border transition-all duration-200 border-emerald-300 bg-emerald-25 ${
                  index % 2 === 0
                    ? "bg-white border-gray-200"
                    : "bg-gray-50 border-gray-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full ml-2 bg-[#ce1a2a]! animate-pulse `}
                    ></div>
                    <span className="font-semibold text-gray-800 text-sm">
                      {row.title}
                    </span>
                  </div>
                  <span className={`font-bold text-lg text-[#ce1a2a]!  `}>
                    {row.propertyValue}
                  </span>
                </div>
              </div>
            ))}
        </div>
        {/* امتیاز کل */}
        <div className="w-full flex justify-center pt-5">
          <div className="rounded-full w-28 h-28 bg-red-100 border-[#ce1a2a]! border-4 p-4 flex flex-col justify-center items-center">
            <span>امتیاز کل</span>
            <span className="font-bold text-3xl!">{sum}</span>
            <div className="flex items-center justify-center gap-0.5">
              {[1, 2, 3].map((e) => (
                <FaStar key={e} className="text-[#ce1a2a]!" />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ComparisonTable;
