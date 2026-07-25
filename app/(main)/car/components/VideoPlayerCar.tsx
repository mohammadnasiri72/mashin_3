"use client";

import { mainDomain } from "@/utils/mainDomain";
import React, { useEffect, useState } from "react";

function VideoPlayerCar({ Attachment }: { Attachment: ItemsAttachment[] }) {
  const [videos, setVideos] = useState<any[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // فیلتر ویدئوها
  useEffect(() => {
    if (Attachment && Attachment.length > 0) {
      const videoFiles = Attachment.filter((item: any) => {
        const fileUrl = item.fileUrl?.toLowerCase() || "";
        return (
          fileUrl.includes(".mp4") ||
          fileUrl.includes(".webm") ||
          fileUrl.includes(".ogg") ||
          item.itemKey === "Video"
        );
      });
      setVideos(videoFiles);
    }
  }, [Attachment]);

  if (videos.length === 0) {
    return (
      <div className="bg-gray-200 rounded-xl overflow-hidden max-w-5xl mx-auto flex items-center justify-center h-64">
        <p className="text-gray-500">ویدئویی موجود نیست</p>
      </div>
    );
  }

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="w-full max-w-5xl mx-auto" dir="ltr">
      {/* عنوان ویدئو */}
      {currentVideo?.title && (
        <h2 dir="rtl" className="text-2xl font-bold text-gray-900 mb-4">
          {currentVideo.title}
        </h2>
      )}

      {/* ویدئو پلیر با تگ ویدیو */}
      <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
        <video
          key={currentVideo.id}
          className="w-full aspect-video"
          src={mainDomain + currentVideo.fileUrl}
          controls
          playsInline
          preload="metadata"
        />
      </div>

      {/* لیست ویدئوها */}
      {videos.length > 1 && (
        <div className="mt-6">
          <h3 dir="rtl" className="text-lg font-bold mb-3 text-gray-800">
            لیست ویدئوها
          </h3>
          <div dir="rtl" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setCurrentVideoIndex(index)}
                className={`relative rounded-lg overflow-hidden group transition-all duration-300 ${
                  index === currentVideoIndex
                    ? "ring-2 ring-[#ce1a2a] shadow-lg"
                    : "hover:shadow-md"
                }`}
              >
                <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-[#ce1a2a] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-white text-xs font-bold z-10 px-2 text-center line-clamp-2">
                    {video.title || `ویدئو ${index + 1}`}
                  </span>
                  {index === currentVideoIndex && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-[#ce1a2a] rounded-full animate-pulse"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayerCar;