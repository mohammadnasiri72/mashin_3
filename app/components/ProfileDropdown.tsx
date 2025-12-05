// components/ProfileDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, Divider, Skeleton } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { createInitialUserData, Toast } from "@/utils/func";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/redux/slice/token";
import { PostSignOut } from "@/services/Account/SignOut";
import { RootState } from "@/redux/store";
const Cookies = require("js-cookie");

// تعریف تایپ برای آیتم‌های منو
interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick?: () => void;
}

interface DividerItem {
  type: "divider";
}

type MenuItemType = MenuItem | DividerItem;

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const disPatch = useDispatch();

  const user = Cookies.get("user");
  const name = user ? JSON.parse(user)?.displayName : "";
  const token = useSelector((state: RootState) => state.token.token);
  const handleLogout = async () => {
    try {
      if (token) {
        await PostSignOut(token);
        Toast.fire({
          icon: "success",
          title: "با موفقیت خارج شدید",
        });
      }
    } catch (error: any) {
      Toast.fire({
        icon: "error",
        title: error.response.data || "خطا در خروج",
      });
    } finally {
      Cookies.set("user", JSON.stringify(createInitialUserData()) , { expires: 7 });
      disPatch(setToken(""));
      setOpen(false);
    }
  };

  // استفاده از تایپ ساده‌تر
  const menuItems: MenuItemType[] = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: (
        <Link href="/dashboard" className="flex items-center gap-2">
          داشبورد
        </Link>
      ),
    },

    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full text-right text-red-600"
        >
          خروج از حساب
        </button>
      ),
    },
  ];

  // بستن dropdown با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Type guard برای بررسی اینکه آیا آیتم دارای icon است
  const isMenuItem = (item: MenuItemType): item is MenuItem => {
    return "key" in item && "icon" in item;
  };

  return (
    <div ref={dropdownRef} className="relative px-2">
      <div
        onClick={() => {
          setOpen((e) => !e);
        }}
        className="cursor-pointer flex justify-center items-center gap-2"
      >
        <span dir="ltr" className="line-clamp-1 select-none">
          {name}
        </span>
        <Avatar size="default" icon={<UserOutlined />} />
      </div>

      {/* Dropdown Menu */}
      {
        <div
          className={`absolute left-0  w-48 duration-300 bg-white rounded-lg shadow-lg border border-gray-200 z-50 ${
            !open ? "max-h-0 mt-0 opacity-0 invisible" : "max-h-52 mt-2 visible"
          }`}
        >
          <div>
            <Link
              href="/dashboard"
              onClick={() => {}}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700! hover:bg-gray-50! hover:text-[#ce1a2a]! cursor-pointer transition-colors duration-150"
            >
              <DashboardOutlined />
              <span className="flex items-center gap-2">داشبورد</span>
            </Link>
            <Divider className="m-0! p-0!" />
            <div
              onClick={() => {
                handleLogout();
              }}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700! hover:bg-gray-50! hover:text-[#ce1a2a]! cursor-pointer transition-colors duration-150"
            >
              <LogoutOutlined />
              <span className="flex items-center gap-2 w-full text-right">
                خروج از حساب
              </span>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
