import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import "./globals.css";
import LayoutClient from "./LayoutClient";
import localFont from "next/font/local";
import CustomRouteLoader from "./components/CustomRouteLoader";

export const metadata: Metadata = {
  metadataBase: new URL("https://mashin3.com"),
  title: {
    default: "ماشین 3 - بانک اطلاعات خودرو ، بررسی خودرو ، سایت تخصصی خودرو ماشین",
    template: "%s",
  },
  description:
    "بانک اطلاعات خودرو ، بررسی خودرو ، مقایسه خودرو ، قیمت خودرو و موتورسیکلت ، اخبار خودرو ، سایت تخصصی خودرو ماشین 3",
  keywords: [
    "ماشین 3",
    "بررسی خودرو",
    "بانک اطلاعات خودرو",
    "قیمت خودرو",
    "مقایسه خودرو",
    "اخبار خودرو",
    "موتورسیکلت",
    "سایت خودرو",
    "مشخصات فنی خودرو",
  ],
  authors: [{ name: "ماشین 3", url: "https://mashin3.com" }],
  creator: "ماشین 3",
  publisher: "ماشین 3",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://mashin3.com",
    siteName: "ماشین 3",
    title: "ماشین 3 - بانک اطلاعات خودرو ، بررسی خودرو ، سایت تخصصی خودرو",
    description:
      "بانک اطلاعات خودرو ، بررسی خودرو ، مقایسه خودرو ، قیمت خودرو و موتورسیکلت ، اخبار خودرو",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "ماشین 3 - سایت تخصصی خودرو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ماشین 3 - بانک اطلاعات خودرو ، بررسی خودرو ، سایت تخصصی خودرو",
    description:
      "بانک اطلاعات خودرو ، بررسی خودرو ، مقایسه خودرو ، قیمت خودرو و موتورسیکلت",
    images: ["/images/logo.png"],
  },
  alternates: {
    canonical: "https://mashin3.com",
  },
  category: "automotive",
  manifest: "/manifest.json",
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <meta name="theme-color" content="#1890ff" />
      </head>
      <body>
        <CustomRouteLoader />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
