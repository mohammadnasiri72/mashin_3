import { formatPersianDate } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";
import Link from "next/link";
import { FaCalendar } from "react-icons/fa";

export default function NewsSection({
  news,
  saleNews,
  lastCompare,
}: {
  news: Items[];
  saleNews: Items[];
  lastCompare: Items[];
}) {
  
  return (
    <div className="mb-12">
      <div className="mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="lg:w-1/2 w-full">
            <div className="mb-2! p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
              <div className="pr-3">
                <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
                  آخرین اخبار
                </h3>
              </div>
            </div>
            <div className="flex flex-wrap items-center lg:pl-2">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="sm:w-1/2 w-full sm:px-2 sm:mt-0 mt-3"
                >
                  <Card
                    hoverable
                    className=" rounded-3xl! h-64 overflow-hidden border-none shadow-sm group"
                    cover={
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={mainDomainOld + item.image}
                          alt={item.title}
                          className="object-cover w-full h-full group-hover:brightness-75 duration-300"
                        />
                        <div className="absolute font-bold! bottom-0 right-0 left-0 bg-linear-to-t from-black/70 to-transparent p-4">
                          <span className="text-white! inline-block relative pl-2.5 text-[16px] line-clamp-2! z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 after:bg-[#292929]">
                            {item.title}
                          </span>
                        </div>
                        <div className="absolute top-3 left-3">
                          <div className="text-white! flex items-center gap-1 text-[10px]">
                            <FaCalendar className="" />
                            {formatPersianDate(item.created)}
                          </div>
                        </div>
                      </div>
                    }
                  ></Card>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/4 w-full">
            <div className="mb-2! lg:mt-0 mt-8 p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
              <div className=" pr-3 ">
                <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
                  آخرین مقایسه
                </h3>
              </div>
            </div>
            <div className="flex flex-wrap items-center">
              {lastCompare.map((item) => (
                <div key={item.id} className="w-full pb-2">
                  <Card
                    hoverable
                    className="rounded-3xl! h-64 overflow-hidden border-none shadow-sm group"
                    cover={
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={mainDomainOld + item.image}
                          alt={item.title}
                          className="object-cover w-full h-full group-hover:brightness-75 duration-300"
                        />
                        <div className="absolute bottom-0 right-0 left-0 bg-linear-to-t from-black/70 to-transparent p-4 font-bold!">
                          <span className="text-white! inline-block relative pl-2.5 text-[16px] line-clamp-2 z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 after:bg-[#ce1a2a]">
                            {item.title}
                          </span>
                        </div>
                        <div className="absolute top-3 left-3">
                          <div className="text-white! flex items-center gap-1 text-[10px]">
                            <FaCalendar className="" />
                            {formatPersianDate(item.created)}
                          </div>
                        </div>
                      </div>
                    }
                  ></Card>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/4 w-full">
            <div className="mb-2! p-3 sm:bg-transparent bg-[#f6eced] rounded-xl flex sm:justify-start justify-center items-center">
              <h3 className="pb-0! mb-0! text-[#292929]! font-bold! inline-block relative pl-2.5 text-[22px] z-10 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-1/2 after:-z-10 sm:after:bg-[#ffd6db]">
                شرایط فروش و پیش فروش
              </h3>
            </div>
            <div className="h-64 px-2">
              <div className="space-y-3">
                {saleNews.map((sale, index) => (
                  <div
                    key={sale.id}
                    className={`p-4 rounded-sm group transition-all cursor-pointer bg-white hover:bg-[#ce1a2a] hover:text-white! border-r-2 duration-300 ${
                      index === 0 ? " border-[#ce1a2a]" : " border-transparent "
                    }`}
                  >
                    <Link
                      href="#"
                      className="text-[#292929]! duration-300 group-hover:text-white! font-medium block"
                    >
                      {sale.title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
