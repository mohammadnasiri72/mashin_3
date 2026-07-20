// components/Sidebar.tsx
"use client";

import SideBarListItems from "@/app/components/SideBar/SideBarListItems";
import { getItem } from "@/services/Item/Item";
import { getItemByIds } from "@/services/Item/ItemByIds";
import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ✅ Skeleton
const SidebarSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="space-y-4">
        <div className="h-32 bg-gray-200 rounded"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="space-y-4">
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="h-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

const Sidebar = ({ detailsCar }: { detailsCar: ItemsId }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    detailsCarcompetitor: [] as ItemsId[],
    carsModel: [] as Items[],
    carsModel2: [] as Items[],
    lastNews: [] as Items[],
    lastVideos: [] as Items[],
  });

  const isFetched = useRef(false);
  const fancyboxLoaded = useRef(false);

  // =============== FETCH DATA ===============
  useEffect(() => {
    if (isFetched.current) return;
    isFetched.current = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const competitorIds = detailsCar.properties.find(
          (e) => e.propertyKey === "p1042_relatedcars"
        )?.propertyValue;

        const sourceLink = detailsCar.sourceLink;
        const categoryId = String(detailsCar.categoryId);

        const [detailsCarcompetitor, carsModel, carsModel2, lastNews, lastVideos] =
          await Promise.all([
            competitorIds ? getItemByIds(competitorIds) : Promise.resolve([]),
            sourceLink
              ? getItem({
                  TypeId: 1042,
                  langCode: "fa",
                  CategoryIdArray: sourceLink,
                  PageIndex: 1,
                  PageSize: 5,
                })
              : Promise.resolve([]),
            categoryId
              ? getItem({
                  TypeId: 1042,
                  langCode: "fa",
                  CategoryIdArray: categoryId,
                  PageIndex: 1,
                  PageSize: 5,
                })
              : Promise.resolve([]),
            getItem({
              TypeId: 5,
              langCode: "fa",
              PageIndex: 1,
              PageSize: 7,
            }),
            getItem({
              TypeId: 1028,
              langCode: "fa",
              PageIndex: 1,
              PageSize: 5,
            }),
          ]);

        setData({
          detailsCarcompetitor: Array.isArray(detailsCarcompetitor)
            ? detailsCarcompetitor
            : [],
          carsModel: Array.isArray(carsModel) ? carsModel : [],
          carsModel2: Array.isArray(carsModel2) ? carsModel2 : [],
          lastNews: Array.isArray(lastNews) ? lastNews : [],
          lastVideos: Array.isArray(lastVideos) ? lastVideos : [],
        });
      } catch (error) {
        console.error("❌ [Sidebar] Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [detailsCar]);

  // =============== ✅ Lazy Load Fancybox ===============
  useEffect(() => {
    if (fancyboxLoaded.current) return;

    // فقط وقتی سایدبار در viewport باشد، Fancybox را بارگذاری کن
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !fancyboxLoaded.current) {
          loadFancybox();
        }
      },
      { threshold: 0.1 }
    );

    const sidebarElement = document.querySelector(".sidebar");
    if (sidebarElement) {
      observer.observe(sidebarElement);
    }

    return () => observer.disconnect();
  }, []);

  const loadFancybox = async () => {
    try {
      fancyboxLoaded.current = true;
      const { Fancybox } = await import("@fancyapps/ui");

      Fancybox.bind("[data-fancybox='sidebar-gallery1']", {
        Toolbar: {
          display: {
            left: [],
            middle: [],
            right: ["close"],
          },
        },
        Thumbs: {
          type: "classic",
        },
        Images: {
          zoom: true,
        },
        Carousel: {
          infinite: true,
        },
      });

      Fancybox.bind("[data-fancybox='sidebar-gallery2']", {
        Toolbar: {
          display: {
            left: [],
            middle: [],
            right: ["close"],
          },
        },
        Thumbs: {
          type: "classic",
        },
        Images: {
          zoom: true,
        },
        Carousel: {
          infinite: true,
        },
      });

      // CSS برای Fancybox
      const style = document.createElement("style");
      style.innerHTML = `
        .fancybox__container { 
          z-index: 999999 !important; 
        }
        .fancybox__backdrop {
          background: rgba(0, 0, 0, 0.8);
        }
        .fancybox__toolbar {
          background: rgba(0, 0, 0, 0.5);
        }
        .fancybox__nav {
          --f-button-color: #fff;
          --f-button-hover-color: #ce1a2a;
        }
        .fancybox__thumbs {
          background: rgba(0, 0, 0, 0.8);
        }
      `;
      document.head.appendChild(style);
    } catch (error) {
      console.error("Failed to load Fancybox:", error);
    }
  };

  // =============== RENDER ===============
  if (loading) {
    return <SidebarSkeleton />;
  }

  const { detailsCarcompetitor, carsModel, carsModel2, lastNews, lastVideos } =
    data;

  return (
    <div className="sidebar space-y-6">
      {/* مدل‌های خودرو */}
      {carsModel.length > 0 && (
        <div className="sidebar_widget bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="widget_title text-lg font-bold text-gray-900 mb-3!">
            <span>مدل های {detailsCar.sourceName}</span>
          </h3>

          <div className="space-y-4">
            {carsModel.map((model) => (
              <div
                key={model.id}
                className="item_wd relative rounded-lg overflow-hidden group"
              >
                <Link href={model.url} className="block w-full h-full">
                  <img
                    src={mainDomain + model.image}
                    alt={model.title}
                    className="w-full h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-all duration-300"></div>
                  <div className="sm:w-auto w-full p-3 sm:bg-transparent bg-[#fff2] rounded-xl flex sm:justify-start justify-center items-center absolute left-0 bottom-0">
                    <h3 className="pb-0! mb-0! text-center text-white! font-bold! inline-block relative text-sm z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#5d5dff]">
                      {model.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* مدل‌های خودرو ۲ */}
      {carsModel2.length > 1 && (
        <div className="sidebar_widget bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="widget_title text-lg font-bold text-gray-900 mb-3!">
            <span>
              مدل های {detailsCar.sourceName} {detailsCar.title}
            </span>
          </h3>

          <div className="space-y-4">
            {carsModel2.map((model: Items) => (
              <div
                key={model.id}
                className="item_wd relative rounded-lg overflow-hidden group"
              >
                <Link href={model.url} className="block w-full h-full">
                  <img
                    src={mainDomain + model.image}
                    alt={model.title}
                    className="w-full h-32 object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-all duration-300"></div>
                  <div className="sm:w-auto w-full p-3 sm:bg-transparent bg-[#fff2] rounded-xl flex sm:justify-start justify-center items-center absolute left-0 bottom-0">
                    <h3 className="pb-0! mb-0! text-center text-white! font-bold! inline-block relative text-sm z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#5d5dff]">
                      {model.publishCode}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ماشین‌های رقبا */}
      {detailsCarcompetitor.length > 0 && (
        <div className="sidebar_widget bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="widget_title text-lg font-bold text-gray-900 mb-3">
            <span>ماشین های رقبا</span>
          </h3>

          <div className="space-y-4">
            {detailsCarcompetitor.map((model) => (
              <div
                key={model.id}
                className="item_wd relative rounded-lg overflow-hidden group"
              >
                <Link href={model.url} className="block w-full h-full">
                  <img
                    src={mainDomain + model.image}
                    alt={model.title}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-all duration-300"></div>
                  <div className="sm:w-auto w-full p-3 sm:bg-transparent bg-[#fff2] rounded-xl flex sm:justify-start justify-center items-center absolute left-0 bottom-0">
                    <h3 className="pb-0! mb-0! text-center text-white! font-bold! inline-block relative text-sm z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#5d5dff]">
                      {model.title}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* جدیدترین اخبار */}
      <SideBarListItems itemsList={lastNews} title={"جدیدترین اخبار خودرو"} />

      {/* جدیدترین ویدئوها */}
      <SideBarListItems
        itemsList={lastVideos}
        title={"جدیدترین فیلم های ماشین 3"}
      />
    </div>
  );
};

export default Sidebar;