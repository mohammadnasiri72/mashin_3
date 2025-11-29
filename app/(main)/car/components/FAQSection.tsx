"use client";

import { Collapse } from "antd";
import { useState } from "react";
import { FaCircleQuestion } from "react-icons/fa6";

const FAQSection = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>(["0"]);

  const faqItems = [
    {
      key: "0",
      label: (
        <div className="flex items-center text-right">
          <FaCircleQuestion className="text-red-600 ml-2" />
          چه امکانات رفاهی و ایمنی در شاهین پلاس دیده می شود؟
        </div>
      ),
      children: (
        <p className="text-gray-700 leading-7 text-justify">
          فرمان کمکی برقی، استارت دکمه ای، سانروف، آنتن کوسه ای، تریم داخلی چرم
          مصنوعی، کروز کنترل، محدودکننده سرعت، سنسور نور، تهویه اتوماتیک، سامانه
          کنترل پایداری الکتریکی، سامانه کنترل شروع حرکت در سربالایی، دنده عقب،
          نمایشگر لمسی ۱۰ اینچی اندروید، آینه های تاشو برقی، صندلی برقی راننده،
          گرمکن صندلی های جلو و… از جمله امکانات این خودرو است.
        </p>
      ),
      className: "faq-panel",
    },
    {
      key: "1",
      label: (
        <div className="flex items-center text-right">
          <FaCircleQuestion className="text-red-600 ml-2" />
          مشخصات فنی شاهین پلاس چیست؟
        </div>
      ),
      children: (
        <p className="text-gray-700 leading-7 text-justify">
          فرمان کمکی برقی، استارت دکمه ای، سانروف، آنتن کوسه ای، تریم داخلی چرم
          مصنوعی، کروز کنترل، محدودکننده سرعت، سنسور نور، تهویه اتوماتیک، سامانه
          کنترل پایداری الکتریکی، سامانه کنترل شروع حرکت در سربالایی، دنده عقب،
          نمایشگر لمسی ۱۰ اینچی اندروید، آینه های تاشو برقی، صندلی برقی راننده،
          گرمکن صندلی های جلو و… از جمله امکانات این خودرو است.
        </p>
      ),
      className: "faq-panel",
    },
    {
      key: "2",
      label: (
        <div className="flex items-center text-right">
          <FaCircleQuestion className="text-red-600 ml-2" />
          مشخصات فنی شاهین پلاس چیست؟
        </div>
      ),
      children: (
        <p className="text-gray-700 leading-7 text-justify">
          فرمان کمکی برقی، استارت دکمه ای، سانروف، آنتن کوسه ای، تریم داخلی چرم
          مصنوعی، کروز کنترل، محدودکننده سرعت، سنسور نور، تهویه اتوماتیک، سامانه
          کنترل پایداری الکتریکی، سامانه کنترل شروع حرکت در سربالایی، دنده عقب،
          نمایشگر لمسی ۱۰ اینچی اندروید، آینه های تاشو برقی، صندلی برقی راننده،
          گرمکن صندلی های جلو و… از جمله امکانات این خودرو است.
        </p>
      ),
      className: "faq-panel",
    },
  ];

  return (
    <div className="detailsBox bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="dt_title text-xl font-bold text-gray-900 mb-4!">
        <strong className="text-red-600">سوالات متداول</strong>
      </h3>

      <Collapse
        activeKey={activeKeys}
        onChange={setActiveKeys}
        expandIconPosition="end"
        className="faq-collapse"
        items={faqItems}
      />

      <style jsx global>{`
        .faq-collapse .ant-collapse-item {
          border-bottom: 1px solid #e5e7eb !important;
          margin-bottom: 8px;
        }

        .faq-collapse .ant-collapse-header {
          padding: 16px !important;
          background: #f8fafc;
          border-radius: 8px !important;
          font-weight: 600;
        }

        .faq-collapse .ant-collapse-content-box {
          padding: 16px !important;
          background: #f7d8db;
        }

        .faq-panel .ant-collapse-header:hover {
          background: #f1f5f9;
        }
      `}</style>
    </div>
  );
};

export default FAQSection;
