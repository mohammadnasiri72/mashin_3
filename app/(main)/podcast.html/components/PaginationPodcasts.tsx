"use client";
import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function PaginationPodcasts({ podcasts }: { podcasts: Items[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <>
      {podcasts.length > 0 && (
        <div className="p-3 flex justify-center items-center">
          <Pagination
            onChange={(page) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", page.toString());
              router.push(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
            total={podcasts[0].total}
            showSizeChanger={false}
            defaultPageSize={15}
            current={Number(searchParams.get("page")) || 1}
          />
          <span>{podcasts[0].total} مورد</span>
        </div>
      )}
    </>
  );
}

export default PaginationPodcasts;
