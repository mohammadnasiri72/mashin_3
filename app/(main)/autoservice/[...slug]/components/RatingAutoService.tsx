"use client";

import ModalLogin from "@/app/components/ModalLogin";
import { setRedirectRegister } from "@/redux/slice/redirectRegister";
import { RootState } from "@/redux/store";
import { getPollId } from "@/services/Poll/pollId";
import { PostPollSave } from "@/services/Poll/PollSave";
import { Toast, toPersianNumbers } from "@/utils/func";
import { Card, Divider } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCommentDots, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function RatingAutoService({
  initialPollData,
  detailsAuto,
}: {
  initialPollData: PollData;
  detailsAuto: ItemsId;
}) {
  const token = useSelector((state: RootState) => state.token.token);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [pollData, setPollData] = useState<PollData>(initialPollData);
  const [userRatings, setUserRatings] = useState<{ [key: number]: number }>({});
  const [pollSaveData, setPollSaveData] = useState<PollSaveParam>({
    caseId: detailsAuto.id,
    pollScoreDto: [],
  });

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
        caseId: detailsAuto.id,
        pollScoreDto: newPollScoreDto,
      };
    });
  };

  const handleSubmitRating = async () => {
    if (token) {
      setIsSubmitting(true);
      try {
        await PostPollSave(pollSaveData, token);
        try {
          const res = await getPollId(Number(detailsAuto.id));
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
    } else {
      setOpenLoginModal(true);
    }
  };

  // ذخیره url در ریداکس برای بازگشت
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const idRedirect = searchParams.get("id");
  const urlRedirect = idRedirect
    ? decodeURIComponent(pathname) + `?id=${idRedirect}`
    : decodeURIComponent(pathname);
  const disPatch = useDispatch();
  useEffect(() => {
    if (openLoginModal) {
      disPatch(setRedirectRegister(urlRedirect));
    }
  }, [openLoginModal]);

  return (
    <>
      <ModalLogin open={openLoginModal} setOpen={setOpenLoginModal} />
      <Card className="rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800 mb-6!">
            کاربران گرامی ماشین 3
          </span>
          <div className="flex items-center">
            <FaStar className="text-amber-500" />
            <span className="text-xs font-bold px-1">
              {toPersianNumbers(initialPollData.pollScore)}
            </span>
            <span className="text-xs text-[#222]">
              (امتیاز از {toPersianNumbers(initialPollData.pollNumber)} نظر)
            </span>
          </div>
        </div>

        <div>
          <p className="leading-8">
            چنانچه شما در گذشته از این مرکز خدمات خودرو سرویسی دریافت کرده اید
            لطفا کیفیت خدمات این مرکز را با شرکت در نظرسنجی مشخص بفرمایید.
          </p>
          <p className="leading-8">
            ضمنا چنانچه هر نظر، شکایت و یا حتی پیشنهادی در مورد نحوه ارایه خدمات
            این مرکز مد نظرتان می باشد در بخش نظرات اعلام بفرمایید. ماشین 3
            نظرات و کامنت های شما را به دقت بررسی کرده و به منظور رفع عیوب و
            بهبود خدمات این مرکز با مدیران ارشد نمایندگی در میان خواهد
            گذاشت.{" "}
          </p>
        </div>

        <Divider />

        <div>
          {/* Rating Autoservices */}
          {pollData.pollDetails.length > 0 &&
            pollData.pollDetails.map((poll) => (
              <div key={poll.questionId} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-bold text-lg">
                    {poll.questionTitle}
                    <span className="text-xs px-1 text-[#0009]!">
                      (امتیاز {toPersianNumbers(poll.avgScore)} از{" "}
                      {toPersianNumbers(initialPollData.pollNumber)} نظر)
                    </span>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(10)].map((_, index) => {
                      return (
                        <button
                          aria-label="شماره امتیاز"
                          key={index}
                          type="button"
                          onClick={() =>
                            handleRatingClick(poll.questionId, index + 1)
                          }
                          className={`w-8 h-8 cursor-pointer flex items-center justify-center rounded-full transition-all duration-200 ${
                            index + 1 <= userRatings[poll.questionId]
                              ? "bg-[#ce1a2a] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <span className="text-sm font-bold">
                            {toPersianNumbers(index + 1)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rating Progress Bar */}
                <div className="flex gap-1">
                  {[...Array(10)].map((_, i) => {
                    return (
                      <div
                        onClick={() =>
                          handleRatingClick(poll.questionId, i + 1)
                        }
                        key={i}
                        className={`h-2 flex-1 rounded-full cursor-pointer ${
                          i < userRatings[poll.questionId]
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
              aria-label="ثبت نظر"
              onClick={handleSubmitRating}
              disabled={
                isSubmitting ||
                Object.values(userRatings).some((rating) => rating === 0)
              }
              className={`mx-auto cursor-pointer py-3 px-6 rounded-lg font-bold transition-all duration-300 flex items-center justify-center 
                                  ${
                                    Object.values(userRatings).some(
                                      (rating) => rating === 0,
                                    )
                                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                      : "bg-[#ce1a2a] text-white! hover:bg-[#b01625]"
                                  }
                                `}
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
      </Card>
    </>
  );
}

export default RatingAutoService;
