import { createMarkup } from "@/utils/func";

const ReviewSection = ({ detailsCar }: { detailsCar: ItemsId }) => {
  const Criticism = detailsCar.properties.filter((e) => e.propertyId === 22642);
  return (
    <div className="detailsBox bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="dt_title text-xl font-bold text-gray-900 mb-4">
        <strong className="text-red-600">نقد </strong>
        کارشناسی ماشین {detailsCar.sourceName} {detailsCar.title}
      </h3>
      {Criticism[0]?.value && (
        <div
          className="text_area text-gray-700 leading-8 text-justify space-y-4 mt-3"
          dangerouslySetInnerHTML={createMarkup(Criticism[0]?.value)}
        />
      )}
    </div>
  );
};

export default ReviewSection;
