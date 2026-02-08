"use client";

import { setRedirectRegister } from "@/redux/slice/redirectRegister";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function RegisterLink() {
  const [fullUrl, setFullUrl] = useState<string>("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname && searchParams) {
      const params = searchParams.toString();
      const url = params ? `${pathname}?${params}` : pathname;
      setFullUrl(url);
    }
  }, [pathname, searchParams]);

  return (
    <Link
      href="/auth"
      onClick={(e) => {
        e.preventDefault();
        if (fullUrl) {
          dispatch(setRedirectRegister(fullUrl));
        }
      }}
      className="bg-[#ce1a2a] text-white! font-bold text-[13px] px-5 py-2.5 rounded transition-all duration-300 hover:shadow-[0_0_0_5px_rgba(206,26,42)] hover:bg-[#d1182b]"
    >
      ثبت‌نام
    </Link>
  );
}
