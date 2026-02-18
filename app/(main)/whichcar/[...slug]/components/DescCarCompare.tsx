import { createMarkup } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";

function DescCarCompare({ car }: { car: ItemsId }) {
  return (
    <>
      <Card className="shadow-lg mb-6!">
        <div className="text-center mb-6!">
          <h3 className="text-2xl font-bold text-blue-700 mb-2!">
            {car.title}
          </h3>
        </div>

        {car.image && (
          <div className="flex justify-center mb-6!">
            <img
              src={mainDomainOld + car.image}
              alt={car.title}
              className="max-w-full h-auto max-h-80 object-contain rounded-lg"
            
            />
          </div>
        )}

        {car.body && (
          <div
            className="prose prose-lg max-w-none text-justify text-gray-700 leading-8"
            dangerouslySetInnerHTML={createMarkup(
              car.body.replace(/<span style="font-size: 12pt;">|<\/span>/g, ""),
            )}
          />
        )}
      </Card>
    </>
  );
}

export default DescCarCompare;
