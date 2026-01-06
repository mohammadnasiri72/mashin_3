"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface BrandItem {
  id: number;
  image: string;
  alt: string;
  name: string;
  type: "domestic" | "chinese" | "foreign";
}

interface PriceItem {
  id: number;
  brand: string;
  model: string;
  price: string;
  date: string;
  brandId: number;
}

interface CarBrandPricesSectionProps {
  brands?: BrandItem[];
  priceItems?: PriceItem[];
}

const CarBrandPricesSection = ({
  brands = [
    {
      id: 1,
      image: "/images/gallery/benz.png",
      alt: "Mercedes-Benz",
      name: "Mercedes-Benz",
      type: "foreign",
    },
    {
      id: 2,
      image: "/images/gallery/ford.png",
      alt: "Ford",
      name: "Ford",
      type: "foreign",
    },
    {
      id: 3,
      image: "/images/gallery/bmw.png",
      alt: "BMW",
      name: "BMW",
      type: "foreign",
    },
    {
      id: 4,
      image: "/images/gallery/porsche.png",
      alt: "Porsche",
      name: "Porsche",
      type: "foreign",
    },
    {
      id: 5,
      image: "/images/gallery/pagani.png",
      alt: "Pagani",
      name: "Pagani",
      type: "foreign",
    },
    {
      id: 6,
      image: "/images/gallery/jeep.png",
      alt: "Jeep",
      name: "Jeep",
      type: "foreign",
    },
    {
      id: 7,
      image: "/images/gallery/toyota.png",
      alt: "Toyota",
      name: "Toyota",
      type: "foreign",
    },
  ],
  priceItems = [
    {
      id: 1,
      brand: "پورشه",
      model: "ماکان",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      date: "۱۴۰۳/۰۳/۲۲",
      brandId: 4,
    },
    {
      id: 2,
      brand: "پورشه",
      model: "ماکان",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      date: "۱۴۰۳/۰۳/۲۲",
      brandId: 4,
    },
    {
      id: 3,
      brand: "پورشه",
      model: "ماکان",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      date: "۱۴۰۳/۰۳/۲۲",
      brandId: 4,
    },
    {
      id: 4,
      brand: "پورشه",
      model: "ماکان",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      date: "۱۴۰۳/۰۳/۲۲",
      brandId: 4,
    },
    {
      id: 5,
      brand: "پورشه",
      model: "ماکان",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      date: "۱۴۰۳/۰۳/۲۲",
      brandId: 4,
    },
    {
      id: 6,
      brand: "پورشه",
      model: "ماکان",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      date: "۱۴۰۳/۰۳/۲۲",
      brandId: 4,
    },
    {
      id: 7,
      brand: "پورشه",
      model: "ماکان",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      date: "۱۴۰۳/۰۳/۲۲",
      brandId: 4,
    },
    {
      id: 8,
      brand: "پورشه",
      model: "ماکان",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      date: "۱۴۰۳/۰۳/۲۲",
      brandId: 4,
    },
    {
      id: 9,
      brand: "پورشه",
      model: "ماکان",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      date: "۱۴۰۳/۰۳/۲۲",
      brandId: 4,
    },
    {
      id: 10,
      brand: "پورشه",
      model: "ماکان",
      price: "۱۸,۰۰۰,۰۰۰,۰۰۰",
      date: "۱۴۰۳/۰۳/۲۲",
      brandId: 4,
    },
  ],
}: CarBrandPricesSectionProps) => {
  const [activeTab, setActiveTab] = useState<"tab-1" | "tab-2" | "tab-3">(
    "tab-3"
  );
  const [activeBrand, setActiveBrand] = useState<number>(4); // Porsche is active by default

  const handleTabChange = (tab: "tab-1" | "tab-2" | "tab-3") => {
    setActiveTab(tab);
  };

  const handleBrandClick = (brandId: number) => {
    setActiveBrand(brandId);
  };

  const filteredPriceItems = priceItems.filter(
    (item) => item.brandId === activeBrand
  );

  return (
    <div className="mb-5 mt-20">
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
              className={`px-4 py-2 text-gray-600 font-medium text-sm cursor-pointer whitespace-nowrap ${
                activeTab === "tab-1"
                  ? "text-[#ce1a2a]! font-extrabold! text-[20px]!"
                  : "text-gray-600 text-sm"
              } transition-all duration-200`}
              onClick={() => handleTabChange("tab-1")}
            >
              برند داخلی
            </button>
            <button
              className={`px-4 py-2 text-gray-600 font-medium text-sm cursor-pointer whitespace-nowrap ${
                activeTab === "tab-2"
                  ? "text-[#ce1a2a]! font-extrabold! text-[20px]!"
                  : "text-gray-600 text-sm"
              } transition-all duration-200`}
              onClick={() => handleTabChange("tab-2")}
            >
              برند چینی
            </button>
            <button
              className={`px-4 py-2 font-medium cursor-pointer whitespace-nowrap ${
                activeTab === "tab-3"
                  ? "text-[#ce1a2a]! font-extrabold! text-[20px]!"
                  : "text-gray-600 text-sm"
              } transition-all duration-200`}
              onClick={() => handleTabChange("tab-3")}
            >
              برند خارجی
            </button>
          </div>
        </div>

        {/* محتوای تب‌ها */}
        <div className="tab-content">
          {/* تب برند داخلی */}
          <div className={`${activeTab === "tab-1" ? "block" : "hidden"}`}>
            <p className="text-center text-gray-500 py-8">محتوای برند داخلی</p>
          </div>

          {/* تب برند چینی */}
          <div className={`${activeTab === "tab-2" ? "block" : "hidden"}`}>
            <p className="text-center text-gray-500 py-8">محتوای برند چینی</p>
          </div>

          {/* تب برند خارجی */}
          <div className={`${activeTab === "tab-3" ? "block" : "hidden"}`}>
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
              loop={true}
              className="brands-swiper mb-8"
              dir="rtl"
            >
              {brands.map((brand) => (
                <SwiperSlide key={brand.id}>
                  <div
                    className={`brand-box flex flex-col items-center text-center p-5 h-44 border border-gray-200 rounded-2xl relative bg-white cursor-pointer transition-all duration-300 ${
                      activeBrand === brand.id
                        ? "bg-linear-to-b from-red-500 to-[#ce1a2a] text-white! shadow-lg"
                        : "hover:shadow-md"
                    }`}
                    onClick={() => handleBrandClick(brand.id)}
                  >
                    <div className="w-full h-24 flex items-center justify-center mb-4">
                      <Image
                        src={brand.image}
                        alt={brand.alt}
                        width={80}
                        height={60}
                        className="max-w-full h-auto object-contain"
                      />
                    </div>
                    <h4
                      className={`text-sm font-bold absolute bottom-5 left-0 right-0 text-center ${
                        activeBrand === brand.id
                          ? "text-white"
                          : "text-gray-900"
                      } uppercase`}
                    >
                      {brand.name}
                    </h4>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* محتوای مرتبط با برند انتخاب شده */}
            <div className="related-content ">
              <div className="flex flex-wrap -mx-2 -mt-5!">
                {filteredPriceItems.slice(0, 9).map((item, index) => (
                  <div
                    key={item.id}
                    className="w-full md:w-1/2 px-2 mb-4 transition-all! duration-500!"
                    data-aos="custom-fade-down"
                  >
                    <div className="bg-white rounded-2xl shadow-sm p-5 flex sm:flex-nowrap flex-wrap items-center gap-5 text-base font-bold text-gray-900">
                      <div className="text-center sm:text-right w-full">
                        {item.brand}، {item.model}
                      </div>
                      <div className="text-center flex items-center justify-center gap-2 w-full">
                        <Image
                          src="/images/icons/toman.png"
                          alt="تومان"
                          width={12}
                          height={8}
                          className="w-3 h-2"
                        />
                        {item.price}
                      </div>
                      <div className="text-center sm:text-left text-sm font-medium text-gray-500 w-full">
                        {item.date}
                      </div>
                    </div>
                  </div>
                ))}
                {filteredPriceItems.length > 9 && (
                  <Link
                    href="#"
                    data-aos="custom-fade-down"
                    className="text-[#ce1a2a]! bg-white w-full md:w-1/2 px-2 mb-4 rounded-2xl shadow-sm p-5 flex items-center justify-center hover:bg-linear-to-b hover:from-red-400 hover:to-[#ce1a2a] transition-all! duration-500! text-sm font-bold hover:text-white! gap-2"
                  >
                    نمایش بیشتر
                    <FaArrowLeftLong />
                  </Link>
                )}
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default CarBrandPricesSection;
