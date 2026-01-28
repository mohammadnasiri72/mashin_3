import { getPriceCar } from "@/services/Price/PriceCar";
import { Tabs, type TabsProps } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaArrowUp,
  FaChevronLeft,
} from "react-icons/fa6";
import { MdOutlineCompareArrows } from "react-icons/md";

function sortByAbsoluteValue(arr: any, field: string) {
  return [...arr].sort((a, b) => {
    const absA = Math.abs(a[field]);
    const absB = Math.abs(b[field]);

    // مرتب‌سازی نزولی بر اساس مقدار مطلق
    return absB - absA;
  });
}

function MarketStats() {
  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<string>("internal");
  const [carList, setCarList] = useState<Price[]>([]);

  useEffect(() => {
    fetchCarType();
  }, [type]);

  const fetchCarType = async () => {
    setLoading(true);
    setCarList([]);
    try {
      const price: Price[] = await getPriceCar({ Type: type, BrandId: -1 });
      setCarList(sortByAbsoluteValue(price, "change").slice(0, 10));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "internal",
      label: <span className="text-xs font-medium px-2">خودروهای داخلی</span>,
    },
    {
      key: "import",
      label: <span className="text-xs font-medium px-2">خودروهای خارجی</span>,
    },
  ];

  return (
    <>
      {/* آمار بازار */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-3">آمار بازار</h3>

        {/* تب‌های Ant Design */}
        <div className="mb-3">
          <Tabs
            activeKey={type}
            onChange={setType}
            items={items}
            size="small"
            className="custom-market-tabs"
          />
        </div>

        {/* محتوای تب‌ها */}
        {loading ? (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {
              [...Array(10)].map((_, index)=>{
                return(
                  <div className=" bg-gray-200 animate-pulse h-10 w-full rounded" />
                )
              })
            }
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {carList.map((car) => (
              <div
                key={car.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                    {/* <img
                    src={car.id}
                    alt={car.name}
                    className="object-cover w-full h-full rounded-lg"
                  /> */}
                    {car.change > 0 && (
                      <FaArrowTrendUp className="text-emerald-600" />
                    )}
                    {car.change < 0 && (
                      <FaArrowTrendDown className="text-red-600" />
                    )}
                    {car.change === 0 && (
                      <MdOutlineCompareArrows className="" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {car.title}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {car.brandTitle}
                    </p>
                  </div>
                </div>
                <div className="text-left ml-2 shrink-0">
                  <div className="font-bold text-gray-900 text-sm whitespace-nowrap">
                    {car.price1.toLocaleString()}
                  </div>
                  {car.change !== 0 && (
                    <div
                      className={`flex items-center gap-1 text-xs ${
                        car.change > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {car.change > 0 ? (
                        <FaArrowUp className="w-2 h-2" />
                      ) : (
                        <FaArrowDown className="w-2 h-2" />
                      )}
                      <span className="whitespace-nowrap">
                        {car.change.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* دکمه مشاهده همه */}
        <Link
          href={`/price.html?type=${type}`}
          className="w-full mt-3 cursor-pointer py-2 px-3 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white! transition-colors duration-300 flex items-center justify-center gap-1 text-sm"
        >
          مشاهده همه
          <FaChevronLeft className="w-3 h-3" />
        </Link>
      </div>
    </>
  );
}

export default MarketStats;
