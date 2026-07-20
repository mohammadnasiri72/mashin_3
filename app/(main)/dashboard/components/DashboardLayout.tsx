"use client";

import { setUser } from "@/redux/slice/user";
import { RootState } from "@/redux/store";
import { PostSignOut } from "@/services/Account/SignOut";
import { createInitialUserData, Toast } from "@/utils/func";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaComments,
  FaHeart,
  FaHome,
  FaKey,
  FaSignOutAlt,
  FaSpinner,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";


const menuItems = [
  {
    id: "dashboard",
    title: "داشبورد",
    icon: FaHome,
    path: "/dashboard",
  },

  {
    id: "favorites",
    title: "علاقه‌مندی‌های من",
    icon: FaHeart,
    path: "/dashboard/favorites",
  },

  {
    id: "user-comments",
    title: "نظرات ارسالی",
    icon: FaComments,
    path: "/dashboard/mycomments",
  },

  {
    id: "change-password",
    title: "تغییر رمز عبور",
    icon: FaKey,
    path: "/dashboard/change-password",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user.user);

  const disPatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      if (user.token) {
        await PostSignOut(user.token);
      }
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Toast.fire({
          icon: "success",
          title: "با موفقیت خارج شدید",
        });

        disPatch(setUser(createInitialUserData())); // ریست کردن user

        // 4. بستن dropdown و هدایت به صفحه اصلی
        router.push("/");
      } else {
        throw new Error(data.error || "خطا در خروج");
      }
    } catch (error: any) {
      Toast.fire({
        icon: "error",
        title: error.response.data || "خطا در خروج",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <div className="lg:min-h-screen  min-h-auto bg-[#f6f6f6] flex">
        {/* Sidebar */}
        <aside
          className={`
                sticky top-14 h-screen w-64 bg-white shadow-lg z-40 shrink-0
                transform transition-transform duration-300 ease-in-out lg:block! hidden
            `}
        >
          <div className="h-full flex flex-col">
            {/* بخش اطلاعات کاربر */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="cursor-pointer flex justify-center items-center gap-2">
                  <Avatar size="default" icon={<UserOutlined />} />
                  <span dir="ltr" className="line-clamp-1 select-none">
                    {user.displayName ? user.displayName : ""}
                  </span>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                        ${
                                          isActive
                                            ? "bg-[#ce1a2a] text-white!"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }
                                    `}
                  >
                    <Icon className="text-lg" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
              <div className="">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className={`
                                    w-full flex items-center justify-start gap-3 px-4 py-3 rounded-lg 
                                    transition-colors cursor-pointer
                                    ${
                                      isLoggingOut
                                        ? "bg-gray-100 text-gray-400! cursor-not-allowed"
                                        : "text-red-600! hover:bg-red-50"
                                    }
                                `}
                >
                  {isLoggingOut ? (
                    <>
                      <FaSpinner className="text-lg animate-spin" />
                      <span>در حال خروج...</span>
                    </>
                  ) : (
                    <>
                      <FaSignOutAlt className="text-lg" />
                      <span>خروج از حساب</span>
                    </>
                  )}
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:min-h-screen min-h-auto">
          <div className="px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </>
  );
}
