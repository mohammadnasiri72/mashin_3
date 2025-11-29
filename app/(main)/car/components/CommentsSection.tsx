"use client";

import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { FaFlag, FaReply, FaThumbsUp, FaThumbsDown } from 'react-icons/fa6';
import { toPersianNumbers } from '@/utils/func';




const { TextArea } = Input;

const CommentsSection = ({detailsCar}:{detailsCar:ItemsId}) => {
  const [form] = Form.useForm();

  const comments = [
    {
      id: 1,
      author: 'علیرضا ریاحی',
      date: '۸ دی ۱۴۰۴',
      content: 'اما هنوز شیشه بالابر راننده سایپا اتوماتیک نیست، همین مزیت ایرانخودرو برگ برندشه. (وسط پیچ جاده یکی زنگ میزنه دستت رو فرمانه یکی رو دنده، پاهات درگیر پدالاست، کسی پیشت نیست! گوشی از رو داشبورد پرت میشه طبق معمول، نیش ترمزف کلاچ، گاز! یه دست رو فرمن و با اونیکی دنده میزنی سریع گوشیو تو هوا میگیری برای اینکه صدا به صدا برسه یدونه میزنی تو سر کلید بالابر! به عذن اون خدا شیشه خودش میره بالا!)',
      likes: 0,
      dislikes: 2,
      replies: 2,
      isReply: false
    },
    {
      id: 2,
      author: 'محمد توانا',
      date: '۸ دی ۱۴۰۴',
      content: 'اما هنوز شیشه بالابر راننده سایپا اتوماتیک نیست، همین مزیت ایرانخودرو برگ برندشه. (وسط پیچ جاده یکی زنگ میزنه دستت رو فرمانه یکی رو دنده، پاهات درگیر پدالاست، کسی پیشت نیست! گوشی از رو داشبورد پرت میشه طبق معمول، نیش ترمزف کلاچ، گاز! یه دست رو فرمن و با اونیکی دنده میزنی سریع گوشیو تو هوا میگیری برای اینکه صدا به صدا برسه یدونه میزنی تو سر کلید بالابر! به عذن اون خدا شیشه خودش میره بالا!)',
      likes: 0,
      dislikes: 2,
      replies: 0,
      isReply: false
    },
    {
      id: 3,
      author: 'علیرضا آقایی',
      date: '۸ دی ۱۴۰۴',
      content: 'اما هنوز شیشه بالابر راننده سایپا اتوماتیک نیست، همین مزیت ایرانخودرو برگ برندشه. (وسط پیچ جاده یکی زنگ میزنه دستت رو فرمانه یکی رو دنده، پاهات درگیر پدالاست، کسی پیشت نیست! گوشی از رو داشبورد پرت میشه طبق معمول، نیش ترمزف کلاچ، گاز! یه دست رو فرمن و با اونیکی دنده میزنی سریع گوشیو تو هوا میگیری برای اینکه صدا به صدا برسه یدونه میزنی تو سر کلید بالابر! به عذن اون خدا شیشه خودش میره بالا!)',
      likes: 0,
      dislikes: 0,
      replies: 0,
      isReply: true
    }
  ];

  const onFinish = (values: any) => {
    message.success('دیدگاه شما با موفقیت ثبت شد');
    form.resetFields();
  };

  return (
    <>
    <div className="detailsBox bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="dt_title text-xl font-bold text-gray-900 mb-4">
        <strong className="text-red-600">نظرات </strong>
        درمورد ماشین {detailsCar.sourceName} {detailsCar.title}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
        {/* فرم ثبت نظر */}
        <div className="lg:col-span-4 ">
          <div className="contactForm_wrap bg-gray-50 rounded-xl p-6 comment-form sticky">
            <div className="title_sec mb-4">
              <h3 className="text-lg font-bold text-gray-900">دیدگاه</h3>
              <p className="text-gray-600 mt-2">
                شما هم درباره این کالا دیدگاه ثبت کنید
              </p>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                label="نام و نام خانوادگی"
                rules={[{ required: true, message: 'لطفا نام خود را وارد کنید' }]}
              >
                <Input 
                  placeholder="نام خود را وارد کنید" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="ایمیل"
                rules={[
                  { required: true, message: 'لطفا ایمیل خود را وارد کنید' },
                  { type: 'email', message: 'ایمیل معتبر نیست' }
                ]}
              >
                <Input 
                  placeholder="مثلا hiva@gmail.com" 
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="message"
                label="ثبت دیدگاه"
                rules={[{ required: true, message: 'لطفا دیدگاه خود را وارد کنید' }]}
              >
                <TextArea
                  placeholder="نظر خود را در مورد این کالا با کاربران دیگر به اشتراک بگذارید.."
                  rows={4}
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full bg-red-600 hover:bg-red-700 border-none"
                >
                  ثبت دیدگاه
                </Button>
              </Form.Item>

              <p className="text-xs text-gray-500 text-center mt-4">
                ثبت دیدگاه به معنی موافقت با{' '}
                <a href="#" className="text-red-600 font-medium">
                  قوانین انتشار ماشین سه
                </a>{' '}
                است.
              </p>
            </Form>
          </div>
        </div>

        {/* لیست نظرات */}
        <div className="lg:col-span-8">
          <div className="comments-area space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`comment-box bg-gray-50 rounded-xl p-4 ${
                  comment.isReply ? 'sm:mr-20 mr-8 border-r-2 border-red-200' : ''
                }`}
              >
                <div className="cm_tp flex gap-3 items-center mb-3">
                  <div className="author_name font-bold text-gray-800">
                    {comment.author}
                  </div>
                  <div className="text-xs font-semibold relative pr-3">
                    {comment.date}
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-purple-200 rounded-full"></span>
                  </div>
                </div>

                <div className="text-justify text-gray-700 leading-7 mb-3">
                  {comment.content}
                </div>

                <div className="cm_btm flex justify-between items-center">
                  <a href="#" className="cm_report flex items-center text-xs text-gray-500 bg-white px-3 py-1 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                    <FaFlag className="ml-1 text-red-500 text-lg" />
                    گزارش مشکل
                  </a>

                  <div className="cm_buttons flex items-center gap-2">
                    <button className="cursor-pointer group flex items-center text-xs text-gray-500 bg-white p-3 rounded-lg">
                      <span>{toPersianNumbers(comment.replies)}</span>
                      <FaReply className="mr-1 text-purple-500 text-lg group-hover:-rotate-360 duration-500" />
                    </button>
                    
                    <button className="cursor-pointer group flex items-center text-xs text-gray-500 bg-white p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                      <span>{toPersianNumbers(comment.dislikes)}</span>
                      <FaThumbsDown className="mr-1 group-hover:animate-pulse text-red-500 text-lg" />
                    </button>
                    
                    <button className="cursor-pointer group flex items-center text-xs text-gray-500 bg-white p-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
                     <span>{toPersianNumbers(comment.likes)}</span>
                      <FaThumbsUp className="mr-1 group-hover:animate-pulse text-green-500 text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`comment-box bg-gray-50 rounded-xl p-4 ${
                  comment.isReply ? 'sm:mr-20 mr-8 border-r-2 border-red-200' : ''
                }`}
              >
                <div className="cm_tp flex gap-3 items-center mb-3">
                  <div className="author_name font-bold text-gray-800">
                    {comment.author}
                  </div>
                  <div className="text-xs font-semibold relative pr-3">
                    {comment.date}
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-purple-200 rounded-full"></span>
                  </div>
                </div>

                <div className="text-justify text-gray-700 leading-7 mb-3">
                  {comment.content}
                </div>

                <div className="cm_btm flex justify-between items-center">
                  <a href="#" className="cm_report flex items-center text-xs text-gray-500 bg-white px-3 py-1 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                    <FaFlag className="ml-1 text-red-500 text-lg" />
                    گزارش مشکل
                  </a>

                  <div className="cm_buttons flex items-center gap-2">
                    <button className="cursor-pointer group flex items-center text-xs text-gray-500 bg-white p-3 rounded-lg">
                      <span>{toPersianNumbers(comment.replies)}</span>
                      <FaReply className="mr-1 text-purple-500 text-lg group-hover:-rotate-360 duration-500" />
                    </button>
                    
                    <button className="cursor-pointer group flex items-center text-xs text-gray-500 bg-white p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                      <span>{toPersianNumbers(comment.dislikes)}</span>
                      <FaThumbsDown className="mr-1 group-hover:animate-pulse text-red-500 text-lg" />
                    </button>
                    
                    <button className="cursor-pointer group flex items-center text-xs text-gray-500 bg-white p-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
                     <span>{toPersianNumbers(comment.likes)}</span>
                      <FaThumbsUp className="mr-1 group-hover:animate-pulse text-green-500 text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`comment-box bg-gray-50 rounded-xl p-4 ${
                  comment.isReply ? 'sm:mr-20 mr-8 border-r-2 border-red-200' : ''
                }`}
              >
                <div className="cm_tp flex gap-3 items-center mb-3">
                  <div className="author_name font-bold text-gray-800">
                    {comment.author}
                  </div>
                  <div className="text-xs font-semibold relative pr-3">
                    {comment.date}
                    <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-purple-200 rounded-full"></span>
                  </div>
                </div>

                <div className="text-justify text-gray-700 leading-7 mb-3">
                  {comment.content}
                </div>

                <div className="cm_btm flex justify-between items-center">
                  <a href="#" className="cm_report flex items-center text-xs text-gray-500 bg-white px-3 py-1 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                    <FaFlag className="ml-1 text-red-500 text-lg" />
                    گزارش مشکل
                  </a>

                  <div className="cm_buttons flex items-center gap-2">
                    <button className="cursor-pointer group flex items-center text-xs text-gray-500 bg-white p-3 rounded-lg">
                      <span>{toPersianNumbers(comment.replies)}</span>
                      <FaReply className="mr-1 text-purple-500 text-lg group-hover:-rotate-360 duration-500" />
                    </button>
                    
                    <button className="cursor-pointer group flex items-center text-xs text-gray-500 bg-white p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                      <span>{toPersianNumbers(comment.dislikes)}</span>
                      <FaThumbsDown className="mr-1 group-hover:animate-pulse text-red-500 text-lg" />
                    </button>
                    
                    <button className="cursor-pointer group flex items-center text-xs text-gray-500 bg-white p-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
                     <span>{toPersianNumbers(comment.likes)}</span>
                      <FaThumbsUp className="mr-1 group-hover:animate-pulse text-green-500 text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
     <style jsx global>{`
       .comment-form.sticky {
          position: sticky !important;
          top: 100px !important;
          left: 0;
          right: 0;
          z-index: 999;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: slideDown 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default CommentsSection;