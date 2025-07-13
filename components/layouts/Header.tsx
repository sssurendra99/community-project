"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  PhoneIcon,
  UserCircle,
  LogOut,
  LayoutDashboard,
  LogIn,
  ShoppingCart,
} from "lucide-react";
import SearchBar from "../ui-tools/SearchBar";
import MainNavBar from "../navigation/MainNavBar";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("mock_user");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("mock_user");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <header className="border-b border-gray-200 shadow-sm bg-white">
      {/* Top section */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Contact Info + Search */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 flex items-center">
              <PhoneIcon className="w-4 h-4 mr-1" />
              +94 77 23 44 555
            </div>
            <div className="hidden md:block">
              <SearchBar />
            </div>
          </div>

          {/* Center: Logo */}
          <div className="text-3xl font-extrabold tracking-wider text-center absolute left-1/2 transform -translate-x-1/2">
            WEARME
          </div>

          {/* Right: Cart + Profile */}
          <div className="flex items-center gap-4 ml-auto">
            <Link
              href="/cart"
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
              >
                <UserCircle className="w-6 h-6 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  {isLoggedIn ? "Admin" : "Guest"}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/dashboard/admin"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-green-600"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <MainNavBar />
    </header>
  );
};

export default Header;
