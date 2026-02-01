import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ماشین3 - احراز هویت",
  description: "احراز هویت",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
