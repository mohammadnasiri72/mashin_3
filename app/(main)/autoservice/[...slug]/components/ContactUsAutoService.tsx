import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaClock, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";

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

function ContactUsAutoService({ detailsAuto }: { detailsAuto: ItemsId }) {

  const address: string | undefined =
    detailsAuto.properties.length > 0
      ? detailsAuto.properties.find(
          (e) => e.propertyKey === "p1050_serviceaddress",
        )?.value
      : undefined;
  const phone: string | undefined =
    detailsAuto.properties.length > 0
      ? detailsAuto.properties.find((e) => e.propertyKey === "p1050_servicetel")
          ?.value
      : undefined;
  const workingHours: string | undefined =
    detailsAuto.properties.length > 0
      ? detailsAuto.properties.find(
          (e) => e.propertyKey === "p1050_servicetime",
        )?.value
      : undefined;
  const servicebosscode: string | undefined =
    detailsAuto.properties.length > 0
      ? detailsAuto.properties.find(
          (e) => e.propertyKey === "p1050_servicebosscode",
        )?.value
      : undefined;
  const Latitude: string | undefined =
    detailsAuto.properties.length > 0
      ? detailsAuto.properties.find((e) => e.propertyKey === "p1050_latitude")
          ?.value
      : undefined;
  const Longitude: string | undefined =
    detailsAuto.properties.length > 0
      ? detailsAuto.properties.find((e) => e.propertyKey === "p1050_longitude")
          ?.value
      : undefined;

  const numbers = phone
    ? phone
        .split(/[\r\n,;]+/)
        .map((num) => num.trim())
        .filter((num) => num.length > 0 && /^0\d{10}$/.test(num))
    : "";

  const handleNavigation = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${Latitude},${Longitude}`;

    // تشخیص دستگاه
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
      // برای iOS از maps خاص استفاده می‌کنیم
      const iosMapsUrl = `maps://maps.google.com/maps?daddr=${Latitude},${Longitude}`;
      window.location.href = iosMapsUrl;

      // فال‌بک بعد از 500ms اگر کار نکرد
      setTimeout(() => {
        if (!document.hidden) {
          window.open(mapsUrl, "_blank");
        }
      }, 500);
    } else if (isAndroid) {
      // برای اندروید از geo URI استفاده می‌کنیم
      const geoUrl = `geo:${Latitude},${Longitude}?q=${Latitude},${Longitude}`;
      window.location.href = geoUrl;

      // فال‌بک بعد از 500ms اگر کار نکرد
      setTimeout(() => {
        if (!document.hidden) {
          window.open(mapsUrl, "_blank");
        }
      }, 500);
    } else {
      // برای سایر دستگاه‌ها مستقیماً به گوگل مپس
      window.open(mapsUrl, "_blank");
    }
  };

  return (
    <>
      <Card className="rounded-xl shadow-lg">
        <div className="flex gap-2 items-center mb-6!">
          <img
            src={mainDomainOld + detailsAuto.image}
            alt={detailsAuto.categoryTitle}
            className="w-16 rounded-lg bg-white ml-4"
          />
          <h3 className="text-xl font-bold text-gray-800 ">
            مشخصات {detailsAuto.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* اطلاعات تماس */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="space-y-4">
                {/* address */}
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-red-600 mt-1 ml-3 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">آدرس نمایندگی</p>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      {address ? address : "---"}
                    </p>
                  </div>
                </div>

                {/* phone */}
                <div className="flex items-center">
                  <FaPhone className="text-red-600 ml-3 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">تلفن</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {phone ? phone?.replace("\r\n", " - ") : "---"}
                    </p>
                  </div>
                </div>

                {/* workingHours */}
                <div className="flex items-center">
                  <FaClock className="text-red-600 ml-3 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">ساعات کاری</p>
                    <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">
                      {workingHours ? workingHours : "---"}
                    </p>
                  </div>
                </div>

                {/* servicebosscode */}
                <div className="flex items-center">
                  <MdNumbers className="text-red-600 ml-3 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-800">کد عاملیت</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {servicebosscode ? servicebosscode : "---"}
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
                latitude={Latitude ? Number(Latitude) : 35.6892}
                longitude={Longitude ? Number(Longitude) : 51.389}
                zoom={14}
                markerText={detailsAuto.title}
                className="w-full! h-full!"
              />
            </div>

            {Latitude && Longitude && (
              <Link
                href={`https://www.google.com/maps/dir/?api=1&destination=${Latitude},${Longitude}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation();
                }}
                className="w-full cursor-pointer bg-teal-600! text-white! py-3 rounded-lg font-medium hover:bg-teal-700! transition-colors! flex items-center justify-center"
              >
                <FaMapMarkerAlt className="ml-2" />
                مسیریابی
              </Link>
            )}
            {numbers.length > 0 && (
              <a href={`tel:${numbers[0]}`} className="w-full">
                <button
                  aria-label="تماس"
                  className="w-full cursor-pointer bg-[#ce1a2a] text-white! py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <FaPhone className="ml-2" />
                  تماس
                </button>
              </a>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}

export default ContactUsAutoService;
