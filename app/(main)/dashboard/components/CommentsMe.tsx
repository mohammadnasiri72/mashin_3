import { RootState } from "@/redux/store";
import { getCommentUser } from "@/services/Comment/CommentUser";
import { formatPersianDate } from "@/utils/func";
import { ChevronLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegCalendarDays } from "react-icons/fa6";
import { HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi";
import { useSelector } from "react-redux";

// کامپوننت اسکلتون لودینگ
const CommentUserSkeleton = () => {
  return (
    <div className="divide-y divide-gray-100">
      {[1, 2, 3, 4].map((i) => (
        <div key={`skeleton-car-${i}`} className="flex items-center gap-3 p-3">
          <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse shrink-0" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse" />
            <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

function CommentsMe() {
  const [loading, setLoading] = useState<boolean>(true);
  const [comments, setComments] = useState<CommentResponse[]>([]);

  const token = useSelector((state: RootState) => state.token.token);

  const fetchCommentUser = async () => {
    setLoading(true);
    try {
      const response = await getCommentUser(
        { langCode: "fa", pageIndex: 1, pageSize: 5, type: 0 },
        token,
      );

      setComments(response);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCommentUser();
    }
  }, [token]);
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-emerald-600" />
          <h2 className="font-semibold text-gray-900">نظرات شما</h2>
        </div>
        <Link
          href="/dashboard/mycomments"
          className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-0.5"
        >
          نمایش همه
          <ChevronLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <CommentUserSkeleton />
      ) : (
        <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
          {comments.length > 0 ? (
            comments.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="block p-3 hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm text-gray-900 line-clamp-2">
                  {item.body}
                </p>

                <div className="flex justify-between items-center mt-1.5">
                  {item.confirmed ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      <HiOutlineCheckCircle className="w-3 h-3" />
                      تایید شده
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                      <HiOutlineClock className="w-3 h-3" />
                      در انتظار تایید
                    </span>
                  )}

                  <div className="flex items-center gap-1 mt-1">
                    <FaRegCalendarDays className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {formatPersianDate(
                        item.modified ? item.modified : item.created,
                      )}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500 text-sm">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>نظری ثبت نکرده‌اید</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CommentsMe;
