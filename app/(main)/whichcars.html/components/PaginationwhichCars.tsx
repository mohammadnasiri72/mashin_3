"use client";
import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function PaginationwhichCars({ whichCars }: { whichCars: Items[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <>
      {whichCars.length > 0 && (
        <div className="p-3 flex justify-center items-center">
          <Pagination
            onChange={(page) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", page.toString());
              router.push(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
            total={whichCars[0].total}
            showSizeChanger={false}
            defaultPageSize={20}
            current={Number(searchParams.get("page")) || 1}
          />
          <span>{whichCars[0].total} مورد</span>
        </div>
      )}
    </>
  );
}

export default PaginationwhichCars;
