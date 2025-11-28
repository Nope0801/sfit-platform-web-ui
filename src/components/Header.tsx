"use client";

import {
  AcademicCapIcon,
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  HomeIcon,
  NewspaperIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { useLogout } from "@/hooks/auth-hook";
import { useToken } from "@/hooks/token-hooks";

const navigation = [
  { name: "Trang chủ", href: "/", icon: HomeIcon },
  { name: "Khóa học", href: "/courses", icon: AcademicCapIcon },
  { name: "Khóa học của tôi", href: "/my-courses", icon: AcademicCapIcon },
  { name: "Nhiệm vụ", href: "/tasks", icon: ClipboardDocumentListIcon },
  { name: "Sự kiện", href: "/events", icon: CalendarIcon },
  { name: "Bản tin & Góc chia sẻ", href: "/news", icon: NewspaperIcon },
  { name: "Thông báo", href: "/notifications", icon: BellIcon },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const token = useToken();
  const { func: doLogout, isLoading: isLoggingOut } = useLogout();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActiveLink(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "nav-link-active text-[#267452] bg-opacity-10"
                      : "nav-link"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-[#267452]">
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link
              href="/profile"
              className="w-8 h-8 bg-[#267452] rounded-full flex items-center justify-center hover:bg-[#1f5e42] transition-colors duration-200"
            >
              <UserIcon className="w-5 h-5 text-white" />
            </Link>
            {isClient && token && (
              <button
                onClick={() => doLogout()}
                disabled={isLoggingOut}
                className={`px-3 py-2 rounded-md text-sm font-medium border transition-colors duration-200 ${
                  isLoggingOut
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-[#267452] hover:text-white border-[#267452] text-[#267452]"
                }`}
              >
                {isLoggingOut ? "Đang đăng xuất…" : "Đăng xuất"}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-[#267452]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-4 pb-3 space-y-1">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActiveLink(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "nav-link-active bg-[#267452] bg-opacity-10"
                      : "nav-link"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-3 border-t border-gray-200">
              <Link
                href="/profile"
                className={`flex items-center px-3 py-3 rounded-md transition-colors duration-200 ${
                  isActiveLink("/profile")
                    ? "nav-link-active bg-[#267452] bg-opacity-10"
                    : "nav-link"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 bg-[#267452] rounded-full flex items-center justify-center mr-3">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-base font-medium">Hồ sơ cá nhân</span>
              </Link>
              {isClient && token && (
                <button
                  onClick={async () => {
                    await doLogout();
                    setMobileMenuOpen(false);
                  }}
                  disabled={isLoggingOut}
                  className={`mt-2 w-full flex items-center justify-center px-3 py-3 rounded-md border text-base font-medium transition-colors duration-200 ${
                    isLoggingOut
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-[#267452] hover:text-white border-[#267452] text-[#267452]"
                  }`}
                >
                  {isLoggingOut ? "Đang đăng xuất…" : "Đăng xuất"}
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
