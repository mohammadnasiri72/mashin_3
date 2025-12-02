import { Button, Input } from "antd";
import { FaEnvelope, FaLock, FaUser, FaUserPlus } from "react-icons/fa";

interface RegisterErrors {
  fullName: boolean;
  userName: boolean;
  email: boolean;
  password: boolean;
  newsletter: boolean;
}

interface RegisterFormProps {
  registerData: RegisterData;
  registerErrors: RegisterErrors;
  onRegisterChange: (
    field: keyof RegisterData,
    value: string | boolean
  ) => void;
  onRegister: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  registerData,
  registerErrors,
  onRegisterChange,
  onRegister,
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <span className="text-red-600">*</span> نام
      </label>
      <Input
        value={registerData.name}
        onChange={(e) => {
          onRegisterChange("name", e.target.value);
        }}
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
        onChange={(e) => onRegisterChange("family", e.target.value)}
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
        onChange={(e) => onRegisterChange("email", e.target.value)}
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
        <span className="text-red-600">*</span> رمز عبور
      </label>
      <Input.Password
        value={registerData.password}
        onChange={(e) => onRegisterChange("password", e.target.value)}
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

    <Button
      type="primary"
      size="large"
      block
      onClick={onRegister}
      className="h-12 rounded-lg bg-green-600 hover:bg-green-700 border-none font-bold flex items-center justify-center gap-2"
    >
      <FaUserPlus className="text-lg" />
      ایجاد حساب کاربری
    </Button>
  </div>
);