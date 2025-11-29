"use client";

import { Collapse } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { Skeleton } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { IoChevronDown, IoSearch } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import ModalLogin from "./ModalLogin";

export default function Header({
  menu,
  setting,
}: {
  menu: MenuGroup[];
  setting: SettingType[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [menuItems, setMenuItems] = useState<LastMenuItem[]>([]);

  
  

  // تابع تبدیل LastMenuItem به MenuItem با ساختار سلسله‌مراتبی
  const convertApiMenuToHierarchical = (
    apiItems: MenuItem[]
  ): LastMenuItem[] => {
    // ایجاد یک مپ برای دسترسی سریع به آیتم‌ها بر اساس id
    const itemsMap = new Map<number, MenuItem>();
    const hierarchicalItems: LastMenuItem[] = [];

    // اول همه آیتم‌ها را در مپ قرار می‌دهیم
    apiItems.forEach((item) => {
      itemsMap.set(item.id, item);
    });

    // تابع بازگشتی برای ایجاد ساختار سلسله‌مراتبی
    const buildHierarchy = (parentId: number | null): LastMenuItem[] => {
      const children: LastMenuItem[] = [];

      apiItems.forEach((item) => {
        if (item.parentId === parentId) {
          const menuItem: LastMenuItem = {
            title: item.title,
            url: item.url || item.href || "#",
          };

          // بررسی می‌کنیم که آیا این آیتم فرزند دارد یا نه
          const childItems = buildHierarchy(item.id);
          if (childItems.length > 0) {
            menuItem.children = childItems;
          }

          children.push(menuItem);
        }
      });

      // بر اساس priority مرتب می‌کنیم (اعداد کمتر اولویت بالاتر)
      return children.sort((b, a) => {
        const aItem = apiItems.find((item) => item.title === a.title);
        const bItem = apiItems.find((item) => item.title === b.title);
        return (aItem?.priority || 0) - (bItem?.priority || 0);
      });
    };

    return buildHierarchy(null);
  };

  useEffect(() => {
    if (menu.length > 0) {
      const primaryMenuItems =
        menu.find((m) => m.menuKey === "primary")?.menuItems || [];
      const convertedMenu = convertApiMenuToHierarchical(primaryMenuItems);
      setMenuItems(convertedMenu);
    }
  }, [menu]);

  // هندل کردن اسکرول برای sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 200;
      setIsSticky(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  interface MobileMenuItemProps {
    item: LastMenuItem;
    onClose: () => void;
  }

  const MobileMenuItem = ({ item, onClose }: MobileMenuItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border-b border-gray-100 last:border-b-0">
        {item.children ? (
          <>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center cursor-pointer justify-between w-full py-4 text-gray-700 text-right text-sm font-medium"
            >
              <span>{item.title}</span>
              <IoChevronDown
                className={`text-gray-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <Collapse in={isOpen}>
              <div className="pr-4 pb-2">
                {item.children.map((child, childIndex) => (
                  <Link
                    key={childIndex}
                    href={child.url}
                    onClick={onClose}
                    className="block py-3 px-4 text-gray-600 hover:text-[#ce1a2a] rounded-lg text-sm"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </Collapse>
          </>
        ) : (
          <Link
            href={item.url}
            onClick={onClose}
            className="flex items-center justify-between w-full py-4 text-gray-700 text-right text-sm font-medium"
          >
            <span>{item.title}</span>
          </Link>
        )}
      </div>
    );
  };

  const menuItemMobileDrawer = (
    <div className="w-80 h-full bg-white flex flex-col pr-3">
      {/* Header با لوگو */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <Link
          href={"/"}
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <Image
            src="/images/logo.png"
            alt="ماشین 3"
            width={120}
            height={50}
            className="max-w-32"
          />
        </Link>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="text-gray-500 cursor-pointer p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        {menuItems.map((item, index) => (
          <MobileMenuItem
            key={index}
            item={item}
            onClose={() => setIsMenuOpen(false)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={`sticky-header z-10001! ${isSticky ? "sticky-active" : ""}`}
    >
      {/* Main Header */}
      <header
        className={`header-main bg-white duration-300 shadow-lg ${
          isSticky ? "sticky" : ""
        }`}
      >
        <div className="max-w-[1560px] mx-auto px-4 py-3">
          <div className="flex items-center">
            {/* Logo and Menu Section */}
            <div className="w-auto lg:w-2/3 xl:w-7/12 flex items-center">
              <div className="flex flex-wrap w-full items-center">
                {/* Logo */}
                <div className="w-full lg:w-2/12 xl:w-2/12 flex items-center lg:pr-4">
                  <Link href="/">
                    <Image
                      src="/images/logo.png"
                      alt="ماشین 3"
                      width={100}
                      height={50}
                      className="max-w-32"
                    />
                  </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:block lg:w-10/12 xl:w-10/12">
                  <nav className="flex items-center space-x-1 space-x-reverse">
                    {menuItems.length > 0 &&
                      menuItems.map((item, index) => (
                        <div
                          key={index}
                          className="relative group"
                          onMouseEnter={() => setActiveDropdown(index)}
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <Link
                            href={item.url}
                            className="flex items-center text-[13px] whitespace-nowrap font-medium text-[#222]! hover:bg-[#ce1a2a] hover:text-white! rounded-lg px-2 py-2 duration-300 transition-all"
                          >
                            {item.title}
                            {item.children && (
                              <IoChevronDown className="mr-1 text-xs transition-transform duration-300 group-hover:rotate-180" />
                            )}
                          </Link>

                          {/* Dropdown Menu */}
                          {item.children && (
                            <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                              <div className="bg-white rounded-lg shadow-lg border border-gray-200 min-w-[230px] py-2">
                                {item.children.map((child, childIndex) => (
                                  <Link
                                    key={childIndex}
                                    href={child.url}
                                    className="block px-4 py-3 text-sm text-gray-700 hover:text-white! hover:bg-[#ce1a2a]! transition-all duration-200 border-b border-gray-100 last:border-b-0"
                                  >
                                    {child.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    {menuItems.length === 0 && (
                      <div className="flex items-center gap-5">
                        <Skeleton.Button
                          active={true}
                          size={"small"}
                          shape={"default"}
                        />
                        <Skeleton.Button
                          active={true}
                          size={"small"}
                          shape={"default"}
                        />
                        <Skeleton.Button
                          active={true}
                          size={"small"}
                          shape={"default"}
                        />
                        <Skeleton.Button
                          active={true}
                          size={"small"}
                          shape={"default"}
                        />
                        <Skeleton.Button
                          active={true}
                          size={"small"}
                          shape={"default"}
                        />
                        <Skeleton.Button
                          active={true}
                          size={"small"}
                          shape={"default"}
                        />
                      </div>
                    )}
                  </nav>
                </div>
              </div>
            </div>

            {/* Search and Login Section */}
            <div className="w-full lg:w-1/3 xl:w-5/12 flex items-center">
              <div className="flex items-center lg:justify-between justify-end w-full">
                {/* Search Box */}
                <div className="hidden lg:block flex-1 max-w-md">
                  <div className="bg-[#f1f2f4] rounded-lg px-4 py-2 flex items-center border border-transparent hover:border-gray-300 transition-all duration-300">
                    <IoSearch className="text-lg text-[#656565]!" />
                    <input
                      type="text"
                      className="bg-transparent text-[13px] w-full pr-2 outline-none placeholder-[#777] font-medium"
                      placeholder="دنبال چی میگردی؟"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                  <ModalLogin />

                  <Link
                    href="/auth"
                    className="bg-[#ce1a2a] text-white! font-bold text-[13px] px-5 py-2.5 rounded transition-all duration-300 hover:shadow-[0_0_0_5px_rgba(206,26,42)] hover:bg-[#d1182b]"
                  >
                    ثبت‌نام
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className={`lg:hidden bg-[#ce1a2a] transition-all duration-300`}>
          <div className="flex items-center justify-between">
            {/* Search Box */}
            <div className="grow bg-[#d1182b] rounded-lg p-4 flex items-center mr-4">
              <IoSearch className="text-white! text-lg" />
              <input
                type="text"
                className="bg-transparent text-sm w-full pr-2 outline-none text-white! placeholder-white font-medium"
                placeholder="جستجو"
                required
              />
            </div>

            {/* Close Button */}
            <button
              className="text-white! cursor-pointer p-2 text-2xl hover:bg-[#d1182b] rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen((e) => !e)}
            >
              <TiThMenu className="text-3xl" />
            </button>
            <Drawer
              open={isMenuOpen}
              onClose={() => {
                setIsMenuOpen(false);
              }}
              anchor="right"
            >
              {menuItemMobileDrawer}
            </Drawer>
          </div>
        </div>
      </header>

      <style jsx global>{`
        .sticky-header {
          position: relative;
          z-index: 1000;
        }

        .header-main.sticky {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;
          animation: slideDown 0.3s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .sticky-active::before {
          content: "";
          display: block;
          height: 80px;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 1024px) {
          .sticky-active::before {
            height: 120px;
          }
        }

        .header-main.sticky .header-main {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
