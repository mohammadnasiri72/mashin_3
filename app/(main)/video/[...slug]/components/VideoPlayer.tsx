"use client";

import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { FaCalendar, FaDownload, FaEye, FaFolder } from "react-icons/fa";

function VideoPlayer({
  video,
  attachment,
}: {
  video: ItemsId;
  attachment: ItemsAttachment[];
}) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoSizes, setVideoSizes] = useState<{ [key: number]: string }>({});
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(0);

  // تابع تبدیل بایت به فرمت خوانا
  const formatBytes = (bytes: number, decimals: number = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // دریافت حجم یک ویدیو
  const getVideoSize = async (fileUrl: string, index: number) => {
    if (!fileUrl) return;
    try {
      const videoUrl = mainDomainOld + fileUrl;
      const response = await fetch(videoUrl, { method: "HEAD" });
      const contentLength = response.headers.get("content-length");

      if (contentLength) {
        const sizeInBytes = parseInt(contentLength, 10);
        setVideoSizes((prev) => ({
          ...prev,
          [index]: formatBytes(sizeInBytes),
        }));
        return sizeInBytes;
      }
    } catch (error) {
      console.error("خطا در دریافت حجم ویدیو:", error);
    }
    return null;
  };

  // دریافت حجم همه ویدیوها و انتخاب کم‌حجم‌ترین (غیرصفر)
  useEffect(() => {
    const fetchAllSizes = async () => {
      const sizesPromises = attachment.map(async (att, index) => {
        try {
          const videoUrl = mainDomainOld + att.fileUrl;
          const response = await fetch(videoUrl, { method: "HEAD" });
          const contentLength = response.headers.get("content-length");

          if (contentLength) {
            const sizeInBytes = parseInt(contentLength, 10);
            setVideoSizes((prev) => ({
              ...prev,
              [index]: formatBytes(sizeInBytes),
            }));
            return { index, size: sizeInBytes };
          }
        } catch (error) {
          console.error(`خطا در دریافت حجم ویدیو ${index}:`, error);
        }
        return { index, size: Infinity };
      });

      const sizes = await Promise.all(sizesPromises);

      // پیدا کردن ویدیو با کمترین حجم (بزرگتر از صفر)
      const validSizes = sizes.filter(
        (s) => s.size && s.size > 0 && s.size !== Infinity,
      );
      if (validSizes.length > 0) {
        const smallest = validSizes.reduce((min, current) =>
          current.size < min.size ? current : min,
        );
        setSelectedVideoIndex(smallest.index);
      }
    };

    if (attachment.length > 0) {
      fetchAllSizes();
    }
  }, [attachment]);

  useEffect(() => {
    const aparatProperty = video.properties?.find(
      (prop: any) => prop.propertyKey === "p1028_aparatcode",
    );

    if (aparatProperty) {
      const videoIdMatch = aparatProperty.value.match(/embed\/([a-zA-Z0-9]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        setVideoId(videoIdMatch[1]);
      }
    }
    setIsLoading(false);
  }, [video]);

  const getAparatLink = () => {
    return `https://www.aparat.com/v/${videoId}`;
  };

  const handleViewOnAparat = () => {
    const aparatUrl = getAparatLink();
    window.open(aparatUrl, "_blank");
  };

  const renderAparatOfficial = () => {
    if (!videoId) return null;

    return (
      <Card className="rounded-xl shadow-lg border-0">
        <div className="space-y-4">
          {/* پلیر ویدئو آپارات */}
          <div className="bg-black rounded-xl overflow-hidden shadow-md">
            <div className="aparat-embed-container">
              <iframe
                src={`https://www.aparat.com/video/video/embed/videohash/${videoId}/vt/frame`}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                title={video.title}
                className="w-full aspect-video"
              ></iframe>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  // تابع دانلود ویدیو
  const handleDownload = async (attachment: ItemsAttachment) => {
    try {
      const videoUrl = mainDomainOld + attachment.fileUrl;
      const link = document.createElement("a");
      link.href = videoUrl;
      link.download = attachment.title || "video.mp4";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("خطا در دانلود ویدیو:", error);
    }
  };

  if (isLoading) {
    return (
      <Card className="rounded-xl shadow-lg">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">پخش ویدئو</h2>
          <div className="bg-black rounded-lg overflow-hidden">
            <div className="w-full aspect-video flex items-center justify-center">
              <div className="text-white! text-center">
                <p className="text-lg mb-4">در حال بارگذاری ویدئو...</p>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (!videoId && attachment.length === 0) {
    return (
      <Card className="rounded-xl shadow-lg">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2!">پخش ویدئو</h2>
          <div className="bg-black rounded-lg overflow-hidden">
            <div className="w-full aspect-video flex items-center justify-center">
              <div className="text-white! text-center">
                <p className="text-lg mb-4">شناسه ویدئو یافت نشد</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (!videoId && attachment.length > 0) {
    return (
      <>
        {attachment.length > 0 && (
          <Card className="rounded-xl shadow-lg">
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2!">
                پخش ویدئو
              </h2>
              {/* نمایش ویدئوی انتخاب‌شده (کم‌حجم‌ترین) */}
              <video
                key={selectedVideoIndex} // برای اطمینان از رندر مجدد با تغییر ایندکس
                className="w-full"
                src={mainDomainOld + attachment[selectedVideoIndex]?.fileUrl}
                controls
              />
            </div>
          </Card>
        )}

        {/* اطلاعات و دکمه‌ها */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* اطلاعات ویدئو */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                <FaEye className="text-[#ce1a2a] text-sm" />
                <span className="font-medium text-gray-700">
                  {video.visit?.toLocaleString("fa-IR") || 0} بازدید
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                <FaCalendar className="text-[#ce1a2a] text-sm" />
                <span className="font-medium text-gray-700">
                  {new Date(video.created).toLocaleDateString("fa-IR")}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                <FaFolder className="text-[#ce1a2a] text-sm" />
                <span className="font-medium text-gray-700 line-clamp-1 max-w-96">
                  {video.categoryTitle}
                </span>
              </div>
            </div>
            {/* دکمه‌های دانلود برای همه ویدئوها با نمایش حجم */}
            {attachment.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {attachment.map((att, index) => (
                  <button
                    key={att.id}
                    onClick={() => handleDownload(att)}
                    className={`flex cursor-pointer items-center gap-2 py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium shadow-sm bg-blue-600 hover:bg-blue-700 text-white! `}
                  >
                    <FaDownload className="text-sm" />
                    <span>ویدئو {index + 1}</span>
                    {videoSizes[index] && (
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full bg-blue-700 `}
                      >
                        {videoSizes[index]}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {renderAparatOfficial()}
      </>
    );
  }

  return (
    <Card className="rounded-xl shadow-lg border-0">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">پخش ویدئو</h2>

        <div className="bg-black rounded-xl overflow-hidden shadow-md">
          {renderAparatOfficial()}
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                <FaEye className="text-[#ce1a2a] text-sm" />
                <span className="font-medium text-gray-700">
                  {video.visit?.toLocaleString("fa-IR") || 0} بازدید
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                <FaCalendar className="text-[#ce1a2a] text-sm" />
                <span className="font-medium text-gray-700">
                  {new Date(video.created).toLocaleDateString("fa-IR")}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                <FaFolder className="text-[#ce1a2a] text-sm" />
                <span className="font-medium text-gray-700 line-clamp-1 max-w-96">
                  {video.categoryTitle}
                </span>
              </div>
            </div>

            <button
              onClick={handleViewOnAparat}
              className="flex items-center cursor-pointer gap-2 bg-[#ce1a2a] text-white! py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium shadow-sm"
            >
              مشاهده در آپارات
            </button>
          </div>

          {/* دکمه‌های دانلود برای همه ویدئوها با نمایش حجم */}
          {attachment.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 pt-4 border-t border-gray-200">
              {attachment.map((att, index) => (
                <button
                  key={att.id}
                  onClick={() => handleDownload(att)}
                  className={`flex cursor-pointer items-center gap-2 py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium shadow-sm bg-blue-600 hover:bg-blue-700 text-white! `}
                >
                  <FaDownload className="text-sm" />
                  <span>ویدئو {index + 1}</span>
                  {videoSizes[index] && (
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-full bg-blue-700 `}
                    >
                      {videoSizes[index]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default VideoPlayer;
