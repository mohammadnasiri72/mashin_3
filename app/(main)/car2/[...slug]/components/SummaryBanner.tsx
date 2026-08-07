"use client";

import React from "react";
import Image from "next/image";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import CompareArrowsRoundedIcon from "@mui/icons-material/CompareArrowsRounded";
import type { SummaryBannerData } from "../types";

interface SummaryBannerProps {
  data: SummaryBannerData;
  siteName?: string; // e.g. "ماشین۳" highlighted in red within the title
}

export default function SummaryBanner({
  data,
  siteName = "ماشین۳",
}: SummaryBannerProps) {
  return (
    <section dir="rtl" className="mx-auto w-full max-w-7xl px-4 pb-10 md:px-6">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900">
        <div className="absolute inset-y-0 left-0 hidden w-1/3 md:block">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900" />
        </div>

        <div className="relative z-10 flex flex-col gap-4 p-6 md:mr-[33%] md:p-8">
          <h2 className="text-lg font-extrabold text-white">
            جمع‌بندی{" "}
            <span className="text-red-500">{siteName}</span>
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-300">
            {data.body}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <a
              href={data.primaryCta.href}
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
            >
              {data.primaryCta.label}
            </a>
            {data.secondaryCta && (
              <a
                href={data.secondaryCta.href}
                className="flex items-center gap-1.5 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <CompareArrowsRoundedIcon fontSize="small" />
                {data.secondaryCta.label}
              </a>
            )}
            {data.tertiaryCta && (
              <a
                href={data.tertiaryCta.href}
                className="flex items-center gap-1.5 rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <DownloadRoundedIcon fontSize="small" />
                {data.tertiaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
