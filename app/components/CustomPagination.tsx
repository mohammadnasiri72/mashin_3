import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Pagination } from "antd";
import { FaAlignLeft } from "react-icons/fa";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const CustomPagination = ({
  total,
  pageSize = 15,
  currentPage = 1,
}: {
  total: number;
  pageSize?: number;
  currentPage?: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const totalPages = Math.ceil(total / pageSize);

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  // تابع رندر آیتم‌های صفحه‌بندی
  const itemRender = (
    page: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    element: React.ReactNode,
  ) => {
    if (type === "page") {
      return (
        <Link
          href={createPageUrl(page)}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(page);
          }}
          className="ant-pagination-item-link"
        >
          {page}
        </Link>
      );
    }

    if (type === "prev") {
      const prevPage = currentPage > 1 ? currentPage - 1 : 1;
      return (
        <Link
          href={createPageUrl(prevPage)}
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) {
              handlePageChange(prevPage);
            }
          }}
          className="text-[#4b5563]! duration-300 hover:text-[#ce1a2a]!"
        >
          <RightOutlined />
        </Link>
      );
    }

    if (type === "next") {
      const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
      return (
        <Link
          href={createPageUrl(nextPage)}
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
              handlePageChange(nextPage);
            }
          }}
          className="text-[#4b5563]! duration-300 hover:text-[#ce1a2a]!"
        >
          <LeftOutlined />
        </Link>
      );
    }

    if (type === "jump-prev" || type === "jump-next") {
      return (
        <span className="text-[#6b7280]! hover:text-[#ce1a2a]! duration-300">
          •••
        </span>
      );
    }

    return element;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-3 p-4 bg-white rounded-lg shadow-sm">
      {/* اطلاعات صفحه */}
      <div className="text-sm text-gray-600">
        نمایش{" "}
        <span className="font-semibold">
          {(currentPage - 1) * pageSize + 1}
        </span>
        -
        <span className="font-semibold">
          {Math.min(currentPage * pageSize, total)}
        </span>{" "}
        از <span className="font-semibold">{total}</span> مورد
      </div>

      {/* Pagination آنت */}
      <div className="flex items-center gap-2">
        <Pagination
          total={total}
          pageSize={pageSize}
          current={currentPage}
          onChange={handlePageChange}
          itemRender={itemRender}
          showSizeChanger={false}
          //   showQuickJumper={totalPages > 10}
          showLessItems={true}
          hideOnSinglePage={true}
        />
      </div>

      {/* اطلاعات صفحه‌ها */}
      <div className="text-sm text-gray-500 hidden md:block!">
        صفحه <span className="font-semibold">{currentPage}</span> از{" "}
        <span className="font-semibold">{totalPages}</span>
      </div>

      {/* استایل‌های سفارشی */}
      <style jsx global>{`
        .ant-pagination-item {
          border-radius: 8px !important;
          border: 1px solid #e5e7eb !important;
        }

        .ant-pagination-item:hover {
          border-color: #ce1a2a !important;
        }

        .ant-pagination-item a {
          color: #4b5563 !important;
          padding: 0 8px !important;
        }

        .ant-pagination-item:hover a {
          color: #ce1a2a !important;
          background-color: #fff !important;
          border-color: #ce1a2a !important;
          border-radius: 8px !important;
        }

        .ant-pagination-item-active:hover a {
          border-radius: 7px !important;
        }

        .ant-pagination-item-active {
          background-color: #ce1a2a !important;
          border-color: #ce1a2a !important;
        }

        .ant-pagination-item-active a {
          color: white !important;
        }

        .ant-pagination-prev,
        .ant-pagination-next {
          border-radius: 8px !important;
          border: 1px solid #e5e7eb !important;
        }

        .ant-pagination-prev:hover,
        .ant-pagination-next:hover {
          border-color: #ce1a2a !important;
        }

        .ant-pagination-prev button,
        .ant-pagination-next button {
          color: #4b5563 !important;
        }

        .ant-pagination-prev:hover button,
        .ant-pagination-next:hover button {
          color: #ce1a2a !important;
        }

        .ant-pagination-disabled {
          opacity: 0.5 !important;
          cursor: not-allowed !important;
        }

        .ant-pagination-disabled:hover {
          border-color: #e5e7eb !important;
        }

        .ant-pagination-disabled button {
          color: #9ca3af !important;
        }

        .ant-pagination-jump-prev .ant-pagination-item-ellipsis,
        .ant-pagination-jump-next .ant-pagination-item-ellipsis {
          color: #6b7280 !important;
        }

        .ant-pagination-options {
          margin-right: 8px !important;
        }
      `}</style>
    </div>
  );
};

export default CustomPagination;
