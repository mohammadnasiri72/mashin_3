import { createMarkup } from "@/utils/func";
import { mainDomainOld } from "@/utils/mainDomain";
import { Card } from "antd";
import Image from "next/image";



function EducationContent({ education }: { education: ItemsId }) {

  return (
    <Card className="rounded-xl shadow-lg">
      <div className="space-y-6">
        {/* تصویر اصلی */}
        {education.image && (
          <div className="w-full bg-gray-200 rounded-xl overflow-hidden relative">
            <img
              src={mainDomainOld + education.image}
              alt={education.title}
              className="object-contain w-full h-full"
            />
          </div>
        )}

        {/* محتوای HTML */}
        <div 
          className="prose prose-lg max-w-none education-content"
          dangerouslySetInnerHTML={createMarkup(education.body || '')}
        />

        {/* اطلاعات مفید */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
          <h4 className="font-bold text-blue-800 mb-2">📝 نکته مهم:</h4>
          <p className="text-blue-700">
            این مطلب آموزشی به صورت تخصصی برای بهبود مهارت‌های رانندگی و نگهداری از خودرو تهیه شده است.
          </p>
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
        
        .education-content ul, .education-content ol {
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