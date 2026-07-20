"use client";

import { setRedirectRegister } from "@/redux/slice/redirectRegister";
import { setUser } from "@/redux/slice/user"; // اضافه کردن
import { PostResetPass } from "@/services/Account/ResetPass";
import { getCsrf } from "@/services/Csrf/Csrf";
import { Toast } from "@/utils/func";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Button, Checkbox, Input } from "antd";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { MdClose, MdLogin, MdOutlinePassword } from "react-icons/md";
import { useDispatch } from "react-redux";

function ModalLogin({ open, setOpen }: { open: boolean; setOpen: any }) {
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errorForm, setErrorForm] = useState({
    errUserName: false,
    errPassword: false,
  });
  const [resetPasswordModal, setResetPasswordModal] = useState<boolean>(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState<string>("");
  const [errResetPasswordEmail, setErrResetPasswordEmail] =
    useState<string>("");

  const disPatch = useDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = searchParams.toString();
  const fullUrl = params ? `${pathname}?${params}` : pathname;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function loginHandler() {
    if (!userName) {
      setErrorForm((prev) => ({
        ...prev,
        errUserName: true,
      }));
    }
    if (!password) {
      setErrorForm((prev) => ({
        ...prev,
        errPassword: true,
      }));
    }
    if (userName && password) {
      const data = {
        userName,
        password,
        remember,
      };
      setLoading(true);
      try {
        // استفاده از API Route به جای مستقیم
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          // ذخیره اطلاعات کاربر در Redux
          disPatch(setUser(result.user));

          // بستن مودال
          setOpen(false);

          Toast.fire({
            icon: "success",
            title: "با موفقیت وارد شدید",
          });

         
        } else {
          throw new Error(result.error || "خطا در ورود");
        }
      } catch (err: any) {
        Toast.fire({
          icon: "error",
          title: err.message || "خطا در ورود به حساب",
        });
      } finally {
        setLoading(false);
      }
    }
  }

  // ذخیره url در ریداکس برای بازگشت
  useEffect(() => {
    if (open) {
      disPatch(setRedirectRegister("/"));
    }
  }, [open]);

  // هندلر بازیابی رمز عبور
  const handleResetPassword = async (): Promise<void> => {
    if (!resetPasswordEmail) {
      setErrResetPasswordEmail("لطفا ایمیل خود را وارد کنید");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(resetPasswordEmail)) {
      setErrResetPasswordEmail("ایمیل معتبر نیست");
      return;
    }

    try {
      const resultCsrf = await getCsrf();
      const result = await PostResetPass(
        resetPasswordEmail,
        resultCsrf.csrfToken,
      );
      Toast.fire({
        icon: "success",
        title: "رمز عبور ارسال شد",
      });
    } catch (error: any) {
      Toast.fire({
        icon: "error",
        title: error.response?.data || "خطا در بازیابی رمز عبور",
      });
    } finally {
      setResetPasswordModal(false);
      setResetPasswordEmail("");
    }
  };

  return (
    <>
      {/* مودال ورود با MUI */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            maxWidth: "450px",
          },
        }}
      >
        {/* هدر مودال */}
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
          ورود به حساب کاربری
          <IconButton
            onClick={handleClose}
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

        <DialogContent sx={{ py: 2, px: 2, mt: 2 }}>
          <div>
            <span>
              <span className="text-red-600">*</span> نام کاربری{" "}
            </span>
            <Input
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setErrorForm((prev) => ({
                  ...prev,
                  errUserName: false,
                }));
              }}
              prefix={<FaUser style={{ color: "#666", marginLeft: "8px" }} />}
              placeholder="نام کاربری خود را وارد کنید"
              size="large"
              style={{
                borderRadius: "6px",
                borderColor: errorForm.errUserName ? "#ce1a2a" : "",
              }}
            />
            {errorForm.errUserName && (
              <span className="text-xs text-[#ce1a2a] select-none">
                لطفا نام کاربری خود را وارد کنید
              </span>
            )}
          </div>
          <div className="mt-5">
            <span>
              <span className="text-red-600">*</span> رمز عبور{" "}
            </span>
            <Input.Password
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorForm((prev) => ({
                  ...prev,
                  errPassword: false,
                }));
              }}
              prefix={<FaLock style={{ color: "#666", marginLeft: "8px" }} />}
              placeholder="رمز عبور خود را وارد کنید"
              size="large"
              style={{
                borderRadius: "6px",
                borderColor: errorForm.errPassword ? "#ce1a2a" : "",
              }}
            />
            {errorForm.errPassword && (
              <span className="text-xs text-[#ce1a2a] select-none">
                لطفا رمز عبور خود را وارد کنید
              </span>
            )}
          </div>
          <div className="mt-3">
            <Checkbox
              className="select-none text-xs!"
              checked={remember}
              onChange={() => setRemember((e) => !e)}
            >
              مرا به خاطر بسپار
            </Checkbox>
          </div>
          <div className="flex justify-between items-center mt-3">
            <Button
              aria-label="فراموشی رمز عبور"
              type="link"
              onClick={() => {
                setResetPasswordModal(true);
              }}
              className="text-xs! p-0! h-auto! text-blue-600 hover:text-blue-800"
            >
              فراموشی رمز عبور
            </Button>
            <Link
              href={"/auth"}
              aria-label="ساخت حساب کاربری"
              type="link"
              onClick={(e) => {
                e.preventDefault();
                disPatch(setRedirectRegister(fullUrl));
                setOpen(false);
              }}
              className="text-xs! p-0! h-auto! text-blue-600! hover:text-blue-800!"
            >
              ساخت حساب کاربری
            </Link>
          </div>

          <div className="mt-3 w-full">
            <Button
              aria-label="ورود به حساب"
              onClick={loginHandler}
              disabled={loading}
              type="primary"
              size="middle"
              block
              style={{
                backgroundColor: "#ce1a2a",
                borderColor: "#ce1a2a",
                borderRadius: "6px",
                height: "40px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              <div className="flex items-center gap-1">
                <MdLogin className="text-xl" />
                {loading ? (
                  <span>در حال ورود...</span>
                ) : (
                  <span> ورود به حساب</span>
                )}
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* مودال بازیابی رمز عبور */}
      <Dialog
        open={resetPasswordModal}
        onClose={() => setResetPasswordModal(false)}
        maxWidth="xs"
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
            py: 2,
            position: "relative",
          }}
        >
          بازیابی رمز عبور
          <IconButton
            onClick={() => setResetPasswordModal(false)}
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
          <div className="space-y-4">
            <p className="text-gray-600 text-sm text-center mt-3!">
              لطفا ایمیل خود را وارد کنید. لینک بازیابی رمز عبور برای شما ارسال
              خواهد شد.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="text-red-600">*</span> ایمیل
              </label>
              <Input
                value={resetPasswordEmail}
                onChange={(e) => {
                  setResetPasswordEmail(e.target.value);
                  setErrResetPasswordEmail("");
                }}
                prefix={<FaEnvelope className="text-gray-400 ml-2" />}
                placeholder="ایمیل خود را وارد کنید"
                size="large"
                className="rounded-lg"
              />
              {errResetPasswordEmail && (
                <span className="text-[#ce1a2a] text-xs">
                  {errResetPasswordEmail}
                </span>
              )}
            </div>

            <Button
              aria-label="ارسال لینک بازیابی"
              type="primary"
              size="large"
              block
              onClick={handleResetPassword}
              className="h-12 rounded-lg bg-gray-600 hover:bg-gray-700 border-none font-bold flex items-center justify-center gap-2"
            >
              <MdOutlinePassword className="text-lg" />
              ارسال لینک بازیابی
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ModalLogin;
