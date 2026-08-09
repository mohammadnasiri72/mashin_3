import { createMarkup } from "@/utils/func";

const ReviewSection = ({ detailsCar , vehicle}: { detailsCar: ItemsId ,vehicle:string}) => {
  const Criticism = detailsCar.properties.filter(
    (e) => e.propertyKey === "p1042_naghd",
  );
  return (
    <section dir="rtl" className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
 <h3 className="dt_title text-xl font-bold text-gray-900 mb-4!">
        <strong className="text-red-600">نقد </strong>
        کارشناسی {vehicle==='motor'? 'موتور':  'ماشین'} {detailsCar.sourceName} {detailsCar.title}
      </h3>
      {Criticism[0]?.value && (
        <div
          className="text_area text-gray-700 leading-8 text-justify space-y-4 mt-3 body-car"
          dangerouslySetInnerHTML={createMarkup(Criticism[0]?.value)}
        />
      )}
    </section>
   
  );
};

export default ReviewSection;
