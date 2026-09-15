import { createMarkup, toPersianNumbers } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import { Card } from "antd";
import { FaCalendar, FaEye } from "react-icons/fa";

function DescCarCompare({ car , whichcars}: { car: ItemsId , whichcars:ItemsId}) {
  return (
    <>
      <Card className="shadow-sm mb-2!">
        <div className="text-center mb-6!">
          <h3 className="text-2xl font-bold text-blue-700 mb-2!">
            {car.title}
          </h3>
        </div>

        {car.image && (
          <div className="flex justify-center mb-6!">
            <img
              src={mainDomain + car.image}
              alt={car.title}
              className="max-w-full h-auto max-h-80 object-contain rounded-lg"
            
            />
          </div>
        )}

        {car.body && (
          <div
            className="prose prose-lg max-w-none text-justify text-gray-700 leading-8 body-whichcar-car"
            dangerouslySetInnerHTML={createMarkup(
              car.body.replace(/<span style="font-size: 12pt;">|<\/span>/g, ""),
            )}
          />
        )}
         {/* News Tags */}
                <div className=" pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 flex-wrap">
                    <div className="flex items-center gap-1 ">
                      <FaEye className="text-[#666] text-xs" />
                      <span className="font-bold text-[#666] text-xs">
                        {toPersianNumbers(whichcars.visit)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendar className="text-[#666] text-xs" />
                      <span className="font-bold text-[#666] text-xs">
                        {new Date(whichcars.modified ? whichcars.modified:whichcars.created).toLocaleDateString("fa-IR")}
                      </span>
                    </div>
                  </div>
                </div>
      </Card>
    </>
  );
}

export default DescCarCompare;
