import { Tabs, type TabsProps } from "antd";
import { useState } from "react";
import { FaArrowDown, FaArrowUp, FaChevronLeft } from "react-icons/fa6";

function MarketStats() {
  const [activeTab, setActiveTab] = useState<string>("1");

  const marketData = {
    domestic: [
      {
        id: 1,
        name: "شاهین پلاس",
        brand: "ایران خودرو",
        logo: "/images/gallery/shahin-plus.jpg",
        price: "۱,۲۹۰,۰۰۰,۰۰۰",
        change: "۲۹۰,۰۰۰,۰۰۰",
        changeType: "up" as const,
      },
      {
        id: 2,
        name: "تیبا ۲",
        brand: "سایپا",
        logo: "/images/gallery/shahin-plus.jpg",
        price: "۶۸۰,۰۰۰,۰۰۰",
        change: "۸۰,۰۰۰,۰۰۰-",
        changeType: "down" as const,
      },
      {
        id: 3,
        name: "تارا پلاس",
        brand: "ایران خودرو",
        logo: "/images/gallery/shahin-plus.jpg",
        price: "۱,۴۵۰,۰۰۰,۰۰۰",
        change: "۴۵۰,۰۰۰,۰۰۰",
        changeType: "up" as const,
      },
      {
        id: 4,
        name: "ساینا S",
        brand: "سایپا",
        logo: "/images/gallery/shahin-plus.jpg",
        price: "۷۲۰,۰۰۰,۰۰۰",
        change: "۲۰,۰۰۰,۰۰۰",
        changeType: "up" as const,
      },
    ],
    foreign: [
      {
        id: 1,
        name: "تویوتا کمری",
        brand: "تویوتا",
        logo: "/images/gallery/shahin-plus.jpg",
        price: "۴,۲۵۰,۰۰۰,۰۰۰",
        change: "۲۵۰,۰۰۰,۰۰۰",
        changeType: "up" as const,
      },
      {
        id: 2,
        name: "هیوندای سوناتا",
        brand: "هیوندای",
        logo: "/images/gallery/shahin-plus.jpg",
        price: "۳,۸۰۰,۰۰۰,۰۰۰",
        change: "۸۰۰,۰۰۰,۰۰۰-",
        changeType: "down" as const,
      },
      {
        id: 3,
        name: "کیا اپتیما",
        brand: "کیا",
        logo: "/images/gallery/shahin-plus.jpg",
        price: "۳,۹۵۰,۰۰۰,۰۰۰",
        change: "۹۵۰,۰۰۰,۰۰۰",
        changeType: "up" as const,
      },
      {
        id: 4,
        name: "چری تیگو ۷",
        brand: "چری",
        logo: "/images/gallery/shahin-plus.jpg",
        price: "۲,۱۰۰,۰۰۰,۰۰۰",
        change: "۱۰۰,۰۰۰,۰۰۰",
        changeType: "up" as const,
      },
    ],
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <span className="text-xs font-medium px-2">خودروهای داخلی</span>,
    },
    {
      key: "2",
      label: <span className="text-xs font-medium px-2">خودروهای خارجی</span>,
    },
  ];

  const currentData =
    activeTab === "1" ? marketData.domestic : marketData.foreign;
  return (
    <>
      {/* آمار بازار */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-3">آمار بازار</h3>

        {/* تب‌های Ant Design */}
        <div className="mb-3">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={items}
            size="small"
            className="custom-market-tabs"
          />
        </div>

        {/* محتوای تب‌ها */}
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {currentData.map((car) => (
            <div
              key={car.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <img
                    src={car.logo}
                    alt={car.name}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate">
                    {car.name}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">{car.brand}</p>
                </div>
              </div>
              <div className="text-left ml-2 shrink-0">
                <div className="font-bold text-gray-900 text-sm whitespace-nowrap">
                  {car.price}
                </div>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    car.changeType === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {car.changeType === "up" ? (
                    <FaArrowUp className="w-2 h-2" />
                  ) : (
                    <FaArrowDown className="w-2 h-2" />
                  )}
                  <span className="whitespace-nowrap">{car.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* دکمه مشاهده همه */}
        <button className="w-full mt-3 cursor-pointer py-2 px-3 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-colors duration-300 flex items-center justify-center gap-1 text-sm">
          مشاهده همه
          <FaChevronLeft className="w-3 h-3" />
        </button>
      </div>
    </>
  );
}

export default MarketStats;
