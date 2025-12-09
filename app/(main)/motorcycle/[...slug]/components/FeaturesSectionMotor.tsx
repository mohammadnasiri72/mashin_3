"use client";

import { createMarkup } from "@/utils/func";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";

const FeaturesSectionMotor = ({ detailsMotorcycle }: { detailsMotorcycle: ItemsId }) => {
  const advantages = detailsMotorcycle.properties.filter(
    (e) => e.propertyId === 22639
  );

  const disadvantages = detailsMotorcycle.properties.filter(
    (e) => e.propertyId === 22640
  );
  return (
    <div className="advg_wrap detailsBox bg-white rounded-xl p-6 mb-6!">
      <h2 className="dt_title text-2xl font-bold text-gray-900 mb-6!">
        <strong>
          <span className="text-green-700">مزایا</span> و{" "}
          <span className="text-red-700">معایب</span> {detailsMotorcycle.sourceName}{" "}
          {detailsMotorcycle.title}
        </strong>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Advantages Column */}
        <div className="bg-green-50 rounded-xl p-6">
          <div className="advg_title advg_plus flex items-center text-green-700 text-lg font-bold mb-4">
            <FaSquarePlus className="ml-2 text-green-600" />
            مزایا
          </div>
          <ul className="flex flex-wrap space-y-3">
            {advantages.map((advantage) => (
              <li
                key={advantage.id}
                className="text-gray-800 font-medium flex items-start w-full"
              >
                <span className="text-green-500 ml-2 mt-1">•</span>
                <div
                  className="text-gray-700 leading-8 text-justify"
                  dangerouslySetInnerHTML={createMarkup(advantage.value)}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Disadvantages Column */}
        <div className="bg-red-50 rounded-xl p-6">
          <div className="advg_title advg_minus flex items-center text-red-700 text-lg font-bold mb-4">
            <FaSquareMinus className="ml-2 text-red-600" />
            معایب
          </div>
          <ul className="flex flex-wrap space-y-3">
            {disadvantages.map((disadvantage) => (
              <li
                key={disadvantage.id}
                className="text-gray-800 font-medium flex items-start w-full"
              >
                <span className="text-red-500 ml-2 mt-1">•</span>
                <div
                  className="text-gray-700 leading-8 text-justify"
                  dangerouslySetInnerHTML={createMarkup(disadvantage.value)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx global>{`
        .advg_wrap {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .advg_box {
          transition: all 0.3s ease;
        }

        .advg_box:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .advg_list li {
          position: relative;
          padding-right: 8px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .advg_wrap {
            padding: 1rem;
          }

          .advg_box {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .advg_title {
            font-size: 1.1rem;
          }

          .advg_list li {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturesSectionMotor;
