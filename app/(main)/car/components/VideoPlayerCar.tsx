"use client";

import { mainDomain } from "@/utils/mainDomain";
import React, { useEffect, useRef, useState } from "react";
import {
  FaCompress,
  FaExpand,
  FaPause,
  FaPlay,
  FaSpinner,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";

function VideoPlayerCar({ Attachment }: { Attachment: ItemsAttachment[] }) {
  const [videos, setVideos] = useState<any[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const progressRef = useRef<HTMLDivElement>(null);

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

  // متادیتا ویدئو
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videos.length === 0) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setLoading(false);
    };

    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(video.currentTime);
        if (video.duration) {
          setProgress((video.currentTime / video.duration) * 100);
        }
      }
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("waiting", () => setLoading(true));
    video.addEventListener("playing", () => setLoading(false));
    video.addEventListener("canplay", () => setLoading(false));

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentVideoIndex, videos, isDragging]);

  // تغییر ویدئو
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videos.length === 0) return;

    setLoading(true);
    setProgress(0);
    setCurrentTime(0);

    video.load();

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setLoading(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setLoading(false);
        });
    }
  }, [currentVideoIndex, videos]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !seconds) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  // کلیک روی نوار پیشرفت
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration || !videoRef.current) return;

    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    // برای LTR، از چپ به راست محاسبه میکنیم
    let percentage = (x / width) * 100;
    percentage = Math.min(100, Math.max(0, percentage));

    const newTime = (percentage / 100) * duration;
    videoRef.current.currentTime = newTime;
    setProgress(percentage);
    setCurrentTime(newTime);
  };

  // درگ کردن نوار پیشرفت
  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);

    const startX = e.clientX;
    const startProgress = progress;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!progressRef.current || !duration || !videoRef.current) return;

      const rect = progressRef.current.getBoundingClientRect();
      const deltaX = moveEvent.clientX - startX;
      const width = rect.width;

      // محاسبه درصد جدید بر اساس حرکت موس
      let percentage = startProgress + (deltaX / width) * 100;
      percentage = Math.min(100, Math.max(0, percentage));

      setProgress(percentage);
      setCurrentTime((percentage / 100) * duration);
    };

    const handleMouseUp = (moveEvent: MouseEvent) => {
      if (!videoRef.current || !duration || !progressRef.current) {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        return;
      }

      const rect = progressRef.current.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const width = rect.width;

      let percentage = (x / width) * 100;
      percentage = Math.min(100, Math.max(0, percentage));

      const newTime = (percentage / 100) * duration;
      videoRef.current.currentTime = newTime;
      setProgress(percentage);
      setCurrentTime(newTime);

      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleNext = () => {
    if (videos.length > 0) {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      setCurrentVideoIndex(nextIndex);
    }
  };

  const handlePrev = () => {
    if (videos.length > 0) {
      const prevIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
      setCurrentVideoIndex(prevIndex);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  if (videos.length === 0) {
    return (
      <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl max-w-5xl">
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
          <FaSpinner className="text-white! text-4xl animate-spin" />
        </div>
      </div>
    );
  }

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="w-full max-w-5xl mx-auto" dir="ltr">
      {/* عنوان ویدئو */}
      {currentVideo?.title && (
        <h2
          dir="rtl"
          className="dt_title text-2xl font-bold text-gray-900 mb-6!"
        >
          <strong>{currentVideo.title}</strong>
        </h2>
      )}

      {/* پلیر اصلی */}
      <div
        ref={containerRef}
        className="relative bg-black rounded-xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: "16/9" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          key={currentVideo.id}
          className="w-full h-full object-contain"
          onEnded={handleNext}
          preload="auto"
          playsInline
        >
          <source src={mainDomain + currentVideo.fileUrl} type="video/mp4" />
        </video>

        {/* لودینگ */}
        {loading && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
            <FaSpinner className="text-white! text-4xl animate-spin" />
          </div>
        )}

        {/* شماره ویدئو */}
        {videos.length > 1 && !loading && (
          <div className="absolute top-4 left-4 bg-black/70 text-white! px-3 py-1.5 rounded-full text-xs backdrop-blur-sm z-10">
            {currentVideoIndex + 1} / {videos.length}
          </div>
        )}

        {/* کنترلرها */}
        {!loading && (
          <div
            className={`absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 z-10 ${showControls ? "opacity-100" : "opacity-0"}`}
          >
            {/* نوار پیشرفت با قابلیت کلیک و درگ */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white! text-xs min-w-10">
                {formatTime(currentTime)}
              </span>

              {/* نوار پیشرفت */}
              <div
                ref={progressRef}
                className="flex-1 relative h-6 flex items-center cursor-pointer group/progress"
                onClick={handleProgressClick}
                onMouseDown={handleProgressMouseDown}
              >
                {/* پس زمینه نوار */}
                <div className="absolute w-full h-1.5 bg-gray-600 rounded-lg"></div>

                {/* نوار پیشرفت قرمز */}
                <div
                  className="absolute h-1.5 bg-[#ce1a2a] rounded-lg"
                  style={{ width: `${progress}%` }}
                ></div>

                {/* هندل (دکمه گرد) */}
                <div
                  className={`absolute w-4 h-4 bg-[#ce1a2a] rounded-full shadow-lg border-2 border-white transition-opacity ${isDragging ? "opacity-100 scale-125" : "opacity-0 group-hover/progress:opacity-100"}`}
                  style={{
                    left: `${progress}%`,
                    transform: "translateX(-50%)",
                  }}
                ></div>
              </div>

              <span className="text-white! text-xs min-w-10">
                {formatTime(duration)}
              </span>
            </div>

            {/* دکمه‌های کنترل - چینش LTR */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="text-white! hover:text-[#ce1a2a] transition-colors"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                </button>

                {videos.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="text-white! hover:text-[#ce1a2a] transition-colors text-xl"
                      title="Previous"
                    >
                      ⏮
                    </button>
                    <button
                      onClick={handleNext}
                      className="text-white! hover:text-[#ce1a2a] transition-colors text-xl"
                      title="Next"
                    >
                      ⏭
                    </button>
                  </>
                )}

                {/* کنترل صدا */}
                <div className="flex items-center gap-2 group/volume">
                  <button
                    onClick={toggleMute}
                    className="text-white! hover:text-[#ce1a2a] transition-colors"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted || volume === 0 ? (
                      <FaVolumeMute size={18} />
                    ) : (
                      <FaVolumeUp size={18} />
                    )}
                  </button>
                  <div className="w-0 group-hover/volume:w-20 transition-all duration-300 overflow-hidden">
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:w-3 
                        [&::-webkit-slider-thumb]:h-3 
                        [&::-webkit-slider-thumb]:bg-[#ce1a2a] 
                        [&::-webkit-slider-thumb]:rounded-full"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={toggleFullscreen}
                className="text-white! hover:text-[#ce1a2a] transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? (
                  <FaCompress size={18} />
                ) : (
                  <FaExpand size={18} />
                )}
              </button>
            </div>
          </div>
        )}

        {/* دکمه پخش وسط */}
        {!isPlaying && !loading && (
          <button
            onClick={togglePlay}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#ce1a2a] rounded-full flex items-center justify-center hover:bg-[#a51522] transition-colors z-10"
            title="Play"
          >
            <FaPlay className="text-white! text-2xl ml-1" />
          </button>
        )}
      </div>

      {/* لیست ویدئوها */}
      {videos.length > 1 && (
        <div className="mt-6">
          <h3 dir="rtl" className="text-lg font-bold mb-4! text-gray-800 pl-3">
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
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 bg-[#ce1a2a] rounded-full flex items-center justify-center">
                      <FaPlay className="text-white! text-sm ml-1" />
                    </div>
                  </div>
                  <span className="text-white! text-xs font-bold z-10 px-2 text-center line-clamp-2">
                    {video.title || `Video ${index + 1}`}
                  </span>
                  {index === currentVideoIndex && (
                    <div className="absolute top-2 left-2 w-2 h-2 bg-[#ce1a2a] rounded-full animate-pulse"></div>
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
