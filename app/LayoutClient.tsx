"use client";

import { store } from "@/redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import fa_IR from "antd/locale/fa_IR";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import AOSProvider from "./AOSProvider";
import { createInitialUserData, generateRandomUserId } from "@/utils/func";
const Cookies = require("js-cookie");

interface LayoutClientProps {
  children: ReactNode;
}

function LayoutClient({ children }: LayoutClientProps) {
  // const user = createInitialUserData();
  // const user =
  const user = Cookies.get("user");

  // if (user?.token) {
    
  // } else {
  //   Cookies.set("user", JSON.stringify(createInitialUserData()));
  // }

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
            <AOSProvider>{children}</AOSProvider>
          </Provider>
        </ConfigProvider>
      </AntdRegistry>
    </>
  );
}

export default LayoutClient;
