import Link from "next/link";
import { FaMotorcycle } from "react-icons/fa";
import { FaCarRear } from "react-icons/fa6";
export async function generateMetadata() {
  return {
    title: "ماشین3 - خودروهای بازار و موتورسیکلت‌ها",
    description: "خودروهای بازار و موتورسیکلت‌ها",
  };
}

function pageReviews() {
  return (
    <div className="px-3 flex justify-center items-center sm:flex-nowrap flex-wrap gap-3">
      <div className=" flex justify-center items-center">
        <Link
          className="border border-[#0002] shadow-lg duration-300 min-h-20 p-3 rounded-lg flex items-center justify-center flex-col"
          href={"/fa/reviews/6058/خودرو-های-بازار.html"}
        >
          <FaCarRear className="text-3xl" />
          <span> خودروهای بازار</span>
        </Link>
      </div>
      <div className=" flex justify-center items-center">
        <Link
          className="border border-[#0002] shadow-lg duration-300 min-h-20 p-3 rounded-lg flex items-center justify-center flex-col"
          href={"/fa/reviews/6059/موتور-سیکلت.html"}
        >
          <FaMotorcycle className="text-3xl" />
          <span> موتور سیکلت</span>
        </Link>
      </div>
    </div>
  );
}

export default pageReviews;
