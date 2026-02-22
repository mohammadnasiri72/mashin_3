"use client";

import { mainDomain, mainDomainOld } from "@/utils/mainDomain";
import Image from "next/image";
import Link from "next/link";
import ScrollToTopButton from "./ScrollToTopButton";

interface FooterLink {
  href: string;
  text: string;
}

const Footer = ({
  menu,
  setting,
  Social,
}: {
  menu: MenuGroup[];
  setting: SettingType[];
  Social: Items[];
}) => {
  const logoSrc: string | undefined = setting.find(
    (e) => e.propertyKey === "site_logo",
  )?.propertyValue;
  const logoTitle: string | undefined = setting.find(
    (e) => e.propertyKey === "site_title",
  )?.propertyValue;
  const copyright: string | undefined = setting.find(
    (e) => e.propertyKey === "site_copyright",
  )?.propertyValue;
  const footerDescription: string | undefined = setting.find(
    (e) => e.propertyKey === "site_footer_description",
  )?.propertyValue;
  // پیدا کردن منوی فوتر
  const footerMenu = menu.find((m) => m.menuKey === "menufooter");
  const footerItems = footerMenu?.menuItems || [];

  // تقسیم آیتم‌های فوتر به سه ستون
  const splitIntoColumns = (items: any[], columnsCount: number = 3) => {
    const columns: any[][] = Array.from({ length: columnsCount }, () => []);

    items.forEach((item, index) => {
      const columnIndex = index % columnsCount;
      columns[columnIndex].push(item);
    });

    return columns;
  };

  const footerColumns = splitIntoColumns(footerItems, 3);

  // تبدیل آیتم‌های API به فرمت مورد نیاز فوتر
  const convertToFooterLinks = (items: any[]): FooterLink[] => {
    return items.map((item) => ({
      href: item.url || item.href || "#",
      text: item.title,
    }));
  };

  const column1Links = convertToFooterLinks(footerColumns[0]);
  const column2Links = convertToFooterLinks(footerColumns[1]);
  const column3Links = convertToFooterLinks(footerColumns[2]);

  return (
    <footer className="footer-wrap">
      {/* Main Footer */}
      <div className="main-footer bg-white">
        {/* Widgets Section */}
        <div className="widgets-section py-8">
          <div className="mx-auto px-4 footer-wrapper">
            <div className="grid grid-cols-12 sm:gap-8 gap-2">
              {/* Footer Column - Logo and Info */}
              <div className="footer-column col-span-12 sm:col-span-6 lg:col-span-4">
                <div className="logo-footer mb-4 h-7!">
                  <Link href="/" className="h-7!">
                    <img
                      src={mainDomainOld + logoSrc}
                      alt={logoTitle}
                      className="max-w-32"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </Link>
                </div>
                {footerDescription && (
                  <p className="text-gray-600 text-sm leading-7 mb-6 text-justify">
                    {footerDescription}
                    <Link
                      href="#"
                      className="text-black! hover:text-[#0a58ca]! duration-300 font-bold mr-1 inline-flex items-center"
                    >
                      ایده پویا
                      <Image
                        src="/images/icons/activeidea.png"
                        alt="ایده پویا"
                        width={16}
                        height={16}
                        className="mr-1"
                      />
                    </Link>
                  </p>
                )}

                <div className="rewards sm:flex p-5">
                  <div className="rw-item flex flex-col items-center text-center h-48">
                    <Image
                      src="/images/gallery/award.png"
                      alt="جایزه"
                      width={80}
                      height={80}
                      className="mb-2"
                    />
                    <p className="text-black font-semibold  text-sm mt-2">
                      برنده جشواره وب و موبایل <br />
                      به انتخاب مردم
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Column - Social Media (Mobile) */}
              <div className="footer-column col-span-12 sm:col-span-6 lg:hidden block">
                <h4 className="text-black! text-lg font-bold! mb-4 sm:text-start text-center">
                  شبکه های اجتماعی
                </h4>

                <div>
                  <ul className="social-medias grid grid-cols-2 gap-2">
                    {Social.map((social) => (
                      <li key={social.id}>
                        <Link
                          href={social.sourceLink}
                          className="bg-gray-100 rounded-lg p-2 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <img
                            src={mainDomainOld + social.image}
                            alt={social.title}
                            className="object-contain w-10 h-10"
                            loading="lazy"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Column - Quick Links */}
              <nav
                className="footer-column col-span-12 lg:col-span-6 ft-lists-wrap"
                aria-label="دسترسی سریع"
              >
                <h2 className="text-black text-[16px] font-bold! mb-4! sm:text-start text-center">
                  {footerMenu?.title || "دسترسی سریع"}
                </h2>

                <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
                  {/* Column 1 */}
                  <div className="col-span-1 sm:text-start text-center">
                    <ul className="space-y-5">
                      {column1Links.map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link.href}
                            className="text-[#292929]! hover:text-[#ce1a2a]! transition-colors text-sm font-semibold!"
                          >
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div className="col-span-1 sm:text-start text-center">
                    <ul className="space-y-5">
                      {column2Links.map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link.href}
                            className="text-[#292929]! hover:text-[#ce1a2a]! transition-colors text-sm font-semibold!"
                          >
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3 */}
                  <div className="col-span-1 sm:text-start text-center">
                    <ul className="space-y-5">
                      {column3Links.map((link, index) => (
                        <li key={index}>
                          <Link
                            href={link.href}
                            className="text-[#292929]! hover:text-[#ce1a2a]! transition-colors text-sm font-semibold!"
                          >
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </nav>

              {/* Footer Column - Social Media (Desktop) */}
              <div className="footer-column col-span-12 md:col-span-2 lg:col-span-2 lg:block! hidden">
                <h4 className="text-gray-900 text-lg font-bold mb-4">
                  شبکه های اجتماعی
                </h4>

                <div>
                  <ul className="social-medias grid grid-cols-2 gap-2">
                    {Social.map((social) => (
                      <li key={social.id}>
                        <Link
                          href={social.sourceLink}
                          className="bg-gray-100 rounded-lg w-20 h-20 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <img
                            src={mainDomain + social.image}
                            alt={social.title}
                            className="object-contain"
                            loading="lazy"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        {copyright && (
          <div className="footer-bottom bg-[#ce1a2a] text-white! py-3!">
            <div className="mx-auto px-4">
              <div className="row">
                <div className="copyright text-center text-xs">{copyright}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
