import Link from "next/link";
import { useEffect } from "react";

// Fancybox
import SideBarListItems from "@/app/components/SideBar/SideBarListItems";
import { mainDomainOld } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const Sidebar = ({
  detailsMotorcompetitor,
  detailsMotorcycle,
  motorcyclesModel,
  motorcyclesModel2,
  lastNews,
  lastVideos,
}: {
  detailsMotorcompetitor: ItemsId[];
  detailsMotorcycle: ItemsId;
  motorcyclesModel: Items[];
  motorcyclesModel2: Items[];
  lastNews: Items[];
  lastVideos: Items[];
}) => {
  // Initialize Fancybox
  useEffect(() => {
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

    return () => {
      Fancybox.destroy();
    };
  }, []);
  useEffect(() => {
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

    return () => {
      Fancybox.destroy();
    };
  }, []);

  // Increase z-index for fancybox
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .fancybox__container { 
        z-index: 999999 !important; 
      }
      .fancybox__backdrop {
        background: rgba(0, 0, 0, 0.8);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="sidebar space-y-6">
      {motorcyclesModel.length > 0 && (
        <div className="sidebar_widget bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="widget_title text-lg font-bold text-gray-900 mb-3!">
            <span>مدل های {detailsMotorcycle.sourceName}</span>
          </h3>

          <div className="space-y-4 flex flex-wrap">
            {motorcyclesModel.map((model, index) => (
              <div
                key={index}
                className="px-0 sm:px-2 lg:px-0 lg:w-full sm:w-1/2 w-full"
              >
                <div className="h-32 relative rounded-lg overflow-hidden group w-full ">
                  <div className="block w-full h-full">
                    <a
                      href={mainDomainOld + model.image}
                      data-fancybox="sidebar-gallery1"
                      data-caption={model.title}
                      aria-label={`بزرگنمایی تصویر ${model.title}`}
                      className="block w-full h-full"
                    >
                      <img
                        src={mainDomainOld + model.image}
                        alt={model.title}
                        aria-label={model.title}
                        className="w-full group-hover:scale-105 h-32 object-contain transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 transition-all duration-300"></div>

                      <div className="sm:w-auto w-full p-3 sm:bg-transparent bg-[#fff2] rounded-xl flex sm:justify-start justify-center items-center absolute left-0 bottom-0">
                        <h3 className="pb-0! mb-0! text-center text-white! font-bold! inline-block relative text-sm z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#5d5dff]">
                          {model.title}
                        </h3>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {motorcyclesModel2.length > 1 && (
        <div className="sidebar_widget bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="widget_title text-lg font-bold text-gray-900 mb-3!">
            <span>
              مدل های {detailsMotorcycle.sourceName} {detailsMotorcycle.title}
            </span>
          </h3>

          <div className="space-y-4 flex flex-wrap">
            {motorcyclesModel2.map((model, index) => (
              <div
                key={index}
                className="px-0 sm:px-2 lg:px-0 lg:w-full sm:w-1/2 w-full"
              >
                <div className="h-32 relative rounded-lg overflow-hidden group w-full ">
                  <div className="block w-full h-full">
                    <a
                      href={mainDomainOld + model.image}
                      data-fancybox="sidebar-gallery1"
                      data-caption={model.title}
                      aria-label={`بزرگنمایی تصویر ${model.title}`}
                      className="block w-full h-full"
                    >
                      <img
                        src={mainDomainOld + model.image}
                        alt={model.title}
                        aria-label={model.title}
                        className="w-full group-hover:scale-105 h-32 object-contain transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 transition-all duration-300"></div>

                      <div className="sm:w-auto w-full p-3 sm:bg-transparent bg-[#fff2] rounded-xl flex sm:justify-start justify-center items-center absolute left-0 bottom-0">
                        <h3 className="pb-0! mb-0! text-center text-white! font-bold! inline-block relative text-sm z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#5d5dff]">
                          {model.title}
                        </h3>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ماشین‌های رقبا */}
      {detailsMotorcompetitor.length > 0 && (
        <div className="sidebar_widget bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="widget_title text-lg font-bold text-gray-900 mb-3">
            <span className="hover:text-red-600 transition-colors">
              ماشین های رقبا
            </span>
          </h3>

          <div className="space-y-4">
            {detailsMotorcompetitor.map((model) => (
              <div
                key={model.id}
                className="item_wd relative rounded-lg overflow-hidden group"
              >
                <div>
                  <div className="block w-full h-full">
                    <Link href={model.url} className="block w-full h-full">
                      <img
                        src={mainDomainOld + model.image}
                        alt={model.title}
                        aria-label={model.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 transition-all duration-300"></div>
                      <div className="sm:w-auto w-full p-3 sm:bg-transparent bg-[#fff2] rounded-xl flex sm:justify-start justify-center items-center absolute left-0 bottom-0">
                        <h3 className="pb-0! mb-0! text-center text-white! font-bold! inline-block relative text-sm z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#5d5dff]">
                          {model.title}
                        </h3>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* جدیدترین اخبار */}
      <SideBarListItems itemsList={lastNews} title={"جدیدترین اخبار"} />

      {/* جدیدترین ویدئوها */}
      <SideBarListItems
        itemsList={lastVideos}
        title={"جدیدترین فیلم های ماشین 3"}
      />

      <style jsx global>{`
        /* Fancybox custom styles */
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
      `}</style>
    </div>
  );
};

export default Sidebar;
