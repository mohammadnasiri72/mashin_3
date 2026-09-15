import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // غیرفعال کردن source maps در پروداکشن - کاهش قابل توجه حجم
  productionBrowserSourceMaps: false,
  // بهینه‌سازی تصاویر از دامنه‌های خارجی
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mashin3.com",
        pathname: "/**",
      },
      {
      protocol: "https",
      hostname: "file.mashin3.com", // ✅ این دامنه اصلی فایل‌ها را اضافه کنید
      pathname: "/**",
    },
      {
        protocol: "https",
        hostname: "test.mashin3.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.mashin3.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        // hostname: "admin3.aitest2.ir",
        hostname: "admin.mashin3.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api3.aitest2.ir",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.aitest2.ir",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: "https://api3.aitest2.ir/api/:path*",
      },
    ];
  },
  // اگر نیاز به CORS headers دارید
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;



