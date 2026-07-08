// components/HeroSection.tsx
"use client";

import { createpublishCode } from "@/utils/func";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const HeroSection = ({ detailsCar }: { detailsCar: ItemsId }) => {
  // ذخیره در localStorage
  useEffect(() => {
    try {
      const recentViews = JSON.parse(
        localStorage.getItem("recentCarViews") || "[]",
      );

      const newView = {
        id: detailsCar.id,
        title: detailsCar.title,
        sourceName: detailsCar.sourceName,
        publishCode: detailsCar.publishCode,
        image: detailsCar.image,
        timestamp: Date.now(),
        url: detailsCar.url,
        type: 'خودرو'
      };

      const filteredViews = recentViews.filter(
        (item: any) => item.id !== detailsCar.id,
      );

      const updatedViews = [newView, ...filteredViews].slice(0, 10);
      localStorage.setItem("recentCarViews", JSON.stringify(updatedViews));
    } catch (error) {
      console.error("خطا در ذخیره بازدید:", error);
    }
  }, [detailsCar.id]);

  return (
    <section className="relative min-h-56.25 flex items-center">
      {/* ✅ تصویر با priority و next/image */}
      <Image
        src="/images/gallery/header-1.jpg"
        alt={`${detailsCar.sourceName} ${detailsCar.title}`}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={85}
        className="object-cover object-center"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAGAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCgAAAAAAAAAAAAAAAAAAA//9k="
      />

      {/* Overlay با گرادیانت */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent"></div>

      <div className="relative z-20 container mx-auto px-4 py-12">
        <div className="text-white!">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold inline-block relative">
            <span className="relative z-10 text-white!">
              {detailsCar.sourceName} {detailsCar.title}{" "}
              {createpublishCode(detailsCar.publishCode)}
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-1/2 bg-[#ce1a2a] -z-10"></span>
          </h1>

          {/* Breadcrumb */}
          <nav className="mt-6">
            <ol className="flex items-center flex-wrap gap-1 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/80! hover:text-white! transition-colors duration-300"
                >
                  صفحه اصلی
                </Link>
              </li>
              {detailsCar.breadcrumb &&
                detailsCar.breadcrumb.length > 0 &&
                detailsCar.breadcrumb.map((b, i) => (
                  <li key={b.href} className="flex items-center">
                    <span className="mx-2 text-white/50!">/</span>
                    <Link
                      href={b.href}
                      className="text-white/80! hover:text-white! transition-colors duration-300"
                    >
                      {b.title}
                    </Link>
                  </li>
                ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;