"use client";

import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Button, Checkbox, Input, Tabs } from "antd";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import {
  MdClose,
  MdLogin,
  MdOutlinePassword,
  MdPersonAdd,
} from "react-icons/md";

// تایپ‌های TypeScript
interface LoginData {
  userName: string;
  password: string;
  remember: boolean;
}

interface RegisterData {
  name: string;
  family: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface LoginErrors {
  userName: boolean;
  password: boolean;
}

interface RegisterErrors {
  fullName: boolean;
  userName: boolean;
  email: boolean;
  phone: boolean;
  password: boolean;
  confirmPassword: boolean;
  agreeToTerms: boolean;
}

// سرویس‌های فرضی - باید با سرویس‌های واقعی جایگزین شوند
const PostLogin = async (data: LoginData) => {
  // پیاده‌سازی واقعی
  return Promise.resolve({ success: true });
};

const PostRegister = async (data: RegisterData) => {
  // پیاده‌سازی واقعی
  return Promise.resolve({ success: true });
};

const PostResetPass = async (userName: string) => {
  // پیاده‌سازی واقعی
  return Promise.resolve({ success: true });
};

const AuthPage: React.FC = () => {
  // حالت‌های فرم ورود
  const [loginData, setLoginData] = useState<LoginData>({
    userName: "",
    password: "",
    remember: false,
  });

  // حالت‌های فرم ثبت‌نام
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    family: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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
    phone: false,
    password: false,
    confirmPassword: false,
    agreeToTerms: false,
  });

  // حالت فعال تب
  const [activeTab, setActiveTab] = useState<string>("register");

  // حالت مودال بازیابی رمز عبور
  const [resetPasswordModal, setResetPasswordModal] = useState<boolean>(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState<string>("");

  // هندلر تغییر مقادیر فرم ورود
  const handleLoginChange = (
    field: keyof LoginData,
    value: string | boolean
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
    value: string | boolean
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
      phone: !registerData.mobile,
      password: !registerData.password || registerData.password.length < 6,
      confirmPassword: registerData.password !== registerData.confirmPassword,
      agreeToTerms: !registerData.agreeToTerms,
    };

    setRegisterErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  // هندلر ورود
  const handleLogin = async (): Promise<void> => {
    if (!validateLoginForm()) {
      //   message.error("لطفا اطلاعات ورود را به درستی تکمیل کنید");
      return;
    }

    try {
      const result = await PostLogin(loginData);
      //   message.success("ورود موفقیت‌آمیز بود");
      // در اینجا می‌توانید کاربر را به صفحه مورد نظر هدایت کنید
    } catch (error) {
      console.error("خطا در ورود:", error);
      //   message.error("نام کاربری یا رمز عبور نادرست است");
    }
  };

  // هندلر ثبت‌نام
  const handleRegister = async (): Promise<void> => {
    if (!validateRegisterForm()) {
      //   message.error("لطفا اطلاعات ثبت‌نام را به درستی تکمیل کنید");
      return;
    }

    try {
      const result = await PostRegister(registerData);
      //   message.success("ثبت‌نام موفقیت‌آمیز بود");
      // سوئیچ به تب ورود پس از ثبت‌نام موفق
      setActiveTab("login");
    } catch (error) {
      console.error("خطا در ثبت‌نام:", error);
      //   message.error("خطا در ثبت‌نام. لطفا مجددا تلاش کنید");
    }
  };

  // هندلر بازیابی رمز عبور
  const handleResetPassword = async (): Promise<void> => {
    if (!resetPasswordEmail) {
      //   message.error("لطفا ایمیل خود را وارد کنید");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(resetPasswordEmail)) {
      //   message.error("لطفا یک ایمیل معتبر وارد کنید");
      return;
    }

    try {
      const result = await PostResetPass(resetPasswordEmail);
      //   message.success("ایمیل بازیابی رمز عبور ارسال شد");
      setResetPasswordModal(false);
      setResetPasswordEmail("");
    } catch (error) {
      console.error("خطا در بازیابی رمز عبور:", error);
      //   message.error("خطا در بازیابی رمز عبور. لطفا مجددا تلاش کنید");
    }
  };

  // کامپوننت فرم ورود
  const LoginForm: React.FC = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-red-600">*</span> نام کاربری
        </label>
        <Input
          value={loginData.userName}
          onChange={(e) => handleLoginChange("userName", e.target.value)}
          prefix={<FaUser className="text-gray-400 ml-2" />}
          placeholder="نام کاربری خود را وارد کنید"
          size="large"
          className={`rounded-lg ${
            loginErrors.userName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {loginErrors.userName && (
          <span className="text-xs text-red-600 mt-1 block">
            لطفا نام کاربری خود را وارد کنید
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-red-600">*</span> رمز عبور
        </label>
        <Input.Password
          value={loginData.password}
          onChange={(e) => handleLoginChange("password", e.target.value)}
          prefix={<FaLock className="text-gray-400 ml-2" />}
          placeholder="رمز عبور خود را وارد کنید"
          size="large"
          className={`rounded-lg ${
            loginErrors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {loginErrors.password && (
          <span className="text-xs text-red-600 mt-1 block">
            لطفا رمز عبور خود را وارد کنید
          </span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Checkbox
          checked={loginData.remember}
          onChange={(e) => handleLoginChange("remember", e.target.checked)}
          className="text-gray-700"
        >
          مرا به خاطر بسپار
        </Checkbox>

        <Button
          type="link"
          onClick={() => setResetPasswordModal(true)}
          className="text-xs! p-0! h-auto! text-blue-600 hover:text-blue-800"
        >
          فراموشی رمز عبور
        </Button>
      </div>

      <Button
        type="primary"
        size="large"
        block
        onClick={handleLogin}
        className="h-12 rounded-lg bg-red-600 hover:bg-red-700 border-none font-bold flex items-center justify-center gap-2"
      >
        <MdLogin className="text-lg" />
        ورود به حساب
      </Button>
    </div>
  );

  // کامپوننت فرم ثبت‌نام
  const RegisterForm: React.FC = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-red-600">*</span> نام
        </label>
        <Input
          value={registerData.name}
          onChange={(e) => handleRegisterChange("name", e.target.value)}
          prefix={<FaUser className="text-gray-400 ml-2" />}
          placeholder="نام خود را وارد کنید"
          size="large"
          className={`rounded-lg ${
            registerErrors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {registerErrors.fullName && (
          <span className="text-xs text-red-600 mt-1 block">
            لطفا نام خود را وارد کنید
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-red-600">*</span> نام خانوادگی
        </label>
        <Input
          value={registerData.family}
          onChange={(e) => handleRegisterChange("family", e.target.value)}
          prefix={<FaUser className="text-gray-400 ml-2" />}
          placeholder="نام خانوادگی خود را وارد کنید"
          size="large"
          className={`rounded-lg ${
            registerErrors.userName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {registerErrors.userName && (
          <span className="text-xs text-red-600 mt-1 block">
            لطفا نام خانوادگی خود را وارد کنید
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-red-600">*</span> ایمیل
        </label>
        <Input
          value={registerData.email}
          onChange={(e) => handleRegisterChange("email", e.target.value)}
          prefix={<FaEnvelope className="text-gray-400 ml-2" />}
          placeholder="ایمیل خود را وارد کنید"
          size="large"
          className={`rounded-lg ${
            registerErrors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {registerErrors.email && (
          <span className="text-xs text-red-600 mt-1 block">
            لطفا یک ایمیل معتبر وارد کنید
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-red-600">*</span> تلفن همراه
        </label>
        <Input
          value={registerData.mobile}
          onChange={(e) => handleRegisterChange("mobile", e.target.value)}
          prefix={<FaPhone className="text-gray-400 ml-2" />}
          placeholder="شماره تلفن همراه خود را وارد کنید"
          size="large"
          className={`rounded-lg ${
            registerErrors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {registerErrors.phone && (
          <span className="text-xs text-red-600 mt-1 block">
            لطفا شماره تلفن همراه خود را وارد کنید
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-red-600">*</span> رمز عبور
        </label>
        <Input.Password
          value={registerData.password}
          onChange={(e) => handleRegisterChange("password", e.target.value)}
          prefix={<FaLock className="text-gray-400 ml-2" />}
          placeholder="رمز عبور خود را وارد کنید"
          size="large"
          className={`rounded-lg ${
            registerErrors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {registerErrors.password && (
          <span className="text-xs text-red-600 mt-1 block">
            رمز عبور باید حداقل ۶ کاراکتر باشد
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <span className="text-red-600">*</span> تکرار رمز عبور
        </label>
        <Input.Password
          value={registerData.confirmPassword}
          onChange={(e) =>
            handleRegisterChange("confirmPassword", e.target.value)
          }
          prefix={<FaLock className="text-gray-400 ml-2" />}
          placeholder="رمز عبور خود را مجددا وارد کنید"
          size="large"
          className={`rounded-lg ${
            registerErrors.confirmPassword
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {registerErrors.confirmPassword && (
          <span className="text-xs text-red-600 mt-1 block">
            رمز عبور و تکرار آن مطابقت ندارند
          </span>
        )}
      </div>

      <div className="space-y-2">
        <Checkbox
          checked={registerData.agreeToTerms}
          onChange={(e) =>
            handleRegisterChange("agreeToTerms", e.target.checked)
          }
          className={`${
            registerErrors.agreeToTerms ? "text-red-600" : "text-gray-700"
          }`}
        >
          با{" "}
          <a
            href="/terms"
            target="_blank"
            className="text-blue-600 hover:text-blue-800"
          >
            قوانین و مقررات
          </a>{" "}
          موافقم
        </Checkbox>
        {registerErrors.agreeToTerms && (
          <span className="text-xs text-red-600 block">
            لطفا با قوانین و مقررات موافقت کنید
          </span>
        )}
      </div>

      <Button
        type="primary"
        size="large"
        block
        onClick={handleRegister}
        className="h-12 rounded-lg bg-green-600 hover:bg-green-700 border-none font-bold flex items-center justify-center gap-2"
      >
        <FaUserPlus className="text-lg" />
        ایجاد حساب کاربری
      </Button>
    </div>
  );

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
                  children: <LoginForm />,
                },
                {
                  key: "register",
                  label: (
                    <span className="flex items-center gap-2 font-medium">
                      <MdPersonAdd className="text-lg" />
                      ایجاد حساب
                    </span>
                  ),
                  children: <RegisterForm />,
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
            bgcolor: "#3b82f6",
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
            <p className="text-gray-600 text-sm text-center">
              لطفا ایمیل خود را وارد کنید. لینک بازیابی رمز عبور برای شما ارسال
              خواهد شد.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="text-red-600">*</span> ایمیل
              </label>
              <Input
                value={resetPasswordEmail}
                onChange={(e) => setResetPasswordEmail(e.target.value)}
                prefix={<FaEnvelope className="text-gray-400 ml-2" />}
                placeholder="ایمیل خود را وارد کنید"
                size="large"
                className="rounded-lg"
              />
            </div>

            <Button
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
