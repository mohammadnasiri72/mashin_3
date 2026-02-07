"use client";
import CustomPagination from "@/app/components/CustomPagination";
import { useSearchParams } from "next/navigation";

function PaginationPodcasts({ podcasts }: { podcasts: Items[] }) {
  const searchParams = useSearchParams();
  return (
    <>
      {podcasts.length > 0 && (
        <CustomPagination
          total={podcasts[0].total}
          pageSize={15}
          currentPage={Number(searchParams.get("page")) || 1}
        />
      )}
    </>
  );
}

export default PaginationPodcasts;
