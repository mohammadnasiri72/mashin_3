"use client";

import React from "react";
import { QuickSpecItem } from "./types";
import { FaHome } from "react-icons/fa";

interface TechnicalSpecsProps {
  items: QuickSpecItem[];
  onViewAll?: () => void;
}

/**
 * "مشخصات فنی" section — a heading row with a "view all" link,
 * followed by a responsive grid of icon + label + value cards.
 */
export default function TechnicalSpecs({
  items,
  onViewAll,
}: TechnicalSpecsProps) {
  return (
    <section id="technical-specs" dir="rtl" className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-slate-900">مشخصات فنی</h2>
        <button
          onClick={onViewAll}
          className="flex items-center gap-0.5 text-sm font-medium text-red-600 hover:text-red-700"
        >
          مشاهده همه
          <FaHome fontSize="small" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-white p-4 text-center shadow-sm"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
              {item.icon}
            </span>
            <span className="text-xs text-slate-500">{item.label}</span>
            <span className="text-base font-bold text-slate-900">
              {item.value}
              {item.unit && (
                <span className="mr-1 text-xs font-normal text-slate-400">
                  {item.unit}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
