"use client";

import { getPriceCar } from "@/services/Price/PriceCar";
import { getPriceCarBrands } from "@/services/Price/PriceCarBrands";
import { formatPersianDate } from "@/utils/func";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import AOS from "aos";

const CarBrandPricesSection = ({
  initialBrands,
  initialPrices,
}: {
  initialBrands: PriceBrands[];
  initialPrices: Prices[];
}) => {
  const [type, setType] = useState<string>("internal");
  const [loadingBrands, setLoadingBrands] = useState<boolean>(false);
  const [brands, setBrands] = useState<PriceBrands[]>(initialBrands);
  const [loadingPrices, setLoadingPrices] = useState<boolean>(false);
  const [prices, setPrices] = useState<Prices[]>(initialPrices);
  const [activeBrand, setActiveBrand] = useState<number>(NaN);

  useEffect(() => {
    if (!loadingPrices && prices.length > 0) {
      // کمی تاخیر برای اطمینان از رندر شدن DOM
      setTimeout(() => {
        AOS.refresh();
      }, 300);
    }
  }, [loadingPrices, prices]);

  const fetchBrands = async (type: string) => {
    setLoadingBrands(true);
    setLoadingPrices(true);
    try {
      const brands: BrandsPrice = await getPriceCarBrands(type);
      setBrands(brands.brands);
      if (brands.brands.length > 0) {
        fetchPrice(type, brands.brands[0].id);
        setActiveBrand(brands.brands[0].id);
      }
    } catch (err) {
    } finally {
      setLoadingBrands(false);
    }
  };

  const fetchPrice = async (type: string, brandId: number) => {
    setLoadingPrices(true);
    try {
      const price: Price = await getPriceCar({
        Type: type,
        BrandId: brandId,
      });
      setPrices(price.prices);
    } catch (err) {
    } finally {
      setLoadingPrices(false);
    }
  };

  const [skeletonCount, setSkeletonCount] = useState(7);

  useEffect(() => {
    const calculateCount = () => {
      const width = window.innerWidth;
      if (width < 640) return 2;
      if (width < 768) return 4;
      if (width < 1024) return 6;
      if (width < 1280) return 7;
      return 7;
    };

    const handleResize = () => {
      setSkeletonCount(calculateCount());
    };

    handleResize(); // مقدار اولیه
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="mb-5 mt-20" aria-label="قیمت خودرو">
      <div className="mx-auto px-4">
        {/* هدر بخش */}
        <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center sm:mb-0! mb-10! gap-4 h-14">
          <div className="mb-2! sm:w-auto w-full p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
            <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
              قیمت برند خودرویی
            </h3>
          </div>

          {/* تب‌ها */}
          <div className="flex gap-4">
            <button
              aria-label="خودرو وارداتی"
              className={`px-4 py-2 text-gray-600 font-medium text-sm cursor-pointer whitespace-nowrap ${
                type === "import"
                  ? "text-[#ce1a2a]! font-extrabold! text-[20px]!"
                  : "text-gray-600 text-sm"
              } transition-all duration-200`}
              onClick={() => {
                setType("import");
                fetchBrands("import");
              }}
            >
              خودرو وارداتی
            </button>
            <button
              aria-label="خودرو داخلی"
              className={`px-4 py-2 font-medium cursor-pointer whitespace-nowrap ${
                type === "internal"
                  ? "text-[#ce1a2a]! font-extrabold! text-[20px]!"
                  : "text-gray-600 text-sm"
              } transition-all duration-200`}
              onClick={() => {
                setType("internal");
                fetchBrands("internal");
              }}
            >
              خودرو داخلی
            </button>
          </div>
        </div>

        {/* محتوای تب‌ها */}
        <div className="tab-content">
          {!loadingBrands && (
            <div className="h-56">
              {/* اسلایدر برندها */}
              <Swiper
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView={2}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 4,
                  },
                  1024: {
                    slidesPerView: 6,
                  },
                  1280: {
                    slidesPerView: 7,
                  },
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                // loop={true}
                className="brands-swiper mb-8"
                dir="rtl"
              >
                {brands.map((brand) => (
                  <SwiperSlide key={brand.id}>
                    <div
                      className={`brand-box flex flex-col items-center text-center px-5 h-44 border border-gray-200 rounded-2xl relative bg-white cursor-pointer transition-all duration-300 ${
                        activeBrand === brand.id
                          ? "bg-linear-to-b from-red-500 to-[#ce1a2a] text-white! shadow-lg"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => {
                        setActiveBrand(brand.id);
                        fetchPrice(type, brand.id);
                      }}
                    >
                      <div className="w-full h-24 flex items-center justify-center mb-4">
                        <img
                          src={brand.image || ""}
                          alt={brand.title}
                          className="max-w-full h-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                      <h4
                        className={`text-sm font-bold absolute bottom-1 h-10 left-0 right-0 text-center line-clamp-2 ${
                          activeBrand === brand.id
                            ? "text-white!"
                            : "text-gray-900!"
                        } uppercase`}
                      >
                        {brand.title}
                      </h4>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {loadingBrands && (
            <div className="h-52 flex justify-center gap-2">
              {[...Array(skeletonCount)].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-44 bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          )}

          {/* محتوای مرتبط با برند انتخاب شده */}
          {!loadingPrices && (
            <div className="related-content">
              <div className="flex flex-wrap -mx-2 -mt-5!">
                {prices.slice(0, 9).map((item) => (
                  <div
                    key={item.id}
                    className="w-full md:w-1/2 px-2 mb-4 transition-all! duration-500!"
                    data-aos="custom-fade-down"
                  >
                    <div className="bg-white rounded-2xl shadow-sm p-5 flex sm:flex-nowrap flex-wrap items-center gap-5 text-base font-bold text-gray-900">
                      <div className="text-center sm:text-right w-1/2 line-clamp-1">
                        {item.title}
                      </div>
                      {item.price1 > 0 ? (
                        <div className="text-center flex items-center justify-center gap-2 w-1/4">
                          <Image
                            src="/images/icons/toman.png"
                            alt="تومان"
                            width={12}
                            height={8}
                            className="w-3 h-2"
                          />
                          {item.price1.toLocaleString()}
                        </div>
                      ) : (
                        <div className="text-center flex items-center justify-center gap-2 w-1/4">
                          ---
                        </div>
                      )}
                      <div className="text-center sm:text-left text-sm font-medium text-gray-500 w-1/4">
                        {formatPersianDate(item.modified)}
                      </div>
                    </div>
                  </div>
                ))}
                {prices.length > 9 && (
                  <Link
                    href={`/price.html?type=${type}`}
                    data-aos="custom-fade-down"
                    className="text-[#ce1a2a]! bg-white w-full md:w-1/2 px-2 mb-4 rounded-2xl shadow-sm p-5 flex items-center justify-center hover:bg-linear-to-b hover:from-red-400 hover:to-[#ce1a2a] transition-all! duration-500! text-sm font-bold hover:text-white! gap-2"
                  >
                    نمایش بیشتر
                    <FaArrowLeftLong />
                  </Link>
                )}
              </div>
            </div>
          )}
          {loadingPrices && (
            <div className="flex flex-wrap">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="md:w-1/2 w-full h-16 p-1 mt-3">
                  <div className="w-full h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .brands-swiper {
          padding: 10px 5px 30px 5px;
        }

        .brands-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .brand-box {
          transition: all 0.3s ease;
        }

        .brand-box:hover {
          transform: translateY(-2px);
        }
        [data-aos="custom-fade-down"] {
          opacity: 0;
          transform: translateY(-20px); /* حرکت کمتر از 120px به 20px */
          transition-property: opacity, transform;
        }

        [data-aos="custom-fade-down"].aos-animate {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default CarBrandPricesSection;
