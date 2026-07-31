import { createMarkup, formatPersianDate, toPersianNumbers } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import { Card } from "antd";
import { useEffect } from "react";
import { FaCalendar, FaEye } from "react-icons/fa";

function EducationContent({ education }: { education: ItemsId }) {
  useEffect(() => {
    Fancybox.bind("[data-fancybox='main-img']", {
      Toolbar: {
        display: {
          left: [],
          middle: [],
          right: ["close"],
        },
      },
      Thumbs: {
        type: "classic",
      },
      Images: {
        zoom: true,
      },
      Carousel: {
        infinite: true,
      },
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);
  // Increase z-index for fancybox
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
          .fancybox__container { 
            z-index: 999999 !important; 
          }
          .fancybox__backdrop {
            background: rgba(0, 0, 0, 0.8);
          }
        `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
   <section className=" bg-gray-50">
         <div className="mx-auto pr-4 lg:pl-2 pl-4">
           <div className="bg-white rounded-xl shadow-sm p-8">
             {!education.summary && (
               <div className="flex items-center justify-end gap-4 mb-2! text-sm text-gray-600 flex-wrap px-2 pb-4 border-b border-gray-200">
                 <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
                   <FaEye className="text-gray-500 text-xs" />
                   <span className="font-medium text-gray-700 text-xs">
                     {toPersianNumbers(education.visit)}
                   </span>
                 </div>
                 <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
                   <FaCalendar className="text-gray-500 text-xs" />
                   <span className="font-medium text-gray-700 text-xs">
                     {formatPersianDate(
                       education.modified
                         ? education.modified
                         : education.created,
                     )}
                   </span>
                 </div>
               </div>
             )}
             <div className="overflow-hidden!">
               {/* News Summary */}
               {education.summary && (
                 <div className="mb-8! p-4 bg-blue-50 border-r-4 border-blue-500 rounded">
                   <div className="flex justify-between items-center border-b mb-2! border-gray-200">
                     <h3 className="text-lg font-bold text-gray-800 mb-2!">
                       خلاصه خبر:
                     </h3>
                     <div className="flex items-center justify-end gap-4 text-sm text-gray-600 flex-wrap px-2">
                       <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
                         <FaEye className="text-gray-500 text-xs" />
                         <span className="font-medium text-gray-700 text-xs">
                           {toPersianNumbers(education.visit)}
                         </span>
                       </div>
                       <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
                         <FaCalendar className="text-gray-500 text-xs" />
                         <span className="font-medium text-gray-700 text-xs">
                           {formatPersianDate(
                             education.modified
                               ? education.modified
                               : education.created,
                           )}
                         </span>
                       </div>
                     </div>
                   </div>
   
                   <div
                     className="text-gray-700 leading-8 text-justify summary-education"
                     dangerouslySetInnerHTML={createMarkup(education.summary)}
                   />
                 </div>
               )}
   
               <a
                 href={mainDomain + education.image}
                 data-fancybox="main-img"
                 data-caption={education.title}
                 aria-label={education.title}
               >
                 <img
                   className="float-start! w-96 pl-5"
                   src={mainDomain + education.image}
                   alt={education.title}
                 />
               </a>
   
               {/* Main Content */}
               {education.body && (
                 <div className="prose prose-lg max-w-none ">
                   <h3 className="dt_title text-xl font-bold text-gray-900 mb-4!">
                     <strong className="text-red-600">{education.title} </strong>
                   </h3>
                   <div
                     className="text-gray-700 leading-8 text-justify body-education"
                     dangerouslySetInnerHTML={createMarkup(education.body)}
                   />
                 </div>
               )}
             </div>
           </div>
         </div>
   
         <style jsx global>{`
           .prose p {
             margin-bottom: 1.5em;
             line-height: 2;
           }
   
           .prose strong {
             color: #ce1a2a;
           }
   
           .prose img {
             border-radius: 8px;
             margin: 2em auto;
           }
         `}</style>
       </section>
  );
}

export default EducationContent;
