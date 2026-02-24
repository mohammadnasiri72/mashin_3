"use client";

import React from "react";
import { FaAngleLeft, FaStar } from "react-icons/fa";

function NvbarCar({
  pollData,
  totalComment,
}: {
  pollData: PollData;
  totalComment: number;
}) {
  return (
    <div className="p-2 flex gap-2 items-center">
      <div className="flex gap-1 items-center text-xs!">
        <FaStar className="text-amber-600" />
        <span>{pollData.pollScore}</span>
        <span className="text-gray-600">
          (امتیاز {pollData.pollNumber} کاربر)
        </span>
      </div>
      <div
        className="bg-gray-200 rounded-full px-2 py-1 flex items-center gap-1 cursor-pointer text-xs!"
        onClick={(e) => {
          e.preventDefault();
          const element = document.getElementById("technical");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            // آفست برای نوار بالایی
            setTimeout(() => {
              window.scrollBy({ top: 0, behavior: "smooth" });
            }, 100);
          }
        }}
      >
        <span>مشخصات فنی</span>
        <FaAngleLeft />
       
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
          const element = document.getElementById("comments");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            // آفست برای نوار بالایی
            setTimeout(() => {
              window.scrollBy({ top: 0, behavior: "smooth" });
            }, 100);
          }
        }}
        className="bg-gray-200 rounded-full px-2 py-1 flex items-center gap-1 cursor-pointer text-xs!"
      >
        <span>{totalComment}</span>
        <span>دیدگاه</span>
        <FaAngleLeft />
      </div>
    </div>
  );
}

export default NvbarCar;
