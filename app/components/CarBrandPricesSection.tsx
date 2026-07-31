"use client";

import { getPriceCar } from "@/services/Price/PriceCar";
import { getPriceCarBrands } from "@/services/Price/PriceCarBrands";
import { formatPersianDate } from "@/utils/func";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeftLong, FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { mainDomain } from "@/utils/mainDomain";
import AOS from "aos";
import { getPriceMotorBrands } from "@/services/Price/PriceMotorBrands";
import { getPriceMotor } from "@/services/Price/PriceMotor";
import { FaArrowDown, FaArrowUp, FaChevronLeft } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";

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
    if (type==='motor') {
       try {
      const brands: BrandsPrice = await getPriceMotorBrands('all');
      setBrands(brands.brands);
      if (brands.brands.length > 0) {
        fetchPrice(type, brands.brands[0].id);
        setActiveBrand(brands.brands[0].id);
      }
    } catch (err) {
    } finally {
      setLoadingBrands(false);
    }
    }else{
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
    }
   
  };

  const fetchPrice = async (type: string, brandId: number) => {
    setLoadingPrices(true);
    if (type==='motor') {
      console.log(brandId);
      
       try {
      const price: Price = await getPriceMotor({
        Type: 'all',
        BrandId: brandId,
      });
      
      setPrices(price.prices);
    } catch (err) {
    } finally {
      setLoadingPrices(false);
    }
    }else{
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
    <section className="mb-5! mt-20 overflow-hidden" aria-label="قیمت خودرو">
      <div className="mx-auto px-4">
        {/* هدر بخش */}
        <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center sm:mb-0! mb-10! gap-4 h-14">
          <div className="mb-2! sm:w-auto w-full p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
            <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
              قیمت روز خودرو
            </h3>
          </div>

          {/* تب‌ها */}
          <div className="flex gap-4">
            <button
              aria-label="خودرو داخلی"
              className={`px-4 py-2 font-medium cursor-pointer whitespace-nowrap ${
                type === "motor"
                  ? "text-[#ce1a2a]! font-extrabold! text-[20px]!"
                  : "text-gray-600 text-sm"
              } transition-all duration-200`}
              onClick={() => {
                setType("motor");
                fetchBrands("motor");
              }}
            >
              موتورسیکلت
            </button>
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
            <div className="h-52 ">
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
                className="brands-swiper mb-8!"
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
                      <div className="w-full h-24 flex items-center justify-center mb-4!">
                        {brand.image && (
                          <img
                            src={mainDomain + brand.image}
                            alt={brand.title}
                            className="object-contain"
                            loading="lazy"
                          />
                        )}
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
         {/* محتوای قیمت‌ها - طرح جدید شبیه MarketStats */}
{!loadingPrices && (
  <div className="related-content">
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {prices
          .filter((e) => e.price1 > 0)
          .slice(0, 12)
          .map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200 gap-2"
              data-aos="custom-fade-down"
            >
              {/* سمت راست: آیکون + عنوان */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  {item.change > 0 && (
                    <FaArrowTrendUp className="text-emerald-600" />
                  )}
                  {item.change < 0 && (
                    <FaArrowTrendDown className="text-red-600" />
                  )}
                  {(!item.change || item.change === 0) && (
                    <MdOutlineCompareArrows className="text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-xs truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 truncate">
                    {item.brandTitle}
                  </p>
                </div>
              </div>

              {/* سمت چپ: قیمت + تغییرات */}
              <div className="text-left shrink-0">
                {item.price1 > 0 ? (
                  <>
                    <div className="font-bold text-gray-900 text-xs whitespace-nowrap flex items-center gap-1 justify-end">
                      {item.price1.toLocaleString()}
                      <Image
                        src="/images/icons/toman.png"
                        alt="تومان"
                        width={12}
                        height={8}
                        className="w-3 h-2 opacity-70"
                      />
                    </div>
                    {item.change && item.change !== 0 && (
                      <div
                        className={`flex items-center justify-end gap-0.5 text-[10px] ${
                          item.change > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.change > 0 ? (
                          <FaArrowUp className="w-2 h-2" />
                        ) : (
                          <FaArrowDown className="w-2 h-2" />
                        )}
                        <span className="whitespace-nowrap">
                          {item.change.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-xs font-medium text-gray-400">---</span>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* دکمه مشاهده همه */}
      {prices.filter((e) => e.price1 > 0).length > 8 && (
       <div className="flex justify-center">
         <Link
          href={type === 'motor' ? `/motorcycle-prices.html` : `/price.html?type=${type}`}
          className=" w-auto inline-block mt-3 cursor-pointer py-2 px-3 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white! transition-colors duration-300 text-sm"
        >
        <span className="flex items-center justify-center gap-1"> <span>مشاهده همه</span>
          <FaChevronLeft className="w-3 h-3" /></span>
        </Link>
       </div>
      )}
    </div>
  </div>
)}
{loadingPrices && (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mt-4!">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="h-16 bg-gray-200 rounded-lg animate-pulse"></div>
      ))}
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
