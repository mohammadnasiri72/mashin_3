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
    <div className="flex gap-2 px-5 text-xs! items-center overflow-auto pb-3!">
      <Link href={"/"} className="hover:text-red-600! duration-300 whitespace-nowrap!">
        صفحه اصلی
      </Link>

      {breadcrumb.length > 0 &&
        breadcrumb.map((b, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap!">
            <MdChevronLeft className="text-lg" />
            <Link href={b.href || '#'} className="hover:text-red-600! duration-300 whitespace-nowrap!">
              {b.title}
            </Link>
          </div>
        ))}
      <MdChevronLeft className="text-lg" />
      <span className="whitespace-nowrap!">{title}</span>
    </div>
  );
}

export default BreadcrumbCategory;
