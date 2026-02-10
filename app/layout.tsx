import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import "./globals.css";
import LayoutClient from "./LayoutClient";
import localFont from "next/font/local";
import CustomRouteLoader from "./components/CustomRouteLoader";

export const metadata: Metadata = {
  title: "ماشین 3 - بانک اطلاعات خودرو ، بررسی خودرو ، سایت تخصصی خودرو ماشین",
  description: "بانک اطلاعات خودرو ، بررسی خودرو ، سایت تخصصی خودرو ماشین",
};

const raviFont = localFont({
  src: [
    {
      path: "../public/fonts/Ravi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Ravi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Ravi-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Ravi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Ravi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-ravi",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={raviFont.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <CustomRouteLoader />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
