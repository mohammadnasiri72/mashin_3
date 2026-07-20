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

interface LayoutClientProps {
  children: ReactNode;
  userCookie:any
}

function LayoutClient({ children , userCookie}: LayoutClientProps) {
 
  
  
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
