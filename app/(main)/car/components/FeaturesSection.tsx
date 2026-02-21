import {
  createMarkup,
  formatPersianDate,
  toPersianNumbers,
} from "@/utils/func";
import { FaSquareMinus, FaSquarePlus } from "react-icons/fa6";
import VideoPlayerCar from "./VideoPlayerCar";
import { mainDomainOld } from "@/utils/mainDomain";
import { FaCalendar, FaEye } from "react-icons/fa";
import AudioPlayer from "../../podcast.html/components/AudioPlayer";
import { getItemByIds } from "@/services/Item/ItemByIds";

async function FeaturesSection({
  detailsCar,
  Attachment,
}: {
  detailsCar: ItemsId;
  Attachment: ItemsAttachment[];
}) {
  const advantages = detailsCar.properties.filter(
    (e) => e.propertyKey === "p1042_design",
  );

  const disadvantages = detailsCar.properties.filter(
    (e) => e.propertyKey === "p1042_performance",
  );

  const summary = detailsCar.properties.find(
    (e) => e.propertyKey === "p1042_genral",
  )?.propertyValue;

  const podcastIds = detailsCar.properties.find(
    (e) => e.propertyKey === "p1042_podcastfile",
  )?.propertyValue;

  const podcastFiles: ItemsId[] = podcastIds
    ? await getItemByIds(podcastIds)
    : [];

  return (
    <div className="advg_wrap detailsBox bg-white rounded-xl p-6 mb-6!">
      {summary && (
        <summary className="mb-6!">
          <h2 className="dt_title text-2xl font-bold text-gray-900 mb-6!">
            <strong className="text-red-700">توضیحات کلی</strong>
          </h2>

          <div
            className="text_area text-gray-700 leading-8 text-justify space-y-4 mt-3"
            dangerouslySetInnerHTML={createMarkup(summary ? summary : "")}
          />
        </summary>
      )}
      <h2
        className={`dt_title text-2xl font-bold text-gray-900 mb-6! ${Attachment.length > 0 ? "hidden" : ""}`}
      >
        <strong>
          <span className="text-green-700">مزایا</span> و{" "}
          <span className="text-red-700">معایب</span> {detailsCar.sourceName}{" "}
          {detailsCar.title}
        </strong>
      </h2>
      <div
        className={`grid grid-cols-1 gap-6 ${Attachment.length > 0 ? "sm:grid-cols-2" : "sm:grid-cols-1"}`}
      >
        <div
          className={`grid grid-cols-1  gap-6 ${Attachment.length > 0 ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}
        >
          <h2
            className={`dt_title text-2xl font-bold text-gray-900 mb-6! ${Attachment.length > 0 ? "" : "hidden"}`}
          >
            <strong>
              <span className="text-green-700">مزایا</span> و{" "}
              <span className="text-red-700">معایب</span>{" "}
              {detailsCar.sourceName} {detailsCar.title}
            </strong>
          </h2>
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
                    dangerouslySetInnerHTML={createMarkup(
                      advantage.propertyValue,
                    )}
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
                    dangerouslySetInnerHTML={createMarkup(
                      disadvantage.propertyValue,
                    )}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {Attachment.length > 0 && <VideoPlayerCar Attachment={Attachment} />}
      </div>

      <div>
        {podcastFiles.length > 0 &&
          podcastFiles.map((podcastFile) => (
            <div
              key={podcastFile.id}
              className="flex-1 min-w-0 flex flex-col justify-between py-1 w-full mt-3"
            >
              <AudioPlayer podcast={podcastFile} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default FeaturesSection;
