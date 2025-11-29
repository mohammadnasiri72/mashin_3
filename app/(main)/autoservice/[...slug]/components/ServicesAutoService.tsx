import { Card, Divider } from "antd";

function ServicesAutoService() {
  // اطلاعات تماس و خدمات
  const contactInfo = {
    phone: "021-55223344",
    mobile: "09123456789",
    address: "یافت آباد، بلوار اصلی، جنب مترو یافت آباد",
    workingHours: "شنبه تا چهارشنبه: ۸:۰۰ - ۱۷:۰۰\nپنجشنبه: ۸:۰۰ - ۱۴:۰۰",
    email: "info@neginkhodro.com",
    services: [
      "فروش خودرو نو",
      "فروش خودرو کارکرده",
      "خدمات پس از فروش",
      "گارانتی طلایی",
      "تعمیرات تخصصی",
      "نقاشی و بدنه‌کاری",
      "صافکاری",
      "تعویض روغن و فیلتر",
    ],
    features: [
      "کادر فنی مجرب و آموزش دیده",
      "استفاده از قطعات اورجینال",
      "گارانتی معتبر ۲۴ ماهه",
      "خدمات سیار در محل",
      "مشاوره رایگان خرید",
    ],
  };
  return (
    <>
      <Card className="rounded-xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-6!">
          خدمات و سرویس‌ها
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8!">
          <div className="bg-linear-to-l from-blue-50 to-white rounded-lg p-6 border border-blue-100">
            <h4 className="font-bold text-blue-800 mb-4! text-lg">خدمات فروش</h4>
            <ul className="space-y-3">
              {contactInfo.services.slice(0, 4).map((service, index) => (
                <li key={index} className="flex items-center text-blue-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full ml-3"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-linear-to-l from-green-50 to-white rounded-lg p-6 border border-green-100">
            <h4 className="font-bold text-green-800 mb-4! text-lg">
              خدمات فنی و تعمیراتی
            </h4>
            <ul className="space-y-3">
              {contactInfo.services.slice(4).map((service, index) => (
                <li key={index} className="flex items-center text-green-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full ml-3"></span>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider />

        <div className="bg-red-50 rounded-lg p-6">
          <h4 className="font-bold text-red-800 mb-4! text-lg">
            گارانتی و تضمین کیفیت
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-red-600 mb-2!">۲۴</div>
              <p className="text-gray-700 text-sm">ماه گارانتی طلایی</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-red-600 mb-2!">۱۰۰٪</div>
              <p className="text-gray-700 text-sm">قطعات اورجینال</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-red-600 mb-2!">۷×۲۴</div>
              <p className="text-gray-700 text-sm">پشتیبانی اضطراری</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ServicesAutoService;
