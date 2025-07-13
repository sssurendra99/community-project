"use client";

import React, { useState, useEffect, useRef } from "react";
import { PhoneIcon, UserCircle, LogOut, LayoutDashboard, LogIn } from "lucide-react";
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-3xl font-extrabold tracking-wider">WearMe</div>

        <div className="text-right">
          <p className="flex items-center justify-end text-sm text-gray-600">
            Customer Service
            <span className="ml-2 flex items-center">
              <PhoneIcon className="w-4 h-4 mx-2" />
              +94 77 23 44 555
            </span>
          </p>
          <SearchBar />
        </div>

        {/* Profile Dropdown */}
        <div className="relative ml-6" ref={dropdownRef}>
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

      <MainNavBar />
    </header>
  );
};

export default Header;
