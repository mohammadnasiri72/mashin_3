import "@ant-design/v5-patch-for-react-19";
import "./globals.css";
import LayoutClient from "./LayoutClient";
import localFont from "next/font/local";
import CustomRouteLoader from "./components/CustomRouteLoader";
import { cookies } from "next/headers";



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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

   // خواندن کوکی در سرور
 const cookieStore = await cookies();
  const userCookie = cookieStore.get("user");
  
  return (
    <html lang="fa" dir="rtl" className={raviFont.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <meta name="theme-color" content="#1890ff" />
      </head>
      <body>
        <CustomRouteLoader />
        <LayoutClient userCookie={userCookie}>{children}</LayoutClient>
      </body>
    </html>
  );
}
