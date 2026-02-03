"use client";

import { getAttachment } from "@/services/Attachment/Attachment";
import { createMarkup, createpublishCode } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Card, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import SelectCarCompare from "./SelectCarCompare";

function CompareClient({
  brandsCar,
  dataCompare,
  ids,
}: {
  brandsCar: ItemsCategory[];
  dataCompare: ItemsId[];
  ids: string;
}) {
  // Initialize Fancybox
  useEffect(() => {
    Fancybox.bind("[data-fancybox='main-gallery']", {
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

  const router = useRouter();

  const mergePropertiesToArrayValues = (data: ItemsId[]) => {
    const map = new Map();
    const count = data.length;

    data.forEach((item, index) => {
      item.properties
        .filter((e) => e.isTechnicalProperty)
        .forEach((prop) => {
          if (!map.has(prop.title)) {
            map.set(prop.title, {
              title: prop.title,
              values: Array(count).fill(null),
            });
          }

          map.get(prop.title).values[index] = prop.value;
        });
    });

    return Array.from(map.values());
  };

  const dataCompareSorted = mergePropertiesToArrayValues(dataCompare);

  const getAttachmentHandler = async (id: number) => {
    try {
      const Attachment: ItemsAttachment[] = await getAttachment(id);
      Fancybox.show(
        [
          dataCompare.find((e) => e.id === id)?.image,
          ...Attachment.map((obj) => obj.fileUrl),
        ].map((img) => ({
          src: mainDomainOld + img,
          thumb: mainDomainOld + img,
        })),
        { startIndex: 0 },
      );
    } catch (err) {}
  };

  return (
    <>
      <div className=" bg-[#f4f4f4] py-8 mx-auto px-4">
        <div className="flex h-full gap-2">
          {dataCompare.length > 0 &&
            dataCompare.map((car, index) => (
              <div
                key={car.id}
                className={`lg:w-1/3 w-1/2 ${
                  index > 1 ? "md:block hidden" : ""
                }`}
              >
                <div className="w-full">
                  <Card
                    className="shadow-xl border-2 border-emerald-200 hover:shadow-2xl transition-all duration-300 h-full"
                    cover={
                      <div className="relative m-0! p-2! bg-white ">
                        <img
                          onClick={() => {
                            getAttachmentHandler(car.id);
                          }}
                          src={mainDomainOld + car.image}
                          alt={car.title}
                          className="w-auto mx-auto h-20 object-contain cursor-pointer"
                        />
                        <Tooltip title="حذف ماشین" placement="top">
                          <IoClose
                            className="sm:text-4xl text-xl cursor-pointer absolute top-2 left-2 hover:bg-slate-200 bg-slate-100/80 rounded-full duration-300 sm:p-2 p-1"
                            onClick={() => {
                              const newIds = ids
                                .replace("%2C", ",")
                                .split(",")
                                .filter((num) => num !== String(car.id))
                                .join(",");

                              router.push(`/compare/${newIds}`);
                            }}
                          />
                        </Tooltip>
                      </div>
                    }
                  >
                    {/* هدر کارد */}
                    <div className="text-center">
                      <Link href={car.url}>
                        <h3 className="sm:text-xl text-sm font-bold text-[#ce1a2a]! sm:text-gray-700! sm:hover:text-[#ce1a2a]! duration-300">
                          {car.sourceName} {car.title}{" "}
                          {createpublishCode(car.publishCode)}
                        </h3>
                      </Link>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          {dataCompare.length < 3 && (
            <SelectCarCompare
              dataCompare={dataCompare}
              brandsCar={brandsCar}
              ids={ids}
            />
          )}
        </div>
        {/* لیست ویژگی‌ها */}
        <div className="">
          {dataCompareSorted.length > 0 &&
            dataCompareSorted.map((item) => (
              <div
                key={item.title}
                className="py-3 border-b border-dashed border-[#0005] "
              >
                <h3 className="sm:text-lg text-sm text-teal-800! mb-7!">
                  {item.title}
                </h3>
                <div className="flex gap-2">
                  {item.values.map((val: string[], index: number) => (
                    <div
                      key={index}
                      className={`lg:w-1/3 w-1/2 ${
                        index > 1 ? "md:block hidden" : ""
                      }
                      `}
                    >
                      <p className="sm:text-sm text-xs px-5">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        {/* مزایا */}
        <div className="sm:px-3 py-3 border-b border-[#0002]">
          <h3 className="sm:text-lg text-sm text-green-600!">مزایا</h3>
          <div className="flex gap-2">
            {dataCompare.length > 0 &&
              dataCompare.map((car, index) => {
                const advantages = car.properties.filter(
                  (e) => e.propertyId === 22639,
                );

                return (
                  <div
                    key={car.id}
                    className={`lg:w-1/3 w-1/2 ${
                      index > 1 ? "md:block hidden" : ""
                    }`}
                  >
                    {advantages && advantages.length > 0 && (
                      <div className="bg-green-50 rounded-xl px-4 py-2 mt-2 h-full">
                        <ul className="flex flex-wrap ">
                          {advantages.map((advantage) => (
                            <li
                              key={advantage.id}
                              className="text-gray-800 font-medium flex items-start w-full"
                            >
                              <span className="text-green-500 ml-2 mt-1">
                                •
                              </span>
                              <div
                                className="text-gray-600 text-justify sm:text-sm! text-xs!"
                                dangerouslySetInnerHTML={createMarkup(
                                  advantage.value,
                                )}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* معایب */}
        <div className="sm:px-3 py-3 border-b border-[#0002]">
          <h3 className="sm:text-lg text-sm text-red-600!">معایب</h3>
          <div className="flex gap-2 mt-2">
            {dataCompare.length > 0 &&
              dataCompare.map((car, index) => {
                const disadvantages = car.properties.filter(
                  (e) => e.propertyId === 22640,
                );
                return (
                  <div
                    key={car.id}
                    className={`lg:w-1/3 w-1/2 ${
                      index > 1 ? "md:block hidden" : ""
                    }`}
                  >
                    {disadvantages && disadvantages.length > 0 && (
                      <div className="bg-red-50 rounded-xl p-6 my-3">
                        <ul className="flex flex-wrap space-y-3">
                          {disadvantages.map((disadvantage) => (
                            <li
                              key={disadvantage.id}
                              className="text-gray-800 font-medium flex items-start w-full"
                            >
                              <span className="text-red-500 ml-2 mt-1">•</span>
                              <div
                                className="text-gray-700 leading-8 text-justify sm:text-sm! text-xs!"
                                dangerouslySetInnerHTML={createMarkup(
                                  disadvantage.value,
                                )}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default CompareClient;
