"use client";

import ModalLoginComment from "@/app/(main)/car/components/ModalLoginComment";
import { setRedirectRegister } from "@/redux/slice/redirectRegister";
import { RootState } from "@/redux/store";
import { postComment } from "@/services/Comment/postComment";
import { formatPersianDate, Toast } from "@/utils/func";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Button, Form, Input } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaFlag, FaReply, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
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
  whichcars: ItemsId;
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
          <a
            href="#"
            className="cm_report flex items-center text-xs text-gray-500 bg-white px-3 py-1 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <FaFlag className="ml-1 text-red-500 text-lg" />
            گزارش مشکل
          </a>

          <div className="cm_buttons flex items-center gap-2">
            {comment.parentId === -1 && (
              <button
                onClick={() => {
                  if (token) {
                    onReply(comment.id);
                  } else {
                    setOpenLogin(true);
                    Toast.fire({
                      icon: "error",
                      title: "لطفا ابتدا وارد حساب کاربری خود شوید",
                    });
                  }
                }}
                className="cursor-pointer group flex items-center text-xs text-gray-500 bg-white p-3 rounded-lg"
              >
                <FaReply className="mr-1 text-purple-500 text-lg group-hover:-rotate-360 duration-500" />
              </button>
            )}
            <button className="cursor-pointer group flex items-center text-xs text-gray-500 bg-white p-3 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
              <FaThumbsDown className="mr-1 group-hover:animate-pulse text-red-500 text-lg" />
            </button>

            <button className="cursor-pointer group flex items-center text-xs text-gray-500 bg-white p-3 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors">
              <FaThumbsUp className="mr-1 group-hover:animate-pulse text-green-500 text-lg" />
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

const WhichcarsComments: React.FC<CommentsSectionProps> = ({
  whichcars,
  comments,
  id,
}) => {
  const [userName, setUserName] = useState<string>("");
  const [openModalCommentReplay, setOpenModalCommentReplay] =
    useState<boolean>(false);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [parentId, setParentId] = useState<number>(0);
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

  const [form] = Form.useForm();

  const onFinish = async (values: {
    email: string;
    body: string;
    name: string;
  }) => {
    if (token) {
      const data = {
        ...values,
        itemId: id,
        parentId: openModalCommentReplay ? parentId : 0,
        type: 0,
        userName,
        langCode: "fa",
        score: 0,
        userIP: "",
      };
      try {
        const response = await postComment(data);
        form.resetFields();
        setOpenModalCommentReplay(false);
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
      Toast.fire({
        icon: "error",
        title: "لطفا ابتدا وارد حساب کاربری خود شوید",
      });
      setOpenLogin(true);
    }
  };

  // تبدیل کامنت‌ها به ساختار درختی
  const commentTree = useMemo<CommentTreeNode[]>(() => {
    const commentMap = new Map<number, CommentTreeNode>();
    const roots: CommentTreeNode[] = [];

    // اول همه کامنت‌ها رو توی مپ قرار می‌دیم
    comments.forEach((comment: any) => {
      commentMap.set(comment.id, {
        ...comment,
        children: [],
      });
    });

    // حالا هر کامنت رو به پدرش وصل می‌کنیم
    comments.forEach((comment: any) => {
      const node = commentMap.get(comment.id);

      if (!node) return;

      if (comment.parentId === -1) {
        // کامنت ریشه
        roots.push(node);
      } else {
        // کامنت فرزند
        const parent = commentMap.get(comment.parentId);
        if (parent) {
          parent.children.push(node);
        } else {
          // اگر پدر پیدا نشد، به عنوان ریشه در نظر بگیر
          roots.push(node);
        }
      }
    });

    // فرزندان رو بر اساس تاریخ مرتب می‌کنیم (جدیدترین اول)
    roots.forEach((root) => {
      if (root.children && root.children.length > 0) {
        root.children.sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime(),
        );
      }
    });

    // ریشه‌ها رو بر اساس تاریخ مرتب می‌کنیم (جدیدترین اول)
    return roots.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    );
  }, [comments]);

  const handleReplyClick = (commentId: number) => {
    setParentId(commentId);
    setOpenModalCommentReplay(true);
  };

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
        <h3 className="dt_title text-xl font-bold text-gray-900 mb-4!">
          <strong className="text-red-600">نظرات </strong>
          درمورد {whichcars.sourceName} {whichcars.title}
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

              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="name"
                  label="نام و نام خانوادگی"
                  rules={[
                    { required: true, message: "لطفا نام خود را وارد کنید" },
                  ]}
                >
                  <Input placeholder="نام خود را وارد کنید" size="large" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="ایمیل"
                  rules={[
                    { required: true, message: "لطفا ایمیل خود را وارد کنید" },
                    { type: "email", message: "ایمیل معتبر نیست" },
                  ]}
                >
                  <Input placeholder="مثلا hiva@gmail.com" size="large" />
                </Form.Item>

                <Form.Item
                  name="body"
                  label="ثبت دیدگاه"
                  rules={[
                    { required: true, message: "لطفا دیدگاه خود را وارد کنید" },
                  ]}
                >
                  <TextArea
                    placeholder="نظر خود را در مورد این خودرو با کاربران دیگر به اشتراک بگذارید.."
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
                commentTree.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onReply={handleReplyClick}
                    token={token}
                    setOpenLogin={setOpenLogin}
                    Toast={Toast}
                    depth={0}
                  />
                ))
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
        onClose={() => setOpenModalCommentReplay(false)}
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
            onClick={() => setOpenModalCommentReplay(false)}
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
              <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="name"
                  label="نام و نام خانوادگی"
                  rules={[
                    { required: true, message: "لطفا نام خود را وارد کنید" },
                  ]}
                >
                  <Input placeholder="نام خود را وارد کنید" size="large" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="ایمیل"
                  rules={[
                    { required: true, message: "لطفا ایمیل خود را وارد کنید" },
                    { type: "email", message: "ایمیل معتبر نیست" },
                  ]}
                >
                  <Input placeholder="مثلا hiva@gmail.com" size="large" />
                </Form.Item>

                <Form.Item
                  name="body"
                  label="پاسخ شما"
                  rules={[
                    { required: true, message: "لطفا پاسخ خود را وارد کنید" },
                  ]}
                >
                  <TextArea
                    placeholder="پاسخ خود را به این کامنت بنویسید..."
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
                    ارسال پاسخ
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ModalLoginComment open={openLogin} setOpen={setOpenLogin} />

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

export default WhichcarsComments;
