"use client";

import { Skeleton } from "antd";

export default function LoadingSkeletonAuth() {
  return (
    <div className="flex items-center space-x-3 space-x-reverse gap-2 ">
      {/* اسکلتون دکمه ورود */}
      <div className="relative w-full">
        <Skeleton.Button
          className="w-full! h-[38px]! rounded-md "
          active={true}
          size="small"
          shape="default"
        />
      </div>

      {/* اسکلتون دکمه ثبت‌نام */}
      <div className="relative w-full">
        <Skeleton.Button
          className="w-full! h-[38px]! rounded-md "
          active={true}
          size="small"
          shape="default"
        />
      </div>
    </div>
  );
}
