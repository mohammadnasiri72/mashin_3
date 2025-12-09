const TechnicalSection = ({ detailsMotorcycle }: { detailsMotorcycle: ItemsId }) => {
  const specifications = detailsMotorcycle.properties.filter(
    (e) => e.isTechnicalProperty
  );
  return (
    <div className="detailsBox bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="dt_title text-xl font-bold text-gray-900 mb-4">
        <strong className="text-red-600">فنی </strong>
        موتورسیکلت {detailsMotorcycle.sourceName} {detailsMotorcycle.title}
      </h3>

      <table className="details_table w-full border-collapse">
        <tbody>
          {specifications.map((spec, index) => (
            <tr
              key={spec.id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <th className="text-right p-4 text-gray-600 font-medium text-sm border-b border-gray-200">
                {spec.title}
              </th>
              <td className="text-right p-4 text-gray-800 font-bold text-sm border-b border-gray-200">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx global>{`
        .details_table th {
          width: 40%;
        }

        .details_table td {
          width: 60%;
        }
      `}</style>
    </div>
  );
};

export default TechnicalSection;
