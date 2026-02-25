// app/dashboard/my-comments/page.tsx
"use client";

import ConfirmDialog from "@/app/components/ConfirmDialog";
import CustomPagination from "@/app/components/CustomPagination";
import { RootState } from "@/redux/store";
import { getCommentUser } from "@/services/Comment/CommentUser";
import { DeleteComment } from "@/services/Comment/DeleteComment";
import { formatPersianDate, Toast } from "@/utils/func";
import { Newspaper } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  HiOutlineChat,
  HiOutlineCheckCircle,
  HiOutlineChevronDown,
  HiOutlineClock,
  HiOutlineEye,
  HiOutlineThumbDown,
  HiOutlineThumbUp,
  HiOutlineTrash,
} from "react-icons/hi";
import { useSelector } from "react-redux";

const CommentsSkeleton = () => {
  return (
    <div className="space-y-5 max-w-5xl mx-auto pb-5!">
      <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="h-3 w-28 bg-gray-200 rounded-full animate-pulse"></div>
      {/* لیست کامنت‌های اسکلتون */}
      <div className="space-y-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-4">
              {/* ردیف بالا */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-7 h-7 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="w-7 h-7 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>

              {/* عنوان */}
              <div className="flex items-center gap-2 mt-2">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* متن */}
              <div className="space-y-2 mt-3">
                <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-4/6 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* فوتر */}
              <div className="flex items-center justify-between border-t border-gray-100 mt-2 pt-2">
                <div className="flex items-center gap-4">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* صفحه‌بندی اسکلتون */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-3">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex gap-1">
          <div className="w-10 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-10 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-10 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// تعریف نوع داده بر اساس خروجی API
interface CommentItem {
  id: number;
  parentId: number;
  itemId: number;
  langCode: string;
  title: string;
  url: string;
  name: string;
  fullName: string;
  commentName: string;
  email: string;
  body: string;
  userName: string;
  userPhotoFileName: string | null;
  userPhoto: string;
  userIP: string;
  confirmed: boolean;
  isHome: boolean;
  type: number;
  score: number | null;
  pos: number | null;
  neg: number | null;
  isPrivate: boolean;
  seen: boolean;
  created: string;
  modified: string | null;
  total: number;
}

export default function MyCommentsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [expandedReplies, setExpandedReplies] = useState<number[]>([]);
  const [flag, setFlag] = useState<boolean>(false);
  const [deleteItem, setDeleteItem] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.token.token);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page"));

  // دریافت داده‌ها
  const fetchCommentUser = async () => {
    setLoading(true);
    try {
      const response = await getCommentUser(
        { langCode: "fa", pageIndex: page || 1, pageSize: 20, type: 0 },
        token,
      );
      setComments(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCommentUser();
    }
  }, [token, flag]);

  // تابع دریافت زیرکامنت‌های یک کامنت اصلی
  const getReplies = (commentId: number) => {
    return comments.filter((c) => c.parentId === commentId);
  };

  const handleDeleteComment = async (id: number) => {
    setDeleting(true);
    try {
      await DeleteComment(id, token);
      Toast.fire({
        icon: "success",
        title: "حذف با موفقیت انجام شد",
      });
      setFlag((e) => !e);
      setDeleteItem(null);
    } catch (err: any) {
      Toast.fire({
        icon: "error",
        title: err.message || "خطا در حذف کامنت",
      });
    } finally {
      setDeleting(false);
    }
  };

  const toggleReplies = (commentId: number) => {
    setExpandedReplies((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId],
    );
  };

  // آیکون وضعیت
  const StatusBadge = ({ confirmed }: { confirmed: boolean }) => {
    if (confirmed) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          <HiOutlineCheckCircle className="w-3 h-3" />
          تایید شده
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
        <HiOutlineClock className="w-3 h-3" />
        در انتظار
      </span>
    );
  };

  if (loading) {
    return <CommentsSkeleton />;
  }

  return (
    <div className="space-y-5 max-w-5xl mx-auto pb-5!">
      {/* هدر */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">نظرات من</h1>
        <p className="text-sm text-gray-500 mt-0.5">نظرات و پاسخ‌های شما</p>
      </div>

      {/* لیست کامنت‌ها */}
      <div className="space-y-3">
        {comments.map((comment) => {
          const replies = getReplies(comment.id);
          const hasReplies = replies.length > 0;

          return (
            <div
              key={comment.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              {/* کامنت اصلی */}
              <div className="p-4">
                {/* ردیف بالا */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <StatusBadge confirmed={comment.confirmed} />
                  </div>
                  <div className="flex items-center gap-1">
                    {/* لینک به مطلب */}
                    <a
                      href={comment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100"
                      title="مشاهده مطلب"
                    >
                      <HiOutlineEye className="w-4 h-4" />
                    </a>
                    {/* دکمه حذف */}
                    <button
                      // onClick={() => {
                      //   handleDeleteComment(comment.id);
                      // }}
                      onClick={() => setDeleteItem(comment.id)}
                      className="p-1.5 cursor-pointer text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100"
                      title="حذف"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Newspaper className="w-3.5 h-3.5" />
                  <p className="text-xs font-medium text-gray-700 line-clamp-1">
                    {comment.title}
                  </p>
                </div>

                {/* متن کامنت */}
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                  {comment.body}
                </p>

                {/* تعاملات و تاریخ */}
                <div className="flex items-center justify-between border-t border-gray-100 mt-2 pt-2">
                  <div className="flex items-center gap-4">
                    {/* لایک و دیس‌لایک (اگر داده موجود باشد) */}
                    {(comment.pos !== null || comment.neg !== null) && (
                      <>
                        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600">
                          <HiOutlineThumbUp className="w-3.5 h-3.5" />
                          {comment.pos ?? 0}
                        </button>
                        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600">
                          <HiOutlineThumbDown className="w-3.5 h-3.5" />
                          {comment.neg ?? 0}
                        </button>
                      </>
                    )}

                    {/* دکمه نمایش پاسخ‌ها */}
                    {hasReplies && (
                      <button
                        onClick={() => toggleReplies(comment.id)}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <HiOutlineChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            expandedReplies.includes(comment.id)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                        {replies.length} پاسخ
                      </button>
                    )}
                  </div>

                  <div className="text-xs text-gray-400">
                    {formatPersianDate(
                      comment.modified ? comment.modified : comment.created,
                    )}
                  </div>
                </div>
              </div>

              {/* بخش پاسخ‌ها با انیمیشن */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  expandedReplies.includes(comment.id) ? "max-h-96" : "max-h-0"
                }`}
              >
                {hasReplies && (
                  <div className="bg-gray-50 border-t border-gray-100 px-4 py-2 space-y-3">
                    {replies.map((reply) => (
                      <div key={reply.id} className="pr-6 relative">
                        {/* خط عمودی برای سلسله مراتب */}
                        <div className="absolute right-2 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                        <div className="relative">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-gray-600">
                              {reply.commentName || reply.name}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {formatPersianDate(
                                reply.modified ? reply.modified : reply.created,
                              )}
                            </span>
                            {!reply.confirmed && (
                              <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full">
                                در انتظار
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {reply.body}
                          </p>
                          {(reply.pos !== null || reply.neg !== null) && (
                            <div className="flex items-center gap-3 mt-1">
                              <button className="flex items-center gap-0.5 text-[10px] text-gray-400 hover:text-blue-600">
                                <HiOutlineThumbUp className="w-3 h-3" />
                                {reply.pos ?? 0}
                              </button>
                              <button className="flex items-center gap-0.5 text-[10px] text-gray-400 hover:text-red-600">
                                <HiOutlineThumbDown className="w-3 h-3" />
                                {reply.neg ?? 0}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* حالت خالی */}
        {comments.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <HiOutlineChat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">هنوز نظری ثبت نکرده‌اید</p>
          </div>
        )}
      </div>

      {/* صفحه‌بندی ساده (در صورت نیاز) */}
      {comments.length > 0 && (
        <CustomPagination
          total={comments[0].total}
          currentPage={Number(searchParams.get("page")) || 1}
          pageSize={20}
        />
      )}

      <ConfirmDialog
        open={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={() => handleDeleteComment(deleteItem!)}
        title="حذف نظر"
        message="آیا از حذف این نظر اطمینان دارید؟ این عمل قابل بازگشت نیست."
        confirmText="حذف"
        cancelText="انصراف"
        loading={deleting}
      />
    </div>
  );
}
