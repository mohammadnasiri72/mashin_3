"use client";
import CustomPagination from "@/app/components/CustomPagination";
import { useSearchParams } from "next/navigation";

function PaginationVideo({ videos }: { videos: Items[] }) {
  const searchParams = useSearchParams();
  return (
    <>
      {videos.length > 0 && (
        <CustomPagination
          total={videos[0].total}
          pageSize={20}
          currentPage={Number(searchParams.get("page")) || 1}
        />
      )}
    </>
  );
}

export default PaginationVideo;
