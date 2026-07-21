// app/error/page.tsx
import { headers } from "next/headers";
import ErrorContent from "./ErrorContent";

type ErrorPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const params = await searchParams;
  
  // دریافت status از searchParams
  let status = params?.status || "500";
  
  // اگر از searchParams نیامد، از هدر بگیر (برای rewrite)
  if (!params?.status) {
    const headersList = await headers();
    const headerStatus = headersList.get("x-error-status");
    if (headerStatus) {
      status = headerStatus;
    }
  }

  // پاس دادن status به کامپوننت کلاینت
  return <ErrorContent initialStatus={parseInt(status)} />;
}