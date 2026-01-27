"use client";

import { Card, Dropdown, Button } from "antd";
import { useEffect, useState } from "react";
import {
  FaDownload,
  FaEye,
  FaExternalLinkAlt,
  FaCaretDown,
  FaCalendar,
  FaFolder,
  FaFileVideo,
} from "react-icons/fa";

function VideoPlayer({ video }: { video: ItemsId }) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const aparatProperty = video.properties?.find(
      (prop: any) => prop.propertyKey === "p1028_aparatcode"
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

  const downloadItems = [
    {
      key: "360p",
      label: "کیفیت 360p",
      size: "~50 MB",
    },
    {
      key: "480p",
      label: "کیفیت 480p",
      size: "~80 MB",
    },
    {
      key: "720p",
      label: "کیفیت 720p (HD)",
      size: "~120 MB",
    },
    {
      key: "1080p",
      label: "کیفیت 1080p (FHD)",
      size: "~200 MB",
    },
  ];

 

  const renderAparatOfficial = () => {
    if (!videoId) return null;

    return (
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
    );
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

  if (!videoId) {
    return (
      <Card className="rounded-xl shadow-lg">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">پخش ویدئو</h2>
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

  return (
    <Card className="rounded-xl shadow-lg border-0">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">پخش ویدئو</h2>

        {/* پلیر ویدئو */}
        <div className="bg-black rounded-xl overflow-hidden shadow-md">
          {renderAparatOfficial()}
        </div>

        {/* اطلاعات جمع و جور زیر ویدئو */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* اطلاعات ویدئو */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {/* تعداد بازدید */}
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                <FaEye className="text-[#ce1a2a] text-sm" />
                <span className="font-medium text-gray-700">
                  {video.visit?.toLocaleString("fa-IR") || 0} بازدید
                </span>
              </div>

              {/* تاریخ انتشار */}
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                <FaCalendar className="text-[#ce1a2a] text-sm" />
                <span className="font-medium text-gray-700">
                  {new Date(video.created).toLocaleDateString("fa-IR")}
                </span>
              </div>

              {/* دسته‌بندی */}
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                <FaFolder className="text-[#ce1a2a] text-sm" />
                <span className="font-medium text-gray-700 line-clamp-1 max-w-96">
                  {video.categoryTitle}
                </span>
              </div>
            </div>

            {/* دکمه‌های عمل */}
            <div className="flex items-center gap-2">
              {/* دکمه مشاهده در آپارات */}
              <button
                onClick={handleViewOnAparat}
                className="flex items-center whitespace-nowrap cursor-pointer gap-2 bg-[#ce1a2a] text-white! py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium text-sm shadow-sm"
              >
                مشاهده در آپارات
              </button>
            </div>
          </div>

         
        </div>
      </div>
    </Card>
  );
}

export default VideoPlayer;
