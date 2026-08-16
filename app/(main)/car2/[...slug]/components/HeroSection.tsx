"use client";

import ModalLogin from "@/app/components/ModalLogin";
import { RootState } from "@/redux/store";
import { postLike } from "@/services/UserActivity/postLike";
import { postLiked } from "@/services/UserActivity/postLiked";
import { createpublishCode, Toast } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import { message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowTrendUp, FaHeart } from "react-icons/fa6";
import { MdCompare } from "react-icons/md";
import { useSelector } from "react-redux";

// کامپوننت بردکرامپ
const Breadcrumb = ({
  items,
}: {
  items: { href: string; title: string }[];
}) => {
  if (!items || items.length === 0) return null;

  return (
    <nav
      className="flex items-center gap-1 text-sm overflow-x-auto scrollbar-hide"
      dir="rtl"
    >
      <Link
        href={"/"}
        className="text-white/90! hover:text-white! duration-300 whitespace-nowrap!"
      >
        صفحه اصلی <span className="text-white/40! mx-1 select-none">/</span>
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center shrink-0">
          {index > 0 && (
            <span className="text-white/40! mx-1 select-none">/</span>
          )}
          <Link
            href={item.href}
            className={`text-white/90! hover:text-white! transition-colors whitespace-nowrap font-medium ${
              index === items.length - 1 ? "text-white! font-bold" : ""
            }`}
          >
            {item.title}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default function HeroSection({
  detailsCar,
  pollData,
}: {
  detailsCar: ItemsId;
  pollData: PollData;
}) {
  const bannerSrc = detailsCar.properties.find(
    (e) => e.propertyKey === "p1042_banner",
  )?.propertyValue;

  const user = useSelector((state: RootState) => state.user.user);

  const [isLoading, setIsLoading] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [isLiked, setIsLiked] = useState(true);

  const handleLike = async (id: number) => {
    if (user.token) {
      setIsLoading(true);
      try {
        const likedStatus = await postLiked(id, user.token);
        await postLike(id, user.token);
        setIsLiked(likedStatus);

        Toast.fire({
          icon: likedStatus ? "warning" : "success",
          title: likedStatus
            ? "خودرو از علاقه‌مندی‌ها حذف شد"
            : "خودرو به علاقه‌مندی‌ها اضافه شد",
        });
      } catch (error: any) {
        message.error({
          content: error.response?.data || "خطای شبکه",
          duration: 3,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setOpenLogin(true);
      Toast.fire({
        icon: "error",
        title: "لطفا ابتدا وارد حساب کاربری خود شوید",
      });
    }
  };

  return (
    <section className="relative w-full overflow-hidden" dir="rtl">
      {/* Background image - full width */}
      <div className="absolute inset-0">
        <img
          src={
            bannerSrc ? mainDomain + bannerSrc : mainDomain + detailsCar.image
          }
          alt={`${detailsCar.sourceName} ${detailsCar.title}`}
          className="object-cover object-center w-full h-full bg-no-repeat"
        />
        {/* Gradient overlays for legibility */}
        <div className="absolute inset-0 bg-linear-to-l from-slate-950/30 via-slate-950/50 to-slate-950/80" />
        {/* گرادیانت مخصوص موبایل */}
        <div className="absolute inset-0 md:hidden bg-linear-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
      </div>

      {/* ========== دسکتاپ (بالای 768px) ========== */}
      <div className="hidden md:block relative z-10">
        {/* Breadcrumb */}
        {detailsCar.breadcrumb && detailsCar.breadcrumb.length > 0 && (
          <div className="px-4 pt-6 max-w-7xl mx-auto">
            <Breadcrumb items={detailsCar.breadcrumb} />
          </div>
        )}

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 h-110 md:flex-row md:items-center md:justify-between px-4">
          {/* Right: floating price + quick spec card */}
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-900/20 p-4 shadow-2xl backdrop-blur-md md:mb-2">
            <ul className="grid grid-cols-1">
              <li className="flex items-center gap-2 pb-2">
                <span className="flex justify-between w-full items-center">
                  <span className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-white!">
                      <FaArrowTrendUp className="text-2xl" />
                    </span>
                    <span className="text-white! flex flex-col items-start">
                      <span className="text-lg font-bold">قیمت بازار</span>
                      <span className="text-[11px]">(ملیون تومان)</span>
                    </span>
                  </span>
                  <span className="text-white! text-lg font-bold">
                    {detailsCar.amount.toLocaleString() || "در حال بروزرسانی"}
                  </span>
                </span>
              </li>

              {detailsCar.properties
                .filter((e) => e.isTechnicalProperty)
                .slice(0, 6)
                .map((spec) => (
                  <li
                    key={spec.title}
                    className="flex items-center gap-2 border-t border-white/10 py-2"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-slate-200">
                      <img
                        src={"/images/icons/speedometer-large.png"}
                        alt={spec.title}
                        className="w-10"
                      />
                    </span>
                    <span className="flex justify-between items-center w-full leading-tight">
                      <span className="text-sm font-bold text-white!">
                        {spec.title}
                      </span>
                      <span className="text-sm font-semibold text-white!">
                        {spec.value}
                      </span>
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Left: title, tags, rating, actions */}
          <div className="flex max-w-xl flex-col items-start justify-between gap-4 h-full py-10">
            <div className="flex items-start flex-col gap-5">
              <div className="flex flex-col items-start">
                <h1 className="text-5xl! font-extrabold text-white! md:text-4xl">
                  {detailsCar.itemKey}
                </h1>
                <div className="flex items-center gap-3 ">
                  <span className="text-white! font-bold text-lg">
                    {detailsCar.sourceName} {detailsCar.title}
                  </span>
                  <span className="text-white! text-xs">
                    {createpublishCode(detailsCar.publishCode)}
                  </span>
                </div>
              </div>

              <div className="flex items-center flex-col gap-2">
                <div className="flex items-center gap-1 rounded-lg px-2.5 py-1 backdrop-blur-sm text-5xl">
                  <span className="text-xs text-slate-300">10/</span>
                  <span className="font-bold text-yellow-400!">
                    {pollData?.pollScore || 0}
                  </span>
                  <FaStar className="text-yellow-400! text-xl" />
                </div>
                <span className="text-slate-100">
                  امتیاز {pollData.pollNumber} کاربر
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/compare/${detailsCar.id}`}
                className="flex items-center gap-1.5 rounded-lg border cursor-pointer border-white/25 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white! backdrop-blur-sm transition hover:bg-[#ce1a2a]/30"
              >
                <MdCompare />
                مقایسه کنید
              </Link>
              <button
                onClick={() => handleLike(detailsCar.id)}
                disabled={isLoading}
                className={`flex items-center gap-1.5 cursor-pointer rounded-lg border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-[#ce1a2a]/30 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                } ${isLiked ? "bg-[#ce1a2a]/30" : ""}`}
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <FaHeart
                    fontSize="small"
                    className={
                      isLiked
                        ? "text-[#ce1a2a] fill-[#ce1a2a]"
                        : "text-[#ce1a2a]"
                    }
                  />
                )}
                {isLoading
                  ? "در حال پردازش..."
                  : !isLiked
                    ? "حذف از علاقه مندی‌ها"
                    : "افزودن به علاقه مندی‌ها"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== موبایل (زیر 768px) ========== */}
      <div className="md:hidden relative z-10 flex flex-col justify-between min-h-100 px-4 py-4">
        {/* Breadcrumb */}
        {detailsCar.breadcrumb && detailsCar.breadcrumb.length > 0 && (
          <div className="mb-2">
            <Breadcrumb items={detailsCar.breadcrumb} />
          </div>
        )}

        {/* عنوان و ریتینگ */}
        <div className=" text-center">
          <h1 className="text-3xl font-extrabold text-white! drop-shadow-lg">
            {detailsCar.itemKey}
          </h1>
          <div className="flex gap-3 items-center justify-center">
            <span className="text-white/70 block mt-1 font-bold">
              {detailsCar.sourceName} {detailsCar.title}
            </span>
            <span className="text-xs text-white/70 block mt-1">
              {createpublishCode(detailsCar.publishCode)}
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="flex items-center gap-0.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              <span className="text-xs text-white/60">10 /</span>
              <span className="text-lg font-bold text-yellow-400">
                {pollData?.pollScore || 0}
              </span>
              <FaStar className="text-yellow-400 text-sm" />
              <span className="text-[10px] text-white/60 border-r border-white/20 pr-2">
                {pollData.pollNumber} رأی
              </span>
            </div>
          </div>
        </div>
        {/* دکمه‌های اکشن */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <Link
            href={`/compare/${detailsCar.id}`}
            className="flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-white!"
          >
            <MdCompare className="text-sm" />
            مقایسه کنید
          </Link>
          <button
            onClick={() => handleLike(detailsCar.id)}
            disabled={isLoading}
            className={`flex cursor-pointer items-center gap-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-white! ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            } ${isLiked ? "bg-[#ce1a2a]/30" : ""}`}
          >
            {isLoading ? (
              <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FaHeart
                className={`text-sm ${isLiked ? "text-[#ce1a2a] fill-[#ce1a2a]" : ""}`}
              />
            )}
            {isLoading
              ? "..."
              : isLiked
                ? "افزودن به علاقه‌مندی‌ها"
                : "حذف از علاقه‌مندی‌ها"}
          </button>
        </div>
        {/* کارت قیمت + مشخصات */}
        <div className="rounded-2xl mt-4 border border-white/20 bg-slate-900/40 p-2 backdrop-blur-xl shadow-2xl">
          {/* قیمت بازار */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <FaArrowTrendUp className="text-xl text-white" />
              </div>
              <div>
                <span className="text-sm font-bold text-white">قیمت بازار</span>
                <span className="text-[10px] text-white/60 block">
                  (ملیون تومان)
                </span>
              </div>
            </div>
            <span className="text-base font-bold text-white">
              {detailsCar.amount.toLocaleString() || "در حال بروزرسانی"}
            </span>
          </div>

          {/* مشخصات فنی به صورت اسکرول افقی */}
          <div className="mt-2 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 min-w-max">
              {detailsCar.properties
                .filter((e) => e.isTechnicalProperty)
                .slice(0, 6)
                .map((spec) => (
                  <div
                    key={spec.title}
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/5 shrink-0"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 shrink-0">
                      <img
                        src="/images/icons/speedometer-large.png"
                        alt={spec.title}
                        className="w-8"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/60">
                        {spec.title}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {spec.value}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Login */}
      <ModalLogin open={openLogin} setOpen={setOpenLogin} />

      {/* استایل اسکرول‌بار مخفی */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
