"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

interface AOSProviderProps {
  children: React.ReactNode;
}

const AOSProvider = ({ children }: AOSProviderProps) => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      offset: 0,
    });
  }, []);

  return <div className="max-w-[2000px] mx-auto">{children}</div>;
};

export default AOSProvider;
