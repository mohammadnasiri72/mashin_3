import { Card } from "antd";
import React from "react";

function IntroductionAutoService({detailsAuto}:{detailsAuto:ItemsId}) {
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
      "تعویض روغن و فیلتر"
    ],
    features: [
      "کادر فنی مجرب و آموزش دیده",
      "استفاده از قطعات اورجینال",
      "گارانتی معتبر ۲۴ ماهه",
      "خدمات سیار در محل",
      "مشاوره رایگان خرید"
    ]
  };

  return (
    <>
      <Card className="rounded-xl shadow-lg">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4!">
              درباره نمایندگی
            </h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              نمایندگی {detailsAuto.title} با سال‌ها تجربه در زمینه فروش و خدمات
              پس از فروش خودروهای {detailsAuto.categoryTitle}، آماده ارائه خدمات
              تخصصی به مشتریان محترم می‌باشد. این نمایندگی با بهره‌گیری از کادری
              مجرب و تجهیزات پیشرفته، کلیه خدمات فروش، گارانتی و تعمیرات تخصصی
              را ارائه می‌نماید.
            </p>
            <p className="text-gray-700 leading-relaxed text-justify">
              نمایندگی {detailsAuto.title} با سال‌ها تجربه در زمینه فروش و خدمات
              پس از فروش خودروهای {detailsAuto.categoryTitle}، آماده ارائه خدمات
              تخصصی به مشتریان محترم می‌باشد. این نمایندگی با بهره‌گیری از کادری
              مجرب و تجهیزات پیشرفته، کلیه خدمات فروش، گارانتی و تعمیرات تخصصی
              را ارائه می‌نماید.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2!">ویژگی‌های ممتاز</h4>
              <ul className="space-y-2 text-blue-700">
                {contactInfo.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-bold text-green-800 mb-2!">خدمات ویژه</h4>
              <ul className="space-y-2 text-green-700">
                {contactInfo.features.slice(3).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full ml-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default IntroductionAutoService;
