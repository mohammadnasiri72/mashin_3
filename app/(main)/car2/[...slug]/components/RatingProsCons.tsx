"use client";

import ModalLogin from "@/app/components/ModalLogin";
import { RootState } from "@/redux/store";
import { createMarkup, toPersianNumbers } from "@/utils/func";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdCheckroom } from "react-icons/md";
import { useSelector } from "react-redux";
import PollModal from "./PollModal";

function ScoreDonut({ score }: { score: number }) {
  const percent = Math.max(0, Math.min(100, (score / 10) * 100));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percent / 100);

  return (
    <div className="relative flex h-32 sm:w-32 items-center justify-center w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#dc2626"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-extrabold text-slate-900">{score}</span>
        <span className="text-[11px] text-slate-400">از 10</span>
      </div>
    </div>
  );
}

export default function RatingProsCons({
  detailsCar,
  pollData: initialPollData,
}: {
  detailsCar: ItemsId;
  pollData: PollData;
}) {
  const [pollData, setPollData] = useState<PollData>(initialPollData);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // دریافت مزایا و معایب از دیتا
  const advantagesData = detailsCar.properties.find(
    (e) => e.propertyKey === "p1042_design",
  );

  const disadvantagesData = detailsCar.properties.find(
    (e) => e.propertyKey === "p1042_performance",
  );

  

  // تابع برای استخراج متن از HTML
  const extractTextFromHTML = (html: string) => {
    if (!html) return [];

    const text = html.replace(/<[^>]*>/g, "").trim();
    const items = text
      .split(/[،،.\n-]/)
      .filter((item) => item.trim().length > 0);
    return items.map((item) => item.trim());
  };

  const disadvantages = disadvantagesData?.propertyValue
    ? extractTextFromHTML(disadvantagesData.propertyValue)
    : null;

  const advantages = advantagesData?.propertyValue
    ? extractTextFromHTML(advantagesData.propertyValue)
    : null;

  const handlePollUpdate = (newPollData: PollData) => {
    setPollData(newPollData);
  };
  const user = useSelector((state: RootState) => state.user.user);

  const [openLogin, setOpenLogin] = useState(false);

  return (
    <section dir="rtl" className="mx-auto w-full p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Cons - با آیکون پس‌زمینه */}
        <div className="relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm overflow-hidden">
          <div className="absolute bottom-2 left-2 opacity-5">
            <HiThumbDown className="text-[120px] text-red-600" />
          </div>

          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-50 text-red-600">
                <HiThumbDown fontSize="small" />
              </span>
              <h3 className="text-sm font-bold text-slate-900">معایب</h3>
            </div>

            {disadvantagesData?.propertyValue ? (
              <div
                className="flex flex-col gap-3 list-disc pr-5"
                dangerouslySetInnerHTML={createMarkup(disadvantagesData.propertyValue)}
              />
            ) : (
              <ul className="flex flex-col gap-3">
                {disadvantages &&
                  disadvantages.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <IoCloseCircleOutline
                        fontSize="small"
                        className="text-red-500! mt-0.5 shrink-0"
                      />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* Pros - با آیکون پس‌زمینه */}
        <div className="relative rounded-2xl border border-slate-100 bg-white p-5 shadow-sm overflow-hidden">
          <div className="absolute bottom-2 left-2 opacity-5">
            <HiThumbUp className="text-[120px] text-emerald-600" />
          </div>

          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <HiThumbUp fontSize="small" />
              </span>
              <h3 className="text-sm font-bold text-slate-900">مزایا</h3>
            </div>

            {advantagesData?.propertyValue ? (
              <div
                className="flex flex-col gap-3 list-disc pr-5"
                dangerouslySetInnerHTML={createMarkup(advantagesData.propertyValue)}
              />
            ) : (
              <ul className="flex flex-col gap-3">
                {advantages &&
                  advantages.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <MdCheckroom
                        fontSize="small"
                        className="text-emerald-500! mt-0.5 shrink-0"
                      />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* Score + breakdown */}
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">نتایج نظرسنجی</h3>
            <button
              aria-label="ثبت امتیاز"
              onClick={() => {
                if (!user.token) {
                  setOpenLogin(true);
                  return;
                }
                setIsPollModalOpen(true);
              }}
              className="flex items-center gap-1.5 bg-[#ce1a2a] hover:bg-red-700 text-white! px-3 py-1.5 rounded-lg text-xs font-bold transition-colors duration-300 cursor-pointer"
            >
              <FaStar className="text-[10px]" />
              ثبت امتیاز
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <ScoreDonut score={pollData.pollScore} />
            <div className="flex sm:flex-1 flex-col gap-3 w-full">
              {pollData.pollDetails.map((item, index) => {
                const percentage = (item.avgScore / 10) * 100;
                const isHovered = hoveredItem === index;

                return (
                  <div
                    key={item.questionId}
                    className="flex flex-col gap-1 group relative"
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-slate-500">
                        {item.questionTitle}
                      </span>
                    </div>

                    {/* کانتینر نوار با فضای خالی برای تولتیپ */}
                    <div className="relative">
                      {/* Tooltip بالای نوار */}
                      {isHovered && (
                        <div className="absolute -top-full left-1/2 -translate-y-1/2  z-10 animate-tooltip-pop">
                          <div className="bg-slate-800 text-white! px-4 py-2 rounded-xl shadow-2xl border border-white/10 backdrop-blur-sm relative whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-white">
                                {item.questionTitle}
                              </span>
                              <span className="text-sm font-bold text-[#ce1a2a]">
                                {toPersianNumbers(item.avgScore.toFixed(1))}
                              </span>
                              <span className="text-[10px] text-white">از 10</span>
                            </div>
                            {/* فلش تولتیپ */}
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-800 rotate-45 border-r border-b border-white/10" />
                          </div>
                        </div>
                      )}

                      {/* نوار پیشرفت */}
                      <div className="relative h-5 w-full overflow-hidden rounded-lg bg-slate-100 shadow-inner cursor-pointer">
                        {/* نوار پر شده */}
                        <div
                          className="h-full rounded-lg bg-linear-to-r from-red-500 to-[#ce1a2a] transition-all duration-700 ease-out relative flex items-center justify-end px-3"
                          style={{ 
                            width: `${percentage}%`,
                            minWidth: percentage > 0 ? '30px' : '0'
                          }}
                        >
                          {/* نمایش مقدار داخل نوار */}
                          <span className="text-[11px] font-bold text-white drop-shadow-sm">
                            {toPersianNumbers(item.avgScore.toFixed(1))}
                          </span>
                        </div>

                        {/* پس‌زمینه خالی با نمایش مقدار برای زمانی که نوار کمه */}
                        {percentage < 15 && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400">
                            {toPersianNumbers(item.avgScore.toFixed(1))}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Poll Modal */}
      <PollModal
        open={isPollModalOpen}
        onClose={() => setIsPollModalOpen(false)}
        detailsCar={detailsCar}
        onPollUpdate={handlePollUpdate}
        pollData={pollData}
      />
      {/* Modal Login */}
      <ModalLogin open={openLogin} setOpen={setOpenLogin} />

      {/* استایل‌های انیمیشن */}
      <style jsx global>{`
        @keyframes tooltipPop {
          0% {
            opacity: 0;
            transform: translateX(-50%) scale(0.8) translateY(8px);
          }
          60% {
            transform: translateX(-50%) scale(1.05) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) scale(1) translateY(0);
          }
        }
        .animate-tooltip-pop {
          animation: tooltipPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </section>
  );
}