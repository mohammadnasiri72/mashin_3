import { Button, Checkbox, Input } from "antd";
import { FaLock, FaUser } from "react-icons/fa";
import { MdLogin } from "react-icons/md";

interface LoginFormProps {
  loginData: LoginData;
  loginErrors: LoginErrors;
  onLoginChange: (field: keyof LoginData, value: string | boolean) => void;
  onResetPassword: () => void;
  onLogin: () => void;
  loading: boolean;
}
interface LoginErrors {
  userName: boolean;
  password: boolean;
}
interface LoginData {
  userName: string;
  password: string;
  remember: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  loginData,
  loginErrors,
  onLoginChange,
  onResetPassword,
  onLogin,
  loading,
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <span className="text-red-600">*</span> نام کاربری
      </label>
      <Input
        value={loginData.userName}
        onChange={(e) => onLoginChange("userName", e.target.value)}
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
        onChange={(e) => onLoginChange("password", e.target.value)}
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
        onChange={(e) => onLoginChange("remember", e.target.checked)}
        className="text-gray-700 text-xs!"
      >
        مرا به خاطر بسپار
      </Checkbox>

      <Button
        aria-label="فراموشی رمز عبور"
        type="link"
        onClick={onResetPassword}
        className="text-xs! p-0! h-auto! text-blue-600 hover:text-blue-800"
      >
        فراموشی رمز عبور
      </Button>
    </div>

    <Button
      aria-label="ورود به حساب"
      disabled={loading}
      type="primary"
      size="large"
      block
      onClick={onLogin}
      className="h-12 rounded-lg bg-red-600 hover:bg-red-700 border-none font-bold flex items-center justify-center gap-2"
    >
      <MdLogin className="text-lg" />
      {loading ? "در حال ورود..." : " ورود به حساب"}
    </Button>
  </div>
);
