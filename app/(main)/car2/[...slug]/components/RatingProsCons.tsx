"use client";

import { createMarkup } from "@/utils/func";
import { useState } from "react";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdCheckroom } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import PollModal from "./PollModal";

function ScoreDonut({ score }: { score: number }) {
  const percent = Math.max(0, Math.min(100, (score / 10) * 100));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percent / 100);

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
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

  return (
    <section dir="rtl" className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-6">
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

            {disadvantagesData?.value ? (
              <ul
                className="flex flex-col gap-3 list-disc pr-5"
                dangerouslySetInnerHTML={createMarkup(disadvantagesData.value)}
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

            {advantagesData?.value ? (
              <ul
                className="flex flex-col gap-3 list-disc pr-5"
                dangerouslySetInnerHTML={createMarkup(advantagesData.value)}
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
            <h3 className="text-sm font-bold text-slate-900">
              نتایج نظرسنجی
            </h3>
            <button
              aria-label="ثبت امتیاز"
              onClick={() => setIsPollModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#ce1a2a] hover:bg-red-700 text-white! px-3 py-1.5 rounded-lg text-xs font-bold transition-colors duration-300 cursor-pointer"
            >
              <FaStar className="text-[10px]" />
              ثبت امتیاز
            </button>
          </div>
          
          <div className="flex items-center gap-5">
            <ScoreDonut score={pollData.pollScore} />
            <div className="flex flex-1 flex-col gap-2.5">
              {pollData.pollDetails.map((item) => (
                <div key={item.questionId} className="flex flex-col gap-1">
                  <span className="text-[11px] text-slate-500">
                    {item.questionTitle}
                  </span>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-red-600"
                      style={{ width: `${(item.avgScore / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
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
    </section>
  );
}