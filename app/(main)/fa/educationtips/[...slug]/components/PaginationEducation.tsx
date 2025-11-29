"use client";
import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function PaginationEducation({ education }: { education: Items[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <>
      {education.length > 0 && (
        <div className="p-3 flex justify-center items-center">
          <Pagination
            onChange={(page) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", page.toString());
              router.push(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
            total={education[0].total}
            showSizeChanger={false}
            defaultPageSize={15}
            current={Number(searchParams.get("page")) || 1}
          />
          <span>{education[0].total} مورد</span>
        </div>
      )}
    </>
  );
}

export default PaginationEducation;
