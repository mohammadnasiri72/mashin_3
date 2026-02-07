"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaRedo,
} from "react-icons/fa";
import { getItemId } from "@/services/Item/ItemId";
import { mainDomain } from "@/utils/mainDomain";

interface Items {
  id: number;
  title: string;
  categoryTitle: string;
}

interface Property {
  propertyKey: string;
  value: string;
}

interface ItemsId {
  properties: Property[];
}

function AudioPlayer({ podcast }: { podcast: Items }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const previousVolume = useRef(0.7); // برای ذخیره حجم صدا قبل از mute

  // تابع برای دریافت لینک فایل صوتی
  const fetchAudioUrl = async (id: number): Promise<string> => {
    try {
      setIsLoading(true);
      setError(null);

      const details: ItemsId = await getItemId(id);

      const audioProperty = details.properties?.find(
        (prop: Property) => prop.propertyKey === "p1047_padcastfile",
      );

      if (audioProperty?.value) {
        const cleanPath = audioProperty.value.startsWith("/")
          ? audioProperty.value
          : `/${audioProperty.value}`;
        const fullAudioUrl = `${mainDomain.replace(/\/$/, "")}${cleanPath}`;
        return fullAudioUrl;
      } else {
        throw new Error("فایل صوتی برای این پادکست پیدا نشد");
      }
    } catch (error) {
      console.error("❌ خطا در دریافت لینک آهنگ:", error);
      setError("خطا در دریافت فایل صوتی");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // تابع برای کلیک روی پلی/پاز
  const handlePlayClick = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (!audioSrc) {
        const url = await fetchAudioUrl(podcast.id);
        setAudioSrc(url);

        setTimeout(() => {
          audio
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("❌ خطا در پخش:", error);
              setError("خطا در پخش فایل صوتی");
            });
        }, 100);
      } else {
        if (audio.paused) {
          audio
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("❌ خطا در پخش:", error);
              setError("خطا در پخش فایل صوتی");
            });
        } else {
          audio.pause();
          setIsPlaying(false);
        }
      }
    } catch (error) {
      console.error("❌ خطا در عملیات پخش:", error);
      setError("خطا در دریافت یا پخش فایل صوتی");
    }
  };

  // آپدیت زمان جاری
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  // وقتی metadata لود می‌شود
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  // تغییر موقعیت پخش
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newTime = parseFloat(e.target.value);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // تغییر حجم صدا
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);
      audio.volume = newVolume;
      setIsMuted(newVolume === 0);
      if (newVolume > 0) {
        previousVolume.current = newVolume;
      }
    }
  };

  // قطع و وصل صدا
  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isMuted) {
        // Unmute - برگشت به حجم قبلی
        audio.volume = previousVolume.current;
        setVolume(previousVolume.current);
        setIsMuted(false);
      } else {
        // Mute - ذخیره حجم فعلی و صفر کردن
        previousVolume.current = volume;
        audio.volume = 0;
        setVolume(0);
        setIsMuted(true);
      }
    }
  };

  // وقتی audio پایان می‌یابد
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // فرمت زمان به دقیقه:ثانیه
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // بازنشانی پلیر
  const resetPlayer = () => {
    setAudioSrc(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setError(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  };

  // محاسبه درصد پیشرفت
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="w-full bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-red-200 p-4 lg:p-6"
      dir="ltr"
    >
      {/* هدر پلیر */}
      <div className="flex items-start justify-between mb-4" dir="rtl">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-lg lg:text-xl line-clamp-2 leading-tight">
            {podcast.title}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{podcast.categoryTitle}</p>
        </div>
      </div>

      {/* کنترل‌های اصلی */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        {/* دکمه پلی/پاز */}
        <div className="flex items-center justify-center lg:justify-start">
          <button
            aria-label="Play or Pause btn"
            onClick={handlePlayClick}
            disabled={isLoading}
            className="w-16 h-16 lg:w-20 lg:h-20 bg-linear-to-br from-[#ce1a2a] to-[#a01522] text-white! rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <div className="w-6 h-6 lg:w-7 lg:h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <FaPause className="text-xl lg:text-2xl" />
            ) : (
              <FaPlay className="text-xl lg:text-2xl ml-1" />
            )}
          </button>
        </div>

        {/* کنترل‌های پخش و صدا */}
        <div className="flex-1 space-y-4">
          {/* نوار پیشرفت */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>

            <div className="relative">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-[#ce1a2a] to-[#e53e3e] rounded-full transition-all duration-200"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <input
                aria-label="range podcast"
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                disabled={!audioSrc || isLoading}
                className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* کنترل حجم صدا */}
          <div className="flex items-center justify-between lg:justify-start lg:gap-4">
            {/* کنترل حجم */}
            <div className="flex items-center gap-3 order-2 lg:order-1">
              <button
                aria-label="VolumeUp"
                onClick={toggleMute}
                disabled={!audioSrc || isLoading}
                className="text-gray-600 hover:text-gray-800 transition-colors p-2 disabled:opacity-50"
              >
                {isMuted || volume === 0 ? (
                  <FaVolumeMute className="text-lg" />
                ) : volume > 0.5 ? (
                  <FaVolumeUp className="text-lg" />
                ) : (
                  <FaVolumeUp className="text-lg" />
                )}
              </button>

              <div className="w-24 lg:w-32">
                <div className="relative">
                  <div className="w-full h-1.5 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-linear-to-r from-gray-400 to-gray-600 rounded-full transition-all duration-200"
                      style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                    />
                  </div>
                  <input
                    aria-label="range volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    disabled={!audioSrc || isLoading}
                    className="absolute top-0 left-0 w-full h-1.5 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* نمایش خطا */}
      {error && (
        <div
          className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center justify-between"
          dir="rtl"
        >
          <span>{error}</span>
          <button
            aria-label="تلاش مجدد"
            onClick={resetPlayer}
            className="text-red-800 hover:text-red-900 font-medium text-xs bg-red-100 px-3 py-1 rounded-lg transition-colors"
          >
            تلاش مجدد
          </button>
        </div>
      )}

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc || undefined}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          console.error("❌ خطای audio:", e);
          setError("خطا در پخش فایل صوتی");
        }}
      />

      <style jsx>{`
        /* استایل‌های سفارشی برای اسلایدرها */
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #ce1a2a;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
        }

        input[type="range"]::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: #ce1a2a;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

export default AudioPlayer;
