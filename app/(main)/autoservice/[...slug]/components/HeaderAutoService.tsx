import { mainDomainOld } from "@/utils/mainDomain";
import { Tag } from "antd";
import { FaStar } from "react-icons/fa";

function HeaderAutoService({ detailsAuto }: { detailsAuto: ItemsId }) {
  return (
    <>
      <section
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/gallery/header-1.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="">
            <div className="flex items-start mb-4!">
              <img
                src={mainDomainOld + detailsAuto.image}
                alt={detailsAuto.categoryTitle}
                className="w-16 h-16 rounded-lg bg-white ml-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/images/default-logo.png";
                }}
              />
              <div className="flex flex-col items-start justify-center">
                <h1 className="text-3xl font-bold mb-2! text-white!">{detailsAuto.title}</h1>
                <div className="flex items-center">
                  <Tag color="red" className="text-white font-medium">
                    {detailsAuto.categoryTitle}
                  </Tag>
                  <div className="flex items-center mr-4">
                    <FaStar className="text-yellow-400 ml-1" />
                    <span className="text-sm text-white!">۴.۵ (۱۲۴ نظر)</span>
                  </div>
                </div>
              </div>
            </div>

            <nav className="text-sm">
              <ol className="flex items-center space-x-2 space-x-reverse flex-wrap">
                {detailsAuto.breadcrumb?.map((item: any, index: number) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-white!">/</span>}
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white! hover:text-[#ce1a2a]! transition-colors"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <span className="text-white!">{item.title}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeaderAutoService;
