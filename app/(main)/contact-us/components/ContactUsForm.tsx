"use client";

import { RootState } from "@/redux/store";
import { getCsrf } from "@/services/Csrf/Csrf";
import { PostFormContact } from "@/services/Form/FormContact";
import { htmlToPlainText, Toast, toEnglishNumber } from "@/utils/func";
import {
  EnvironmentOutlined,
  MessageOutlined,
  PhoneOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Card, Input } from "antd";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FaMobile, FaUser } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { useSelector } from "react-redux";

const MapContainer = dynamic(() => import("@/app/components/MapContainer"), {
  ssr: false, // غیرفعال کردن SSR برای این کامپوننت
  loading: () => (
    <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ce1a2a] mx-auto mb-4"></div>
        <p className="text-gray-600">در حال بارگذاری نقشه...</p>
      </div>
    </div>
  ),
});

const { TextArea } = Input;

interface SocialMediaBadge {
  name: string;
  color: string;
  textColor: string;
}

function ContactUsForm({
  tel,
  mobile,
  address,
  map,
}: {
  tel: string | undefined;
  mobile: string | undefined;
  address: string | undefined;
  map: string | undefined;
}) {
  const socialMediaBadges: SocialMediaBadge[] = [
    { name: "واتساپ", color: "bg-green-100", textColor: "text-green-800" },
    { name: "تلگرام", color: "bg-blue-100", textColor: "text-blue-800" },
    { name: "بله", color: "bg-purple-100", textColor: "text-purple-800" },
  ];

  const token = useSelector((state: RootState) => state.token.token);

  const phoneRegex = /^09[0|1|2|3|9][0-9]{8}$/;
  const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  const [formData, setFormData] = useState<{
    langCode: string;
    nameFamily: string;
    email: string;
    tel: string;
    message: string;
  }>({
    langCode: "fa",
    nameFamily: "",
    email: "",
    tel: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState<{
    nameFamily: boolean;
    tel: boolean;
    email: boolean;
    message: boolean;
  }>({
    nameFamily: false,
    tel: false,
    email: false,
    message: false,
  });

  // اعتبارسنجی فرم ورود
  const validateForm = (): boolean => {
    const errors: {
      nameFamily: boolean;
      tel: boolean;
      email: boolean;
      message: boolean;
    } = {
      nameFamily: !formData.nameFamily,
      tel: !formData.tel || !formData.tel.match(phoneRegex),
      email: !!formData.email && !formData.email.match(patternEmail),
      message: !formData.message,
    };

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setLoadingForm(true);

    try {
      const resultCsrf = await getCsrf();

      const result = await PostFormContact(formData, resultCsrf.csrfToken);
      Toast.fire({
        icon: "success",
        title: "پیام با موفقیت ارسال شد",
      });
    } catch (error: any) {
      Toast.fire({
        icon: "error",
        title: error.response.data || "خطا در ارسال پیام",
      });
    } finally {
      setLoadingForm(false);
    }
  };

  return (
    <div className="py-8">
      {/* هدر اطلاعات تماس */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-r-4 border-[#ce1a2a]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          تماس با ما
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center space-x-3 space-x-reverse gap-2">
            <div className="bg-[#ce1a2a] p-3 rounded-full w-10 h-10 flex justify-center items-center">
              <PhoneOutlined className="text-white! text-xl" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">تلفن تبلیغات</h2>
              <p className="text-gray-600 text-lg">{tel}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse gap-2">
            <div className="bg-[#ce1a2a] p-3 rounded-full w-10 h-10 flex justify-center items-center">
              <MessageOutlined className="text-white! text-xl" />
            </div>
            <div>
              <div className="flex items-center">
                <h2 className="font-semibold text-gray-700 pl-1">
                  پیام در شبکه‌های اجتماعی
                </h2>
                <div className="flex gap-2">
                  (
                  {socialMediaBadges.map(
                    (badge: SocialMediaBadge, index: number) => (
                      <span
                        key={index}
                        className={`text-xs ${badge.color} ${badge.textColor} px-2 py-1 rounded-full`}
                      >
                        {badge.name}
                      </span>
                    ),
                  )}
                  )
                </div>
              </div>
              <p className="text-gray-600 text-lg">{mobile}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* فرم تماس */}
        <Card
          title={
            <div className="flex items-center space-x-2 space-x-reverse gap-2">
              <div className="bg-[#ce1a2a] p-3 rounded-full w-8 h-8 flex justify-center items-center">
                <SendOutlined className="text-white!" />
              </div>
              <span className="text-gray-800">فرم ارتباط با ما</span>
            </div>
          }
          className="shadow-lg border-t-4 border-t-[#ce1a2a]"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                <span className="text-red-600">*</span>
                <span>نام</span>
              </div>
              <Input
                value={formData.nameFamily}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    nameFamily: e.target.value,
                  }));
                  setFormErrors((prev) => ({
                    ...prev,
                    nameFamily: false,
                  }));
                }}
                prefix={<FaUser className="text-gray-400 ml-2" />}
                placeholder="نام خود را وارد کنید"
                size="large"
                className={`rounded-lg ${
                  formErrors.nameFamily ? "border-red-500!" : "border-gray-300!"
                }`}
              />
              {formErrors.nameFamily && (
                <div className="text-red-600 text-xs">
                  لطفاً نام خود را وارد کنید
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                <span className="text-red-600">*</span>
                <span>موبایل</span>
              </div>

              <Input
                value={formData.tel}
                onChange={(e) => {
                  const value = toEnglishNumber(e.target.value).replace(
                    /\D/g,
                    "",
                  );
                  setFormData((prev) => ({
                    ...prev,
                    tel: value,
                  }));
                  setFormErrors((prev) => ({
                    ...prev,
                    tel: false,
                  }));
                }}
                prefix={<FaMobile className="text-gray-400 ml-2" />}
                placeholder="موبایل خود را وارد کنید"
                size="large"
                className={`rounded-lg ${
                  formErrors.tel ? "border-red-500!" : "border-gray-300!"
                }`}
              />

              {formErrors.tel && (
                <>
                  {formData.tel ? (
                    <div className="text-red-600 text-xs">
                      لطفاً موبایل خود را به درستی وارد کنید
                    </div>
                  ) : (
                    <div className="text-red-600 text-xs">
                      لطفاً موبایل خود را وارد کنید
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                <span>ایمیل (اختیاری)</span>
              </div>

              <Input
                value={formData.email}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                  setFormErrors((prev) => ({
                    ...prev,
                    email: false,
                  }));
                }}
                prefix={<MdMail className="text-gray-400 ml-2" />}
                placeholder="ایمیل خود را وارد کنید"
                size="large"
                className={`rounded-lg ${
                  formErrors.email ? "border-red-500!" : "border-gray-300!"
                }`}
              />

              {formErrors.email && (
                <div className="text-red-600 text-xs">
                  لطفاً ایمیل خود را به درستی وارد کنید
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-0.5">
                <span className="text-red-600">*</span>
                <span>متن پیام</span>
              </div>
              <TextArea
                rows={6}
                value={formData.message}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }));
                  setFormErrors((prev) => ({
                    ...prev,
                    message: false,
                  }));
                }}
                placeholder="متن پیام خود را اینجا بنویسید..."
                size="large"
                className={`rounded-lg ${
                  formErrors.message ? "border-red-500!" : "border-gray-300!"
                }`}
              />
              {formErrors.message && (
                <div className="text-red-600 text-xs">
                  متن پیام نمیتواند خالی باشد
                </div>
              )}
            </div>

            <Button
              aria-label="ارسال پیام"
              onClick={handleSubmit}
              type="primary"
              htmlType="submit"
              size="large"
              className="w-full rounded-lg hover:scale-105 transition-transform"
              style={{
                backgroundColor: "#ce1a2a",
                borderColor: "#ce1a2a",
                height: "48px",
              }}
            >
              {loadingForm ? "در حال ارسال..." : "ارسال پیام"}
            </Button>
          </div>
        </Card>
        {/* نقشه */}
        <Card
          title={
            <div className="flex items-center space-x-2 space-x-reverse gap-2">
              <div className="bg-[#ce1a2a] p-3 rounded-full w-8 h-8 flex justify-center items-center">
                <EnvironmentOutlined className="text-white!" />
              </div>
              <span className="text-gray-800">موقعیت ما روی نقشه</span>
            </div>
          }
          className="shadow-lg border-t-4 border-t-[#ce1a2a]"
        >
          {map ? (
            <div>
              <div
                className="w-full rounded-lg overflow-hidden border border-gray-200"
                dangerouslySetInnerHTML={{ __html: map }}
              />
            </div>
          ) : (
            <MapContainer
              latitude={35.6892}
              longitude={51.389}
              zoom={14}
              markerText="دفتر مرکزی ماشین3"
              className="w-full! h-96!"
            />
          )}

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">آدرس:</h3>
            <p className="text-gray-600">{address}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ContactUsForm;
