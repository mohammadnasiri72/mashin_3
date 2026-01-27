import { setToken } from "@/redux/slice/token";
import { PostLogin } from "@/services/Account/Login";
import { PostResetPass } from "@/services/Account/ResetPass";
import { Toast } from "@/utils/func";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Button, Checkbox, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdClose, MdLogin } from "react-icons/md";
import { useDispatch } from "react-redux";
const Cookies = require("js-cookie");

function ModalLogin() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errorForm, setErrorForm] = useState({
    errUserName: false,
    errPassword: false,
  });
  const disPatch = useDispatch();

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
        const dataLogin = await PostLogin(data);
        Cookies.set("user", JSON.stringify(dataLogin), { expires: 7 });
        disPatch(setToken(dataLogin.token));
        setOpen(false);
        Toast.fire({
          icon: "success",
          title: "با موفقیت وارد شدید",
        });
      } catch (err: any) {
        Toast.fire({
          icon: "error",
          title: err.response.data || "خطا در ورود به حساب",
        });
      } finally {
        setLoading(false);
      }
    }
  }

  async function ResetPasswordHandler() {
    if (!userName) {
      setErrorForm((prev) => ({
        ...prev,
        errUserName: true,
      }));
    }
    if (userName) {
      try {
        const dataResetPass = await PostResetPass(userName);
      } catch (err) {}
    }
  }

  return (
    <>
      {/* دکمه باز کردن مودال */}
      <button
        onClick={handleOpen}
        className="font-bold cursor-pointer whitespace-nowrap text-[#ce1a2a]! text-[13px] px-5 py-2.5 rounded transition-all duration-300 hover:shadow-[0_0_0_5px_rgba(206,26,42)]"
      >
        <div className="flex items-center gap-0.5">
          <MdLogin className="text-lg" />
          <span>ورود</span>
        </div>
      </button>

      {/* مودال ورود با MUI */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
            maxWidth: "380px",
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
          <div>
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
          <div className="flex justify-between items-center mt-3">
            <Checkbox
              className="select-none"
              checked={remember}
              onChange={() => setRemember((e) => !e)}
            >
              مرا به خاطر بسپار
            </Checkbox>

            <Button
              onClick={ResetPasswordHandler}
              type="link"
              className="text-xs! p-0! h-auto!"
            >
              فراموشی رمز
            </Button>
          </div>
          <div className="pr-5">
            <Link
              href={"/auth"}
              className="text-xs! p-0! h-auto! text-[#1677ff]! hover:text-[#69b1ff]!"
            >
              ساخت حساب کاربری
            </Link>
          </div>
          <div className="mt-3">
            <Button
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
    </>
  );
}

export default ModalLogin;
