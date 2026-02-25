"use client";

import ModalLogin from "@/app/components/ModalLogin";
import { setRedirectRegister } from "@/redux/slice/redirectRegister";
import { RootState } from "@/redux/store";
import { getComment } from "@/services/Comment/Comment";
import { DisLikeComment } from "@/services/Comment/DisLikeComment";
import { LikeComment } from "@/services/Comment/LikeComment";
import { postComment } from "@/services/Comment/postComment";
import { formatPersianDate, Toast } from "@/utils/func";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Button, Form, Input, Spin } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaReply, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Cookies = require("js-cookie");

const { TextArea } = Input;

// انواع TypeScript
interface Comment {
  rowId: number;
  id: number;
  parentId: number;
  body: string;
  commentName: string;
  confirmed: boolean;
  created: string;
  email: string;
  fullName: string;
  isHome: boolean;
  isPrivate: boolean;
  itemId: number;
  langCode: string;
  modified: string | null;
  name: string;
  neg: number | null;
  pos: number | null;
  score: number | null;
  seen: boolean;
  title: string;
  total: number;
  type: number;
  url: string;
  userIP: string;
  userName: string;
  userPhoto: string;
  userPhotoFileName: string | null;
}

interface CommentTreeNode extends Comment {
  children: CommentTreeNode[];
}

interface CommentsSectionProps {
  details: ItemsId;
  comments: CommentResponse[];
  id: number;
}

interface CommentItemProps {
  comment: CommentTreeNode;
  onReply: (commentId: number) => void;
  token: string | null;
  setOpenLogin: (open: boolean) => void;
  Toast: any;
  depth?: number;
}

// کامپوننت جداگانه برای نمایش یک کامنت و زیرمجموعه‌هایش
const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onReply,
  token,
  setOpenLogin,
  Toast,
  depth = 0,
}) => {
  const [likes, setLikes] = useState(comment.pos || 0);
  const [dislikes, setDislikes] = useState(Number(comment.neg) || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);

  const handleLikeClick = async () => {
    if (!token) {
      setOpenLogin(true);
      Toast.fire({
        icon: "error",
        title: "لطفا ابتدا وارد حساب کاربری خود شوید",
      });
      return;
    }
    setIsLiking(true);
    try {
      await LikeComment(comment.id, token);
      Toast.fire({
        icon: "success",
        title: "با موفقیت ثبت شد",
      });
      setLikes((prev) => prev + 1);
    } catch (error: any) {
      Toast.fire({
        icon: "warning",
        title: `${error?.response?.data ? error.response.data : "خطا در لایک کامنت"}`,
      });
    } finally {
      setIsLiking(false);
    }
  };

  const handleDislikeClick = async () => {
    if (!token) {
      setOpenLogin(true);
      Toast.fire({
        icon: "error",
        title: "لطفا ابتدا وارد حساب کاربری خود شوید",
      });
      return;
    }

    setIsDisliking(true);
    try {
      await DisLikeComment(comment.id, token);
      Toast.fire({
        icon: "success",
        title: "با موفقیت ثبت شد",
      });
      setDislikes((prev) => prev + 1);
    } catch (error: any) {
      Toast.fire({
        icon: "warning",
        title: `${error?.response?.data ? error.response.data : "خطا در لایک کامنت"}`,
      });
    } finally {
      setIsDisliking(false);
    }
  };

  return (
    <div className="comment-item">
      <div
        className={`comment-box bg-gray-50 rounded-xl p-4 ${
          depth > 0 ? "sm:mr-20 mr-8 border-r-2 border-red-200" : ""
        }`}
        style={{
          marginRight: depth > 0 ? `${depth * 40}px` : "0",
          marginTop: "8px",
          borderRight: depth > 0 ? "2px solid #fed7d7" : "none",
        }}
      >
        <div className="cm_tp flex gap-3 items-center mb-3">
          <div className="author_name font-bold text-gray-800">
            {comment.fullName}
          </div>
          <div className="text-xs font-semibold relative pr-3">
            {formatPersianDate(comment.created)}
            <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-purple-200 rounded-full"></span>
          </div>
        </div>

        <div className="text-justify text-gray-700 leading-7 mb-3">
          {comment.body}
        </div>

        <div className="cm_btm flex justify-between items-center">
          <div className="cm_buttons flex items-center gap-2">
            {comment.parentId === -1 && (
              <button
                aria-label="ارسال کامنت"
                onClick={() => {
                  onReply(comment.id);
                }}
                className="cursor-pointer group flex items-center text-xs text-gray-500 bg-white p-3 rounded-lg"
              >
                <span className="font-bold!">پاسخ</span>
                <FaReply className="mr-1 text-purple-500 text-xs group-hover:-rotate-360 duration-500" />
              </button>
            )}
            <button
              onClick={handleDislikeClick}
              disabled={isDisliking}
              aria-label="نپسندیدن"
              className={`cursor-pointer group flex items-center text-xs p-3 rounded-lg transition-colors text-red-600 bg-red-50  ${isDisliking ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span className="font-bold!">{dislikes}</span>
              <FaThumbsDown
                className={`mr-1 text-xs text-red-600" : "text-red-500 ${isDisliking ? "animate-pulse" : "group-hover:animate-pulse"}`}
              />
            </button>

            <button
              onClick={handleLikeClick}
              disabled={isLiking}
              aria-label="پسندیدن"
              className={`cursor-pointer group flex items-center text-xs p-3 rounded-lg transition-colors text-green-600 bg-green-50 ${isLiking ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span className="font-bold!">{likes}</span>
              <FaThumbsUp
                className={`mr-1 text-xs text-green-600  ${isLiking ? "animate-pulse" : "group-hover:animate-pulse"}`}
              />
            </button>
          </div>
        </div>
      </div>
      {/* نمایش زیرمجموعه‌ها */}
      {comment.children && comment.children.length > 0 && (
        <div className="replies-container">
          {comment.children.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              token={token}
              setOpenLogin={setOpenLogin}
              Toast={Toast}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentsSection: React.FC<CommentsSectionProps> = ({
  details,
  comments,
  id,
}) => {
  const [userName, setUserName] = useState<string>("");
  const [openModalCommentReplay, setOpenModalCommentReplay] =
    useState<boolean>(false);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [parentId, setParentId] = useState<number>(0);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize] = useState<number>(20);
  const [allComments, setAllComments] = useState<Comment[]>(comments);
  const [totalComments, setTotalComments] = useState<number>(0);

  // دو نمونه فرم جداگانه
  const [mainForm] = Form.useForm(); // فرم اصلی
  const [replyForm] = Form.useForm(); // فرم پاسخ

  const token = useSelector((state: RootState) => state.token.token);
  const user = Cookies.get("user");

  useEffect(() => {
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser?.userId || "");
      } catch (error) {
        console.error("Error parsing user cookie:", error);
        setUserName("");
      }
    }
  }, [user]);

  useEffect(() => {
    if (comments.length > 0) {
      setTotalComments(comments[0].total || 0);
    }
  }, [comments]);

  // تابع ارسال فرم اصلی
  const onMainFinish = async (values: {
    email: string;
    body: string;
    name: string;
  }) => {
    if (token) {
      const data = {
        ...values,
        itemId: id,
        parentId: 0, // فرم اصلی parentId = 0
        type: 0,
        userName,
        langCode: "fa",
        score: 0,
        userIP: "",
        name: JSON.parse(user).displayName,
        email: userName,
      };
      try {
        await postComment(data);
        mainForm.resetFields(); // ریست فرم اصلی

        // بعد از ثبت کامنت جدید، کامنت‌ها را از صفحه اول مجدد بارگیری کنید
        setPageIndex(1);
        setLoadingMore(true);
        try {
          const newComments = await getComment({
            id: Number(id),
            langCode: "fa",
            type: 0,
            pageSize: 20,
            pageIndex: 1,
          });
          setAllComments(newComments);
          if (newComments.length > 0) {
            setTotalComments(newComments[0].total || 0);
          }
        } catch (error) {
          console.error("Error refreshing comments:", error);
          Toast.fire({
            icon: "error",
            title: "خطا در دریافت نظرات جدید",
          });
        } finally {
          setLoadingMore(false);
        }

        Toast.fire({
          icon: "success",
          title: "کامنت شما ثبت شد لطفا منتظر تایید ادمین بمانید",
        });
      } catch (error: any) {
        Toast.fire({
          icon: "error",
          title: error.response?.data || "خطا در ثبت کامنت",
        });
      }
    } else {
      // بدون توکن
      const data = {
        ...values,
        itemId: id,
        parentId: 0,
        type: 0,
        userName,
        langCode: "fa",
        score: 0,
        userIP: "",
      };
      try {
        await postComment(data);
        mainForm.resetFields();

        setPageIndex(1);
        setLoadingMore(true);
        try {
          const newComments = await getComment({
            id: Number(id),
            langCode: "fa",
            type: 0,
            pageSize: 20,
            pageIndex: 1,
          });
          setAllComments(newComments);
          if (newComments.length > 0) {
            setTotalComments(newComments[0].total || 0);
          }
        } catch (error) {
          console.error("Error refreshing comments:", error);
          Toast.fire({
            icon: "error",
            title: "خطا در دریافت نظرات جدید",
          });
        } finally {
          setLoadingMore(false);
        }

        Toast.fire({
          icon: "success",
          title: "کامنت شما ثبت شد لطفا منتظر تایید ادمین بمانید",
        });
      } catch (error: any) {
        Toast.fire({
          icon: "error",
          title: error.response?.data || "خطا در ثبت کامنت",
        });
      }
    }
  };

  // تابع ارسال فرم پاسخ
  const onReplyFinish = async (values: {
    email: string;
    body: string;
    name: string;
  }) => {
    if (token) {
      const data = {
        ...values,
        itemId: id,
        parentId: parentId, // از state parentId استفاده می‌کنیم
        type: 0,
        userName,
        langCode: "fa",
        score: 0,
        userIP: "",
        name: JSON.parse(user).displayName,
        email: userName,
      };
      try {
        await postComment(data);
        replyForm.resetFields(); // ریست فرم پاسخ
        setOpenModalCommentReplay(false); // بستن مودال

        setPageIndex(1);
        setLoadingMore(true);
        try {
          const newComments = await getComment({
            id: Number(id),
            langCode: "fa",
            type: 0,
            pageSize: 20,
            pageIndex: 1,
          });
          setAllComments(newComments);
          if (newComments.length > 0) {
            setTotalComments(newComments[0].total || 0);
          }
        } catch (error) {
          console.error("Error refreshing comments:", error);
          Toast.fire({
            icon: "error",
            title: "خطا در دریافت نظرات جدید",
          });
        } finally {
          setLoadingMore(false);
        }

        Toast.fire({
          icon: "success",
          title: "پاسخ شما ثبت شد لطفا منتظر تایید ادمین بمانید",
        });
      } catch (error: any) {
        Toast.fire({
          icon: "error",
          title: error.response?.data || "خطا در ثبت پاسخ",
        });
      }
    } else {
      // بدون توکن
      const data = {
        ...values,
        itemId: id,
        parentId: parentId,
        type: 0,
        userName,
        langCode: "fa",
        score: 0,
        userIP: "",
      };
      try {
        await postComment(data);
        replyForm.resetFields();
        setOpenModalCommentReplay(false);

        setPageIndex(1);
        setLoadingMore(true);
        try {
          const newComments = await getComment({
            id: Number(id),
            langCode: "fa",
            type: 0,
            pageSize: 20,
            pageIndex: 1,
          });
          setAllComments(newComments);
          if (newComments.length > 0) {
            setTotalComments(newComments[0].total || 0);
          }
        } catch (error) {
          console.error("Error refreshing comments:", error);
          Toast.fire({
            icon: "error",
            title: "خطا در دریافت نظرات جدید",
          });
        } finally {
          setLoadingMore(false);
        }

        Toast.fire({
          icon: "success",
          title: "پاسخ شما ثبت شد لطفا منتظر تایید ادمین بمانید",
        });
      } catch (error: any) {
        Toast.fire({
          icon: "error",
          title: error.response?.data || "خطا در ثبت پاسخ",
        });
      }
    }
  };

  // تابع ساده برای بارگیری کامنت‌های بیشتر
  const handleLoadMore = async () => {
    if (loadingMore) return;

    setLoadingMore(true);
    try {
      const nextPageIndex = pageIndex + 1;

      const response = await getComment({
        id: Number(id),
        langCode: "fa",
        type: 0,
        pageSize: pageSize,
        pageIndex: nextPageIndex,
      });

      if (response.length > 0) {
        setAllComments((prev) => [...prev, ...response]);
        setPageIndex(nextPageIndex);
      }
    } catch (error) {
      console.error("Error loading more comments:", error);
      Toast.fire({
        icon: "error",
        title: "خطا در دریافت نظرات بیشتر",
      });
    } finally {
      setLoadingMore(false);
    }
  };

  // تبدیل کامنت‌ها به ساختار درختی
  const commentTree = useMemo<CommentTreeNode[]>(() => {
    const commentMap = new Map<number, CommentTreeNode>();
    const roots: CommentTreeNode[] = [];

    allComments.forEach((comment: any) => {
      commentMap.set(comment.id, {
        ...comment,
        children: [],
      });
    });

    allComments.forEach((comment: any) => {
      const node = commentMap.get(comment.id);
      if (!node) return;

      if (comment.parentId === -1) {
        roots.push(node);
      } else {
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.children.push(node);
        } else {
          roots.push(node);
        }
      }
    });

    roots.forEach((root) => {
      if (root.children && root.children.length > 0) {
        root.children.sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime(),
        );
      }
    });

    return roots.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    );
  }, [allComments]);

  const handleReplyClick = (commentId: number) => {
    setParentId(commentId);
    setOpenModalCommentReplay(true);
  };

  // بررسی آیا کامنت بیشتری برای نمایش وجود دارد یا خیر
  const hasMoreComments = totalComments > allComments.length;

  // ذخیره url در ریداکس برای بازگشت
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const idRedirect = searchParams.get("id");
  const urlRedirect = idRedirect
    ? decodeURIComponent(pathname) + `?id=${idRedirect}`
    : decodeURIComponent(pathname);
  const disPatch = useDispatch();
  useEffect(() => {
    if (openLogin) {
      disPatch(setRedirectRegister(urlRedirect));
    }
  }, [openLogin]);

  return (
    <>
      <div className="detailsBox bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="dt_title text-xl font-bold text-gray-900 mb-4">
          <strong className="text-red-600">نظرات </strong>
          درمورد {details.sourceName} {details.title}
          <span className="text-sm font-normal text-gray-500 mr-2">
            ({totalComments} نظر)
          </span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
          {/* فرم ثبت نظر اصلی */}
          <div className="lg:col-span-4 ">
            <div className="contactForm_wrap bg-gray-50 rounded-xl p-6 comment-form sticky">
              <div className="title_sec mb-4">
                <h3 className="text-lg font-bold text-gray-900">دیدگاه</h3>
                <p className="text-gray-600 mt-2">
                  شما هم درباره این کالا دیدگاه ثبت کنید
                </p>
              </div>

              <Form form={mainForm} layout="vertical" onFinish={onMainFinish}>
                {!token && (
                  <Form.Item
                    name="name"
                    label="نام و نام خانوادگی"
                    rules={[
                      {
                        required: token ? false : true,
                        message: "لطفا نام خود را وارد کنید",
                      },
                    ]}
                  >
                    <Input placeholder="نام خود را وارد کنید" size="large" />
                  </Form.Item>
                )}

                {!token && (
                  <Form.Item
                    name="email"
                    label="ایمیل"
                    rules={[
                      {
                        required: token ? false : true,
                        message: "لطفا ایمیل خود را وارد کنید",
                      },
                      { type: "email", message: "ایمیل معتبر نیست" },
                    ]}
                  >
                    <Input placeholder="مثلا hiva@gmail.com" size="large" />
                  </Form.Item>
                )}

                <Form.Item
                  name="body"
                  label="ثبت دیدگاه"
                  rules={[
                    { required: true, message: "لطفا دیدگاه خود را وارد کنید" },
                  ]}
                >
                  <TextArea
                    placeholder="نظر خود را با کاربران دیگر به اشتراک بگذارید.."
                    rows={4}
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    aria-label="ثبت دیدگاه"
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="w-full bg-red-600 hover:bg-red-700 border-none"
                  >
                    ثبت دیدگاه
                  </Button>
                </Form.Item>

                <p className="text-xs text-gray-500 text-center mt-4">
                  ثبت دیدگاه به معنی موافقت با{" "}
                  <a
                    href="/rules-regulations"
                    className="text-red-600 font-medium"
                  >
                    قوانین انتشار ماشین سه
                  </a>{" "}
                  است.
                </p>
              </Form>
            </div>
          </div>

          {/* لیست نظرات */}
          <div className="lg:col-span-8">
            <div className="comments-area space-y-4">
              {commentTree.length > 0 ? (
                <>
                  {commentTree.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      onReply={handleReplyClick}
                      token={token}
                      setOpenLogin={setOpenLogin}
                      Toast={Toast}
                      depth={0}
                    />
                  ))}

                  {/* دکمه نمایش بیشتر */}
                  {hasMoreComments && (
                    <div className="text-center mt-6 pt-4 border-t border-gray-200">
                      <button
                        aria-label="نمایش نظرات بیشتر"
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="min-w-48 cursor-pointer bg-white hover:bg-gray-50 border border-red-200 text-red-600 hover:text-red-700 hover:border-red-300 transition-all py-2 px-6 rounded-lg font-medium"
                      >
                        {loadingMore ? (
                          <>
                            <Spin size="small" className="ml-2" />
                            در حال بارگذاری...
                          </>
                        ) : (
                          <>
                            نمایش نظرات بیشتر
                            <span className="mr-2 text-sm text-gray-500">
                              ({pageSize * pageIndex} از {totalComments})
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  هنوز دیدگاهی ثبت نشده است. اولین نفری باشید که دیدگاه می‌دهد!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* مودال پاسخ به کامنت */}
      <Dialog
        sx={{
          zIndex: 99999999999,
        }}
        open={openModalCommentReplay}
        onClose={() => {
          setOpenModalCommentReplay(false);
          replyForm.resetFields(); // ریست فرم هنگام بستن مودال
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#ce1a2a",
            color: "white",
            textAlign: "center",
            fontSize: "1.1rem",
            fontWeight: "bold",
            py: 1,
            position: "relative",
          }}
        >
          پاسخ به کامنت
          <IconButton
            onClick={() => {
              setOpenModalCommentReplay(false);
              replyForm.resetFields();
            }}
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
            }}
          >
            <MdClose size={18} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ py: 3, px: 3 }}>
          <div className="lg:col-span-4 ">
            <div className="py-2">
              <Form form={replyForm} layout="vertical" onFinish={onReplyFinish}>
                {!token && (
                  <Form.Item
                    name="name"
                    label="نام و نام خانوادگی"
                    rules={[
                      {
                        required: token ? false : true,
                        message: "لطفا نام خود را وارد کنید",
                      },
                    ]}
                  >
                    <Input placeholder="نام خود را وارد کنید" size="large" />
                  </Form.Item>
                )}

                {!token && (
                  <Form.Item
                    name="email"
                    label="ایمیل"
                    rules={[
                      {
                        required: token ? false : true,
                        message: "لطفا ایمیل خود را وارد کنید",
                      },
                      { type: "email", message: "ایمیل معتبر نیست" },
                    ]}
                  >
                    <Input placeholder="مثلا hiva@gmail.com" size="large" />
                  </Form.Item>
                )}

                <Form.Item
                  name="body"
                  label="ثبت دیدگاه"
                  rules={[
                    { required: true, message: "لطفا دیدگاه خود را وارد کنید" },
                  ]}
                >
                  <TextArea
                    placeholder="پاسخ خود را بنویسید..."
                    rows={4}
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    aria-label="ثبت پاسخ"
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="w-full bg-red-600 hover:bg-red-700 border-none"
                  >
                    ثبت پاسخ
                  </Button>
                </Form.Item>

                <p className="text-xs text-gray-500 text-center mt-4">
                  ثبت دیدگاه به معنی موافقت با{" "}
                  <a
                    href="/rules-regulations"
                    className="text-red-600 font-medium"
                  >
                    قوانین انتشار ماشین سه
                  </a>{" "}
                  است.
                </p>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ModalLogin open={openLogin} setOpen={setOpenLogin} />

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

        .comment-item {
          transition: all 0.3s ease;
        }

        .replies-container {
          margin-right: 20px;
          position: relative;
        }

        .replies-container::before {
          content: "";
          position: absolute;
          top: 0;
          right: -20px;
          bottom: 0;
          width: 2px;
          background-color: #fed7d7;
        }
      `}</style>
    </>
  );
};

export default CommentsSection;