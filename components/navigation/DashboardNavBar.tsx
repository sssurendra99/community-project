"use client";
import React, { ReactNode } from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import { 
  MenuIcon, 
  LayoutDashboard, 
  BarChart3, 
  Banknote, 
  ShoppingCartIcon, 
  Users, 
  ShoppingBag, 
  TagIcon, 
  Package, 
  Image, 
  Settings, 
  BadgePercent,
  FileText
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const DashboardNavBar = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const NavLink = ({ href, icon: Icon, label }: { href: string, icon: React.ElementType, label: string }) => (
    <DialogClose asChild>
      <Link href={href}>
        <Button 
          variant={pathname === href ? "default" : "outline"} 
          className="w-full justify-start mb-2"
        >
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </Link>
    </DialogClose>
  );

  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-6">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <MenuIcon />
            <span className="sr-only">Open Menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-[270px]">
            <SheetHeader>
              <Link href="/">
                <SheetTitle>Admin</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              {/* Overview Section */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase mb-2">Overview</div>
                <NavLink 
                  href="/dashboard/admin" 
                  icon={LayoutDashboard} 
                  label="Dashboard" 
                />
                <NavLink 
                  href="/dashboard/admin/analytics" 
                  icon={BarChart3} 
                  label="Analytics" 
                />
              </div>

              {/* Financial Management */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase mb-2">Finance</div>
                <NavLink 
                  href="/dashboard/admin/finance" 
                  icon={Banknote} 
                  label="Finance" 
                />
                <NavLink 
                  href="/dashboard/admin/reports" 
                  icon={FileText} 
                  label="Reports" 
                />
              </div>

              {/* Store Management */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase mb-2">Store Management</div>
                <NavLink 
                  href="/dashboard/admin/products" 
                  icon={ShoppingCartIcon} 
                  label="Products" 
                />
                <NavLink 
                  href="/dashboard/admin/categories" 
                  icon={TagIcon} 
                  label="Categories" 
                />
                <NavLink 
                  href="/dashboard/admin/inventory" 
                  icon={Package} 
                  label="Inventory" 
                />
              </div>

              {/* Sales & Orders */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase mb-2">Sales & Orders</div>
                <NavLink 
                  href="/dashboard/admin/orders" 
                  icon={ShoppingBag} 
                  label="Orders" 
                />
                <NavLink 
                  href="/dashboard/admin/promotions" 
                  icon={BadgePercent} 
                  label="Promotions" 
                />
              </div>

              {/* Customers */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase mb-2">Customers</div>
                <NavLink 
                  href="/dashboard/admin/customers" 
                  icon={Users} 
                  label="Customers" 
                />
              </div>

              {/* Content Management */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase mb-2">Content</div>
                <NavLink 
                  href="/dashboard/admin/banners" 
                  icon={Image} 
                  label="Banners" 
                />
              </div>

              {/* System */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase mb-2">System</div>
                <NavLink 
                  href="/dashboard/admin/settings" 
                  icon={Settings} 
                  label="Settings" 
                />
              </div>
            </div>
          </SheetContent>
        </Dialog>
      </header>
      <section>{children}</section>
    </div>
  );
};

export default DashboardNavBar;
