"use client";
import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function PaginationSearchCars({ carView }: { carView: Items[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <>
      {carView.length > 0 && (
        <div className="p-3 flex justify-center items-center">
          <Pagination
            onChange={(page) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", page.toString());
              router.push(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
            total={carView[0].total}
            showSizeChanger={false}
            defaultPageSize={20}
            current={Number(searchParams.get("page")) || 1}
          />
          <span>{carView[0].total} مورد</span>
        </div>
      )}
    </>
  );
}

export default PaginationSearchCars;
