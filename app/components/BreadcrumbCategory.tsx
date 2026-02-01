import Link from "next/link";
import { MdChevronLeft } from "react-icons/md";

function BreadcrumbCategory({
  breadcrumb,
  title,
}: {
  breadcrumb: breadcrumb[];
  title: string;
}) {

  return (
    <div className="flex gap-2 px-5 text-xs! items-center">
      <Link href={"/"} className="hover:text-red-600! duration-300">
        صفحه اصلی
      </Link>

      {breadcrumb.length > 0 &&
        breadcrumb.map((b, i) => (
          <div key={i} className="flex items-center gap-2">
            <MdChevronLeft className="text-lg" />
            <Link href={b.href || '#'} className="hover:text-red-600! duration-300">
              {b.title}
            </Link>
          </div>
        ))}
      <MdChevronLeft className="text-lg" />
      <span>{title}</span>
    </div>
  );
}

export default BreadcrumbCategory;
