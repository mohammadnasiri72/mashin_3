// app/dashboard/my-comments/page.tsx
'use client';

import { useState } from 'react';
import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineThumbUp,
  HiOutlineThumbDown,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineEye,
  HiOutlineFilter,
  HiOutlineSearch,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle
} from 'react-icons/hi';

interface Comment {
  id: number;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  status: 'approved' | 'pending' | 'rejected';
  postTitle: string;
  postType: 'car' | 'motorcycle' | 'article' | 'video';
  postImage?: string;
  postUrl: string;
  replies?: number;
}

export default function MyCommentsPage() {
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComments, setSelectedComments] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // نمونه داده‌های کامنت
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      content: 'واقعا ماشین خوبیه، من چند وقت هست که دارمش، مصرف سوختش عالیه و تو شهر عالی جواب میده',
      date: '۲۰ بهمن ۱۴۰۲',
      likes: 15,
      dislikes: 2,
      status: 'approved',
      postTitle: 'پژو ۲۰۷ اتوماتیک',
      postType: 'car',
      postImage: '/images/peugeot-207.jpg',
      postUrl: '/car/peugeot-207',
      replies: 3
    },
    {
      id: 2,
      content: 'کیفیت ساختش نسبت به قیمت مناسبه، فقط کاش نمایندگی‌های بیشتری داشت',
      date: '۱۵ بهمن ۱۴۰۲',
      likes: 8,
      dislikes: 1,
      status: 'approved',
      postTitle: 'ام وی ام X33 کراس',
      postType: 'car',
      postImage: '/images/mvm-x33.jpg',
      postUrl: '/car/mvm-x33'
    },
    {
      id: 3,
      content: 'این مدل رو مقایسه کنید با رقیبای چینی، به نظر من ارزش خرید داره',
      date: '۱۰ بهمن ۱۴۰۲',
      likes: 5,
      dislikes: 3,
      status: 'pending',
      postTitle: 'مقایسه خودروهای چینی',
      postType: 'article',
      postImage: '/images/article-chinese-cars.jpg',
      postUrl: '/article/chinese-cars-comparison'
    },
    {
      id: 4,
      content: 'واقعا ناامیدکننده بود، بعد از یک ماه گیربکس مشکل پیدا کرد',
      date: '۵ بهمن ۱۴۰۲',
      likes: 3,
      dislikes: 12,
      status: 'rejected',
      postTitle: 'رنو ساندرو',
      postType: 'car',
      postImage: '/images/renault-sandero.jpg',
      postUrl: '/car/renault-sandero'
    },
    {
      id: 5,
      content: 'این ویدیو خیلی به من کمک کرد، ممنون از تیم حرفه‌ای شما',
      date: '۱ بهمن ۱۴۰۲',
      likes: 25,
      dislikes: 0,
      status: 'approved',
      postTitle: 'نقد و بررسی تویوتا کرولا',
      postType: 'video',
      postImage: '/images/toyota-corolla-review.jpg',
      postUrl: '/video/toyota-corolla-review',
      replies: 5
    }
  ]);

  // فیلتر کردن کامنت‌ها
  const filteredComments = comments.filter(comment => {
    if (filter !== 'all' && comment.status !== filter) return false;
    if (searchTerm && !comment.content.includes(searchTerm) && !comment.postTitle.includes(searchTerm)) return false;
    return true;
  });

  // آمار کامنت‌ها
  const stats = {
    total: comments.length,
    approved: comments.filter(c => c.status === 'approved').length,
    pending: comments.filter(c => c.status === 'pending').length,
    rejected: comments.filter(c => c.status === 'rejected').length,
    totalLikes: comments.reduce((acc, c) => acc + c.likes, 0)
  };

  const handleSelectAll = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([]);
    } else {
      setSelectedComments(filteredComments.map(c => c.id));
    }
  };

  const handleSelectComment = (id: number) => {
    if (selectedComments.includes(id)) {
      setSelectedComments(selectedComments.filter(cId => cId !== id));
    } else {
      setSelectedComments([...selectedComments, id]);
    }
  };

  const handleDeleteSelected = () => {
    if (confirm('آیا از حذف کامنت‌های انتخاب شده اطمینان دارید؟')) {
      setComments(comments.filter(c => !selectedComments.includes(c.id)));
      setSelectedComments([]);
    }
  };

  const getStatusBadge = (status: Comment['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <HiOutlineCheckCircle className="w-3 h-3" />
            تایید شده
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
            <HiOutlineClock className="w-3 h-3" />
            در انتظار تایید
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
            <HiOutlineXCircle className="w-3 h-3" />
            رد شده
          </span>
        );
    }
  };

  const getPostTypeLabel = (type: Comment['postType']) => {
    switch (type) {
      case 'car': return 'خودرو';
      case 'motorcycle': return 'موتورسیکلت';
      case 'article': return 'مقاله';
      case 'video': return 'ویدیو';
    }
  };

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">نظرات من</h1>
        <p className="text-gray-600 mt-1">نظراتی که ثبت کرده‌اید را مدیریت کنید</p>
      </div>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">کل نظرات</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-2xl">
              <HiOutlineChat className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {stats.approved} تایید شده
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">در انتظار تایید</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-2xl">
              <HiOutlineClock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            نیاز به بررسی
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">تایید شده</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.approved}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-2xl">
              <HiOutlineCheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {stats.approved} نظر فعال
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">مجموع لایک‌ها</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalLikes}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-2xl">
              <HiOutlineThumbUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            بازخورد مثبت
          </div>
        </div>
      </div>

      {/* نوار ابزار */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* جستجو */}
          <div className="relative w-full lg:w-96">
            <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در نظرات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* فیلتر وضعیت */}
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as typeof filter)}
                className="appearance-none pr-10 pl-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">همه نظرات</option>
                <option value="approved">تایید شده</option>
                <option value="pending">در انتظار تایید</option>
                <option value="rejected">رد شده</option>
              </select>
              <HiOutlineFilter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* حالت نمایش */}
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                لیست
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                شبکه
              </button>
            </div>

            {/* دکمه حذف دسته‌جمعی */}
            {selectedComments.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                <HiOutlineTrash className="w-5 h-5" />
                حذف ({selectedComments.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* لیست نظرات */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
        {/* انتخاب همه */}
        {filteredComments.length > 0 && (
          <div className="bg-white rounded-xl p-4 flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedComments.length === filteredComments.length}
              onChange={handleSelectAll}
              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">انتخاب همه</span>
          </div>
        )}

        {filteredComments.map((comment) => (
          <div
            key={comment.id}
            className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
              viewMode === 'grid' ? 'flex flex-col' : 'flex'
            }`}
          >
            {/* چک‌باکس انتخاب */}
            <div className={`p-4 ${viewMode === 'grid' ? 'pb-0' : ''}`}>
              <input
                type="checkbox"
                checked={selectedComments.includes(comment.id)}
                onChange={() => handleSelectComment(comment.id)}
                className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>

            {/* محتوای کامنت */}
            <div className={`flex-1 p-4 ${viewMode === 'grid' ? 'pt-0' : ''}`}>
              {/* هدر کامنت */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(comment.status)}
                    <span className="text-xs text-gray-500">
                      {comment.date}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800">
                    {comment.content.length > 100 
                      ? comment.content.substring(0, 100) + '...' 
                      : comment.content}
                  </h3>
                </div>
              </div>

              {/* اطلاعات پست */}
              <div className="flex items-center gap-3 mt-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0">
                  {comment.postImage && (
                    <img 
                      src={comment.postImage} 
                      alt={comment.postTitle}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {comment.postTitle}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full">
                      {getPostTypeLabel(comment.postType)}
                    </span>
                    {comment.replies && (
                      <span className="text-xs text-gray-500">
                        {comment.replies} پاسخ
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* تعاملات */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors">
                    <HiOutlineThumbUp className="w-4 h-4" />
                    <span className="text-xs">{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors">
                    <HiOutlineThumbDown className="w-4 h-4" />
                    <span className="text-xs">{comment.dislikes}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={comment.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="مشاهده مطلب"
                  >
                    <HiOutlineEye className="w-5 h-5" />
                  </a>
                  <button
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="ویرایش نظر"
                  >
                    <HiOutlinePencil className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="حذف نظر"
                  >
                    <HiOutlineTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* حالت خالی */}
        {filteredComments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <HiOutlineChat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">نظری یافت نشد</h3>
            <p className="text-gray-500">
              {searchTerm || filter !== 'all' 
                ? 'هیچ نظری با این فیلترها وجود ندارد' 
                : 'شما هنوز هیچ نظری ثبت نکرده‌اید'}
            </p>
          </div>
        )}
      </div>

      {/* صفحه‌بندی */}
      {filteredComments.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm p-4">
          <div className="text-sm text-gray-500">
            نمایش ۱ تا {filteredComments.length} از {comments.length} نظر
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
              قبلی
            </button>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-lg">۱</button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
              ۲
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
              ۳
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
              بعدی
            </button>
          </div>
        </div>
      )}
    </div>
  );
}