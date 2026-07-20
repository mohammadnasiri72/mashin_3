import { createMarkup } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import { Card } from "antd";
import Link from "next/link";
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
    <Card className="rounded-xl shadow-lg">
      <div className="space-y-6">
        {/* تصویر اصلی */}
        {education.image && (
          
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
          
        )}

        {/* محتوای HTML */}
        <div
          className="prose prose-lg max-w-none education-content"
          dangerouslySetInnerHTML={createMarkup(education.body || "")}
        />

        {/* اطلاعات مفید */}
        {/* <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
          <h4 className="font-bold text-blue-800 mb-2">📝 نکته مهم:</h4>
          <p className="text-blue-700">
            این مطلب آموزشی به صورت تخصصی برای بهبود مهارت‌های رانندگی و نگهداری از خودرو تهیه شده است.
          </p>
        </div> */}
        {/* News Tags */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-2 justify-between">
            <Link
              href={`/fa/educationtips/${education.categoryId}`}
              className="bg-gray-100! px-3 py-1 rounded-full text-xs text-gray-700! hover:text-[#ce1a2a]! duration-300"
            >
              #{education.categoryTitle}
            </Link>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 flex-wrap">
              <div className="flex items-center gap-1 ">
                <FaEye className="text-[#666] text-xs" />
                <span className="font-bold text-[#666] text-xs">
                  {education.visit}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendar className="text-[#666] text-xs" />
                <span className="font-bold text-[#666] text-xs">
                  {new Date(education.created).toLocaleDateString("fa-IR")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .education-content {
          line-height: 2;
          text-align: justify;
        }

        .education-content h2 {
          color: #ce1a2a;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: bold;
        }

        .education-content h3 {
          color: #374151;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .education-content p {
          margin-bottom: 1rem;
          color: #4b5563;
        }

        .education-content ul,
        .education-content ol {
          margin-right: 1.5rem;
          margin-bottom: 1rem;
        }

        .education-content li {
          margin-bottom: 0.5rem;
          color: #4b5563;
        }

        .education-content img {
          border-radius: 0.75rem;
          margin: 1.5rem auto;
          display: block;
        }

        .education-content strong {
          color: #ce1a2a;
        }
      `}</style>
    </Card>
  );
}

export default EducationContent;
