"use client";

import Link from "next/link";

const NewsHeroSection = ({ detailsNews }: { detailsNews: any }) => {
  return (
    <section
      className="relative min-h-[300px] bg-cover bg-center flex sm:block items-center justify-center"
      style={{ backgroundImage: "url('/images/gallery/header-1.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent to-black"></div>

      <div className="relative mx-auto px-4 py-12 sm:w-auto w-full">
        <div className="text-white! sm:w-auto w-full">
          <div className="sm:w-auto w-full p-3 sm:bg-transparent bg-[#fff2] rounded-xl flex sm:justify-start justify-center items-center">
            <h3 className="pb-0! mb-0! text-center text-white! font-bold! inline-block relative sm:text-3xl text-xl z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ce1a2a]">
              {detailsNews.title}
            </h3>
          </div>

          {/* Breadcrumb */}
          <nav className="mt-6 sm:block hidden">
            <ol className="flex items-center space-x-2 space-x-reverse flex-wrap">
              <li>
                <Link
                  href="/"
                  className="text-white! hover:text-[#ce1a2a]! text-sm duration-300"
                >
                  صفحه اصلی
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <Link
                  href="/news"
                  className="text-white! hover:text-[#ce1a2a]! text-sm duration-300"
                >
                  اخبار
                </Link>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-white! text-sm">{detailsNews.title}</span>
              </li>
            </ol>
          </nav>

          {/* News Meta Info */}
          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm">
            <span className="bg-[#ce1a2a] px-3 py-1 rounded-full">
              {detailsNews.categoryTitle}
            </span>
            <span className="bg-[#333] px-3 py-1 rounded-full">
              {new Date(detailsNews.created).toLocaleDateString("fa-IR")}
            </span>
            <span className="bg-[#333] px-3 py-1 rounded-full">
              بازدید: {detailsNews.visit}
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .breadcrumb-separator {
          color: #fff;
          margin: 0 8px;
        }
      `}</style>
    </section>
  );
};

export default NewsHeroSection;
