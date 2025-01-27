"use client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import {
  ShoppingCartIcon,
  LayoutDashboard,
  Users,
  ShoppingBag,
  BarChart3,
  Settings,
  TagIcon,
  Package,
  Image,
  BadgePercent,
} from "lucide-react";

const DashboardSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="lg:block hidden border-r border-[#E5E9F0] h-full bg-[#ECEFF4]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[55px] items-center justify-between border-b border-[#E5E9F0] px-3 w-full bg-[#ECEFF4]">
          <Link
            className="flex items-center gap-2 font-semibold ml-1 text-[#2E3440]"
            href="/"
          >
            <span>Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium gap-2">
            {/* Overview Section */}
            <div className="mb-4">
              <div className="px-3 py-2 text-[#4C566A] text-xs uppercase">
                Overview
              </div>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-[#4C566A] transition-all hover:text-[#2E3440] hover:bg-[#D8DEE9]",
                  {
                    "flex items-center gap-2 rounded-lg bg-[#5E81AC] px-3 py-2 text-white font-semibold transition-all hover:bg-[#81A1C1]":
                      pathname === "/dashboard/admin",
                  }
                )}
                href={"/dashboard/admin"}
              >
                <div className="border rounded-lg border-[#E5E9F0] p-1 bg-[#ECEFF4]">
                  <LayoutDashboard className="h-3 w-3 text-[#2E3440]" />
                </div>
                Dashboard
              </Link>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-[#4C566A] transition-all hover:text-[#2E3440] hover:bg-[#D8DEE9]",
                  {
                    "flex items-center gap-2 rounded-lg bg-[#5E81AC] px-3 py-2 text-white font-semibold transition-all hover:bg-[#81A1C1]":
                      pathname === "/dashboard/admin/analytics",
                  }
                )}
                href={"/dashboard/admin/analytics"}
              >
                <div className="border rounded-lg border-[#E5E9F0] p-1 bg-[#ECEFF4]">
                  <BarChart3 className="h-3 w-3 text-[#2E3440]" />
                </div>
                Analytics
              </Link>
            </div>

            {/* Store Management */}
            <div className="mb-4">
              <div className="px-3 py-2 text-[#4C566A] text-xs uppercase">
                Store Management
              </div>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-[#4C566A] transition-all hover:text-[#2E3440] hover:bg-[#D8DEE9]",
                  {
                    "flex items-center gap-2 rounded-lg bg-[#5E81AC] px-3 py-2 text-white font-semibold transition-all hover:bg-[#81A1C1]":
                      pathname === "/dashboard/admin/products",
                  }
                )}
                href={"/dashboard/admin/products"}
              >
                <div className="border rounded-lg border-[#E5E9F0] p-1 bg-[#ECEFF4]">
                  <ShoppingCartIcon className="h-3 w-3 text-[#2E3440]" />
                </div>
                Products
              </Link>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-[#4C566A] transition-all hover:text-[#2E3440] hover:bg-[#D8DEE9]",
                  {
                    "flex items-center gap-2 rounded-lg bg-[#5E81AC] px-3 py-2 text-white font-semibold transition-all hover:bg-[#81A1C1]":
                      pathname === "/dashboard/admin/categories",
                  }
                )}
                href={"/dashboard/admin/categories"}
              >
                <div className="border rounded-lg border-[#E5E9F0] p-1 bg-[#ECEFF4]">
                  <TagIcon className="h-3 w-3 text-[#2E3440]" />
                </div>
                Categories
              </Link>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-[#4C566A] transition-all hover:text-[#2E3440] hover:bg-[#D8DEE9]",
                  {
                    "flex items-center gap-2 rounded-lg bg-[#5E81AC] px-3 py-2 text-white font-semibold transition-all hover:bg-[#81A1C1]":
                      pathname === "/dashboard/admin/inventory",
                  }
                )}
                href={"/dashboard/admin/inventory"}
              >
                <div className="border rounded-lg border-[#E5E9F0] p-1 bg-[#ECEFF4]">
                  <Package className="h-3 w-3 text-[#2E3440]" />
                </div>
                Inventory
              </Link>
            </div>

            {/* Sales & Orders */}
            <div className="mb-4">
              <div className="px-3 py-2 text-[#4C566A] text-xs uppercase">
                Sales & Orders
              </div>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-[#4C566A] transition-all hover:text-[#2E3440] hover:bg-[#D8DEE9]",
                  {
                    "flex items-center gap-2 rounded-lg bg-[#5E81AC] px-3 py-2 text-white font-semibold transition-all hover:bg-[#81A1C1]":
                      pathname === "/dashboard/admin/orders",
                  }
                )}
                href={"/dashboard/admin/orders"}
              >
                <div className="border rounded-lg border-[#E5E9F0] p-1 bg-[#ECEFF4]">
                  <ShoppingBag className="h-3 w-3 text-[#2E3440]" />
                </div>
                Orders
              </Link>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-[#4C566A] transition-all hover:text-[#2E3440] hover:bg-[#D8DEE9]",
                  {
                    "flex items-center gap-2 rounded-lg bg-[#5E81AC] px-3 py-2 text-white font-semibold transition-all hover:bg-[#81A1C1]":
                      pathname === "/dashboard/admin/promotions",
                  }
                )}
                href={"/dashboard/admin/promotions"}
              >
                <div className="border rounded-lg border-[#E5E9F0] p-1 bg-[#ECEFF4]">
                  <BadgePercent className="h-3 w-3 text-[#2E3440]" />
                </div>
                Promotions
              </Link>
            </div>

            {/* Customer Management */}
            <div className="mb-4">
              <div className="px-3 py-2 text-[#4C566A] text-xs uppercase">
                Customers
              </div>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-[#4C566A] transition-all hover:text-[#2E3440] hover:bg-[#D8DEE9]",
                  {
                    "flex items-center gap-2 rounded-lg bg-[#5E81AC] px-3 py-2 text-white font-semibold transition-all hover:bg-[#81A1C1]":
                      pathname === "/dashboard/admin/customers",
                  }
                )}
                href={"/dashboard/admin/customers"}
              >
                <div className="border rounded-lg border-[#E5E9F0] p-1 bg-[#ECEFF4]">
                  <Users className="h-3 w-3 text-[#2E3440]" />
                </div>
                Customers
              </Link>
            </div>

            {/* Content Management */}
            <div className="mb-4">
              <div className="px-3 py-2 text-[#4C566A] text-xs uppercase">
                Content
              </div>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-[#4C566A] transition-all hover:text-[#2E3440] hover:bg-[#D8DEE9]",
                  {
                    "flex items-center gap-2 rounded-lg bg-[#5E81AC] px-3 py-2 text-white font-semibold transition-all hover:bg-[#81A1C1]":
                      pathname === "/dashboard/admin/banners",
                  }
                )}
                href={"/dashboard/admin/banners"}
              >
                <div className="border rounded-lg border-[#E5E9F0] p-1 bg-[#ECEFF4]">
                  <Image className="h-3 w-3 text-[#2E3440]" />
                </div>
                Banners
              </Link>
            </div>

            {/* Settings & System */}
            <div className="mb-4">
              <div className="px-3 py-2 text-[#4C566A] text-xs uppercase">
                System
              </div>
              <Link
                className={clsx(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-[#4C566A] transition-all hover:text-[#2E3440] hover:bg-[#D8DEE9]",
                  {
                    "flex items-center gap-2 rounded-lg bg-[#5E81AC] px-3 py-2 text-white font-semibold transition-all hover:bg-[#81A1C1]":
                      pathname === "/dashboard/admin/settings",
                  }
                )}
                href={"/dashboard/admin/settings"}
              >
                <div className="border rounded-lg border-[#E5E9F0] p-1 bg-[#ECEFF4]">
                  <Settings className="h-3 w-3 text-[#2E3440]" />
                </div>
                Settings
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
