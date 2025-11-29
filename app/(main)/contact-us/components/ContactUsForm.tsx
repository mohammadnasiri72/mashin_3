import {
  EnvironmentOutlined,
  MessageOutlined,
  PhoneOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";

const { TextArea } = Input;

// انواع TypeScript
interface ContactFormValues {
  name: string;
  phone: string;
  email: string;
  site: string;
  message: string;
}

interface SocialMediaBadge {
  name: string;
  color: string;
  textColor: string;
}

function ContactUsForm() {
  const [form] = Form.useForm<ContactFormValues>();

  const onFinish = async (values: ContactFormValues): Promise<void> => {
    try {
      // اینجا می‌توانید منطق ارسال فرم به سرور را اضافه کنید
      message.success("پیام شما با موفقیت ارسال شد!");
      form.resetFields();
    } catch (error) {
      message.error("خطا در ارسال پیام. لطفاً مجدداً تلاش کنید.");
    }
  };

  const onFinishFailed = (errorInfo: any): void => {
    message.error("لطفاً اطلاعات فرم را به درستی تکمیل کنید.");
  };

  const socialMediaBadges: SocialMediaBadge[] = [
    { name: "واتساپ", color: "bg-green-100", textColor: "text-green-800" },
    { name: "تلگرام", color: "bg-blue-100", textColor: "text-blue-800" },
    { name: "بله", color: "bg-purple-100", textColor: "text-purple-800" },
  ];

  const phoneRegex: RegExp = /^09[0-9]{9}$/;

  return (
    <div className="py-8">
      {/* هدر اطلاعات تماس */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-r-4 border-[#ce1a2a]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          تماس با ما
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center space-x-3 space-x-reverse gap-2">
            <div className="bg-[#ce1a2a] p-3 rounded-full w-10 h-10 flex justify-center items-center">
              <PhoneOutlined className="text-white! text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">تلفن تبلیغات</h3>
              <p className="text-gray-600 text-lg">02122279133</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse gap-2">
            <div className="bg-[#ce1a2a] p-3 rounded-full w-10 h-10 flex justify-center items-center">
              <MessageOutlined className="text-white! text-xl" />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-semibold text-gray-700 pl-1">
                  پیام در شبکه‌های اجتماعی
                </h3>
                <div className="flex gap-2">
                  ( 
                  {socialMediaBadges.map(
                    (badge: SocialMediaBadge, index: number) => (
                      <span
                        key={index}
                        className={`text-xs ${badge.color} ${badge.textColor} px-2 py-1 rounded-full`}
                      >
                        {badge.name}
                      </span>
                    )
                  )}
                  )
                </div>
              </div>
              <p className="text-gray-600 text-lg">09395432010</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* فرم تماس */}
        <Card
          title={
            <div className="flex items-center space-x-2 space-x-reverse gap-2">
              <div className="bg-[#ce1a2a] p-3 rounded-full w-8 h-8 flex justify-center items-center">
                <SendOutlined className="text-white!" />
              </div>
              <span className="text-gray-800">فرم ارتباط با ما</span>
            </div>
          }
          className="shadow-lg border-t-4 border-t-[#ce1a2a]"
        >
          <Form<ContactFormValues>
            form={form}
            name="contact-form"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            dir="rtl"
          >
            <Form.Item<ContactFormValues>
              label="نام"
              name="name"
              rules={[
                {
                  required: true,
                  message: "لطفاً نام خود را وارد کنید",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="نام خود را وارد کنید"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item<ContactFormValues>
              label="ایمیل"
              name="email"
              rules={[
                { required: true, type: "email", message: "ایمیل معتبر نیست" },
              ]}
            >
              <Input
                size="large"
                placeholder="example@domain.com"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item<ContactFormValues>
              label="سایت"
              name="site"
              rules={[{ required: true, message: "لطفاً سایت را وارد کنید" }]}
            >
              <Input
                size="large"
                placeholder="سایت خود را وارد کنید"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item<ContactFormValues>
              label="پیام"
              name="message"
              rules={[
                { required: true, message: "لطفاً پیام خود را وارد کنید" },
                { min: 10, message: "پیام باید حداقل 10 کاراکتر باشد" },
              ]}
            >
              <TextArea
                rows={6}
                placeholder="متن پیام خود را اینجا بنویسید..."
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full rounded-lg hover:scale-105 transition-transform"
                style={{
                  backgroundColor: "#ce1a2a",
                  borderColor: "#ce1a2a",
                  height: "48px",
                }}
              >
                ارسال پیام
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* نقشه */}
        <Card
          title={
            <div className="flex items-center space-x-2 space-x-reverse gap-2">
              <div className="bg-[#ce1a2a] p-3 rounded-full w-8 h-8 flex justify-center items-center">
                <EnvironmentOutlined className="text-white!" />
              </div>
              <span className="text-gray-800">موقعیت ما روی نقشه</span>
            </div>
          }
          className="shadow-lg border-t-4 border-t-[#ce1a2a]"
        >
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <EnvironmentOutlined className="text-4xl mb-4 text-[#ce1a2a]" />
              <p className="text-lg">نقشه در اینجا نمایش داده می‌شود</p>
              <p className="text-sm mt-2">
                می‌توانید از Google Maps یا هر سرویس نقشه‌ای استفاده کنید
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">آدرس:</h4>
            <p className="text-gray-600">تهران، خیابان نمونه، پلاک ۱۲۳</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ContactUsForm;
