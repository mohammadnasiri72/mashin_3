"use client";

import { PostLogin } from "@/services/Account/Login";
import { PostRegister } from "@/services/Account/Register";
import { PostResetPass } from "@/services/Account/ResetPass";
import { generateRandomUserId, Toast } from "@/utils/func";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Button, Input, Tabs } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import {
  MdClose,
  MdLogin,
  MdOutlinePassword,
  MdPersonAdd,
} from "react-icons/md";
import { LoginForm } from "./components/loginForm";
import { RegisterForm } from "./components/registerForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setToken } from "@/redux/slice/token";
const Cookies = require("js-cookie");

// تایپ‌های TypeScript (همانطور که بود)
interface LoginData {
  userName: string;
  password: string;
  remember: boolean;
}

interface LoginErrors {
  userName: boolean;
  password: boolean;
}

interface RegisterErrors {
  fullName: boolean;
  userName: boolean;
  email: boolean;
  password: boolean;
  newsletter: boolean;
}

const AuthPage: React.FC = () => {
  // حالت‌های فرم ورود
  const [loginData, setLoginData] = useState<LoginData>({
    userName: "",
    password: "",
    remember: false,
  });

  // حالت‌های فرم ثبت‌نام
  const [registerData, setRegisterData] = useState<RegisterData>({
    langCode: "fa",
    name: "",
    family: "",
    email: "",
    password: "",
    newsletter: false,
    userId: generateRandomUserId(),
  });

  // مدیریت خطاها
  const [loginErrors, setLoginErrors] = useState<LoginErrors>({
    userName: false,
    password: false,
  });

  const [registerErrors, setRegisterErrors] = useState<RegisterErrors>({
    fullName: false,
    userName: false,
    email: false,
    password: false,
    newsletter: false,
  });
  const url = useSelector(
    (state: RootState) => state.redirectRegister.redirectRegister,
  );
  // حالت فعال تب
  const [activeTab, setActiveTab] = useState<string>("register");

  // حالت مودال بازیابی رمز عبور
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);
  const [resetPasswordModal, setResetPasswordModal] = useState<boolean>(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState<string>("");
  const [errResetPasswordEmail, setErrResetPasswordEmail] =
    useState<string>("");

  const disPatch = useDispatch();

  // هندلر تغییر مقادیر فرم ورود
  const handleLoginChange = (
    field: keyof LoginData,
    value: string | boolean,
  ) => {
    setLoginData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // پاک کردن خطا هنگام تغییر مقدار
    if (loginErrors[field as keyof LoginErrors]) {
      setLoginErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  // هندلر تغییر مقادیر فرم ثبت‌نام
  const handleRegisterChange = (
    field: keyof RegisterData,
    value: string | boolean,
  ) => {
    setRegisterData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // پاک کردن خطا هنگام تغییر مقدار
    if (registerErrors[field as keyof RegisterErrors]) {
      setRegisterErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  // اعتبارسنجی فرم ورود
  const validateLoginForm = (): boolean => {
    const errors: LoginErrors = {
      userName: !loginData.userName,
      password: !loginData.password,
    };

    setLoginErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  // اعتبارسنجی فرم ثبت‌نام
  const validateRegisterForm = (): boolean => {
    const errors: RegisterErrors = {
      fullName: !registerData.name,
      userName: !registerData.family,
      email: !registerData.email || !/\S+@\S+\.\S+/.test(registerData.email),
      password: !registerData.password || registerData.password.length < 6,
      newsletter: false,
    };

    setRegisterErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  // هندلر ورود
  const handleLogin = async (): Promise<void> => {
    if (!validateLoginForm()) {
      return;
    }
    setLoadingLogin(true);
    try {
      const result = await PostLogin(loginData);
      if (result.token) {
        Toast.fire({
          icon: "success",
          title: "ورود با موفقیت انجام شد",
        });
        Cookies.set("user", JSON.stringify(result), { expires: 7 });

        disPatch(setToken(result.token));
        Router.push(url ? url : "/");
      }
    } catch (error: any) {
      Toast.fire({
        icon: "error",
        title: error.response.data || "خطا در ورود به حساب",
      });
    } finally {
      setLoadingLogin(false);
    }
  };
  const Router = useRouter();

  // هندلر ثبت‌نام
  const handleRegister = async (): Promise<void> => {
    if (!validateRegisterForm()) {
      return;
    }
    setLoadingRegister(true);
    try {
      const result = await PostRegister(registerData);

      if (result.token) {
        Toast.fire({
          icon: "success",
          title: "ثبت نام شما با موفقیت انجام شد",
        });
        Cookies.set("user", JSON.stringify(result), { expires: 7 });
        disPatch(setToken(result.token));
        Router.push(url ? url : "/");
      }
    } catch (error: any) {
      Toast.fire({
        icon: "error",
        title: error.response.data || "خطا در ثبت‌ نام",
      });
    } finally {
      setLoadingRegister(false);
    }
  };

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
      const result = await PostResetPass(resetPasswordEmail);
      Toast.fire({
        icon: "success",
        title: "رمز عبور ارسال شد",
      });
    } catch (error: any) {
      Toast.fire({
        icon: "error",
        title: error.response.data || "خطا در بازیابی رمز عبور",
      });
    } finally {
      setResetPasswordModal(false);
      setResetPasswordEmail("");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* هدر */}
          <div className="bg-red-600  text-center py-6 px-4">
            <h1 className="text-2xl font-bold mb-2 text-white!">
              سامانه احراز هویت
            </h1>
            <p className="text-red-100 opacity-90">
              به حساب کاربری خود وارد شوید یا ثبت‌نام کنید
            </p>
          </div>

          {/* تب‌ها */}
          <div className="px-6 pt-6">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              centered
              className="auth-tabs"
              items={[
                {
                  key: "login",
                  label: (
                    <span className="flex items-center gap-2 font-medium">
                      <MdLogin className="text-lg" />
                      ورود به حساب
                    </span>
                  ),
                  children: (
                    <LoginForm
                      loginData={loginData}
                      loginErrors={loginErrors}
                      onLoginChange={handleLoginChange}
                      onResetPassword={() => setResetPasswordModal(true)}
                      onLogin={handleLogin}
                      loading={loadingLogin}
                    />
                  ),
                },
                {
                  key: "register",
                  label: (
                    <span className="flex items-center gap-2 font-medium">
                      <MdPersonAdd className="text-lg" />
                      ایجاد حساب
                    </span>
                  ),
                  children: (
                    <RegisterForm
                      registerData={registerData}
                      registerErrors={registerErrors}
                      onRegisterChange={handleRegisterChange}
                      onRegister={handleRegister}
                      loading={loadingRegister}
                    />
                  ),
                },
              ]}
            />
          </div>

          {/* فوتر */}
          <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-200">
            <p className="text-sm text-gray-600">
              با ورود یا ثبت‌نام، با{" "}
              <a href="/terms" className="text-blue-600 hover:text-blue-800">
                قوانین و مقررات
              </a>{" "}
              موافقت می‌کنید
            </p>
          </div>
        </div>
      </div>

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
              className="h-12 rounded-lg bg-blue-600 hover:bg-blue-700 border-none font-bold flex items-center justify-center gap-2"
            >
              <MdOutlinePassword className="text-lg" />
              ارسال لینک بازیابی
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AuthPage;
