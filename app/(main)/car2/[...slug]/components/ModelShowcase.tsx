// components/ModelShowcase.tsx
"use client";

import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
// @ts-ignoreimport
import "swiper/css";
// @ts-ignoreimport
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import { getItem } from "@/services/Item/Item";
import { useDispatch } from "react-redux";
import { setIsModelCar } from "@/redux/slice/isModelCar";

interface ModelShowcaseProps {
  detailsCar: ItemsId;
}

export default function ModelShowcase({
  detailsCar,
}: ModelShowcaseProps) {
  const dispatch = useDispatch()
  const [brandModels , setBrandModels] = useState<Items[]>([])
  const [specificModels , setSpecificModels] = useState<Items[]>([])
  const brandName = detailsCar.sourceName || "خودرو";
  const specificName = detailsCar.title || "";
  const specificHref = detailsCar.breadcrumb.find(
    (e) => e.title === detailsCar.title,
  )?.href;
  const brandHref =  detailsCar.breadcrumb.find(
                  (e) => e.title === detailsCar.sourceName,
                )?.href;
 
  const isFetched = useRef(false);
  const sourceLink = detailsCar.sourceLink;
  const categoryId = String(detailsCar.categoryId);
  useEffect(() => {
    if (isFetched.current || !sourceLink || !categoryId) return;
    isFetched.current = true;
    

    const fetchData = async () => {
      try {
        const [carsModel, carsModel2] = await Promise.all([
          sourceLink
            ? getItem({
                TypeId: 1042,
                langCode: "fa",
                CategoryIdArray: sourceLink,
                PageIndex: 1,
                PageSize: 5,
              })
            : Promise.resolve([]),
          categoryId
            ? getItem({
                TypeId: 1042,
                langCode: "fa",
                CategoryIdArray: categoryId,
                PageIndex: 1,
                PageSize: 5,
                FullData: true,
              })
            : Promise.resolve([]),
        ]);        
        setBrandModels(carsModel)
        setSpecificModels(carsModel2)
        console.log(carsModel);
        
        if ((carsModel&&carsModel.length>1)  || (carsModel2&&carsModel2.length>1)) {
          dispatch(setIsModelCar(true))
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
 const hasBrandModels = brandModels && brandModels.length > 1;
  const hasSpecificModels = specificModels && specificModels.length > 1;

  if (!hasBrandModels && !hasSpecificModels) return null;
  return (
    <section dir="rtl" className="mx-auto w-full">
      <div
        className={`grid grid-cols-1  gap-6 ${hasBrandModels && hasSpecificModels ? "lg:grid-cols-2" : "lg:grid-cols-1"}`}
      >
        {/* مدل‌های برند */}
        {hasBrandModels && (
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900">
                مدل‌های <span className="text-[#ce1a2a]">{brandName}</span>
              </h2>
              <Link
                href={brandHref || "#"}
                className="flex items-center gap-0.5 text-sm font-medium text-[#ce1a2a]! hover:text-red-700! transition-colors"
              >
                همه مدل‌های {brandName}
                <BiChevronLeft fontSize="small" />
              </Link>
            </div>

            <div className="relative">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  prevEl: `.brand-models-prev`,
                  nextEl: `.brand-models-next`,
                }}
                spaceBetween={12}
                slidesPerView={2}
                dir="rtl"
                breakpoints={{
                  480:
                    hasBrandModels && hasSpecificModels
                      ? { slidesPerView: 2 }
                      : { slidesPerView: 2 },
                  640:
                    hasBrandModels && hasSpecificModels
                      ? { slidesPerView: 4 }
                      : { slidesPerView: 4 },
                  768:
                    hasBrandModels && hasSpecificModels
                      ? { slidesPerView: 6 }
                      : { slidesPerView: 6 },
                  1024:
                    hasBrandModels && hasSpecificModels
                      ? { slidesPerView: 3 }
                      : { slidesPerView: 6 },
                }}
                className="w-full"
              >
                {brandModels.map((model) => (
                  <SwiperSlide key={model.id}>
                    <Link href={model.url} className="block group py-1">
                      <div className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#ce1a2a]">
                        <div className="relative aspect-4/3 w-full overflow-hidden">
                          <img
                            src={mainDomain + model.image}
                            alt={`${model.sourceName} ${model.title}`}
                            className="object-contain group-hover:scale-105 h-full transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col gap-1 p-3">
                          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 h-10 group-hover:text-[#ce1a2a] transition-colors">
                            {model.sourceName} {model.title}
                            {model.publishCode && (
                              <span className="text-xs text-slate-400">
                                {model.publishCode}
                              </span>
                            )}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation buttons */}
              <button
                aria-label="قبلی"
                className="brand-models-prev border border-black/10 absolute right-0 translate-x-1/2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90! text-slate-700 shadow-md hover:bg-white! cursor-pointer"
              >
                <BiChevronRight className="text-xl" />
              </button>
              <button
                aria-label="بعدی"
                className="brand-models-next border border-black/10 absolute left-0 -translate-x-1/2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90! text-slate-700 shadow-md hover:bg-white! cursor-pointer"
              >
                <BiChevronLeft className="text-xl" />
              </button>
            </div>
          </div>
        )}

        {/* مدل‌های خاص */}
        {hasSpecificModels && (
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900">
                مدل‌های{" "}
                <span className="text-[#ce1a2a]">
                  {brandName} {specificName}
                </span>
              </h2>
              <Link
                href={specificHref || "#"}
                className="flex items-center gap-0.5 text-sm font-medium text-[#ce1a2a]! hover:text-red-700! transition-colors"
              >
                همه مدل‌های {brandName} {specificName}
                <BiChevronLeft fontSize="small" />
              </Link>
            </div>

            <div className="relative">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  prevEl: `.specific-models-prev`,
                  nextEl: `.specific-models-next`,
                }}
                spaceBetween={12}
                slidesPerView={2}
                dir="rtl"
                breakpoints={{
                  480:
                    hasBrandModels && hasSpecificModels
                      ? { slidesPerView: 2 }
                      : { slidesPerView: 2 },
                  640:
                    hasBrandModels && hasSpecificModels
                      ? { slidesPerView: 4 }
                      : { slidesPerView: 4 },
                  768:
                    hasBrandModels && hasSpecificModels
                      ? { slidesPerView: 6 }
                      : { slidesPerView: 6 },
                  1024:
                    hasBrandModels && hasSpecificModels
                      ? { slidesPerView: 3 }
                      : { slidesPerView: 6 },
                }}
                className="w-full"
              >
                {specificModels.map((model) => (
                  <SwiperSlide key={model.id}>
                    <Link href={model.url} className="block group py-1">
                      <div className="flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#ce1a2a]">
                        <div className="relative aspect-4/3 w-full overflow-hidden">
                          <img
                            src={mainDomain + model.image}
                            alt={`${model.sourceName} ${model.title}`}
                            className="object-contain group-hover:scale-105 h-full transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col gap-1 p-3">
                          <h3 className="text-sm font-bold text-slate-900 line-clamp-2 h-10 group-hover:text-[#ce1a2a] transition-colors flex gap-0.5 items-center">
                            {model.sourceName} {model.title}
                            {model.publishCode && (
                              <span className="text-xs text-slate-900/80">
                                ({model.publishCode})
                              </span>
                            )}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation buttons */}
              <button
                aria-label="قبلی"
                className="specific-models-prev border border-black/10 absolute right-0 translate-x-1/2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90! text-slate-700 shadow-md hover:bg-white! cursor-pointer"
              >
                <BiChevronRight className="text-xl" />
              </button>
              <button
                aria-label="بعدی"
                className="specific-models-next border border-black/10 absolute left-0 -translate-x-1/2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90! text-slate-700 shadow-md hover:bg-white! cursor-pointer"
              >
                <BiChevronLeft className="text-xl" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
