import { createpublishCode } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import Link from "next/link";

function CompetitorsBestChoice({
  competitorsCar,
  title,
}: {
  competitorsCar: ItemsId[];
  title: string | undefined;
}) {
  return (
    <>
      <div className="detailsBox bg-white rounded-2xl p-6 shadow-sm border border-gray-100 ">
        <h3 className="dt_title text-xl font-bold text-gray-900 mb-4!">
          <strong className="text-red-600">رقبا </strong>
          {title}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-3!">
          {competitorsCar.map((car) => (
            <div
              key={car.id}
              //   href={car.url + `?id=${car.id}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl overflow-hidden pb-2 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200 h-full flex flex-col">
                {/* تصویر خودرو */}
                <div className="w-full h-40 overflow-hidden rounded-lg mb-4! bg-gray-50 flex items-center justify-center relative">
                  <Link href={car?.url || "#"}>
                    <img
                      src={mainDomain + car.image}
                      alt={car.title}
                      className="object-contain w-full h-full p-2 hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>

               

                {/* اطلاعات خودرو */}
                <div className="flex-1">
                  <Link
                   href={car?.url || "#"}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <h3 className="font-bold text-gray-900 text-lg mb-2! text-center hover:text-[#ce1a2a]! transition-colors">
                   {car.sourceName} {car.title} {createpublishCode(car.publishCode)}
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CompetitorsBestChoice;
