"use client";

import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * کامپوننت تصویر بهینه‌شده با Next.js Image
 * تصاویر را فشرده و به WebP تبدیل می‌کند - کاهش قابل توجه حجم
 */
export default function OptimizedImage({
  src,
  alt,
  className,
  fill = true,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  loading,
  onLoad,
  onError,
}: OptimizedImageProps) {
  if (!src) return null;

  const cleanSrc = src.replace(/([^:]\/)\/+/g, "$1");

  return (
    <Image
      src={cleanSrc}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
      quality={80}
      unoptimized={true}
    />
  );
}
