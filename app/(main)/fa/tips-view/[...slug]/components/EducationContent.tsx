import { createMarkup } from "@/utils/func";
import { mainDomain } from "@/utils/mainDomain";
import { Fancybox } from "@fancyapps/ui";
import { Card } from "antd";
import { useEffect } from "react";

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
      <div className="space-y-6 overflow-hidden!">
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
