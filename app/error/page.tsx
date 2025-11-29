"use client";

import { Suspense } from "react";
import Loading from "../components/loader";
import ErrorContent from "./ErrorContent";

export default function ErrorPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorContent />
    </Suspense>
  );
}
