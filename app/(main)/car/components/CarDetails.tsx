"use client";

import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Fancybox
import { RootState } from "@/redux/store";
import { PostPollSave } from "@/services/Poll/PollSave";
import { getPollId } from "@/services/Poll/pollId";
import { createpublishCode, Toast, toPersianNumbers } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import { Skeleton } from "antd";
import Link from "next/link";
import { FaCalendarDays, FaCodeCompare, FaCommentDots } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Cookies = require("js-cookie");

const CarDetails = ({
  Attachment,
  detailsCar,
  initialPollData,
}: {
  Attachment: ItemsAttachment[];
  detailsCar: ItemsId;
  initialPollData: PollData;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isRatingMode, setIsRatingMode] = useState<boolean>(false);
  const [userRatings, setUserRatings] = useState<{ [key: number]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [pollData, setPollData] = useState<PollData>(initialPollData);
  const [pollSaveData, setPollSaveData] = useState<PollSaveParam>({
    caseId: detailsCar.id,
    pollScoreDto: [],
  });

  const token = useSelector((state: RootState) => state.token.token);
  const user = Cookies.get("user");

  const specifications = detailsCar.properties.filter(
    (e) => e.isTechnicalProperty,
  );

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

  // Initialize user ratings with poll data
  useEffect(() => {
    const initialRatings: { [key: number]: number } = {};
    pollData.pollDetails.forEach((question) => {
      initialRatings[question.questionId] = 0;
    });
    setUserRatings(initialRatings);
  }, [pollData]);

  const handleRatingClick = (questionId: number, score: number) => {
    setPollSaveData((prev) => {
      // بررسی می‌کنیم آیا این سوال قبلاً در آرایه وجود دارد یا نه
      const existingQuestionIndex = prev.pollScoreDto.findIndex(
        (item) => item.questionId === questionId,
      );

      let newPollScoreDto;

      if (existingQuestionIndex >= 0) {
        // اگر سوال وجود دارد، امتیاز آن را آپدیت می‌کنیم
        newPollScoreDto = [...prev.pollScoreDto];
        newPollScoreDto[existingQuestionIndex] = {
          questionId,
          score,
        };
      } else {
        // اگر سوال وجود ندارد، آن را اضافه می‌کنیم
        newPollScoreDto = [...prev.pollScoreDto, { questionId, score }];
      }

      // همچنین userRatings را هم آپدیت می‌کنیم برای نمایش UI
      setUserRatings((userPrev) => ({
        ...userPrev,
        [questionId]: score,
      }));

      return {
        caseId: detailsCar.id,
        pollScoreDto: newPollScoreDto,
      };
    });
  };
  const handleSubmitRating = async () => {
    setIsSubmitting(true);
    try {
      await PostPollSave(pollSaveData, token);
      setIsRatingMode(false);
      try {
        const res = await getPollId(Number(detailsCar.id));
        setPollData(res);
      } catch (err) {}
      Toast.fire({
        icon: "success",
        title: "نظر شما با موفقیت ثبت شد",
      });
    } catch (error: any) {
      Toast.fire({
        icon: "error",
        title: error?.response?.data || "خطا در ثبت نظرسنجی",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelRating = () => {
    setIsRatingMode(false);
    // ریست کردن امتیازها
    const resetRatings: { [key: number]: number } = {};
    pollData.pollDetails.forEach((question) => {
      resetRatings[question.questionId] = 0;
    });
    setUserRatings(resetRatings);
  };

  return (
    <section className="py-5 bg-[#f4f4f4]">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Specifications */}
          <div className="lg:col-span-7">
            {/* Specifications Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specifications.slice(0, 6).map((spec, index) => (
                <div
                  key={index}
                  className="bg-white py-4 px-2 rounded-lg shadow-sm border border-gray-100 flex items-center"
                >
                  <div className="ml-3 w-1/5">
                    <img
                      src={"/images/icons/speedometer-large.png"}
                      alt={spec.title}
                      className="w-10"
                    />
                  </div>
                  <div className="w-4/5">
                    <div className="font-bold text-gray-800 text-sm">
                      {spec.value}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      {spec.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ratings Section */}
            <div className="bg-white py-6 px-4 rounded-lg shadow-sm border border-gray-100 mt-4">
              {isRatingMode ? (
                // Rating Form Mode
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      ثبت نظر و امتیاز شما
                    </h3>
                    <button
                      onClick={handleCancelRating}
                      className="text-sm text-[#ce1a2a]! hover:text-white! hover:bg-[#ce1a2a]! bg-slate-100 cursor-pointer px-3 py-1 rounded-lg duration-300"
                    >
                      انصراف
                    </button>
                  </div>

                  {pollData.pollDetails.map((question) => (
                    <div key={question.questionId} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">
                          {question.questionTitle}
                        </span>
                        <span className="text-[#ce1a2a] font-bold">
                          {userRatings[question.questionId] > 0
                            ? toPersianNumbers(userRatings[question.questionId])
                            : "۰"}
                          /۱۰
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        {/* Rating Stars */}
                        <div className="flex gap-1">
                          {[...Array(10)].map((_, index) => {
                            const score = index + 1;
                            return (
                              <button
                                key={score}
                                type="button"
                                onClick={() =>
                                  handleRatingClick(question.questionId, score)
                                }
                                className={`w-8 h-8 cursor-pointer flex items-center justify-center rounded-full transition-all duration-200 ${
                                  score <= userRatings[question.questionId]
                                    ? "bg-[#ce1a2a] text-white"
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                }`}
                              >
                                <span className="text-sm font-bold">
                                  {toPersianNumbers(score)}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Rating Progress Bar */}
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => {
                          const score = i + 1;
                          return (
                            <div
                              onClick={() =>
                                handleRatingClick(question.questionId, score)
                              }
                              key={i}
                              className={`h-2 flex-1 rounded-full cursor-pointer ${
                                i < userRatings[question.questionId]
                                  ? "bg-[#ce1a2a]"
                                  : "bg-gray-200"
                              }`}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={handleSubmitRating}
                      disabled={
                        isSubmitting ||
                        Object.values(userRatings).some(
                          (rating) => rating === 0,
                        )
                      }
                      className={`w-full cursor-pointer py-3 px-6 rounded-lg font-bold transition-all duration-300 flex items-center justify-center ${
                        Object.values(userRatings).some(
                          (rating) => rating === 0,
                        )
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-[#ce1a2a] text-white! hover:bg-[#b01625]"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                          در حال ثبت...
                        </>
                      ) : (
                        <>
                          <FaCommentDots className="ml-2" />
                          ثبت نظر و امتیاز
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <div className="bg-gray-50 py-3 rounded-lg flex md:flex-nowrap flex-wrap">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {pollData.pollDetails.map((rating, index) => (
                      <div key={index} className="text-center">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700 text-sm font-medium whitespace-nowrap">
                            {rating.questionTitle}
                          </span>
                          <span className="text-[#ce1a2a] font-bold">
                            {toPersianNumbers(rating.avgScore)}/۱۰
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-2 flex-1 rounded-full ${
                                i < rating.avgScore
                                  ? "bg-[#ce1a2a]"
                                  : "bg-[#e7abb1]"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pr-2">
                    <button
                      onClick={() => setIsRatingMode(true)}
                      className="mt-4 md:mt-0 mr-2 duration-300 rounded-lg bg-[#ce1a2a] hover:bg-red-700 text-white! transition-colors px-3 py-2 font-bold flex items-center justify-center mx-auto cursor-pointer whitespace-nowrap"
                    >
                      <FaCommentDots className="ml-2" />
                      نظر دادن
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Image Gallery */}
          <div className="lg:col-span-5 lg:-mt-[40%]">
            <div className="relative">
              {/* Quick Actions */}
              <div className="absolute left-full lg:translate-x-0 -translate-x-full top-0 mr-3 space-y-3 z-10 lg:z-0">
                <Link
                  href={`/compare/${detailsCar.id}`}
                  className="bg-[#ce1a2a] text-white! px-4 py-2 text-xs text-center whitespace-nowrap block"
                >
                  <FaCodeCompare className="inline ml-1" />
                  مقایسه کنید
                </Link>
                <div className="bg-[#ce1a2a] text-white! px-4 py-2 text-xs text-center whitespace-nowrap">
                  <FaStar className="inline ml-1" />
                  امتیاز کاربران
                  {pollData.pollScore > 0 ? `${pollData.pollScore} از ۱۰` : ""}
                </div>
                <div className="bg-[#ce1a2a] text-white! px-4 py-2 text-xs text-center whitespace-nowrap">
                  <FaCalendarDays className="inline ml-1" />
                  {createpublishCode(detailsCar.publishCode)}
                </div>
              </div>

              {/* Main Image Slider */}
              {Attachment.length > 0 && (
                <div className="slider-productDetails h-full ">
                  <Swiper
                    loop={true}
                    spaceBetween={10}
                    speed={1700}
                    navigation={false}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Thumbs]}
                    className="mySwiper2 product-gallery-main"
                  >
                    {Attachment.map((image) => (
                      <SwiperSlide key={image.id}>
                        <a
                          className="sm:h-96 h-56 block cursor-pointer bg-[#ce1a2a]"
                          href={mainDomainOld + image.fileUrl}
                          data-fancybox="main-gallery"
                          data-caption={image.title}
                          aria-label="لینک گالری تصاویر"
                        >
                          <img
                            className="w-full h-full border-4 border-[#ce1a2a]  object-cover"
                            src={mainDomainOld + image.fileUrl}
                            alt={image.title || "تصویر محصول"}
                          />
                        </a>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Thumbnails Slider */}
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    grabCursor={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    breakpoints={{
                      640: {
                        slidesPerView: 4,
                      },
                      768: {
                        slidesPerView: 4,
                      },
                      1024: {
                        slidesPerView: 5,
                      },
                    }}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper product-gallery-thumbs mt-3 pb-10!"
                  >
                    {Attachment.map((image) => (
                      <SwiperSlide key={image.id}>
                        <div className="cursor-pointer border-2 border-transparent overflow-hidden transition-all hover:bg-[#ce1a2a]! swiper-slide-thumb-active:border-red-600 z-50 h-20!">
                          <img
                            className="w-full h-full object-cover"
                            src={mainDomainOld + image.fileUrl}
                            alt={image.title || "تصویر محصول"}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}
              {Attachment.length === 0 && (
                <div className="slider-productDetails h-full">
                  {/* اسکلتون برای تصویر اصلی */}
                  <div className="mySwiper2 product-gallery-main">
                    <div className="w-full! sm:h-96 h-56 border-4 border-gray-200">
                      <Skeleton.Image className="w-full! h-full! bg-slate-400" />
                    </div>
                  </div>

                  {/* اسکلتون برای تصاویر کوچک */}
                  <div className="product-gallery-thumbs mt-3 pb-10">
                    <div className="gap-2 justify-center sm:flex hidden">
                      {[...Array(5)].map((_, index) => (
                        <div key={index} className="w-1/5 h-20!">
                          <Skeleton.Image className="w-full! h-full! bg-slate-400" />
                        </div>
                      ))}
                    </div>
                    <div className="gap-2 justify-center sm:hidden flex ">
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="w-1/3">
                          <Skeleton.Image className="w-full! h-20! bg-white! rounded-3xl" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .slider-productDetails {
          position: relative;
        }

        .product-gallery-main {
          overflow: hidden;
        }

        .product-gallery-thumbs {
          margin-top: 12px;
        }

        .product-gallery-thumbs .swiper-slide {
          opacity: 0.6;
          transition:
            opacity 0.3s ease,
            border-color 0.3s ease;
          overflow: hidden;
        }

        .product-gallery-thumbs .swiper-slide-thumb-active {
          opacity: 1;
          border-color: #ce1a2a !important;
          background-color: #ce1a2a !important;
        }

        /* تنظیم سایز برای thumbnails */
        .product-gallery-thumbs .swiper-slide {
          width: 100px;
        }

        @media (max-width: 768px) {
          .product-gallery-thumbs .swiper-slide {
            width: 80px;
          }
        }

        @media (max-width: 480px) {
          .product-gallery-thumbs .swiper-slide {
            width: 70px;
          }
        }

        /* استایل‌های Swiper */
        .mySwiper2 {
          width: 100%;
        }

        .mySwiper {
          box-sizing: border-box;
          padding: 10px 0;
        }

        .mySwiper .swiper-slide {
          width: 25%;
          opacity: 0.4;
        }

        .mySwiper .swiper-slide-thumb-active {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .mySwiper2 {
          }

          .mySwiper {
          }
        }

        @media (max-width: 480px) {
          .mySwiper2 {
          }

          .mySwiper {
          }
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .specs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .specs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default CarDetails;
