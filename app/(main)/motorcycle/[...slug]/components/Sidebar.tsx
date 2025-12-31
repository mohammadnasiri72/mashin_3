import Image from "next/image";
import Link from "next/link";
import { useEffect, useTransition } from "react";

// Fancybox
import { mainDomainOld } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Loading from "@/app/components/loader";
import { useRouter } from "next/navigation";

const Sidebar = ({
  detailsMotorcompetitor,
  detailsMotorcycle,
}: {
  detailsMotorcompetitor: ItemsId[];
  detailsMotorcycle: ItemsId;
}) => {
  const [isPending, startTransition] = useTransition();
    const router = useRouter();
  const shahinModels = [
    {
      image: "/images/gallery/shahin-s.jpg",
      title: "شاهین S",
      link: "#",
    },
    {
      image: "/images/gallery/shahin-g.jpg",
      title: "شاهین G",
      link: "#",
    },
    {
      image: "/images/gallery/shahin-automatic-cv.jpg",
      title: "شاهین اتوماتیک CVT",
      link: "#",
    },
    {
      image: "/images/gallery/shahin-plus.jpg",
      title: "شاهین پلاس",
      link: "#",
    },
  ];

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
      {/* مدل‌های شاهین */}
      <div className="sidebar_widget bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="widget_title text-lg font-bold text-gray-900 mb-3!">
          <span className="hover:text-red-600 transition-colors">
            مدل های {detailsMotorcycle.sourceName} {detailsMotorcycle.title}
          </span>
        </h3>

        <div className="space-y-4 flex flex-wrap">
          {shahinModels.map((model, index) => (
            <div
              key={index}
              className="px-0 sm:px-2 lg:px-0 lg:w-full sm:w-1/2 w-full"
            >
              <div className="h-32 relative rounded-lg overflow-hidden group w-full ">
                {/* استفاده از Link با legacyBehavior */}

                <div className="block w-full h-full">
                  <a
                    href={model.image}
                    data-fancybox="sidebar-gallery1"
                    data-caption={model.title}
                    aria-label={`بزرگنمایی تصویر ${model.title}`}
                    className="block w-full h-full"
                  >
                    <Image
                      src={model.image}
                      alt={model.title}
                      fill
                      className="w-full group-hover:scale-105 h-32 object-cover transition-transform duration-300"
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

      {/* ماشین‌های رقبا */}
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
                  <Link href={model.url} onClick={(e) => {
                e.preventDefault();
                startTransition(() => {
                  router.push(model.url);
                });
              }} className="block w-full h-full">
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
      {isPending && <Loading />}
    </div>
  );
};

export default Sidebar;
