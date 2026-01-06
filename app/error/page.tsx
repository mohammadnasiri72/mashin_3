"use client";

import { Suspense } from "react";
import ErrorContent from "./ErrorContent";
import Loading from "@/app/components/loader";

export default function ErrorPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<Loading />}>
        <ErrorContent />
      </Suspense>
    </div>
  );
}
