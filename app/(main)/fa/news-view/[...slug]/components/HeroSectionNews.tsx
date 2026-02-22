import Link from "next/link";
import React from "react";

function HeroSectionNews({ detailsNews }: { detailsNews: ItemsId }) {
  return (
    <>
      <section
        className="relative min-h-[225px] bg-cover bg-center flex sm:block items-center justify-center"
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
            <nav className="mt-6 sm:block! hidden">
              <ol className="flex items-center space-x-2 space-x-reverse flex-wrap">
                <li>
                  <Link
                    href={"/"}
                    className="text-white! hover:text-[#ce1a2a]! text-sm duration-300"
                  >
                    صفحه اصلی
                  </Link>
                </li>
                {detailsNews.breadcrumb &&
                  detailsNews.breadcrumb.length > 0 &&
                  detailsNews.breadcrumb.map((b, i) => (
                    <li key={b.href}>
                      <span className="mx-2">/</span>
                      <Link
                        href={b.href}
                        className="text-white! hover:text-[#ce1a2a]! text-sm duration-300"
                      >
                        {b.title}
                      </Link>
                    </li>
                  ))}
              </ol>
            </nav>
          </div>
        </div>

        <style jsx global>{`
          .breadcrumb-separator {
            color: #fff;
            margin: 0 8px;
          }
        `}</style>
      </section>
    </>
  );
}

export default HeroSectionNews;
