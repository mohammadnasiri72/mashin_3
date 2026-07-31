import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Pagination } from "antd";
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
      const isActive = page === currentPage;
      return (
        <Link
          href={createPageUrl(page)}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(page);
          }}
          className={`
            ant-pagination-item-link
            inline-flex items-center justify-center
            min-w-[32px] h-[32px] px-2
            rounded-lg border border-gray-200
            text-gray-600 bg-white
            transition-all duration-300
            hover:border-red-600 hover:text-red-600
            ${isActive ? '!bg-red-600 !border-red-600 !text-white hover:!text-white' : ''}
          `}
        >
          {page}
        </Link>
      );
    }

    if (type === "prev") {
      const isDisabled = currentPage <= 1;
      const prevPage = currentPage > 1 ? currentPage - 1 : 1;
      return (
        <Link
          href={createPageUrl(prevPage)}
          onClick={(e) => {
            e.preventDefault();
            if (!isDisabled) {
              handlePageChange(prevPage);
            }
          }}
          className={`
            inline-flex items-center justify-center
            w-[32px] h-[32px]
            rounded-lg border border-gray-200
            bg-white
            transition-all duration-300
            ${isDisabled 
              ? 'opacity-50 cursor-not-allowed hover:border-gray-200' 
              : 'hover:border-red-600 text-gray-600! hover:text-red-600!'
            }
          `}
        >
          <RightOutlined />
        </Link>
      );
    }

    if (type === "next") {
      const isDisabled = currentPage >= totalPages;
      const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
      return (
        <Link
          href={createPageUrl(nextPage)}
          onClick={(e) => {
            e.preventDefault();
            if (!isDisabled) {
              handlePageChange(nextPage);
            }
          }}
          className={`
            inline-flex items-center justify-center
            w-[32px] h-[32px]
            rounded-lg border border-gray-200
            bg-white
            transition-all duration-300
            ${isDisabled 
              ? 'opacity-50 cursor-not-allowed hover:border-gray-200' 
              : 'hover:border-red-600 text-gray-600! hover:text-red-600!'
            }
          `}
        >
          <LeftOutlined />
        </Link>
      );
    }

    if (type === "jump-prev") {
      // رفتن به ۵ صفحه قبل
      const jumpPage = Math.max(1, currentPage - 3);
      return (
        <Link
          href={createPageUrl(jumpPage)}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(jumpPage);
          }}
          className="
            inline-flex items-center justify-center
            w-[32px] h-[32px]
            rounded-lg  border-gray-200
            bg-white
            text-gray-500!
            transition-all duration-300
            hover:border-red-600! hover:text-red-600!
          "
        >
          •••
        </Link>
      );
    }

    if (type === "jump-next") {
      // رفتن به ۵ صفحه بعد
      const jumpPage = Math.min(totalPages, currentPage + 3);
      return (
        <Link
          href={createPageUrl(jumpPage)}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(jumpPage);
          }}
          className="
            inline-flex items-center justify-center
            w-[32px] h-[32px]
            rounded-lg border-gray-200
            bg-white!
            text-gray-500!
            transition-all duration-300
            hover:border-red-600! hover:text-red-600!
          "
        >
          •••
        </Link>
      );
    }

    return element;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-3 px-2 py-4 bg-white rounded-lg shadow-sm">
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
          border: none !important;
          background: transparent !important;
        }

        .ant-pagination-item a {
          padding: 0 !important;
        }

        .ant-pagination-prev,
        .ant-pagination-next {
          border: none !important;
          background: transparent !important;
        }

        .ant-pagination-prev button,
        .ant-pagination-next button {
          display: none !important;
        }

        .ant-pagination-item-active {
          background: transparent !important;
          border: none !important;
        }

        .ant-pagination-jump-prev,
        .ant-pagination-jump-next {
          border: none !important;
          background: transparent !important;
        }

        .ant-pagination-disabled {
          opacity: 1 !important;
        }

        /* حذف استایل‌های پیش‌فرض آنت */
        .ant-pagination-item-active a {
          color: white !important;
        }

        .ant-pagination-item-active:hover a {
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default CustomPagination;







