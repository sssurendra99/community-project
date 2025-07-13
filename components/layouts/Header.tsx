"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  PhoneIcon,
  UserCircle,
  LogOut,
  LayoutDashboard,
  LogIn,
  ShoppingCart,
  History,
} from "lucide-react";
import SearchBar from "../ui-tools/SearchBar";
import MainNavBar from "../navigation/MainNavBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { logout } from "@/action/logout";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session, update } = useSession();

  // Handle logout functionality
  const handleLogOut = async () => {
    try {
      setIsLoggingOut(true);
      setDropdownOpen(false);

      // Call your custom logout action
      await logout();

      // Update session to null
      await update(null);

      // Sign out from NextAuth
      await signOut({ redirect: false });

      // Refresh the page
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
      // Fallback: reload the page
      window.location.reload();
    }
  };

  // Close dropdown when clicking outside
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

  // Determine user display name
  const getUserDisplayName = () => {
    if (session?.user?.name) {
      return session.user.name;
    }
    return "Guest";
  };

  const isAuthenticated = !!session?.user;

  return (
    <>
      <header className="border-b border-gray-200 shadow-sm bg-white">
        <div className="relative flex justify-between items-center px-6 py-4">
          {/* Left: Customer Service */}
          <div className="flex-1">
            <div className="flex items-center text-sm text-gray-600">
              Customer Service
              <span className="ml-2 flex items-center">
                <PhoneIcon className="w-4 h-4 mx-2" />
                +94 77 23 44 555
              </span>
              <div className="hidden md:block ml-4">
                <SearchBar />
              </div>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-3xl font-extrabold tracking-wider text-gray-900 hover:text-gray-700 transition-colors">
              WEARME
            </Link>
          </div>

          {/* Right: Cart + Orders History + Profile */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <Link
              href="/cart"
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
            </Link>

            <Link
              href="/orders-history"
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <History className="w-6 h-6 text-gray-700" />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                disabled={isLoggingOut}
              >
                <UserCircle className="w-6 h-6 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  {getUserDisplayName()}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/dashboard/admin"
                        className="flex items-center px-4 py-2 hover:bg-gray-50 text-sm text-gray-800 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <UserCircle className="w-4 h-4 mr-3 text-gray-500" />
                        My Account
                      </Link>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={handleLogOut}
                        disabled={isLoggingOut}
                        className="w-full flex items-center px-4 py-2 hover:bg-red-50 text-sm text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        {isLoggingOut ? "Logging out..." : "Log Out"}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="flex items-center px-4 py-2 hover:bg-green-50 text-sm text-green-600 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LogIn className="w-4 h-4 mr-3" />
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="flex items-center px-4 py-2 hover:bg-blue-50 text-sm text-blue-600 transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <UserCircle className="w-4 h-4 mr-3" />
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <MainNavBar />
    </>
  );
};

export default Header;