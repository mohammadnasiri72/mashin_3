import { Card } from "antd";
import React from "react";
import {
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import MapContainer from "../../../../components/MapContainer";

function ContactUsAutoService() {
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
        <h3 className="text-xl font-bold text-gray-800 mb-6!">تماس با ما</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* اطلاعات تماس */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-bold text-blue-800 mb-4! text-lg">
                اطلاعات تماس
              </h4>

              <div className="space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-red-600 mt-1 ml-3 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">آدرس نمایندگی</p>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaPhone className="text-red-600 ml-3 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">تلفن ثابت</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaWhatsapp className="text-green-600 ml-3 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">تلفن همراه</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {contactInfo.mobile}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaClock className="text-red-600 ml-3 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">ساعات کاری</p>
                    <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">
                      {contactInfo.workingHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <FaEnvelope className="text-red-600 ml-3 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">ایمیل</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* نقشه و مسیریابی */}
          <div className="space-y-2">
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center overflow-hidden">
              <MapContainer
                  latitude={35.6892}
                  longitude={51.389}
                  zoom={14}
                  markerText="نمایندگی مرکزی تهران"
                  className="w-full! h-full!"
                />
            </div>

            <button className="w-full cursor-pointer bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center">
              <FaMapMarkerAlt className="ml-2" />
              مسیریابی
            </button>
            <button className="w-full cursor-pointer bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center">
              <FaPhone className="ml-2" />
              تماس تلفنی
            </button>
            <button className="w-full cursor-pointer bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
              <FaWhatsapp className="ml-2" />
              ارتباط در واتساپ
            </button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default ContactUsAutoService;
