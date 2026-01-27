"use client";


export default function LoadingSkeletonAuth() {
  return (
    <div className="flex items-center space-x-3 space-x-reverse gap-2 px-3">
     <div className=" bg-gray-200 animate-pulse rounded h-5 w-20" />
     <div className=" bg-gray-200 animate-pulse h-10 w-10 rounded-full" />
    </div>
  );
}
