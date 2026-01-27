import { baseUrl } from "@/utils/mainDomain";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ماشین 3 - مراکز و نمایندگی های خدمات خودرو",
  description: "مراکز و نمایندگی های خدمات خودرو",
  alternates: {
    canonical: `${baseUrl}/`,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
