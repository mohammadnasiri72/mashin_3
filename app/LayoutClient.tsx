"use client";

import { store } from "@/redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import fa_IR from "antd/locale/fa_IR";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import AOSProvider from "./AOSProvider";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { MUIProvider } from "./MUIProvider";
import { usePathname, useRouter } from "next/navigation";

interface LayoutClientProps {
  children: ReactNode;
  userCookie: any;
}

function LayoutClient({ children, userCookie }: LayoutClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // غیرفعال کردن حفظ موقعیت اسکرول
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // اسکرول به بالای صفحه با تغییر مسیر
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  // گوش دادن به دکمه‌های Back/Forward
  useEffect(() => {
    const handlePopState = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      <AntdRegistry>
        <ConfigProvider
          direction="rtl"
          locale={fa_IR}
          theme={{
            token: {
              colorPrimary: "#ce1a2a",
              fontFamily: "var(--font-ravi)",
            },
          }}
        >
          <Provider store={store}>
            <MUIProvider>
              <AOSProvider userCookie={userCookie}>{children}</AOSProvider>
            </MUIProvider>
          </Provider>
        </ConfigProvider>
      </AntdRegistry>
      <ScrollToTopButton />
    </>
  );
}

export default LayoutClient;