"use client";

import { setIsLoading, setUser } from "@/redux/slice/user";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface AOSProviderProps {
  children: React.ReactNode;
  userCookie:any
}

const AOSProvider = ({ children , userCookie}: AOSProviderProps) => {
  
   const disPatch = useDispatch()
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      offset: 0,
    });
  }, []);

  useEffect(()=>{
    if (userCookie && userCookie.value) {
      
      disPatch(setUser(JSON.parse(userCookie.value)));
    }
    disPatch(setIsLoading(false));
  },[userCookie])

  return <div className="max-w-[2000px] mx-auto">{children}</div>;
};

export default AOSProvider;
